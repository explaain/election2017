var http = require('httpism')

function APIService() {

}

var globalParties = [
  {
    key: "conservative",
    name: "Conservative Party"
  },
  {
    key: "labour",
    name: "Labour"
  },
  {
    key: "lib-dem",
    name: "Liberal Democrats"
  },
  {
    key: "ukip",
    name: "Ukip"
  },
  {
    key: "snp",
    name: "SNP"
  },
  {
    key: "green",
    name: "Green Party"
  },
  {
    key: "plaid-cymru",
    name: "Plaid Cymru"
  }
];

APIService.prototype.getResults = function(postcode, userData) {

  var data = {};

  return delay(1000).then(function(){
    return loadPostcodeData(postcode)
    .then(function(results) {
      data = results;
      data.user = userData;
      return resultAlgorithm(data);
    }).then(function(results) {
      console.log(results);
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
    if (!totalResults.results) {totalResults.results = {}}
    if (!totalResults.results["my-constituency"]) {totalResults.results["my-constituency"] = {}}
    if (!totalResults.results["my-constituency"]["euRef2016"]) {totalResults.results["my-constituency"]["euRef2016"] = {}}
    if (!totalResults.results["my-constituency"]["euRef2016"].choices) {totalResults.results["my-constituency"]["euRef2016"].choices = {}}
    if (!totalResults.results["my-constituency"]["euRef2016"].choices["leave"]) {totalResults.results["my-constituency"]["euRef2016"].choices["leave"] = {}}
    totalResults.results["my-constituency"]["euRef2016"].choices["leave"].share = results[0].pctLeave;
    return totalResults;
    // return loadGe2015Results(postcodeResults.constituency)
  })
  // .then(function(results))
  //   return totalResults;
  // })
}

APIService.prototype.resultAlgorithm = function(data) {
  console.log(data);
  var threshold = 0.5;
  var partyMatches = getPartyMatches(data);
  var partyChances = getPartyChances(data);
  var partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    if (partyMatches[partyKey] < threshold) {
      delete partyMatches[partyKey];
    }
  })
  var partyScores = {};
  partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    partyScores[partyKey] = partyMatches[partyKey]*partyChances[partyKey];
    if (!partyScores[partyKey]) { delete partyScores[partyKey]}
  });
  // partyScores["conservative"] = 6;
  // partyScores["labour"] = 3;
  // partyScores["lib-dem"] = 8;
  // partyScores["ukip"] = 1;
  console.log(partyScores);
  partyKeys = Object.keys(partyScores);
  var max = 0,
      winningParty = {};
  partyKeys.forEach(function(partyKey) {
    if (partyScores[partyKey] >= max) {
      max = partyScores[partyKey];
      winningParty = {key: partyKey};
    }
  })
  winningParty = globalParties.filter(function(party) {
    return party.key == winningParty.key;
  })[0];
  if (!winningParty) {
    winningParty = globalParties[Math.floor(Math.random()*globalParties.length)];
  }
  console.log(winningParty);
  var finalResult = {
      // party:
  }
  var finalResult = {party: 'Lib Dems (test)'};
  var totalData = {data: data, finalResult: finalResult};
  return totalData;
}

APIService.prototype.getPartyMatches = function(data) {
  var partyMatchesByIssue = {},
      partyMatches = {};
  var disagreements = getDisagreements(data);
  globalParties.forEach(function(party) {
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
      partyMatches[partyKey] = 0;
      partyMatchesByIssue[partyKey].forEach(function(match) {
        partyMatches[partyKey] += match.value*match.weight;
      })
      partyMatches[partyKey] /= partyMatchesByIssue[partyKey].length;
      partyMatches[partyKey] = 1 - partyMatches[partyKey];
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
              weight: debate.weight
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
  globalParties.forEach(function(party) {
    partyKey = party.key;
    try {
      var ge2015MarginPercent = data.results["my-constituency"]["ge2015"].parties[partyKey].share;
      var partyBrexitStance = data.parties.opinions.issues["brexit"].debates["brexit-level"].parties[partyKey].opinion;
      var chanceFromGe2015MarginPercent = 0.5+Math.sign(ge2015MarginPercent)*(Math.pow(Math.abs(ge2015MarginPercent),(1/4)))/(2*Math.pow(100,(1/4))); // Quite crude, ranges from 0.5 to 100 for positive input (should range from below 0.5 to below 100)
      var chanceFromEuOpinions = 1-Math.abs(partyBrexitStance - (1+euRefLeavePercent/25))/4; //Works best when 100% of people voted
      partyChances[partyKey] = chanceFromGe2015MarginPercent * (0.5+0.5*chanceFromEuOpinions);
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

  // var url = 'https://sheetsu.com/apis/v1.0/0a046bfab11b/search?AmendedArea=' + areaName;
  // return http.get(url)
  // .then(function (res) {
  //   return res.body[0];
  // })
}

// APIService.prototype.loadEURefResults = function(areaName) {
//   var result = leavePercentages.filter(function (res) {
//     return res.area == areaName;
//   });
//   return result;
// }


function objectAsArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

var loadPostcodeData = APIService.prototype.loadPostcodeData;
var resultAlgorithm = APIService.prototype.resultAlgorithm;
var loadConstituency = APIService.prototype.loadConstituency;
var loadEURefResults = APIService.prototype.loadEURefResults;
var getDisagreements = APIService.prototype.getDisagreements;
var getPartyChances = APIService.prototype.getPartyChances;
var getPartyMatches = APIService.prototype.getPartyMatches;


var data = {
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


// getResults('SW9 6HP');
// console.log(resultAlgorithm(data));

module.exports = new APIService();
