const router = require('express').Router();
const auth = require('../auth');
const users = require('./users');
const events = require('./events');
const register = require('./register');
const csv = require('./csv');

router.use('/users', auth.isAuthenticated, users);
router.use('/csv', auth.isAuthenticated, csv)
router.use('/events', auth.isAuthenticated, events);
// unauthenticated
router.use('/register', register);

module.exports = router;
