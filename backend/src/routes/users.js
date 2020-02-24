// NPM Packages
const express = require('express');
const router = express.Router();
const { check, oneOf, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const mongoose = require('mongoose');
const _ = require('lodash');

// Local Imports
const { SendEmailError, EmailInUseError } = require('../util/errors');
const UserData = require('../models/userData');
const { USER_DATA_VALIDATOR } = require('../util/validators');
const DEFAULT_PAGE_SIZE = 10;
//events

router.post('/', USER_DATA_VALIDATOR, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }
  const newUserData = matchedData(req);
  let userData = null;
  UserData.findOne({ 'bio.email': newUserData.bio.email })
    .then(user => {
      if (user) {
        throw new EmailInUseError(
          `Email ${newUserData.bio.email} already in use`,
          newUserData.bio.email
        );
      }
      return Promise.resolve();
    })
    .then(() => {
      const newUser = new UserData(newUserData);
      return newUser.save();
    })
    .then(savedUserData => {
      // Save data for response
      userData = savedUserData;

      if (req.user && !req.user.userDataId) {
        // First created user, associate with user credentials
        const userCreds = req.user;
        userCreds.userDataId = savedUserData.id;
        return userCreds.save();
      }

      return Promise.resolve();
    })
    .then(() => {
      res.status(200).json({ userData });
    })
    .catch(err => {
      if (err instanceof EmailInUseError) {
        return res.status(400).json({
          error: err.message,
          errorType: err.name
        });
      }

      // Generic error handler
      return next(err);
    });
});

// Contains the paths of search terms to perform textual search on
const searchTermPaths = {
  Bio: ['bio.first_name', 'bio.last_name'],
  Email: ['bio.email'],
  'Phone Number': ['bio.phone_number']
};

const defaultSearchTermPaths = Object.values(searchTermPaths).reduce(
  (paths, entry) => paths.concat(entry),
  []
);

// Creates a simple aggregate operator factory that assumes filter group keys and
// values directly correspond with the field names and values from MongoDB
const simpleFilterOperatorFactory = groupKey => (key, _value) => ({
  [groupKey]: typeof key === 'object' ? String(key) : key
});

const monthsAgo = months => {
  const date = new Date();
  date.setMonth(date.getMonth() - months);
  return date;
};

const beginningOfYear = offset => {
  const date = new Date();
  const year = date.getFullYear();
  return new Date(year - offset, 0, 1);
};

const dateFilterToDateFactory = {
  // past 1 month ago
  past_month: () => [{ $gte: monthsAgo(1) }],
  // past six months ago
  past_6_months: () => [{ $gte: monthsAgo(6) }],
  // past beginning of current year
  from_current_year: () => [{ $gte: beginningOfYear(0) }],
  // from beginning of previous year to beginning of current year
  from_one_year_ago: () => [
    { $gte: beginningOfYear(1) },
    { $lt: beginningOfYear(0) }
  ],
  // from beginning of 2nd previous year to beginning of previous year
  from_two_years_ago: () => [
    { $gte: beginningOfYear(2) },
    { $lt: beginningOfYear(1) }
  ],
  // older than beginning of 2nd previous year
  older: () => [{ $lt: beginningOfYear(2) }]
};

const dateFilterOperator = (key, _value) => {
  const dateFilters =
    key in dateFilterToDateFactory
      ? dateFilterToDateFactory[key]()
      : dateFilterToDateFactory.from_current_year();
  return dateFilters.length === 1
    ? { createdAt: dateFilters[0] }
    : { $and: dateFilters.map(expression => ({ createdAt: expression })) };
};

// Map of filter group keys to functions that transform values to MongoDB Aggregation
// pipeline expression clauses.
// See https://docs.mongodb.com/manual/meta/aggregation-quick-reference/#aggregation-expressions
const filterValueToOperator = {
  date: dateFilterOperator,
  status: simpleFilterOperatorFactory('status'),
  role: simpleFilterOperatorFactory('role'),
  skills_interests: simpleFilterOperatorFactory('skills_interests')
};

