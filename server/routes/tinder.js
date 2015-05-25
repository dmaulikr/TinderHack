const express = require('express');
const router = express.Router();
const tinder = require('tinderjs');
const client = new tinder.TinderClient();
 
const accessToken = 'CAAGm0PX4ZCpsBANOb4lYZAz9i7n9YRZBbzIvcIZAsYfso6TfZClGruTWut9Tct1gN7TGXZBCWTA4mBOXeWtXHP1htlQGnSewj8yPIFnHoRsPADTWBmjkjUdfSLVB8Cev81OecU599s1IPoWf3aZAxpkv76HQ5swRXo6nQbhcUFci2ZAxFwZBZApJanJRVZA0xIK3WQR9ezMyZAgRwUmwP7EcMdUiCiWfRWwCvbsZD';
const id = '10152788776551951';

/* default */
router.get('/', function(req, res, next) {

	// var accessToken = 'CAAGm0PX4ZCpsBALGmKc54ivhVcZAJRC1YfWtYIWcCvXmPOIxTJP1M5lKdzdfC5ZAk1rOtYFt0DckJUVVGNNbmIaZBRTter6ZAKTFVsc3dmlztTgX4kblCxGJHwr5rtrR95Hg1ZBw9C5O3XZA01bsQ3anjdxH1S2jvySK21Tm8iILMoazPXY5wlfKOQlFHZCV0abPglIcSjHLo68dLOe8tIBf2wMw5gw5aMEZD';
	//var id = req.user.profile.id;
	// var id = '10152788776551951';
  client.authorize(
	  accessToken,
	  id,
	  function() {
	  	console.log('test right');
	  	client.getRecommendations(100, function(error, data){
	   //    res.render('index', { 
		  //   	title: 'Express', user:JSON.stringify(req.user), 
		  //   	fb: accessToken + ' ' + id ,
		  //   	data: JSON.stringify(data.results)
		  //   } );
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