/* Generating party stances */

// The version for partyStances.js
/*module.exports = function(model,partyStances){
  return function(){
    var issueKeys = Object.keys(partyStances.opinions.issues);
    issueKeys.forEach(function(issueKey, i) {
      var debateKeys = Object.keys(partyStances.opinions.issues[issueKey].debates);
      debateKeys.forEach(function(debateKey, j) {
        model.questions[debateKey] = {
          question: partyStances.opinions.issues[issueKey].debates[debateKey].question,
          issue: {
            key: issueKey,
            description: partyStances.opinions.issues[issueKey].description,
            index: i
          },
          debate: {
            key: debateKey,
            description: partyStances.opinions.issues[issueKey].debates[debateKey].description,
            index: j
          },
          tasks: [
            "question-disagree",
            "question-neutral",
            "question-agree"
          ]
        }
      })
    })
  }
}*/

// the version for partyStances2.js
const translateButtonNameIntoOpinion = function(buttonName){
  var opinion = buttonName.replace(/^button/,"");
  if(opinion.match(/^0/)&&opinion!=="0"){
    opinion = opinion.replace(/^0/,"0.");
  }
  return opinion;
}
module.exports = function(model,partyStances){
  return function(){
    var issueKeys = Object.keys(partyStances.opinions.issues);
    issueKeys.forEach(function(issueKey, i) {
      var debateKeys = Object.keys(partyStances.opinions.issues[issueKey].debates);
      debateKeys.forEach(function(debateKey, j) {
        const tasks = [];
        const buttonKeys = Object.keys(partyStances.opinions.issues[issueKey].debates[debateKey].buttons);
        buttonKeys.forEach(function(buttonKey){
          const taskName = 'answer-'+issueKey+'-'+debateKey+'-'+buttonKey;
          model.tasks[taskName]={
            label: partyStances.opinions.issues[issueKey].debates[debateKey].buttons[buttonKey].opinion,
            goto: {
              type: 'step',
              name: 'question',
              opinion: translateButtonNameIntoOpinion(buttonKey)
            }
          };
          tasks.push(taskName);
        })
        model.questions[debateKey] = {
          question: partyStances.opinions.issues[issueKey].debates[debateKey].question,
          issue: {
            key: issueKey,
            description: partyStances.opinions.issues[issueKey].description,
            index: i
          },
          debate: {
            key: debateKey,
            description: partyStances.opinions.issues[issueKey].debates[debateKey].description,
            index: j
          },
          tasks: tasks
        }
      })
    })
  }
}
