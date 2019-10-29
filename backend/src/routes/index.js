const router = require('express').Router();
const auth = require('../auth');
const users = require('./users');
const csv = require('./csv');

router.use('/users', auth.isAuthenticated, users);
router.use('/csv', auth.isAuthenticated, csv)

module.exports = router;
