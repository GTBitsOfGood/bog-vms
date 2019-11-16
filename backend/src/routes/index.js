const router = require('express').Router();
const auth = require('../auth');
const users = require('./users');
const csv = require('./csv');

router.use('/users', auth.isAuthenticated, users);
router.use('/csv', auth.isAuthenticated, csv)
const events = require('./events');

router.use('/events', auth.isAuthenticated, events);

module.exports = router;
