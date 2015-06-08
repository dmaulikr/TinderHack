const express = require('express');
const router = express.Router();
const tinder = require('tinderjs');
const client = new tinder.TinderClient();
 
const id = '10152788776551951';

const MongoService = require('../db/MongoService');

/* default */
router.get('/', function(req, res, next) {

	//var id = req.user.profile.id;
	// var id = '10152788776551951';
  client.authorize(
	  req.query.access_token,
	  id,
	  function() {
	  	console.log('test right');
	  	client.getRecommendations(10, function(error, data){
				
				MongoService.insert(data.results)
					.then(function(e){ console.log('success', e) })
					.catch(function(e){ console.log('error', e) });
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data.results));

	    });
	  }
	);
});

router.get('/:uid', function(req, res, next) {
  client.authorize(
	  accessToken,
	  id,
	  function() {
	  	console.log('test right 2', req.params);
	  	client.like(req.params.uid, function(error, data){
	  		console.log('status', error, data)
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(data.results));
	    });
	  }
	);
});


module.exports = router;