// Used to create dynamic keys to use as facet keys for ambiguous filter bins
const makeBinFacetKey = (groupKey, valueKey) => `bin%%${groupKey}##${valueKey}`;
const facetKeyRegex = /^bin%%(.*?)##(.*?)$/;
const parseBinFacetKey = key => {
  const result = facetKeyRegex.exec(key);
  if (result) return [result[1], result[2]];
  else return ['', ''];
};

// Added to fulfill requirements of UserManager page
// Note: the route is a POST to allow query objects to be in the request body.
//       while a GET is semantically more correct, the url encoding/length restrictions
//       make POST a better choice
router.post('/search', (req, res, next) => {
  const match = {};
  const $and = [];
  const invalidParam = name =>
    res.status(400).json({ error: `Malformed request: invalid ${name} param` });
  const { search, filters, limit, start } = req.body;

  // Search param is for textual search: { value: '', term: 'All' }
  if (search) {
    try {
      if (search.value != null && search.term != null) {
        const { term, value } = search;
        const regexquery = { $regex: new RegExp(value), $options: 'i' };
        const searchPaths =
          term in searchTermPaths
            ? searchTermPaths[term]
            : defaultSearchTermPaths;
        // Add passing one of the textual search queries as a required condition for a
        // document to be returned
        $and.push({ $or: searchPaths.map(path => ({ [path]: regexquery })) });
      } else return invalidParam('search');
    } catch (err) {
      return invalidParam('search');
    }
  }

  // Stores parsed filters:
  // [ { group: "group1", values: { valueB: true }, match: { $or: [ { group1: "valueB" } ] } } ]
  let filterObjects = null;
  // Param is for (boolean) filtering: [ { key: "group1", values: { valueB: true } } ]
  if (filters) {
    try {
      if (typeof filters === 'object' && Array.isArray(filters)) {
        // Series of steps that must all pass for a document to be returned
        filterObjects = filters.map(({ key: groupKey, values }) => {
          const valueEntries = Object.entries(values);
          return {
            group: groupKey,
            valueEntries,
            match: {
              $or: valueEntries.map(([key, value]) =>
                filterValueToOperator[groupKey](key, value)
              )
            }
          };
        });
        $and.push(...filterObjects.map(({ match }) => match));
      } else return invalidParam('filters');
    } catch (err) {
      console.error(err);
      return invalidParam('filters');
    }
  }

  // Attach if any filters are needed
  if ($and.length > 0) {
    match.$and = $and;
  }

  const parsedLimit = parseInt(limit, 10);
  let limitParam = null;
  // limit = 0 means no limit
  if (parsedLimit !== 0) limitParam = parsedLimit || DEFAULT_PAGE_SIZE;

  const baseAggregateStages = [{ $match: match }, { $sort: { _id: -1 } }];
  const limitStage = { $limit: limitParam };
  const projectStage = {
    $project: {
      name: { $concat: ['$bio.first_name', ' ', '$bio.last_name'] },
      email: '$bio.email',
      role: 1,
      status: 1,
      createdAt: 1
    }
  };

  if (start) {
    // If pagination was supplied to the request, then do not load all users to count them
    match._id = { $lt: mongoose.Types.ObjectId(start) };
    const aggregateStages = [...baseAggregateStages, projectStage];
    // Skip limit if not set
    if (limitParam != null) aggregateStages.push(limitStage);
    UserData.aggregate(aggregateStages)
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  } else {
    // Pagination not supplied, so determine the total count for initial request
    // See https://stackoverflow.com/a/49483919
    const facetStage = {
      $facet: {
        users: limitParam == null ? [projectStage] : [projectStage, limitStage],
        count: [{ $count: 'count' }]
      }
    };

    if (limitParam == null) {
      // No limit supplied, so all users are desired.

      // Determine if there are any ambiguous filters that need bins made to distinguish
      // where objects matched. Defined as filters with more than one option selected
      let ambiguousFilterObjects = [];
      if (filterObjects && filterObjects.length > 0) {
        ambiguousFilterObjects = filterObjects.reduce((accum, filterObject) => {
          if (filterObject.valueEntries.length <= 1) return accum;
          accum.push(filterObject);
          return accum;
        }, []);
      }

      if (ambiguousFilterObjects.length > 0) {
        // Bin facets to collate all filter results that match ambiguous filters
        const binFacets = {};
        ambiguousFilterObjects.forEach(({ group, valueEntries, match }) => {
          _.zip(valueEntries, match.$or).forEach(([[valueKey], filter]) => {
            binFacets[makeBinFacetKey(group, valueKey)] = [
              { $match: filter },
              { $project: { _id: 1 } }
            ];
          });
        });
        Object.assign(facetStage.$facet, binFacets);
      }
    }

    UserData.aggregate([...baseAggregateStages, facetStage])
      .then(result => {
        const [{ users, count: countResult, ...rest }] = result;
        let data;

        // Count result object gets truncated if count is 0
        if (countResult.length === 0) {
          data = { users, count: 0 };
        } else {
          const [{ count }] = countResult;
          data = { users, count };
        }

        // Add in the bin results if no limit supplied
        if (limitParam == null) {
          const facets = Object.entries(rest);
          // Objects of shape: { bins: { group1: { accepted: [ id1, id2 ] } } }
          const bins = {};
          facets.forEach(([facetKey, documents]) => {
            const ids = documents.map(({ _id }) => _id);
            const [group, valueKey] = parseBinFacetKey(facetKey);
            if (!bins[group]) bins[group] = {};
            bins[group][valueKey] = ids;
          });
          data.bins = bins;
        }

        return res.status(200).json(data);
      })
      .catch(err => next(err));
  }
});

