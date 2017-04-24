var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

/*  
  This is temporary to make sure we do not see the 
  ugly 404 page if we accidentally refresh the page 
*/
app.get('/:page/*', function (req, res , next) {
  if(
    req.params.page==="dashboards"
    ||
    req.params.page==="steps"
  ){
    res.redirect("/",301);
  } else {
    next();
  }
});

app.listen(process.env.PORT || 1234, function () {
  console.log('listening on port 1234!');
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
