var http = require('httpism')

function APIService() {

}

APIService.prototype.getResults = function(postcode, userData) {

  var data = {};

  return delay(500).then(function(){
    return loadPostcodeData(postcode)
    .then(function(results) {
      if (results.error) {
        return results;
      }
      data = results;
      var constituency = results.user.constituency
      data.user = userData || {};
      data.user.constituency = constituency;
      return resultAlgorithm(data);
    }).then(function(results) {
      return results;
    })
  })
}

APIService.prototype.getPostcodeOptions = function(postcode) {
  var data = { seats: []};

  return delay(500).then(function(){
    return getContenders(postcode)
    .then(function(results) {
      console.log('contenders')
      console.log(results)
      if (results.error) {
        return results;
      } else {
        console.log(results)
        data.seats.push(results);
        if (data.seats[0].parties.length > 1) {
          data.text = {
            heading: "Looks like your vote is worth a lot!",
            subheading: "You're in a contested seat, so more than one party is in with a chance"
          }
        } else {
          data.text = {
            heading: "Looks like there's not much choice!",
            subheading: "You're in a safe seat, so it's unlikely the sitting MP will be booted out."
          }
        }
        console.log(data);
        return data;
      }
    });
  })
}

APIService.prototype.comparePostcodes = function(postcode1, postcode2) {
  var data = { seats: []};

  return delay(500).then(function(){
    return getContenders(postcode1)
    .then(function(results) {
      if (results.error) {
        return results;
      }
      data.seats.push(results);
      return getContenders(postcode2)
    }).then(function(results) {
      if (results.error) {
        return results;
      }
      data.seats.push(results);
      if (data.seats[0].parties.length > 1 && data.seats[1].parties.length > 1) {
        data.numberOfSwingSeats = "2",
        data.text = {
          heading: "Looks like you're spoilt for choice!",
          subheading: "Both are contested seats"
        }
      } else if (data.seats[0].parties.length == 1 && data.seats[1].parties.length == 1) {
        data.numberOfSwingSeats = "0",
        data.text = {
          heading: "Looks like there's not much choice!",
          subheading: "Both are safe seats."
        }
      } else {
        data.numberOfSwingSeats = "1",
        data.text = {
          heading: "Looks like your vote is worth more in one place than the other!",
          subheading: "Only one of your constituencies is a contested seat."
        }
      }
      console.log(data)
      return data;
    })
  })
}

getContenders = function(postcode) {
  var user = {};
  return loadPostcodeData(postcode)
  .then(function(results) {
    if (results.error) {
      return results;
    } else {
      data = results;
      user = {constituency: results.user.constituency};
      return getPartyChances(data);
    }
  }).then(function(results) {
    if (results.error) {
      return results;
    } else {
      var threshold = 0.2;
      var partyKeys = Object.keys(results);
      var topPartyKeys = partyKeys.filter(function(partyKey) {
        return results[partyKey].chance > threshold;
      });
      var topParties = allParties.filter(function(party) {
        return topPartyKeys.indexOf(party.key) > -1;
      });

      return {
        location: user.constituency.name,
        parties: topParties
      };
    }
  });
}


APIService.prototype.loadPostcodeData = function(postcode) {

  var totalResults = {};
  var postcodeResults = {};

  return loadConstituency(postcode)
  .then(function(results) {
    console.log(results)
    if (results.error) {
      return results;
    } else {
      totalResults.user = {
        constituency : {
          name: results.constituency.name,
          id: results.constituency.codes.gss
        }
      };
      postcodeResults = results;
      var refAreaName = results.refArea.name;
      refAreaName = refAreaName.substring(0, refAreaName.length - 5);
      return loadEURefResults(refAreaName);
    }
  })
  .then(function(results) {
    console.log(results);
    if (results.error) {
      return results;
    } else {
      createObjectProps(totalResults, ['results','my-constituency','euRef2016','choices','leave']);
      totalResults.results["my-constituency"]["euRef2016"].choices["leave"].share = results[0].pctLeave;
      return loadGe2015Results(postcodeResults.constituency.codes.gss)
    }
  })
  .then(function(results) {
    if (results.error) {
      return results;
    } else {
      totalResults.results["my-constituency"]["ge2015"] = results["ge2015"];
      return loadPartyStances();
    }
  }).then(function(results) {
    if (results.error) {
      return results;
    } else {
      totalResults.parties = results;
      return totalResults;
    }
  })
}

