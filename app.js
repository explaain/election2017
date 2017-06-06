var express = require('express');
var ejs = require('ejs');
var app = express();
var path = require('path');
var api = require('./services/APIService');
const Cookies = require('cookies');
const compression = require('compression');
var dotenv = require('dotenv').config();

var allData = require('./public/data/allData');

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

// app.get('/beta', function (req, res , next) {
//   const cookies = new Cookies( req, res );
//   const dn = new Date();
//   cookies.set("access","all",{expires:new Date(dn.setDate(dn.getDate()+1))}); // 1 day expiration
//   res.redirect('/')
// });
//
// app.get('/flush', function (req, res , next) {
//   const cookies = new Cookies( req, res );
//   cookies.set("access"); // deleting the cookie
//   res.redirect('/');
// });
//
// app.use(function(req, res, next) {
//   const cookies = new Cookies( req, res );
//   if(cookies.get("access")==="all"){
//     next();
//   } else {
//     if(req.url==='/'){
//       res.redirect("/students")
//     } else {
//       next();
//     }
//   }
// });

app.get('/', function(req, res, next) {
  res.redirect(301,"/quiz");
  // res.render('index', { standalone: false, embed: false,  brand: process.env.SITE_BRAND || 'ge2017', step: '', phrase: '', quiz: false });
});
app.get('/students/', function(req, res, next) {
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: 'postcode-compare', phrase: '', quiz: false });
});
//This doesn't work yet - redirect??? - Igor: this doesn't work, because there is no "req.params.step" in URL
app.get('/student/', function(req, res, next) {
  res.redirect(301,"/students");
  //res.render('/index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: req.params.step, phrase: '', quiz: false });
});

app.get('/embed/:step', function(req, res, next) {
  res.render('index', { standalone: false, embed: true, brand: process.env.SITE_BRAND || 'ge2017', step: req.params.step, phrase: '', quiz: false });
});

app.get('/policy', function(req, res, next) {
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: 'policy', phrase: '', quiz: false });
});

app.get('/shared/:party?/:percentage?', function(req, res, next) {
  req.params.validShare = req.params.party && typeof req.params.percentage !== 'undefined' && !isNaN(req.params.percentage);
  req.params.resourceRoot = `https://${req.headers.host}`;
  req.params.quizHome = `https://${req.headers.host}/quiz`;
  req.params.canonical = `//${req.headers.host}/shared/${req.params.party}/${req.params.percentage}`;
  if(req.params.party && req.params.party.includes("-and-")) {
    req.params.party = req.params.party.split("-and-").join(" and ");
    req.params.equally = "equally ";
  } else {
    req.params.equally = "";
  }
  req.params.share = {
    fb: {
      title: `Turns out I ${req.params.equally}support ${req.params.percentage}% of ${req.params.party} policies.`,
      subtitle: `Who best represents your views? #GE2017`
    },
    tw: {
      title: `Turns out I ${req.params.equally}support ${req.params.percentage}% of ${req.params.party} policies.`,
      subtitle: `Who best represents your views? #GE2017`
    }
  }
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: 'quiz', phrase: '', quiz: true, params: req.params });
})

app.get('/tactical/:party?/:constituency?', function(req, res, next) {
  req.params.validShare = req.params.party && req.params.constituency && isNaN(req.params.constituency);
  req.params.resourceRoot = `https://${req.headers.host}`;
  req.params.quizHome = `https://${req.headers.host}/quiz`;
  req.params.canonical = `//${req.headers.host}/tactical/${req.params.party}/${req.params.constituency}`;
  req.params.share = {
    fb: {
      title: `I'm voting tactically for ${req.params.party} in ${req.params.constituency}.`,
      subtitle: `Who best represents your views? #GE2017`
    },
    tw: {
      title: `I'm voting tactically for ${req.params.party} in ${req.params.constituency}.`,
      subtitle: `Who best represents your views? #GE2017`
    }
  }
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: 'quiz', phrase: '', quiz: true, params: req.params });
})

app.get('/quiz', function(req, res, next) {
  req.params.resourceRoot = `https://${req.headers.host}`;
  req.params.quizHome = `https://${req.headers.host}/quiz`;
  req.params.canonical = `//${req.headers.host}/quiz`;
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: 'quiz', phrase: '', quiz: true, params: req.params });
});

app.get('/quiz/questions', function(req, res, next) {
  res.redirect(301,"/quiz");
});

//Temporary for dev testing
app.get('/results', function(req, res, next) {
  res.redirect(301,"/quiz");
});

app.get('/phrase/iWantTo/', function(req, res, next) {
  res.render('index', { standalone: true, embed: false, brand: process.env.SITE_BRAND || 'ge2017', step: '', phrase: 'iWantTo', quiz: true });
});

//Teporary because AddThis was sending people to the wrong place!
app.get('/ge2017.com', function(req, res, next) {
  res.redirect(301,"/students");
});

app.get('/api/postcode/:postcode', function(req, res, next) {
  api.getContenders(req.params.postcode)
  .then(function(result) {
    res.json({test: 'test', result: result});
  })
});

app.get('/api/constituency/:id', function(req, res, next) {
  // api.
  api.getContenders(req.params.id)
  .then(function(result) {
    res.json({test: 'test', result: result});
  })
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
