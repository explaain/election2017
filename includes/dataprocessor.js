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
        console.log(234568);
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

        case 'shouldVoteFor':
        console.log(567869);
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
      console.log(12345);
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
      "hardBrexit": "eu-1",
      "tuitionFees": "education-1",
      "nationalisingRailways": "public-services-1",
      "increasingTax": "tax-2",
      "moreHouses": "housing-2",
      "nuclearWeapons": "defence-2",
      // "nhsFunding": "NHS-1",
      "protectingEnvironment": "environment-1",
      "immigration": "immigration-1",
      "minimumWage": "jobs-2",
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
        console.log(outcomeKey);
        var value = (outcomeKey=='hardBrexit') ? 0.5 : 1;
        dataUpdates.push({
          data: 'user.opinions.issues.' + outcomes[outcomeKey].substring(0, outcomes[outcomeKey].length - 2) + '.debates.' + outcomes[outcomeKey] + '.opinion',
          value: value
        });
      }
    });

    var learnStories = {
      voteInPerson: [
          "//api.explaain.com/Detail/5917066c7f9f9e0011533ef6",
          "//api.explaain.com/Detail/591706ca7f9f9e0011533ef7",
          "//api.explaain.com/Detail/591707247f9f9e0011533ef8",
          "//api.explaain.com/Detail/591707647f9f9e0011533ef9"
        ],
      votingInPerson: [
          "//api.explaain.com/Detail/5917066c7f9f9e0011533ef6",
          "//api.explaain.com/Detail/591706ca7f9f9e0011533ef7",
          "//api.explaain.com/Detail/591707247f9f9e0011533ef8",
          "//api.explaain.com/Detail/591707647f9f9e0011533ef9"
        ],
      voteByProxy: [
          "//api.explaain.com/Detail/59172171a1f5940011a03b63",
          "//api.explaain.com/Detail/59172231a1f5940011a03b65",
          "//api.explaain.com/Detail/591722fba1f5940011a03b66",
        ],
      voteBvotingByProxyyProxy: [
          "//api.explaain.com/Detail/59172171a1f5940011a03b63",
          "//api.explaain.com/Detail/59172231a1f5940011a03b65",
          "//api.explaain.com/Detail/591722fba1f5940011a03b66",
        ],
      pointOfVoting: [
        "//api.explaain.com/Detail/59172710a1f5940011a03b6a",
        "//api.explaain.com/Detail/59172751a1f5940011a03b6b",
        "//api.explaain.com/Detail/591728bca1f5940011a03b6e"
      ]
    }

    Object.keys(learnStories).forEach(function(learnStoryKey) {
      if (phrasesIncluded(learnStoryKey).length) {
        model.user.currentlyLearning = learnStories[learnStoryKey];
        goto = {
          type: 'postcode',
          route: 'step',
          name: 'goToResults',
          resultsType: 'learnResult',
          next: 'result'
        }
      }
    });

    var learnCards = {
      "voteByPost": "//api.explaain.com/Detail/59170e19a1f5940011a03b5e",
      "votingByPost": "//api.explaain.com/Detail/59170e19a1f5940011a03b5e",
      "voteSwap": "//api.explaain.com/Detail/5917181da1f5940011a03b62",
      "voteSwapping": "//api.explaain.com/Detail/5917181da1f5940011a03b62",
      "whyElection": "//api.explaain.com/Detail/591725c2a1f5940011a03b69",
      "spoilMyBallot": "//api.explaain.com/Detail/591723e8a1f5940011a03b67",
      "isBallotSpoiling": "//api.explaain.com/Detail/591723e8a1f5940011a03b67",
      "safeSwingSeat": "//api.explaain.com/Detail/590f6d99de7ed60011ca517f",
      "votingSystems": "//api.explaain.com/Detail/59172a0ca1f5940011a03b70",
      "voting": "//api.explaain.com/Detail/59172995a1f5940011a03b6f",
    };

    Object.keys(learnCards).forEach(function(learnCardsKey) {
      if (phrasesIncluded(learnCardsKey).length) {
        model.user.currentlyLearning = [learnCards[learnCardsKey]];
        goto = {
          type: 'postcode',
          route: 'step',
          name: 'goToResults',
          resultsType: 'learnResult',
          next: 'result'
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
      calculateText: "[How did we calculate this?](//api.explaain.com/Detail/59106472116f53001109340c)",
      whereIWillBeText: "[I don't know where I'll be on election day!](//api.explaain.com/Detail/5911b79aac223e0011e45fa9)",
      constituencies: data.seats.map(function(seat){
        console.log('seat');
        console.log(seat);
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
          party1: seat.parties[0].name ? seat.parties[0].name.replace(' Party', '') : seat.parties[0].key,
          party1Color: seat.parties[0].colorLight,
          party1Height: (100/seat.parties.length) + '%',
          party1Image: "/img/party-logos/" + seat.parties[0].logo,
          party2: seat.parties[1] && seat.parties[1].name ? seat.parties[1].name.replace(' Party', '') : ( seat.parties[1] ? seat.parties[1].key : null ),
          party2Color: seat.parties[1] ? seat.parties[1].colorLight : null,
          party2Height: (100/seat.parties.length) + '%',
          party2Image: seat.parties[1] ? "/img/party-logos/" + seat.parties[1].logo : null
        }
      })
    };
  }

}