APIService.prototype.resultAlgorithm = function(data) {
  var threshold = 0.7;
  var partyMatches = getPartyMatches(data);
  console.log('Party Matches:', partyMatches);
  var partyChances = getPartyChances(data);
  console.log('Party Chances:', partyChances);
  var partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    if (partyMatches[partyKey].match < threshold) {
      delete partyMatches[partyKey];
    }
  })
  var partyScores = {};
  finalPartiesList = [];
  partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    try {
      partyScores[partyKey] = (partyMatches[partyKey].match*2+partyChances[partyKey].chance)/3;
    } catch(e) {
      partyScores[partyKey] = 0;
      console.log("Just set the score for " + partyKey + " to 0")
    }
    if (!partyScores[partyKey]) {
      delete partyScores[partyKey];
    } else {
      var party = allParties.filter(function(p) {return p.key == partyKey})[0];
      party.score = partyScores[partyKey];
      party.matches = {
        plus: partyMatches[partyKey].matches.filter(function(match) {
          return match.agreement > 0.5;
        })
      }
      party.chances = {
        plus: partyChances[partyKey].chances.filter(function(match) {
          return match.chance > 0.5;
        })
      }
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
  var agreements = getAgreements(data);
  allParties.forEach(function(party) {
    var partyKey = party.key;
    partyMatchesByIssue[partyKey] = [];
    try {
      var issueKeys = Object.keys(agreements[partyKey]);
      issueKeys.forEach(function(issueKey) {
        var debateKeys = Object.keys(agreements[partyKey][issueKey]);
        debateKeys.forEach(function(debateKey) {
          partyMatchesByIssue[partyKey].push(agreements[partyKey][issueKey][debateKey])
        });
      });
      partyMatches[partyKey] = { matches: partyMatchesByIssue[partyKey], match: 0 };
      partyMatchesByIssue[partyKey].forEach(function(match) {
        partyMatches[partyKey].match += match.agreement*match.weight;
      })
      partyMatches[partyKey].match /= partyMatchesByIssue[partyKey].length;
    } catch(e) {

    }
  });
  return partyMatches;
}

APIService.prototype.getAgreements = function(data) {
  var agreementMatrix = {};

  var issues = data.user.opinions.issues;
  var issueKeys = Object.keys(issues);
  issueKeys.forEach(function(issueKey) {
    var issue = issues[issueKey];
    try {
      var debates = issue.debates;
      var debateKeys = Object.keys(debates);
      debateKeys.forEach(function(debateKey) {
        var debate = debates[debateKey];
        try {
          var allPartiesDebate = data.parties.opinions.issues[issueKey].debates[debateKey];
          var partyKeys = Object.keys(allPartiesDebate.parties);
          partyKeys.forEach(function(partyKey) {
            createObjectProps(agreementMatrix, [partyKey, issueKey])
            agreementMatrix[partyKey][issueKey][debateKey] = {
              agreement: 1 - Math.abs(debate.opinion - allPartiesDebate.parties[partyKey].opinion),
              partyOpinion: allPartiesDebate.parties[partyKey].opinion,
              userOpinion: debate.opinion,
              weight: debate.weight || 1,
              description: allPartiesDebate.parties[partyKey].description || ("You both agree on " + allPartiesDebate.description)
            }
          })
        } catch (e) {

        }
      })
    } catch(e) {

    }
  })
  return agreementMatrix;
}

