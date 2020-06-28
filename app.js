const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'coderDB';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
   findDocuments(db, function() {
     client.close();
   });
 });
});

const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('coding'); //this is the colection inside the coderDB document that we have
  // Insert some documents
  collection.insertMany([
    {
      name: "Abhishek",
      score: 23,
      certification: 1
    },
    {
      name: "Parichay",
      score: 23,
      certification: 0
    },
    {
      name: "Shivangi",
      score: 23,
      certification: 1
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('coding');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
