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
// AWS.config.loadFromPath('./config.json');

var s3 = new AWS.S3();
s3.listBuckets(function(err, data) {
  if (err) { console.log("Error:", err); }
  else {
    for (var index in data.Buckets) {
      var bucket = data.Buckets[index];
      console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
    }
  }
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