APIService.prototype.getPartyChances = function(data) {
  var partyChances = {};
  var euRefLeavePercent = data.results["my-constituency"]["euRef2016"].choices["leave"].share;

  var currentParty = {}
  currentParty = allParties.filter(function(party) {
    var partyResult = data.results["my-constituency"]["ge2015"].parties[party.key];
    return partyResult ? partyResult.rank == 1 : false;
  })[0];
  currentParty.name = allParties.filter(function(party) {
    return party.key == currentParty.key
  })[0].name;

  allParties.forEach(function(party) {
    partyKey = party.key;
    try {
      var ge2015MarginPercent = data.results["my-constituency"]["ge2015"].parties[partyKey].shareMargin;
      var partyBrexitStance = data.parties.opinions.issues["brexit"].debates["brexit-1"].parties[partyKey].opinion;
      var chanceFromGe2015MarginPercent = ge2015MarginPercent ? 0.5+(Math.sign(ge2015MarginPercent))*(Math.pow(Math.abs(ge2015MarginPercent),(1/4)))/(2*Math.pow(100,(1/4))) : 0; // Quite crude, ranges from 0.5 to 100 for positive input (should range from below 0.5 to below 100)
      var chanceFromEuOpinions = 1-Math.abs(partyBrexitStance - (1+euRefLeavePercent/25))/4; //Works best when 100% of people voted
      var totalChance = (3*chanceFromGe2015MarginPercent + chanceFromEuOpinions)/4;
      partyChances[partyKey] = {
        chance: totalChance
      }

      partyChances[partyKey].chances = [];
      partyChances[partyKey].chances.push({
        description: "This is a " + currentParty.name + " seat",
        chance: (currentParty.key == partyKey)
      });
      if (currentParty.key != partyKey) {
        partyRank = data.results["my-constituency"]["ge2015"].parties[partyKey].rank;
        partyChances[partyKey].chances.push({
          description: party.name + " came #" + partyRank + " in the 2015 general election",
          chance: (partyRank <= 3)
        })
      }



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
    console.log(res)
    var constituency = objectAsArray(res.body.areas).filter(function (data) {
      return data.type == 'WMC'
    });
    var refArea = objectAsArray(res.body.areas).filter(function (data) {
      return (data.type == 'OLF' || data.type == 'UTA')
    });
    return {constituency: constituency[0], refArea: refArea[0], all: res.body.areas}
  }, function (error) {
    return {error: true};
  })
};

APIService.prototype.loadEURefResults = function(areaName) {
  var results = leavePercentages.filter(function (res) {
    return res.area == areaName;
  });
  if (results.length==0) {
    var results = leavePercentages.filter(function (res) {
      return res.area.indexOf(areaName) > -1;
    });
  }
  if (results.length==0) {
    var results = leavePercentages.filter(function (res) {
      return res.area.indexOf(areaName.split(" ")[0]);
    });
  }
  return results;
}

APIService.prototype.loadGe2015Results = function(areaKey) {
  var result = {"ge2015": {parties:{}}};
  var resultsTemp = ge2015Results[areaKey];
  resultsTemp.forEach(function(party) {
    var partyKey = party.party;
    result["ge2015"].parties[partyKey] = party;
  })
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
var comparePostcodes = APIService.prototype.comparePostcodes;
var loadPostcodeData = APIService.prototype.loadPostcodeData;
var resultAlgorithm = APIService.prototype.resultAlgorithm;
var getAgreements = APIService.prototype.getAgreements;
var getPartyChances = APIService.prototype.getPartyChances;
var getPartyMatches = APIService.prototype.getPartyMatches;
var loadConstituency = APIService.prototype.loadConstituency;
var loadEURefResults = APIService.prototype.loadEURefResults;
var loadPartyStances = APIService.prototype.loadPartyStances;
var loadGe2015Results = APIService.prototype.loadGe2015Results;


// igor: a simulation of delay for http requests :)

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t)
  });
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


// getResults('SW96HP', { opinions: { issues: { brexit: { debates: { "brexit-1": { opinion: 1 } } } } } } );
// console.log(resultAlgorithm(dummyData));

module.exports = new APIService();