router.get('/', (req, res, next) => {
  const filter = {};
  if (req.query.type) {
    UserData.find({ role: req.query.type })
      .then(users => res.status(200).json({ users }))
      .catch(err => next(err));
  }
  if (req.query.status) {
    try {
      // Each role is sent as an object key
      // For mongo '$or' query, these keys need to be reduced to an array
      const statusFilter = Object.keys(JSON.parse(req.query.status)).reduce(
        (query, key) => [...query, { status: key }],
        []
      );
      if (!statusFilter.length) {
        res.status(400).json({ error: 'Invalid status param' });
      }
      filter.$or = statusFilter;
    } catch (e) {
      res.status(400).json({ error: 'Invalid status param' });
    }
  }
  if (req.query.role) {
    try {
      // Each role is sent as an object key
      // For mongo '$or' query, these keys need to be reduced to an array
      const roleFilter = Object.keys(JSON.parse(req.query.role)).reduce(
        (query, key) => [...query, { role: key }],
        []
      );
      if (!roleFilter.length) {
        res.status(400).json({ error: 'Invalid role param' });
      }
      filter.$or = roleFilter;
    } catch (e) {
      res.status(400).json({ error: 'Invalid role param' });
    }
  }
  if (req.query.date) {
    try {
      const dates = JSON.parse(req.query.date).reduce(
        (query, curr) => [
          ...query,
          { createdAt: { $gte: new Date(curr.from), $lte: new Date(curr.to) } }
        ],
        []
      );
      if (dates.length)
        filter.$or = filter.$or ? [...filter.$or, ...dates] : dates;
    } catch (e) {
      res.status(400).json({ error: 'Invalid date param' });
    }
  }
  if (req.query.availability) {
    try {
      filter.availability = JSON.parse(req.query.availability);
    } catch (e) {
      res.status(400).json({ error: 'Invalid availability param' });
    }
  }
  if (req.query.skills_interests) {
    try {
      filter.skills_interests = JSON.parse(req.query.skills_interests);
    } catch (e) {
      res.status(400).json({ error: 'Invalid skills_interests param' });
    }
  }
  if (req.query.lastPaginationId) {
    filter._id = { $lt: mongoose.Types.ObjectId(req.query.lastPaginationId) };
  }
  // Search ordered newest first, matching filters, limited by pagination size
  UserData.aggregate([
    { $sort: { _id: -1 } },
    { $match: filter },
    { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
  ])
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => next(err));
});

