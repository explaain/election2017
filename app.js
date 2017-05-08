var express = require('express');
var ejs = require('ejs');
var app = express();
var path = require('path');

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });


app.set('view engine', 'ejs');

app.use(function(req, res, next) {
  const trailingSlashRegExp = new RegExp("\\/(\\?.+)?$");
  if(req.url.length > 1 && req.url.match(trailingSlashRegExp))
    res.redirect(301, req.url.replace(trailingSlashRegExp,"$1"));
  else
    next();
});

app.get('/', function(req, res, next) {
  res.render('../express/index', { standalone: false, embed: false,  step: '' });
});
app.get('/students/', function(req, res, next) {
  res.render('../express/index', { standalone: true, embed: false, step: 'postcode-compare' });
});
//This doesn't work yet - redirect??? - Igor: this doesn't work, because there is no "req.params.step" in URL
app.get('/student/', function(req, res, next) {
  res.redirect(301,"/students");
  //res.render('../express/index', { standalone: true, embed: false, step: req.params.step });
});

app.get('/embed/:step', function(req, res, next) {
  res.render('../express/index', { standalone: false, embed: true, step: req.params.step });
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
