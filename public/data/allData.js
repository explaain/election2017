var allParties = require('./allParties');
var constituencyOdds = require('./constituencyOdds');
var euRefResults = require('./euRefResults');
var ge2015Results = require('./ge2015Results');
var localCandidates = require('./localCandidates');
var partyReconciliation = require('./partyReconciliation');
var partyStances = require('./partyStances3');
var partyStances2 = require('./partyStances2');
var partyStories = require('./partyStories');
var quizQuestions = require('./quizQuestions');
var swingSeatsToForce = require('./swingSeatsToForce');
var countriesData = require('./countriesData');
var ukData = require('./ukData');


module.exports = {
  getAllData: function () {
    return {
      allParties: allParties.getData(),
      constituencyOdds: constituencyOdds.getData(),
      leavePercentages: euRefResults.getData(),
      ge2015Results: ge2015Results.getData(),
      localCandidates: localCandidates.getData(),
      partyReconciliation: partyReconciliation.getData(),
      partyStances: partyStances.getData(),
      // partyStances: {opinions: {issues: Object.assign(partyStances.getData().opinions.issues, partyStances2.getData().opinions.issues)}},
      partyStories: partyStories.getData(),
      quizQuestions: quizQuestions.getData(),
      swingSeatsToForce: swingSeatsToForce.getData(),
      countriesData: countriesData.getData(),
      ukData: ukData.getData(),
    }
  }
};
