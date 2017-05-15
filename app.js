var express = require('express');
var ejs = require('ejs');
var app = express();
var path = require('path');
const Cookies = require('cookies');
const compression = require('compression');

// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/public/index.html');
// });

app.use(compression());


app.set('view engine', 'ejs');
app.set("views", "express")

app.use(function(req, res, next) {
  const trailingSlashRegExp = new RegExp("\\/(\\?.+)?$");
  if(req.url.length > 1 && req.url.match(trailingSlashRegExp))
    res.redirect(301, req.url.replace(trailingSlashRegExp,"$1"));
  else
    next();
});

// Temporary forcing all visitors to be redirected to /students
// except those who visited /beta

/*app.get('/beta', function (req, res , next) {
  const cookies = new Cookies( req, res );
  const dn = new Date();
  cookies.set("access","all",{expires:new Date(dn.setDate(dn.getDate()+1))}); // 1 day expiration
  res.redirect('/')
});

app.get('/flush', function (req, res , next) {
  const cookies = new Cookies( req, res );
  cookies.set("access"); // deleting the cookie
  res.redirect('/');
});

app.use(function(req, res, next) {
  const cookies = new Cookies( req, res );
  if(cookies.get("access")==="all"){
    next();
  } else {
    if(req.url==='/'){
      res.redirect("/students")
    } else {
      next();
    }
  }
});*/

app.get('/', function(req, res, next) {
  res.render('index', { standalone: false, embed: false,  step: '' });
});
app.get('/students/', function(req, res, next) {
  res.render('index', { standalone: true, embed: false, step: 'postcode-compare' });
});
//This doesn't work yet - redirect??? - Igor: this doesn't work, because there is no "req.params.step" in URL
app.get('/student/', function(req, res, next) {
  res.redirect(301,"/students");
  //res.render('/index', { standalone: true, embed: false, step: req.params.step });
});

app.get('/embed/:step', function(req, res, next) {
  res.render('index', { standalone: false, embed: true, step: req.params.step });
});

app.get('/policy', function(req, res, next) {
  res.render('index', { standalone: true, embed: false, step: 'policy' });
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
    ||
    req.params.page==="phrase"
  ){
    res.redirect("/",301);
  } else {
    next();
  }
});

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 1234;

app.listen(port, function () {
  console.log('Listening on port '+port+'!');
});

module.exports = app;
