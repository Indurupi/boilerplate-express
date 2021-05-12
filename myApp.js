var express = require('express');
var app = express();
var bodyParser = require('body-parser')


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: false})); // to parse the request body to accepted json format

// this middleware will be called before every request
app.use(function logger(req, res, next) {
  console.log(req.method+" "+ req.path +" - "+ req.ip);
  next();
})


const homePagePath = __dirname + "/views/index.html"

// sending index file to home page
app.get("/", function(req, res) {
  res.sendFile(homePagePath);
})

// using env variable
app.get("/json", function(req, res) {
  let response = "Hello json";
  if(process.env.MESSAGE_STYLE == "uppercase") {
    response = response.toUpperCase();
  }
  res.json({"message": response });
})

// attach a middleware function to a get/post call
app.get("/now", function(req, res, next) { // this is a middleware function
  req.time = new Date().toString();
  next();
}, function(req, res) { // this is final handler
  res.json({time: req.time})
})

// passing request params and return the params in response
app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word })
})

// adding post and get for same route
app.route("/name").get(function(req, res) {
  const { first, last } = req.query;
  res.json({ name: first +" "+ last})
}).post(function(req, res) {
  const { first, last } = req.body;
  res.json({ name: first +" "+ last})
})



module.exports = app;
