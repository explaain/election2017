var http = require('httpism')

function APIService() {

}

APIService.prototype.getResults = function(postcode, userData) {

  var data = {};

  return delay(0).then(function(){
    return loadPostcodeData(postcode)
    .then(function(results) {
      data = results;
      data.user = userData;
      return resultAlgorithm(data);
    }).then(function(results) {
      console.log(results)
      return results;
    })
  })
}


APIService.prototype.loadPostcodeData = function(postcode) {

  var totalResults = {};
  var postcodeResults = {};

  return loadConstituency(postcode)
  .then(function(results) {
    postcodeResults = results;
    var refAreaName = results.refArea.name;
    refAreaName = refAreaName.substring(0, refAreaName.length - 5);
    return loadEURefResults(refAreaName);
  })
  .then(function(results) {
    createObjectProps(totalResults, ['results','my-constituency','euRef2016','choices','leave']);
    totalResults.results["my-constituency"]["euRef2016"].choices["leave"].share = results[0].pctLeave;
    return loadGe2015Results(postcodeResults.constituency.codes.gss)
  })
  .then(function(results) {
    totalResults.results["my-constituency"]["ge2015"] = results["ge2015"];
    return loadPartyStances();
  }).then(function(results) {
    totalResults.parties = results;
    return totalResults;
  })
}

function createObjectProps(globalObject, props) {
  var tempObject = globalObject;
  props.forEach(function(prop) {
    if(!tempObject[prop]) {
      tempObject[prop] = {}
    }
    tempObject = tempObject[prop];
  })
  return globalObject;
}

APIService.prototype.resultAlgorithm = function(data) {
  console.log(data);
  var threshold = 0.5;
  var partyMatches = getPartyMatches(data);
  console.log('Party Matches:', partyMatches);
  var partyChances = getPartyChances(data);
  console.log('Party Chances:', partyChances);
  var partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    if (partyMatches[partyKey].match < threshold) {
      delete partyMatches[partyKey].match;
    }
  })
  var partyScores = {};
  finalPartiesList = [];
  partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    partyScores[partyKey] = partyMatches[partyKey].match*partyChances[partyKey];
    if (!partyScores[partyKey]) {
      delete partyScores[partyKey];
    } else {
      var party = allParties.filter(function(p) {return p.key == partyKey})[0];
      party.score = partyScores[partyKey];
      finalPartiesList.push(party);
    }
  });

  function compare(a,b) {
    if (a.score > b.score)
      return -1;
    if (a.score < b.score)
      return 1;
    return 0;
  }

  finalPartiesList.sort(compare);

  console.log('Final Parties List:', finalPartiesList);



  // partyKeys = Object.keys(partyScores);
  // var max = 0,
  //     winningParty = {};
  // partyKeys.forEach(function(partyKey) {
  //   if (partyScores[partyKey] >= max) {
  //     max = partyScores[partyKey];
  //     winningParty = {key: partyKey};
  //   }
  // })
  //
  // winningParty = allParties.filter(function(party) {
  //   return party.key == winningParty.key;
  // })[0];
  // if (!winningParty) {
  //   winningParty = allParties[Math.floor(Math.random()*allParties.length)];
  // }
  // var finalResult = {
  //     party: winningParty.name
  // }
  var totalData = {data: data, parties: finalPartiesList};
  return totalData;
}

APIService.prototype.getPartyMatches = function(data) {
  var partyMatchesByIssue = {},
      partyMatches = {};
  var disagreements = getDisagreements(data);
  allParties.forEach(function(party) {
    var partyKey = party.key;
    partyMatchesByIssue[partyKey] = [];
    try {
      var issueKeys = Object.keys(disagreements);
      issueKeys.forEach(function(issueKey) {
        var debateKeys = Object.keys(disagreements[issueKey]);
        debateKeys.forEach(function(debateKey) {
          partyMatchesByIssue[partyKey].push(disagreements[issueKey][debateKey][partyKey])
        });
      });
      partyMatches[partyKey] = { match: 0};
      partyMatchesByIssue[partyKey].forEach(function(match) {
        partyMatches[partyKey].match += match.value*match.weight;
      })
      partyMatches[partyKey].match /= partyMatchesByIssue[partyKey].length;
      partyMatches[partyKey].match = 1 - partyMatches[partyKey].match;
      console.log(partyMatches);
    } catch(e) {

    }
  });
  return partyMatches;
}

APIService.prototype.getDisagreements = function(data) {
  var disagreementMatrix = {};

  var issues = data.user.opinions.issues;
  var issueKeys = Object.keys(issues);
  issueKeys.forEach(function(issueKey) {
    disagreementMatrix[issueKey] = disagreementMatrix[issueKey] ? disagreementMatrix[issueKey] : {};
    var issue = issues[issueKey];
    try {
      var debates = issue.debates;
      var debateKeys = Object.keys(debates);
      debateKeys.forEach(function(debateKey) {
        disagreementMatrix[issueKey][debateKey] = disagreementMatrix[issueKey][debateKey] ? disagreementMatrix[issueKey][debateKey] : {};
        var debate = debates[debateKey];
        try {
          var allPartiesDebate = data.parties.opinions.issues[issueKey].debates[debateKey];
          var partyKeys = Object.keys(allPartiesDebate.parties);
          partyKeys.forEach(function(partyKey) {
            disagreementMatrix[issueKey][debateKey][partyKey] = {
              value: Math.abs(debate.opinion - allPartiesDebate.parties[partyKey].opinion),
              weight: debate.weight || 1
            }
          })
        } catch (e) {

        }
      })
    } catch(e) {

    }
  })
  return disagreementMatrix;
}

