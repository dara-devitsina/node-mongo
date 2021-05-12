const MongoClient = require('mongodb').MongoClient;
//const assert = require('assert');

const url = 'mongodb://locgit alhost:27017/';
const dbname = 'conFusion';

// connect to Mongo Client from MongoDB server
MongoClient.connect(url, (err, client) => {

	if (err) console.log(err);

	console.log('Connected correctly to server');

	// connect to the database
	const db = client.db(dbname);
	const collection = db.collection('dishes');

	collection.insertOne({"name": "Uthapizza", "description": "test"}, (err, result) => {
		if (err) console.log(err);

		// OPS property says how many operations have been carried successfully
		console.log('After Insert:\n');
		console.log(result.ops);

		collection.find({}).toArray((err, docs) => {
			if (err) console.log(err);

			console.log('Found:\n');
			console.log(docs);

			// delete collection
			db.dropCollection('dishes', (err, result) => {
				if (err) console.log(err);

				client.close();
			})
		})
	});

})