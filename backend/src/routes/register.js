// NPM Packages
const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

// Local Imports
const UserData = require('../models/userData');
const { generatePasswordLogin } = require('../auth');
const {
  USER_REGISTRATION_STEP_1_VALIDATOR,
  USER_REGISTRATION_FINISH_VALIDATOR
} = require('../util/validators');
const { cleanUser } = require('../util/transformers');

function isEmailInUse(email, callback) {
  UserData.findOne({ 'bio.email': email }, (_, user) => {
    callback(user != null);
  });
}

function validateResult(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Request didn't pass validation",
      errors: errors.mapped()
    });
  } else {
    next();
  }
}

router.post(
  '/begin',
  [USER_REGISTRATION_STEP_1_VALIDATOR, validateResult],
  (req, res) => {
    const stepUserData = matchedData(req);
    isEmailInUse(stepUserData.bio.email, inUse => {
      if (inUse) {
        res.status(409).json({
          error: `Email '${stepUserData.bio.email}' is already in use`
        });
      } else {
        // Don't save any information yet, just let user proceed
        res.sendStatus(202);
      }
    });
  }
);

router.post(
  '/finish',
  [USER_REGISTRATION_FINISH_VALIDATOR, validateResult],
  (req, res) => {
    const newUserData = matchedData(req);
    isEmailInUse(newUserData.bio.email, inUse => {
      if (inUse) {
        res.status(409).json({
          error: `Email '${newUserData.bio.email}' is already in use`
        });
      } else {
        // Finalize user registration (pick fields to pass through)
        // Note: this doesn't have all fields such as skills_interests with defaults
        const user = new UserData({
          bio: {
            first_name: newUserData.bio.first_name,
            last_name: newUserData.bio.last_name,
            email: newUserData.bio.email,
            date_of_birth: newUserData.bio.date_of_birth,
            street_adress: newUserData.bio.street_adress,
            city: newUserData.bio.city,
            state: newUserData.bio.city,
            zip_code: newUserData.bio.zip_code,
            phone_number: newUserData.bio.phone_number
          },
          skills_interets: newUserData.skill_interests,
          role: 'volunteer',
          status: 'new',
          login: generatePasswordLogin(newUserData.password)
        });
        user.save(err => {
          if (err) {
            res.status(403).json({ error: err });
          } else {
            res.status(200).json({ user: cleanUser(user.toObject()) });
          }
        });
      }
    });
  }
);

module.exports = router;
