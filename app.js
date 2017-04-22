var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(process.env.PORT || 1234, function () {
  console.log('listening on port 1234!');
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
