var http = require('httpism')

function APIService() {

}


APIService.prototype.getResults = function(postcode, data) {

  return loadPostcodeData(postcode)
  .then(function(results) {
    for (var attrname in data) { results[attrname] = data[attrname]; }
    return resultAlgorithm(results);
  });
}


APIService.prototype.loadPostcodeData = function(postcode) {

  var totalResults = {};

  console.log(postcode)

  return loadConstituency(postcode)
  .then(function(results) {
    totalResults.postcodeResults = results;
    var refAreaName = results.refArea.name;
    refAreaName = refAreaName.substring(0, refAreaName.length - 5);
    return loadEURefResults(refAreaName);
  })
  .then(function(results) {
    totalResults.euRefResults = results;
    return totalResults;
  })
}

APIService.prototype.resultAlgorithm = function(data) {
  data.finalResult = {party: 'Lib Dems (test)'};
  return data;
}

APIService.prototype.loadConstituency = function(postcode) {
  // igor: todo: flush it soon!
  const apiKey = "DHSoK08gLM6tgVlJFleH4bnUiuHPE4DJkKQiSENT";
  var url = 'https://mapit.mysociety.org/postcode/' + postcode + '?api_key=' + apiKey;
  return http.get(url)
  .then(function (res) {
    var constituency = objectAsArray(res.body.areas).filter(function (data) {
      return data.type == 'WMC'
    });
    var refArea = objectAsArray(res.body.areas).filter(function (data) {
      return (data.type == 'OLF' || data.type == 'UTA')
    });
    return {constituency: constituency[0], refArea: refArea[0], all: res.body.areas}
  })
};

APIService.prototype.loadEURefResults = function(areaName) {
  var url = 'https://sheetsu.com/apis/v1.0/0a046bfab11b/search?AmendedArea=' + areaName;
  return http.get(url)
  .then(function (res) {
    return res.body[0];
  })

}

function objectAsArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

var loadPostcodeData = APIService.prototype.loadPostcodeData;
var resultAlgorithm = APIService.prototype.resultAlgorithm;
var loadConstituency = APIService.prototype.loadConstituency;
var loadEURefResults = APIService.prototype.loadEURefResults;
console.log(loadPostcodeData);
console.log(resultAlgorithm);
console.log(loadConstituency);
console.log(loadEURefResults);

module.exports = new APIService();
