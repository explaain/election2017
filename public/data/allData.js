var allParties = require('./allParties');
var constituencyOdds = require('./constituencyOdds');
var euRefResults = require('./euRefResults');
var ge2015Results = require('./ge2015Results');
var localCandidates = require('./localCandidates');
var partyReconciliation = require('./partyReconciliation');
var partyStances = require('./partyStances_it');
//var partyStances2 = require('./partyStances2');
var partyStories = require('./partyStories');
var quiz = require('./quiz');
var quizQuestions = require('./quizQuestions_it');
var quizQuestions38Degrees = require('./quizQuestions38Degrees');
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
      partyStories: partyStories.getData(),
      quiz: quiz.getData(),
      quizQuestions: quizQuestions.getData(),
      // quizQuestions38Degrees: quizQuestions38Degrees.getData(),
      swingSeatsToForce: swingSeatsToForce.getData(),
      countriesData: countriesData.getData(),
      ukData: ukData.getData(),
    }
  }
};
