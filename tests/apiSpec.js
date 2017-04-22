var expect = require('chai').expect
var API = require('../services/APIService')
var api;
describe('Explaiin',function () {

  beforeEach(function () {
    api = new API()
  })

  it('returns constituency for the correct postcode', function () {
    var farringdon = 'ec1r5dz'
    return api.loadConstituency(farringdon)
      .then(function (res) {
        expect(res.name).to.eql('Holborn and St Pancras')
      })
  })

})
