var express = require('express');
var app = express();


app.use(express.static(__dirname));

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

// fetch data from request param
app.get("/:word/echo", function(req, res) {
  res.json({ echo: req.params.word })
})


module.exports = app;