router.get('/managementData', (req, res, next) => {
  const filter = {};
  if (req.query.role) {
    try {
      // Each role is sent as an object key
      // For mongo '$or' query, these keys need to be reduced to an array
      const roleFilter = Object.keys(JSON.parse(req.query.role)).reduce(
        (query, key) => [...query, { role: key }],
        []
      );
      if (!roleFilter.length) {
        res.status(400).json({ error: 'Invalid role param' });
      }
      filter.$or = roleFilter;
    } catch (e) {
      res.status(400).json({ error: 'Invalid role param' });
    }
  }
  if (req.query.lastPaginationId) {
    filter._id = { $lt: mongoose.Types.ObjectId(req.query.lastPaginationId) };
  }
  UserData.aggregate([
    { $sort: { _id: -1 } },
    { $match: filter },
    { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE },
    {
      $project: {
        name: { $concat: ['$bio.first_name', ' ', '$bio.last_name'] },
        email: '$bio.email',
        role: 1,
        status: 1
      }
    }
  ])
    .then(users => {
      res.status(200).json({ users });
    })
    .catch(err => next(err));
});

router.get('/count', (req, res, next) => {
  UserData.estimatedDocumentCount()
    .exec()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => next(err));
});

router.get('/searchByContent', (req, res, next) => {
  const inputText = req.query.searchquery;
  const searchType = req.query.searchtype;
  const regexquery = { $regex: new RegExp(inputText), $options: 'i' };
  const filter = {};

  switch (searchType) {
    case 'All':
      filter.$or = [
        { history: regexquery },
        { 'bio.street_address': regexquery },
        { 'bio.city': regexquery },
        { 'bio.state': regexquery },
        { 'bio.zip_code': regexquery },
        { 'bio.first_name': regexquery },
        { 'bio.last_name': regexquery },
        { 'bio.email': regexquery },
        { 'bio.phone_number': regexquery }
      ];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    case 'Address':
      filter.$or = [
        { 'bio.street_address': regexquery },
        { 'bio.city': regexquery },
        { 'bio.state': regexquery },
        { 'bio.zip_code': regexquery }
      ];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    case 'History':
      filter.$or = [
        { 'history.volunteer_interest_cause': regexquery },
        { 'history.volunteer_support': regexquery },
        { 'history.volunteer_commitment': regexquery },
        { 'history.previous_volunteer_experience': regexquery }
      ];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    case 'Name':
      filter.$or = [
        { 'bio.first_name': regexquery },
        { 'bio.last_name': regexquery }
      ];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    case 'History':
      UserData.find({
        $or: [
          { 'history.volunteer_interest_cause': regexquery },
          { 'history.volunteer_support': regexquery },
          { 'history.volunteer_commitment': regexquery },
          { 'history.previous_volunteer_experience': regexquery }
        ]
      })
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    case 'Email':
      filter.$or = [{ 'bio.email': regexquery }];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => {
          res.status(200).json({ users });
        })
        .catch(err => next(err));
      break;
    case 'Phone Number':
      filter.$or = [{ 'bio.phone_number': regexquery }];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
      break;
    default:
      filter.$or = [
        { 'history.volunteer_interest_cause': regexquery },
        { 'history.volunteer_support': regexquery },
        { 'history.volunteer_commitment': regexquery },
        { 'history.previous_volunteer_experience': regexquery },
        { 'bio.street_address': regexquery },
        { 'bio.city': regexquery },
        { 'bio.state': regexquery },
        { 'bio.zip_code': regexquery },
        { 'bio.first_name': regexquery },
        { 'bio.last_name': regexquery },
        { 'bio.email': regexquery },
        { 'bio.phone_number': regexquery }
      ];
      UserData.aggregate([
        { $sort: { _id: -1 } },
        { $match: filter },
        { $limit: parseInt(req.query.pageSize, 10) || DEFAULT_PAGE_SIZE }
      ])
        .then(users => res.status(200).json({ users }))
        .catch(err => next(err));
  }
});

