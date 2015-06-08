const MongoClient = require('mongodb').MongoClient;
const Q = require('q');



var MongoService = {


	url: 'mongodb://localhost:27017/tinderHack',

	connect: function() {
		console.log('begin connecting')
		var q = Q.defer();
		MongoClient.connect(this.url, function(err, db) {
			console.log('mongo connecting')
			return (!err) ? q.resolve(db) : q.reject(err);
		});

		return q.promise;
	},

	insert: function(data) {
		var q = Q.defer();
		Q.when(this.connect(), function(db) {
			var collection = db.collection('chicks');
		  // Insert some documents 
		  collection.insert(data, function(err, result) {
		    console.log("Inserted documents");
		    return q.resolve('success');
		    db.close();
			});
		}, function(err){
			return q.reject(err);
		});
		return q.promise;
	}





};


module.exports = MongoService;

