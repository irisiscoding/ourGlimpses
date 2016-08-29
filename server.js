// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
var http = require('http');
var https = require("https");

// AWS D3 
var AWS = require('aws-sdk');
/**
 * Don't hard-code your credentials!
 * Export the following environment variables instead:
 *
 * export AWS_ACCESS_KEY_ID='AKID'
 * export AWS_SECRET_ACCESS_KEY='SECRET'
 */

// Set your region for future requests.
AWS.config.region = 'us-west-2';

// Create a bucket using bound parameters and put something in it.

var s3bucket = new AWS.S3({params: {Bucket: 'myBucket'}});

// IMPORTANT: Make sure to change the bucket name from "myBucket" above to something unique.

s3bucket.createBucket(function() {
  var params = {Key: 'myKey', Body: 'Hello!'};
  s3bucket.upload(params, function(err, data) {
    if (err) {
      console.log("Error uploading data: ", err);
    } else {
      console.log("Successfully uploaded data to myBucket/myKey");
    }
  });
});
// End of AWS D3

var session = require('express-session')
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true },
  rolling: true,
  // maxAge: 50000000
}))
// Require path
var path = require('path');
//Set up db
require('./server/config/mongoose.js');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client')));
app.set('static', path.join(__dirname, './client'));
// Routes
// Root Request
require('./server/config/routes.js')(app)
// Setting our Server to Listen on Port: 8000
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
})
