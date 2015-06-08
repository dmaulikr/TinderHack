const config = require('../config.json');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const util = require('util');
const logger = require('morgan');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const auth = require('./auth');
const tinder = require('./tinder');
const login = require('./login');
const users = require('./users');
const faceTest = require('./faceTest');

/**
 * routes
 */
router.use('/auth', auth);
// router.use('/tinder', tinder);
router.use('/users', users);
router.use('/login', login);
router.use('/faceTest', faceTest);

/* default */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

