const express = require('express');
const router = express.Router();
// var Facebook = require('facebook-node-sdk');
var harmonize = require('harmonize')();
// const tinder = require('tinderjs');
const _ = require('underscore');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express test' });
});

const test = {};


module.exports = router;
