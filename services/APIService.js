var http = require('httpism')

function APIService() {

}

var globalParties = [
  "conservative",
  "labour",
  "lib-dem",
  "ukip",
  "snp",
  "green",
  "plaid-cymru"
];

APIService.prototype.getResults = function(postcode, userData) {

  var data = {};

  return loadPostcodeData(postcode)
  .then(function(results) {
    data = results;
    data.user = userData;
    return resultAlgorithm(results);
  });
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
  })
}

APIService.prototype.resultAlgorithm = function(data) {
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
  })
  // return partyScores;
  data.finalResult = {party: 'Lib Dems (test)'};
  return data;
}

APIService.prototype.getPartyMatches = function(data) {
  var partyMatchesByIssue = {},
      partyMatches = {};
  var disagreements = getDisagreements(data);
  globalParties.forEach(function(party) {
    partyMatchesByIssue[party] = [];
    try {
      var issueKeys = Object.keys(disagreements);
      issueKeys.forEach(function(issueKey) {
        var debateKeys = Object.keys(disagreements[issueKey]);
        debateKeys.forEach(function(debateKey) {
          partyMatchesByIssue[party].push(disagreements[issueKey][debateKey][party])
        });
      });
      partyMatches[party] = 0;
      partyMatchesByIssue[party].forEach(function(match) {
        partyMatches[party] += match.value*match.weight;
      })
      partyMatches[party] /= partyMatchesByIssue[party].length;
      partyMatches[party] = 1 - partyMatches[party];
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
    try {
      var ge2015MarginPercent = data.results["my-constituency"]["ge2015"].parties[party].share;
      var partyBrexitStance = data.parties.opinions.issues["brexit"].debates["brexit-level"].parties[party].opinion;
      var chanceFromGe2015MarginPercent = 0.5+Math.sign(ge2015MarginPercent)*(Math.pow(Math.abs(ge2015MarginPercent),(1/4)))/(2*Math.pow(100,(1/4))); // Quite crude, ranges from 0.5 to 100 for positive input (should range from below 0.5 to below 100)
      var chanceFromEuOpinions = 1-Math.abs(partyBrexitStance - (1+euRefLeavePercent/25))/4; //Works best when 100% of people voted
      partyChances[party] = chanceFromGe2015MarginPercent * (0.5+0.5*chanceFromEuOpinions);
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


loadPostcodeData('SW9 6HP');
// console.log(resultAlgorithm(data));

module.exports = new APIService();