APIService.prototype.getPartyChances = function(data) {
  var partyChances = {};
  var euRefLeavePercent = data.results["my-constituency"]["euRef2016"].choices["leave"].share;
  allParties.forEach(function(party) {
    partyKey = party.key;
    console.log(partyKey);
    try {
      var ge2015MarginPercent = data.results["my-constituency"]["ge2015"].parties[partyKey].shareMargin;
      console.log('ge2015MarginPercent:', ge2015MarginPercent);
      var partyBrexitStance = data.parties.opinions.issues["brexit"].debates["brexit-level"].parties[partyKey].opinion;
      console.log('partyBrexitStance:', partyBrexitStance);
      var chanceFromGe2015MarginPercent = ge2015MarginPercent ? 0.5+(Math.sign(ge2015MarginPercent))*(Math.pow(Math.abs(ge2015MarginPercent),(1/4)))/(2*Math.pow(100,(1/4))) : 0; // Quite crude, ranges from 0.5 to 100 for positive input (should range from below 0.5 to below 100)
      console.log('chanceFromGe2015MarginPercent:', chanceFromGe2015MarginPercent);
      var chanceFromEuOpinions = 1-Math.abs(partyBrexitStance - (1+euRefLeavePercent/25))/4; //Works best when 100% of people voted
      console.log('chanceFromEuOpinions:', chanceFromEuOpinions);
      partyChances[partyKey] = (3*chanceFromGe2015MarginPercent + chanceFromEuOpinions)/4;
      console.log('averageChance:', partyChances[partyKey]);
    } catch (e) {

    }
  })
  return partyChances;
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
  var result = leavePercentages.filter(function (res) {
    return res.area == areaName;
  });
  return result;
}

APIService.prototype.loadGe2015Results = function(areaKey) {
  var result = {"ge2015": {parties:{}}};
  var resultsTemp = ge2015Results[areaKey];
  resultsTemp.forEach(function(party) {
    var partyKey = party.party;
    result["ge2015"].parties[partyKey] = party;
  })
  console.log(resultsTemp);
  console.log(result);
  // var result = {
  //   "ge2015": {
  //     parties: {
  //       "labour": {
  //         share: 34,
  //         votes: 33145,
  //         shareMargin: 6,
  //         voteMargin: 5492
  //       },
  //       "conservative": {
  //         share: 29,
  //         votes: 27653,
  //         shareMargin: -6,
  //         voteMargin: -5492
  //       }
  //     }
  //   }
  // };
  return result;
}


APIService.prototype.loadPartyStances = function() {
  return partyStances;
}



function objectAsArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

var getResults = APIService.prototype.getResults;
var loadPostcodeData = APIService.prototype.loadPostcodeData;
var resultAlgorithm = APIService.prototype.resultAlgorithm;
var getDisagreements = APIService.prototype.getDisagreements;
var getPartyChances = APIService.prototype.getPartyChances;
var getPartyMatches = APIService.prototype.getPartyMatches;
var loadConstituency = APIService.prototype.loadConstituency;
var loadEURefResults = APIService.prototype.loadEURefResults;
var loadPartyStances = APIService.prototype.loadPartyStances;
var loadGe2015Results = APIService.prototype.loadGe2015Results;


var dummyData = {
  user: {
    opinions: {
      issues: {
        "brexit": {
          debates: {
            "brexit-level": {
              opinion: 0.4,
              weight: 1
            },
            "mp-vote": {
              opinion: 1,
              weight: 0.5
            }
          }
        },
        "health": {

        }
      }
    }
  },
  parties: {
    opinions: {
      issues: {
        "brexit": {
          debates: {
            "brexit-level": {
              parties: {
                "conservative": {
                  opinion: 0.8
                }, "labour": {
                  opinion: 0.6
                }
              }
            },
            "mp-vote": {
              parties: {
                "conservative": {
                  opinion: 0
                }, "labour": {
                  opinion: 0
                }
              }
            }
          }
        },
        "health": {

        }
      }
    }
  },
  results: {
    "my-constituency": {
      "ge2015": {
        parties: {
          "labour": {
            share: 34,
            votes: 33145,
            shareMargin: 6,
            voteMargin: 5492
          },
          "conservative": {
            share: 29,
            votes: 27653,
            shareMargin: -6,
            voteMargin: -5492
          }
        }
      },
      "euRef2016": {
        choices: {
          "leave": {
            share: 35,
            votes: 33145,
            shareMargin: 6,
            voteMargin: 5492
          },
          "remain": {
            share: 29,
            votes: 27653,
            shareMargin: -6,
            voteMargin: -5492
          }
        }
      }
    }
  }
};

// igor: a simulation of delay for http requests :)

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t)
  });
}


getResults('S1 1WB', { opinions: { issues: { brexit: { debates: { "brexit-level": { opinion: 0.6 } } } } } } );
// console.log(resultAlgorithm(dummyData));

module.exports = new APIService();