router.post('/updateStatus', (req, res, next) => {
  if (!req.query.email || !req.query.status)
    res.status(400).json({ error: 'Invalid email or status sent' });
  const { email, status } = req.query;
  UserData.updateOne({ 'bio.email': email }, { $set: { status: status } }).then(
    result => {
      if (!result.nModified)
        res.status(400).json({
          error: 'Email requested for update was invalid. 0 items changed.'
        });
      res.sendStatus(200);
    }
  );
});

router.post('/updateRole', (req, res, next) => {
  if (!req.query.email || !req.query.role)
    res.status(400).json({ error: 'Invalid email or role sent' });
  const { email, role } = req.query;
  UserData.updateOne({ 'bio.email': email }, { $set: { role: role } }).then(
    result => {
      if (!result.nModified)
        res.status(400).json({
          error: 'Email requested for update was invalid. 0 items changed.'
        });
      res.sendStatus(200);
    }
  );
});

router
  .route('/:id')
  .get([check('id').isMongoId()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    UserData.findById(req.params.id)
      .then(user => {
        if (!user) {
          return res
            .status(404)
            .json({ errors: `No User found with id: ${req.params.id}` });
        }
        res.status(200).json({ user });
      })
      .catch(err => next(err));
  })
  .put(
    [check('id').isMongoId()],
    oneOf(USER_DATA_VALIDATOR),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }

      const userDataReq = matchedData(req);
      const events = req.body.events;

      let savedUserData = null;
      UserData.findById(req.params.id)
        .then(user => {
          if (!user) {
            return res
              .status(404)
              .json({ errors: `No user found with id: ${req.params.id}` });
          }

          if (req.query.action === 'appendEvent') {
            events.forEach(eventId => user.events.push(eventId));
          } else if (req.query.action === 'removeEvents') {
            events.forEach(eventId =>
              user.events.splice(user.events.indexOf(eventId), 1)
            );
          }

          delete userDataReq.id; // we do not want to update the user's id
          updateUserObjectFromRequest(userDataReq, user);

          // Save to db
          return user.save();
        })
        .then(user => {
          return res.status(200).json({ user });
        })
        .catch(err => {
          if (err instanceof SendEmailError) {
            return res.status(400).json({
              error: err.message,
              errorType: err.name
            });
          }

          // Generic error handler
          return next(err);
        });
    }
  )
  .delete([check('id').isMongoId()], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    if (req.user && req.user.userDataId === req.params.id) {
      // User is trying to remove themselves, don't let that happen...
      return res.status(403).json({
        error: 'Cannot delete yourself!'
      });
    }

    UserData.findByIdAndRemove(req.params.id)
      .then(removed => {
        if (!removed) {
          return res
            .status(404)
            .json({ errors: `No user found with id: ${req.params.id}` });
        }

        return res.status(200).json({ removed });
      })
      .catch(err => next(err));
  });

/**
 * Side Affect: Modifies `dbUser`
 */
function updateUserObjectFromRequest(reqUser, dbUser) {
  for (const key1 in reqUser) {
    if (reqUser.hasOwnProperty(key1)) {
      const obj = reqUser[key1];
      const userObj = dbUser[key1];
      for (const key2 in obj) {
        if (obj.hasOwnProperty(key2)) {
          userObj[key2] = obj[key2] !== undefined ? obj[key2] : userObj[key2];
        }
      }
      dbUser[key1] = userObj;
    }
  }
}

module.exports = router;
