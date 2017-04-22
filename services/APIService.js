var http = require('httpism')

function APIService() {

}

APIService.prototype.loadConstituency = function (postcode) {
  var url = 'https://mapit.mysociety.org/postcode/' + postcode;
  return http.get(url)
    .then(function (res) {
      var constituency = objectAsArray(res.body.areas).filter(function (data) {
        return data.type == 'WMC'
      })
      return constituency[0]
    })
};

function objectAsArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

module.exports = APIService
