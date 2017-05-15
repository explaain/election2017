/* Some data processing function were moved there from views/index.js
 *   to remove code duplication
 */

module.exports = class DataProcessor {

  constructor() {}

  processSentenceData(model, helpers) {
    var dataUpdates = [];
    var goto = {};
    var forAgainst = false;

    function phrasesIncluded(phrases) {
      return model.selectedPhrases
      .filter(function(phrase) {
        return phrases.indexOf(phrase.key) > -1
      }).map(function(phrase) {
        return phrase.key
      });
    }


    model.selectedPhrases.forEach(function(phrase) {
      switch (phrase.key) {
        case 'postcode':
          model.user.postcode = phrase.data;
          break;

        case 'voteFor':
          forAgainst = 'for';
          break;

        case 'voteAgainst':
          forAgainst = 'against';
          break;

        case 'voteOn':
          goto = {
            type: 'dashboards',
            route: 'dashboard',
            name: 'decide',
            task: 'decide'
          }
          break;

        case 'whoToVoteFor':
          goto = {
            type: 'step',
            route: 'step',
            name: 'question',
            final: 'quiz-priority',
            next: 'postcode',
            task: 'issue-$apply'
          }
          dataUpdates.push({
              data: 'user.quizFlow.3',
              // value: ["nhs-1","nhs-2","nhs-3","immigration-1","immigration-2","immigration-3""education-1","brexit-1","brexit-2","brexit-3","brexit-4","education-2","education-3"],
              value: ["brexit-1", "education-1", "transport-1", "economy-1", "housing-1", "trident-1", "NHS-1", "environment-1", "immigration-1", "economy-2"],
              action: "toggle"
            })
          break;

        case 'allIssues':
          dataUpdates.push({
              data: 'user.quizFlow.3',
              // value: ["nhs-1","nhs-2","nhs-3","immigration-1","immigration-2","immigration-3""education-1","brexit-1","brexit-2","brexit-3","brexit-4","education-2","education-3"],
              value: ["brexit-1", "education-1", "transport-1", "economy-1", "housing-1", "trident-1", "NHS-1", "environment-1", "immigration-1", "economy-2"],
              action: "toggle"
            })
          break;

        case 'nhs':
          dataUpdates.push({
            data: 'user.quizFlow.3',
            value: ["nhs-1","nhs-2","nhs-3"],
            action: "toggle"
          })
          break;

          case 'immigration':
          dataUpdates.push({
            data: 'user.quizFlow.3',
            value: ["immigration-1","immigration-2","immigration-3"],
            action: "toggle"
          })
          break;

        case 'brexit':
          dataUpdates.push({
              data: 'user.quizFlow.3',
              value: ["brexit-1","brexit-2","brexit-3","brexit-4"],
              action: "toggle"
            })
          break;

        case 'education':
          dataUpdates.push({
              data: 'user.quizFlow.3',
              value: ["education-1","education-2","education-3"],
              action: "toggle"
            })
          break;

        case 'registerToVote':
          goto = {
            type: 'postcode',
            route: 'step',
            name: 'goToResults',
            resultsType: 'getRegistered',
            next: 'result'
          }
          break;

        case 'areCandidates':
          goto = {
            type: 'postcode',
            route: 'step',
            name: 'goToResults',
            resultsType: 'localCandidates',
            next: 'result'
          }
          break;

        case 'whereToRegisterToVote':
          goto = {
            type: 'postcode',
            route: 'step',
            name: 'postcode-compare',
            next: 'result'
          }
          break;

        case 'shouldRegister':
          goto = {
            type: 'postcode',
            route: 'step',
            name: 'postcode-compare',
            next: 'result'
          }
          break;

        default:

      }
    })

    var quizKeys = [
      "allIssues",
      "brexit",
      "nhs",
      "education",
      "economy",
      "transport"
    ];

    if (phrasesIncluded(quizKeys).length && phrasesIncluded(['voteOn']).length) {
      goto = {
        type: 'step',
        route: 'step',
        name: 'question',
        final: 'quiz-priority',
        next: 'postcode',
        task: 'issue-$apply'
      }
    }

    var outcomes = {
      "hardBrexit": "brexit-1",
      "tuitionFees": "education-1",
      "nationalisingRailways": "transport-1",
      "increasingTax": "economy-1",
      "moreHouses": "housing-1",
      "nuclearWeapons": "trident-1",
      "nhsFunding": "NHS-1",
      "protectingEnvironment": "environment-1",
      "immigration": "immigration-1",
      "minimumWage": "economy-2",
    }

    Object.keys(outcomes).forEach(function(outcomeKey) {
      if (phrasesIncluded(outcomeKey).length && phrasesIncluded(['voteFor']).length) {
        console.log('user.opinions.issues.' + outcomes[outcomeKey].substring(0, outcomes[outcomeKey].length - 2) + '.debates.' + outcomes[outcomeKey] + '.opinion');
        dataUpdates.push({
          data: 'user.opinions.issues.' + outcomes[outcomeKey].substring(0, outcomes[outcomeKey].length - 2) + '.debates.' + outcomes[outcomeKey] + '.opinion',
          value: 1
        });
      }
      if (phrasesIncluded(outcomeKey).length && phrasesIncluded(['voteAgainst']).length) {
        console.log('user.opinions.issues.' + outcomes[outcomeKey].substring(0, outcomes[outcomeKey].length - 2) + '.debates.' + outcomes[outcomeKey] + '.opinion');
        dataUpdates.push({
          data: 'user.opinions.issues.' + outcomes[outcomeKey].substring(0, outcomes[outcomeKey].length - 2) + '.debates.' + outcomes[outcomeKey] + '.opinion',
          value: 0
        });
      }
    });

    var learnStories = {
      "votingByProxy": "proxyVotingStory"
    };

    Object.keys(learnStories).forEach(function(learnStoryKey) {
      if (phrasesIncluded(learnStoryKey).length) {
        goto = {
          type: 'step',
          route: 'step',
          name: learnStories[learnStoryKey],
          next: 'result',
        }
      }
    });

    // if (phrasesIncluded(['brexit']).length && phrasesIncluded(['voteFor']).length) {
    //   dataUpdates.push({
    //     data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
    //     value: 1
    //   });
    // }
    //
    // if (phrasesIncluded(['brexit']).length && phrasesIncluded(['voteAgainst']).length) {
    //   dataUpdates.push({
    //     data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
    //     value: 0
    //   });
    // }

    if (phrasesIncluded(['voteFor']).length || phrasesIncluded(['voteAgainst']).length) {
      goto = {
        type: 'postcode',
        route: 'step',
        name: 'goToResults',
        resultsType: 'partyResults',
        next: 'result'
      }
    }

    helpers.updateData(dataUpdates);
    console.log(goto)
    return goto;
  }

  processConstituencySeats(data) {
    return {
      heading: data.text.heading,
      subheading: data.text.subheading,
      twitterShareHref: data.twitterShareHref,
      facebookShareHref: data.facebookShareHref,
      resultsClass: 'resultsLoaded',
      numberOfSwingSeats: 'swings-' + data.numberOfSwingSeats,
      calculateText: "[How did we calculate this?](http://api.explaain.com/Detail/59106472116f53001109340c)",
      whereIWillBeText: "[I don't know where I'll be on election day!](http://api.explaain.com/Detail/5911b79aac223e0011e45fa9)",
      constituencies: data.seats.map(function(seat){
        return {
          location: seat.location,
          uniHomeLocation: seat.uniHomeLocation,
          partyString: seat.parties.map(function(party){
            return party.name;
          }).join(" vs "),
          numberOfParties: seat.parties.length,
          swingSeat: (seat.parties.length > 1),
          swingIcon: (seat.parties.length > 1) ? 'fa-random' : 'fa-lock',
          swingClass: "swing-" + (seat.parties.length > 1),
          party1: seat.parties[0].name.replace(' Party', ''),
          party1Color: seat.parties[0].colorLight,
          party1Height: (100/seat.parties.length) + '%',
          party1Image: "/img/party-logos/" + seat.parties[0].logo,
          party2: seat.parties[1] ? seat.parties[1].name.replace(' Party', '') : null,
          party2Color: seat.parties[1] ? seat.parties[1].colorLight : null,
          party2Height: (100/seat.parties.length) + '%',
          party2Image: seat.parties[1] ? "/img/party-logos/" + seat.parties[1].logo : null
        }
      })
    };
  }

}
