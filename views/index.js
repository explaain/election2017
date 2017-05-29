/* Master view file */

/* Including dependencies */
const
  hyperdom = require('hyperdom'),
  h = hyperdom.html,
  router = require('hyperdom-router'),
  windowEvents = require('hyperdom/windowEvents'),
  api = require('../services/APIService'),
  http = require('httpism'),
  q = require('q'),
  model = require('../models/model'),
  CardTemplates = {},
  helpers = new (require("../includes/helpers"))(model,h,CardTemplates,http, router),
  dataProcessor = new (require("../includes/dataprocessor"))(),
  designers = new (require("../includes/designers"))(),
  trackEvent = require("../includes/event-tracker"),
  eventTrackerInitiator = require("../includes/event-tracker-initiator")(trackEvent),
  allData = require('../public/data/allData')
;
var cfg = {
  'ge2017': {
    subdomain: false,
    logoImg: "/img/ge2017logobeta.png",
    logoClass: "ge2017-logo",
    footerImg: "/img/turnup.png",
    footerClass: "turnupFooter",
    randomise: true,
    numbering: true,
    quizQuestions: allData.getAllData().quizQuestions
  },
  '38degrees': {
    subdomain: '38degrees',
    logoImg: "img/38degrees_ge2017.png",
    logoClass: "_38degrees-logo",
    footerImg: "/img/ge2017logobeta.png",
    footerClass: "ge2017Footer",
    randomise: true,
    numbering: true,
    insertYesNo: true,
    quizQuestions: allData.getAllData().quizQuestions38Degrees
  },
  'unilad': {
    subdomain: 'unilad',
    logoImg: "img/unilad.png",
    logoClass: "_unilad-logo",
    randomise: true
  }
}
// Get all the defined properties
var props = new Set();
Object.keys(cfg).forEach((site) => {
  for(k in cfg[site]) { props.add(k) }
});
// Patch each brand object with default 'ge2017' data
Object.keys(cfg).forEach((site) => {
  props.forEach((k) => {
    console.log(site,k,cfg[site][k]);
    cfg[site][k] = typeof cfg[site][k] != 'undefined' ? cfg[site][k] : cfg.ge2017[k];
  })
});
const config = cfg;
console.log("Site configuration",config);

trackEvent("Landed",{page: location.pathname});

// Describing different routes of app
// warn. at the moment /dashboards and /steps are redirected to "/" in index.ejs
//   by express routing - this was made to avoid 404 errors on page refresh
const routes = {
  root: router.route('/'),
  phrase: router.route('/phrase/:name'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name'),
  students: router.route('/students'), //'student' too?
  quizLanding: router.route('/shared/:party/:percentage'),
  quizNew: router.route('/quiz'),
  quiz: router.route('/quiz/questions'),
  quizResults: router.route('/results'),
  policy: router.route('/policy')
};

router.start();

Model = model;
Routes = routes;

class App {
  constructor(data) {
    console.log("! Site running on "+SiteBrand);

    var logoRoute;
    if (QuizPage==true){
      logoRoute = routes.quiz();
      console.log('logoRoute1');
    } else if (Standalone==true) {
      logoRoute = routes.students();
    } else {
      logoRoute = routes.root();
    }
    this.header = new Header(logoRoute);
    this.footer = new Footer();
    this.phraseSample = 0;
    this.choosingPhrases = false;
    this.phraseRotationTimeout;
  }

  render() {

    const self = this;

    if (Embed) {

      var params = {
        name: StepName
      }
      var step = new Step(params);
      return h('div',step);

    } else {

      return h('div.body' + (SiteBrand ? '._' + SiteBrand : '') + (Standalone==true ? '.standalone' : '') + (QuizPage==true ? '.quiz' : ''),
        h('div.main',
          h('div.top-strip'),

          this.header,

          h('div.page-content',

            routes.root(function () {
              // var phrase = new Phrase({phrase: 'home'});
              // return h("div", phrase)
              // var dashboard = new Dashboard({dashboard: 'home'});
              // return h("div", dashboard)
              model.selectedPhrases = ["iWantTo"];
              /* todo: yet another hack, fix it later :( */
              self.choosingPhrases = false;
              window.setTimeout(function(){
                // routes.phrase({name: 'iWantTo'}).push();
              },10)
            }),

            routes.dashboard(function (params) {
              var dashboard = new Dashboard({dashboard: params.name});
              return h("div", dashboard)
            }),

            routes.phrase(function (params) {
              // $('.phrase').removeClass('popup');
              // setTimeout(function() {
              //   $('.phrase').addClass('popup');
              // },1);

              if (params.name == "iWantTo") {
                model.selectedPhrases = [{key: "iWantTo"}];
              }
              var hPhrases = model.selectedPhrases.map(function(phrase) {
                return h('div.phrase.popup', model.myPhrases[phrase.key] ? model.myPhrases[phrase.key].text : phrase.key);
              })

              var phraseSamples = [
                h('div.phrases', h('div.phrase.popup.phraseBold.phraseHighlight', 'decide'), h('div.phrase.popup.phraseBold', 'who to vote for'), h('div.phrase.popup', 'in'), h('div.phrase.popup.phraseBold', 'E2 7DG') ),
                h('div.phrases', h('div.phrase.popup.phraseBold.phraseHighlight', 'learn'), h('div.phrase.popup', 'how to'), h('div.phrase.popup.phraseBold', 'register to vote') ),
                h('div.phrases', h('div.phrase.popup.phraseBold.phraseHighlight', 'find out'), h('div.phrase.popup', 'who my'), h('div.phrase.popup.phraseBold', 'local candidates'), h('div.phrase.popup', 'are in'), h('div.phrase.popup.phraseBold', 'SW1A 0AA') ),
                h('div.phrases', h('div.phrase.popup.phraseBold.phraseHighlight', 'vote against'), h('div.phrase.popup', 'a'), h('div.phrase.popup.phraseBold', 'Hard Brexit'), h('div.phrase.popup', 'in'), h('div.phrase.popup.phraseBold', 'SW1A 0AA') ),
              ];

              if (hPhrases.length == 1) {
                if (self.phraseSample % 1 === 0) {
                  hPhrases[1] = h('div.phraseSamples', phraseSamples[self.phraseSample]);
                } else {
                  hPhrases[1] = h('div.phraseSamples');
                }
              }

              if (self.choosingPhrases) {
                setTimeout(function() {
                  $('div.phrase-buttons').css('display','block');
                }, 1)
              } else {
                if(self.phraseRotationTimeout){
                  clearTimeout(self.phraseRotationTimeout)
                }
                self.phraseRotationTimeout = setTimeout(function() {
                  self.phraseSample = ((self.phraseSample+0.5) == phraseSamples.length) ? 0 : self.phraseSample+0.5;
                  self.refresh();
                },(0.5 - (self.phraseSample % 1))*7000 * (self.choosingPhrases ? 3 : 1));
              }


              var currentPhrase = new PhraseSelect({phrase: params.name, next: params.next});
              var goto = model.myPhrases[params.name].goto;

              var submitData = function(e) {
                var goto = dataProcessor.processSentenceData(model, helpers);
                console.log('goto');
                console.log(goto);
                routes[goto.route](goto).push();
              }

              var quizButtonClick = function(e) {
                console.log(123);
                model.selectedPhrases.push({key: 'allIssues'});
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
                routes.step({
                  type: 'step',
                  route: 'step',
                  name: 'question',
                  final: 'quiz-priority',
                  next: 'postcode',
                  task: 'issue-$apply'}).push();
                // submitData(e);
              }

              function beginPhraseChoosing() {
                if (!self.choosingPhrases) {
                  self.choosingPhrases = true;
                  $('div.body-content').removeClass('hoverClick');
                  $('div.phraseSamples').addClass('choosingPhrases');
                  $('div.body-content div.help').addClass('choosingPhrases');
                  self.refresh();
                }
              }

              var goButton = goto ? h('button.popup',{class: 'btn btn-success', onclick: submitData }, 'Let\'s go!') : '';
              var quizButton = h('button.btn.btn-default', {onclick: quizButtonClick}, 'Or go straight to a 10-question quiz');
              var phraseDom = h("div.content.text-center.single-sentence", h("div.body-content.hoverClick", {onclick: beginPhraseChoosing}, hPhrases, currentPhrase, goButton, h('div.help', h('i.fa.fa-hand-pointer-o', {style: 'margin-right:0.2em;'}), 'Tap here to begin') ), h('section.divider', h('div', {class: 'quiz-btn-container'}, quizButton)));
              return h('section.step.single-sentence', h("h1", "What can we help you with?"), h('div.cards.sentence', new Card({},function(){}, phraseDom) ) );
            }),

            routes.step(function (params) {
              var step = new Step(params);
              return h('div',step);
            }),

            routes.students(function (params) {
              var params = {
                name: StepName
              }
              var step = new Step(params);
              return h('div',step);
            }),

            routes.policy(function (params) {
              var params = {
                name: StepName
              }
              var step = new Step(params);
              return h('div',step);
            }),

            routes.quizLanding(landingPage), // from fb

            routes.quizNew(landingPage), // organic

            routes.quiz(function (params) {
              var params = {
                name: 'quiz'
              }
              var step = new Step(params);
              return h('div',step);
            }),

            routes.quizResults(function (params) {
              return h('div', new Step({name: 'quizResults', label: 'quizResults'}));
            })

          ),

          this.footer
        )
      )
    }
  }
}
var landed = 0
function landingPage(params) {
  if(landed == 0) {
    var params = {
      name: 'quizLanding'
    }
    var step = new Step(params);
    return h('div',step);
  }
  landed++;
}

class Header {
  constructor(logoRoute) {
    this.logoRoute = logoRoute;
  }
  render() {
    const self = this;

    return h("header",
      routes.root().a({"class": "home " + routes.root(function(){return "fade-hidden"})},
        h("i.fa.fa-arrow-left"),
        " Home"
      ), self.logoRoute.a(
        h("img." + config[SiteBrand].logoClass, {"src": config[SiteBrand].logoImg})
      ),
      (new Progress())
    )
  }
}


class Footer {
  render() {
    eventTrackerInitiator();
    var footerContents = h("a.discard-card-style",
      {
        "href": "http://api.explaain.com/Detail/5911ba3cac223e0011e45faf"
      },
      h("button.btn.btn-default",
        "Who's behind this?"
      )
    );

    var quizFooterContents = h("div",
      h("a." + config[SiteBrand].footerClass,
        {
          "href": "http://www.turnup.org.uk/",
          "target": "_blank",
        },
        h("img",
          {
            "src": config[SiteBrand].footerImg
          }
        )
      )
    );

    routes.quiz(function (params) {
      console.log('quiz');
      footerContents = quizFooterContents
    });
    routes.quizNew(function (params) {
      console.log('quizNew');
      footerContents = quizFooterContents
    });
    routes.quizLanding(function (params) {
      console.log('quizLanding');
      footerContents = quizFooterContents
    });
    routes.quizResults(function (params) {
      console.log('quizResults');
      footerContents = quizFooterContents
    });

    return h("footer",
      footerContents
    )
  }
}

class Progress {
  render() {
    const self = this;

    if(!model.showProgressBar) return null;

    model.progressBarCurrent = 0;
    model.progressBarTotal = 2;
    var quizFlow = [];
    model.user.quizFlow.forEach(function(quiz){
      quizFlow = quizFlow.concat(quiz);
    });
    if(quizFlow.length>0){
      model.progressBarTotal += quizFlow.length;
      var progress_quiz = 0;
      if(model.landedOnPostcode||model.landedOnResult){
        progress_quiz=quizFlow.length;
      } else {
        progress_quiz=quizFlow.indexOf(model.question)!==-1?quizFlow.indexOf(model.question)+1:0;
      }
      model.progressBarCurrent += progress_quiz;
    }
    model.progressBarCurrent+=model.landedOnPostcode;
    model.progressBarCurrent+=model.landedOnResult;
    model.progressBarCurrent+=model.landedOnQuizPriority;
    if(model.landedOnQuizPriority)
      model.progressBarTotal++;
    // todo: why does it lead you to postdode-compare?
    // Answer (from Jeremy) - currently it's just a shortcut so we can demo it to people without having a button on the dashboard!
    return routes.step({
      name: 'postcode-compare',
      type: 'step',
      next: 'result'}).a(
      h(".progress",
        h(".progress-inner",{style: {width: ((model.progressBarCurrent/model.progressBarTotal)*100)+"%"}})
      )
    )
  }
}

class PhraseSelect {

  constructor(params) {
    this.params = params;
    this.phrase = model.myPhrases[params.phrase] || { text: "something", options: [] }
    model.showProgressBar = false;
  }

  onload() {
    $('div.body').removeClass('backColor');
  }

  render() {
    const self = this;
    var phraseDOM = [];

    if (self.params.next) {
      routes.phrase({ name: self.params.next }).push();
      self.refresh();
    }

    if (this.phrase.optionList || (this.phrase.options && Object.keys(this.phrase.options).length)) {
      const phrase = this.phrase;
      if (phrase.optionList && phrase.optionList.constructor === Array) {
        var optionListsJoined = [];
        phrase.optionList.forEach(function(list) {
          optionListsJoined = optionListsJoined.concat(model.phraseOptionLists[list]);
        })
      }
      const optionKeys = optionListsJoined || model.phraseOptionLists[phrase.optionList] || phrase.options;
      const options = optionKeys.map(function(optKey){
        const value = {
          key: optKey,
          phrase: model.myPhrases[optKey]
        };
        return h('button.btn.btn-default.phrase-button.popup.highlightButton', {
          value: JSON.stringify(value),
          onclick: function(e) {
            submitPhrase(e.target.value)
          }
        }, value.phrase.text );
      });
      //Is this the correct structure?
      var defaultPhrase = phrase.defaultPhrase || { text: '' };

      const select = h('div.phrase-buttons', {
      }, options);

      phraseDOM.push(select)
    } else if (this.phrase.input) {
      const inputForm = h('form',
        {
          onsubmit: function(e) {
            e.preventDefault();
            submitPhrase(JSON.stringify({
              key: "finish",
              text: e.target.children[0].value,
              phrase: {
                dataUpdates: [],
              }
            }));
          },
          class: 'form phrase-form'
        },
        h('input', { class: 'form-control phrase-input', placeholder: "Posctode" }),
        h('button', { class: 'btn btn-primary', type: 'submit' }, 'Add')
      );
      phraseDOM.push(inputForm)
    } else {
      // phraseDOM.push(h("p", "No options to display"))
    }

    function submitPhrase(eventValue) {
      const value = JSON.parse(eventValue)
      $('.phrase-button').removeClass('popup');
      setTimeout(function() {
        $('.phrase-button').addClass('popup');
      },1);
      if (value.dataUpdates) {
        helpers.updateData([value.dataUpdates]);
      }
      if(value.goto) {
        routes[value.goto.type](value.goto).push()
      } else {
        if (value.text) {
          model.selectedPhrases[model.selectedPhrases.length-1].data = value.text;
          model.selectedPhrases.push({key: value.text});
        }
        model.selectedPhrases.push(value);
        if (self.phrase.next) {
          model.selectedPhrases.push({key: self.phrase.next});
        }
        else if (value.phrase.finish) {
          model.selectedPhrases.push({key: 'finish'});
        }
        routes.phrase( {name: value.phrase.finish ? 'finish' : self.phrase.next || self.phrase.next || value.key } ).push();
      }
    }

    return h("div.phrase",
      // h("h1", this.phrase.title),
      // h("h2", this.phrase.subtitle),
      // h("section.text",
        phraseDOM
      // )
    )
  }



}
//
// class Phrase {
//
//   constructor(params) {
//     this.phrase = model.phrases[params.phrase] || { title: "This is a phrase", text: "I should buy ${thing}", options: { thing: { boat: "a boat", cat: "a cat" } } }
//     model.showProgressBar = false;
//   }
//
//   onload() {
//     $('div.body').removeClass('backColor');
//   }
//
//   render() {
//     var phraseDOM = [];
//
//     if (!Object.keys(this.phrase.options).length) {
//       phraseDOM.push(h("p", "No options to display"))
//     } else {
//       const phrase = this.phrase
//       const replacements = Object.keys(phrase.options)
//         .map(function(opt) {
//           const optionSet = phrase.options[opt]
//           const options = Object.keys(optionSet).map(function(optName){
//             const value = phrase.options[opt][optName]
//             return h('option', {
//               value: JSON.stringify(value),
//             }, optName );
//           })
//           options.unshift(h('option', {
//             value: null,
//           }, '' ))
//
//           const select = h('select', {
//             onchange: function(e){
//               const value = JSON.parse(e.target.value)
//               if(value.goto){
//                 routes[value.goto.type](value.goto).push()
//               } else {
//                  helpers.updateData(value.dataUpdates);
//               }
//             }
//           }, options)
//
//           return {
//             replace: '${'+opt+'}',
//             with: select
//           }
//         })
//
//       this.phrase.text.split(' ')
//         .map(function(repl) {
//           var match
//           replacements.forEach(function(replacement){
//             if (repl === replacement.replace) {
//               match = replacement.with
//             }
//           })
//
//           return match || repl+' '
//         })
//         .forEach(function(wordOrOption) {
//           phraseDOM.push(wordOrOption)
//         })
//     }
//
//     return h("span.phrase",
//       // h("h1", this.phrase.title),
//       // h("h2", this.phrase.subtitle),
//       // h("section.text",
//         phraseDOM
//       // )
//     )
//   }
//
//
//
// }

class Dashboard {

  constructor(params) {
    this.dashboard = model.dashboards[params.dashboard] || { title: "Goodness me, you're early! 😳", subtitle: "This feature is coming soon...! 👻", tasks: []};
    model.showProgressBar = false;
    if(params.dashboard === 'home') {
      model.progressBarCurrent = 0;
      model.progressBarTotal = 2;
      model.landedOnPostcode = 0;
      model.landedOnResult = 0;
      model.landedOnQuizPriority = 0;
      model.user.quizFlow = [];
    }
  }

  onload() {
    $('div.body').removeClass('backColor');
   }

  render() {

    var tasksDOM = [h("p.task-category", "🔥Popular")];

    if (!this.dashboard.tasks.length) {
      tasksDOM.push(h("p", "No tasks to display"))
    }

    this.dashboard.tasks.forEach(function(name) {
      var task = model.tasks[name];
      // igor: now tasks become hidden/shown basing
      // on tasks conditions and model values
      var conditionsMet = true;
      if(task.conditions){
        conditionsMet = false;
        task.conditions.forEach(function(path){
          if(helpers.getModel(path)){
            conditionsMet = true;
          }
        })
      }
      const taskProps = {
        "class":
          "task"+
          (conditionsMet?" conditionsMet":"")+
          (task.subtype?" "+task.subtype:"")
        ,
        "style":{"background-color": task.color}
      };
      const taskContent = [
        h('i.fa.fa-'+task.icon,{attributes: {"aria-hidden":true}}),
        h('h5', task.label)
      ]
      if(task.goto){
        tasksDOM.push(
          routes[task.goto.type](
            { name: task.goto.name, task: name, next: task.goto.next }
          ).a(
            taskProps,
            taskContent
          )
        );
      } else {
        taskProps.onclick = function(e){
          helpers.updateData(task.dataUpdates);
        };
        tasksDOM.push(
          h( "a",
            taskProps,
            taskContent
          )
        );
      }

    });

    return h("section.dashboard",
      h("h1", this.dashboard.title),
      h("h2", this.dashboard.subtitle),
      h("section.tasks", tasksDOM)
    )
  }
}

class Step {
  constructor(params) {
    const self = this;
    this.step = model.steps[params.name];
    this.error = model.user.error;
    this.params = params;

    if (params.task && model.tasks[params.task].dataUpdates)
      helpers.updateData(model.tasks[params.task].dataUpdates);

    const data = {
      cardGroups: []
    };

    switch (params.name) {
      case 'quizLanding':
        break;

      case 'quiz':
        break;

      case 'postcode':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        model.showProgressBar = true;
        data.cardGroups.push([{
          type: 'postcode',
          name: 'Please enter your postcode:',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'quiz-priority':
        // model.landedOnQuizPriority = 1; // todo: temporary, refactor
        // model.showProgressBar = true;
        //
        // var currentTopics = [];
        // model.user.quizFlow.forEach(function(flow){
        //   flow.forEach(function(issueName){
        //     currentTopics.push(issueName.split('-')[0]);
        //   });
        // });
        //
        // var quizTopicsLower = [], quizTopicsHigher = [];
        // Object.keys(model.user.opinions.issues).forEach(function(issueName){
        //   let issue = model.tasks['issue-' + issueName];
        //   if(~model.featuredTopics.indexOf(issueName)){
        //     issue.highPriority = true;
        //     quizTopicsHigher.push(issue);
        //   }
        //   else{
        //     issue.highPriority = false;
        //     quizTopicsLower.push(issue);
        //   }
        //   issue.isNewClass = ~currentTopics.indexOf(issueName) ? 'new' : '';
        //   issue._key = issueName;
        // });
        //
        // data.cardGroups.push([{
        //   type: 'quiz-priority',
        //   name: 'Please select priority:',
        //   description: 'Please select priority 👌',
        //   quizTopicsLower: quizTopicsLower,
        //   quizTopicsHigher: quizTopicsHigher
        // }], [{
        //   type: "goto-postcode-button",
        //   heading: "Next!",
        //   buttonText: "Next"
        // }])
        break;

      case 'vote-worth':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'vote-worth',
          name: 'Want to see how much your vote is worth?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'postcode-compare':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode-compare',
          name: 'Student? Unsure where to vote from? <img src="/img/thinking.png">',
          subtitle: 'Compare your two postcodes to see [where your vote counts most](http://api.explaain.com/Detail/5911ce5cac223e0011e45fb1).',
          subheading: 'Why do we need this?',
          description: 'We need your postcode to [show data](http://api.explaain.com/Detail/5911c1b2ac223e0011e45fb0) relating to your [constituency](http://api.explaain.com/Detail/588cdf6d29d97f1200703d3c) 👌'
        }])
        break;

      case 'local-candidates-test':
        model.landedOnResult = 1;
        model.user.postcode = 'N79GS';
        getResults('localCandidates').then(function(){
          routes.step({ name: 'result', type: 'result' }).push();
        });
        return;
        break;

      case 'result':
        model.landedOnResult = 1; // todo: temporary, refactor
        model.showProgressBar = false;
        var resultCards = model.user.results[model.user.results.length-1] ? model.user.results[model.user.results.length-1] : [[{name: 'hi', description: 'yo'}]];
        resultCards.forEach(function(cards){
          data.cardGroups.push(cards);
        });
        break;

      case 'partyStories':
        data.cardGroups.push(allData.getAllData().partyStories)
        break;

      case 'sampleStory':
        data.cardGroups.push(self.step.cardUrls)
        break;

      case 'voteInPersonStory':
        data.cardGroups.push(self.step.cardUrls)
        break;

      case 'proxyVotingStory':
        data.cardGroups.push(self.step.cardUrls)
        break;

      case 'pointOfVotingStory':
        data.cardGroups.push(self.step.cardUrls)
        break;


      case 'question':
        model.showProgressBar = true;
        var quizFlow = [];
        model.user.quizFlow.forEach(function(quiz){
          quizFlow = quizFlow.concat(quiz);
        })
        const questionName = params.nextQuestion?params.nextQuestion:quizFlow[0];
        model.question = questionName;
        const question = model.questions[questionName];
        var nextQuestion;
        if(quizFlow.indexOf(questionName)<quizFlow.length-1){
          nextQuestion = quizFlow[quizFlow.indexOf(questionName)+1];
        } else {
          nextQuestion = null;
        }
        var finalStep;
        if(model.tasks[params.task].goto.final){
          finalStep = model.tasks[params.task].goto.final;
        } else {
          finalStep = params.final;
        }
        data.cardGroups.push([{
          name: question.issue.description + " - Question " + (question.debate.index+1),
          description: question.question,
          tasks: question.tasks,
          nextQuestion: nextQuestion,
          final: finalStep,
          issueKey: question.issue.key,
          debateKey: question.debate.key
        }])
        break;
      case 'policy':
        data.cardGroups.push([{
          type: 'policy'
        }])
        break;

      default:
        data.cardGroups.push([{
          name: "Goodness me, you're early! 😳",
          description: "This feature is coming soon...! 👻"
        }])

    }
    this.cardGroups = data.cardGroups.map(function(cards){
      cards.forEach(function(card, i) {
        if (typeof card !== 'string') {
          if(!cards[i].nextStep){
            cards[i].nextStep = params.next;
          }
          cards[i].type = cards[i].type || params.name;
        }
      });
      if (cards.constructor !== Array || cards.length == 1) {
        return ([new Card(cards[0], null, null, self.params.resultsType)]);
      } else {
        return (new CardGroup({cards:cards,nextStep:params.next, stepParams: self.step}, self.resultsType));
      }
    })

    this.headers = [];
    if(this.step&&this.step.label){
      this.headers.push(
        h("h1",this.step.label)
      );
    }
    if(this.step&&this.step.sublabel){
      this.headers.push(
        h("p",this.step.sublabel)
      );
    }


  }

  onload() {
    const self = this;
    // todo: this might not be 100% stable, we should consider moving it
    setTimeout(function(){
      eventTrackerInitiator();
      designers.onStepLoad();
      designers.adaptLayout();
    })
    // designers.uniqueStepLayout(self.step);
  }

  render() {
    const self = this;
    switch (self.params.name) {
      case 'quizLanding':
        return (new QuizLanding())
        break;
      case 'quiz':
        return (new Quiz())
        break;
      case 'quizResults':
        return (new QuizResults())
        break;
      default:
      return h("section.step",
        (self.error?h('p.error', self.error):null),
        h("div.cards",self.headers,self.cardGroups)
      );
    }
  }
}

class CardGroup {

  constructor(data, resultsType) {
    this.data = data;
    this.resultsType = resultsType;
  }

  onload() {
    designers.onCardGroupReady();
  }

  render() {
    const self = this;
    var readyPromises = [];
    const cards = self.data.cards.map(function(card, i){
      var promise;
      readyPromises.push(promise);
      return (new Card(card, promise, null, self.resultsType));
    })

    const extraAttributes = self.data.extraAttributes || ''

    q.allSettled(readyPromises)
    .then(function() {
      designers.reinitSlick();
    });

    return h('.card-carousel.layer' + extraAttributes,
      h('div',
        h("div.slick-container",{role: "listbox"},cards)
      )
    )
  }

}

class Percentages {
  constructor(data) {
    this.data = data;
  }

  render() {
    return h('div#matches',
      h('h3', 'How closely you match: ' + Math.round(this.data.matchPercentage) + '%'),
      h('.progress',
        h('.progress-inner', {style: "width: " + this.data.matchPercentage +"%;"})
      ),
      h('h3', 'Chances of success: ' + Math.round(this.data.chancePercentage) + '%'),
      h('.progress',
        h('.progress-inner', {style: "width: " + this.data.chancePercentage +"%;"})
      ),
      h('h3', 'Total score: ' + Math.round(this.data.scorePercentage) + '%'),
      h('.progress.large',
        h('.progress-inner', {style: "width: " + this.data.scorePercentage +"%;"})
      )
    )
  }
}

class Card {
  constructor(data, readyPromise, customContent, resultsType) {
    const self = this;
    self.data = data;
    self.resultsType = resultsType;
    const onReady = function() {
      designers.reinitSlick();
    }
    self.cardContent = customContent || new CardContent(self.data, onReady, readyPromise, self.resultsType);
  }

  render() {
    // todo: something is not right here...
    delete CardTemplates.card.content[0].content[1].template;
    CardTemplates.card.content[0].content[1].content = this.cardContent;
    return helpers.assembleCards(this.data, CardTemplates.card);
  }
}

class CardContent {

  constructor(data, onReady, readyPromise, resultsType) {
    const self = this;
    self.data = data;
    self.onReady = onReady;
    self.readyPromise = readyPromise;
    self.resultsType = resultsType;
  }

  render() {
    const self = this;
    const postcodeAlreadyEntered = model.user.postcode ? true : false;

    if (typeof self.data === 'string') {
      var cardKey = self.data;
      if (model.cards[cardKey]) {
        self.data = model.cards[cardKey];
      } else {
        self.readyPromise = http.get(cardKey)
        .then(function (res) {
          model.cards[cardKey] = res.body;
          self.refreshComponent();
          self.onReady();
          return h('div.hello', 'Hello');
        });
      }
    }

    const data = self.data;
    switch (data.type) {

      case 'goToResults':
        data.name = "";
        data.description = "";
        model.landedOnResult = 1;
        model.user.isWaiting = "goToResults";
        self.refresh();

        model.parties = allData.getAllData().partyStances;
        var partyMatches = api.getPartyMatches(model);
        routes.quizResults().push();

        // getResults(self.resultsType).then(function(){
        //   delete model.user.isWaiting;
        //   routes.step({ name: data.nextStep, type: data.type, resultsType: self.resultsType }).push();
        // });
        // return helpers.assembleCards(data, 'loading');

      case 'postcode':
        if (postcodeAlreadyEntered) {
          console.log('already');
          //Doesn't ask for postcode again
          data.name = "Loading your results...";
          data.description = "";
          model.landedOnResult = 1;
          model.user.isWaiting = "postcode-input";
          self.refresh();

          model.parties = allData.getAllData().partyStances;
          var partyMatches = api.getPartyMatches(model);

          var newScores = Object.keys(partyMatches).map(function(partyKey) {
            var party = partyMatches[partyKey];

            var newScore = {
              key: partyKey,
              percentage: parseInt(party.match*100)
            }
            return newScore;
          });
          const qp = model.user.quizProgress;
          qp.country = allData.getAllData().ukData;
          var updatePartyPercentages = function(map){
            if(qp.country){
              var topParty = {percentage: 0}
              map.forEach(function(party){
                qp.country.parties.forEach(function(_party){
                  if(party.key===_party.key){
                    _party.percentage = parseInt(party.percentage) + "%";
                    _party.percentageText = parseInt(party.percentage) + "%";
                    _party.matches.push(party.newMatch);
                    if (party.percentage > topParty.percentage) {
                      topParty = party;
                    }
                  }
                })
              })
              qp.resultsData = {
                logo: '/img/party-logos/'+topParty.key+'.png',
                name: allData.getAllData().allParties.filter(function(party){return party.key==topParty.key})[0].name,
                percentage: parseInt(topParty.percentage)+"%",
                percentageText: parseInt(topParty.percentage)+"%"
              }
            }
          }
          updatePartyPercentages(newScores);
          qp.quizResults = true;
          qp.quizResultsPage = true;
          qp.country.parties.forEach(function(_party){
            _party.quizResults = true;
          });
          qp.finalResults = true;
          //NOTE: Jeremy, there were 2 bugs here:
          // 1) if you do route().push() synchronously with return{}, then it will not work
          // 2) quizChanceResults were empty
          api.getContenders(model.user.postcode).then(function(result){
            qp.quizChanceResults = result;
            qp.standaloneResults = true;
            routes.quizResults().push();
          });
          //NOTE: Old results page
          /*getResults('partyResults').then(function(){
            delete model.user.isWaiting;
            routes.step({ name: data.nextStep, type: data.type, resultsType: 'partyResults' }).push();
          });*/
          return helpers.assembleCards(data, 'loading');
        }
        data.isWaiting = model.user.isWaiting === "postcode-input";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.landedOnResult = 1;
          model.user.isWaiting = "postcode-input";
          self.refresh();

          model.parties = allData.getAllData().partyStances;
          var partyMatches = api.getPartyMatches(model);
          routes.quizResults().push();

          // getResults('partyResults').then(function(){
          //   delete model.user.isWaiting;
          //   routes.step({ name: data.nextStep, type: data.type, resultsType: 'partyResults' }).push();
          // });
          // return false;
        }
        // return helpers.assembleCards(data, 'postcodeInput');

      // case 'quiz-priority':
      //   try {
      //     var onTopicClick = function(topicKey){
      //       let topicNameIndex = model.featuredTopics.indexOf(topicKey);
      //       if(~topicNameIndex){
      //         model.user.opinions.issues[topicKey].highPriority = false;
      //         model.featuredTopics.splice(topicNameIndex, 1);
      //       }
      //       else{
      //         model.user.opinions.issues[topicKey].highPriority = true;
      //         model.featuredTopics.push(topicKey);
      //       }
      //       return false;
      //     };
      //
      //     ['quizTopicsLower', 'quizTopicsHigher'].forEach(function(varName){
      //       data[varName].map(function(topic){
      //         topic.onTopicClick = function(e){
      //           e.stopPropagation();
      //           return onTopicClick(topic._key);
      //         };
      //         return topic;
      //       });
      //     });
      //
      //     return helpers.assembleCards(data, 'quizPriority');
      //   } catch(e) {
      //
      //   }

      case 'goto-postcode-button':
        data.buttonAction = function(e){
          e.stopPropagation();
          routes.step({ name: data.nextStep, type: data.nextStep, next: 'result' }).push();

          return false;
        }
        return helpers.assembleCards(data, 'gotoPostcodeButton');

      case 'vote-worth':
        data.isWaiting = model.user.isWaiting === "vote-worth";
        data.postcodeBinding = [model.user, 'postcode'];
        if(model.user.resultsOptions.length){
          const latestResults = model.user.resultsOptions[model.user.resultsOptions.length-1];
          data.constituencyResults = dataProcessor.processConstituencySeats(latestResults);
        }
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.landedOnResult = 1;
          model.user.isWaiting = "vote-worth";
          self.refresh();
          api.getPostcodeOptions(model.user.postcode).then(function(results){
            model.user.isWaiting = false;
            if (results.error) {
              helpers.throwError("Sorry, we didn't recognise that postcode!")
            } else {
              model.user.resultsOptions.push(results);
            }
            self.refresh();
          });
          return false;
        }
        return helpers.assembleCards(data, 'voteWorth');

      case 'postcode-compare':
        data.isWaiting = model.user.isWaiting === "postcode-compare";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeUniBinding = [model.user, 'postcode_uni'];
        if(model.user.resultsCompare.length){
          const latestResults = model.user.resultsCompare[model.user.resultsCompare.length-1];
          data.constituencyResults = dataProcessor.processConstituencySeats(latestResults);
        }
        data.onLearnMore = function(e){
          e.stopPropagation();
          routes.root().push();
        }
        data.postcodeError = model.user.postcodeError;
        data.postcodeSubmit = function(e){
          model.landedOnResult = 1;
          e.stopPropagation();
          // Flushing results, in this case this makes sense to do on click, not on load
          model.user.resultsCompare.length = 0;
          model.user.isWaiting = "postcode-compare";
          api.comparePostcodes(model.user.postcode, model.user.postcode_uni).then(function(results){
            delete model.user.isWaiting;
            var shareButtonCard = [
              {
                name: "Spread the #GE2017 ❤️",
                type: "share",
                button1: '<i class="fa fa-facebook"></i> Share on Facebook',
                buttonClass1: "btn-facebook",
                buttonHref1: 'https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button',
                target1: "_blank",
                button2: '<i class="fa fa-twitter"></i> Share on Twitter',
                buttonClass2: "btn-twitter",
                buttonHref2: 'https://twitter.com/intent/tweet?text='+'I know how to use my %23GE2017 vote' + (model.user.constituency ? ' in %23' + model.user.constituency.name.replace(/\s/g, '') : '') + '. How are you using your vote? ge2017.com',
                target2: "_blank"
              }
            ];
            if (results.error) {
              trackEvent("Wrong Postcodes",{type: "Student",data: model.user.postcode + " " + model.user.postcode_uni});
              if(results.error==="empty"){
                helpers.throwError("Please provide both your Home and Uni postcodes","postcodeError")
              } else if(results.error==="connection"){
                helpers.throwError("Sorry, you are not connected to Internet. Please re-connect and try again.","postcodeError")
              } else {
                helpers.throwError("Sorry, we didn't recognise that postcode!","postcodeError")
              }
            } else {
              trackEvent("Received Results",{type: "Student"});
              trackEvent("Constituency checked",{type: "Student", constituency: results.seats[0].location });
              trackEvent("Constituency checked",{type: "Student", constituency: results.seats[1].location });
              model.user.resultsCompare.push(results);
            }
            self.refresh();
          });
          return false;
        }
        return helpers.assembleCards(data, 'postcodeCompare');

      case 'result': // todo: refactor
        const description = helpers.markdownToHtml(data.description);
        return h('div.content.text-left',
          h('img', {'src': data.image, 'class': 'party-logo'}),
          h('h2', data.name),
          h('div.body-content',
            h.rawHtml('p', description)
          ),
          (data.footer?
            h('div.footer',
              data.footer.map(function(elem){
                switch (elem) {
                  case "ShareButtons":
                    return (new ShareButtons())
                    break;
                  case "BackToDashboard":
                    return (new BackToDashboard())
                    break;
                  default:
                    return undefined;
                }
              })
            )
            :
            undefined
          )
        )
        break;

      case 'partyStories':
        data.name = data.header;
        data.description = data.content;
        return helpers.assembleCards(data, 'Organization');

      case 'proxyVotingStory':
        data.name = data.header;
        data.description = data.content;
        return helpers.assembleCards(data, 'Organization');

      case 'sampleStory':
        data.name = data.header;
        data.description = data.content;
        return helpers.assembleCards(data, 'Organization');

      case 'question':
        data.answers = data.tasks.map(function(name) {
          const task = model.tasks[name];
          return {
            "class": "task" + (task.subtype?" "+task.subtype:""),
            label: task.label,
            onclick: function(){
              helpers.updateData([{data: ("user.opinions.issues."+data.issueKey+".debates."+data.debateKey+".opinion"), value: task.goto.opinion}]);
              routes[(data.nextQuestion&&task.goto.name==="question"?"step":task.goto.type)]({
                name: data.nextQuestion?task.goto.name:(task.goto.name!=="question"?task.goto.name:data.final),
                task: name,
                nextQuestion: data.nextQuestion,
                final: data.final,
                next: data.nextStep?data.nextStep:task.goto.next
              }).push();
            }
          }
        });
        return helpers.assembleCards(data, 'question');

      case 'policy':
        // Check out development/templates.js for Policy
        return helpers.assembleCards(data, 'policy');

      default:
        return helpers.assembleCards(data, data.type);
    }

  }

}

// todo: this will not be needed soon
class ShareButtons {
  render() {
    const data = {
      name: "Spread the #GE2017 ❤️",
      facebookShareHref: "https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button",
      twitterShareHref: "https://twitter.com/intent/tweet?text="+"I know how to use my %23GE2017 vote" + (model.user.constituency ? " in %23" + model.user.constituency.name.replace(/\s/g, '') : "") + ". How are you using your vote? ge2017.com",
    };
    return helpers.assembleCards(data, 'shareButtons');
  }
}


class BackToDashboard {
  render() {
    return h("div.share-buttons",
      h("p","Go back to the dashboard to try again"),
      routes.root().a({"class":"discard-card-style"},
        h("button.btn.btn-primary","Back to Dashboard")
      )
    );
  }
}

class LocalCandidateDetails {
  constructor(data) {
    const self = this;
    self.data = data;
  }

  render() {
    var self = this;
    return  "<div class='local-candidate-details'>" +
              "<div>" + self.data.party_name + "</div>" +
              "<div>" + self.data.birth_date + "</div>" +
              "<div>" + self.data.post_label + "</div>" +
              (self.data.email ? "<div><a href='mailto:" + self.data.email + "'>" + self.data.email + "</a></div>" : "") +
              (self.data.twitter_username ? "<div><a href='https://twitter.com/" + self.data.twitter_username + "'>@" + self.data.twitter_username + "</a></div>" : "") +
              (self.data.facebook_page_url ? "<div><a href='" + self.data.facebook_page_url + "'>Facebook</a></div>" : "") +
              (self.data.homepage_url ? "<div><a href='" + self.data.homepage_url + "'>Homepage</a></div>" : "") +
              (self.data.wikipedia_url ? "<div><a href='" + self.data.wikipedia_url + "'>Wikipedia</a></div>" : "") +
              (self.data.likedin_url ? "<div><a href='" + self.data.likedin_url + "'>LinkedIn</a></div>" : "") +
              // (self.data.mapit_url ? "<div><a href='" + self.data.mapit_url + "'>MapIt</a></div>" : "") +
            "</div>";
  }
}

// todo: should this be in APIService?
function getResults(resultsType){
  var deferred = q.defer();

  api.getResults(model.user.postcode, model.user, resultsType)
    .then(function(results) {
      results.data.user ? helpers.updateObject(model.user, results.data.user) : null;

      var mainResults;

      switch (resultsType) {
        case 'partyResults':
          var yourParty = "",
              yourArea = "",
              yourFooter = "ShareButtons",
              extraCards;
          if (!results.parties.length) {
            results.parties[0] = {
              name: "Hold up!",
              description: "Looks like there isn’t a match for what you’re looking for as no party is offering to do what you want."
            }
            yourFooter = "BackToDashboard";
            shareButtonCard = [];
            extraCards = [];
          } else {
            results.parties[0].matches.plus.forEach(function(match) {
              yourParty += '<i class="fa fa-check" aria-hidden="true"></i> '
              + match.description + '<br>';
            });
            results.parties[0].chances.plus.forEach(function(chance) {
              yourArea += '<i class="fa fa-check" aria-hidden="true"></i> '
              + chance.description + '<br>';
            });
            shareButtonCard = [
              {
                name: "Spread the #GE2017 ❤️",
                type: "share",
                button1: '<i class="fa fa-facebook"></i> Share on Facebook',
                buttonClass1: "btn-facebook",
                buttonHref1: 'https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button',
                target1: "_blank",
                button2: '<i class="fa fa-twitter"></i> Share on Twitter',
                buttonClass2: "btn-twitter",
                buttonHref2: 'https://twitter.com/intent/tweet?text='+'I know how to use my %23GE2017 vote' + (model.user.constituency ? ' in %23' + model.user.constituency.name.replace(/\s/g, '') : '') + '. How are you using your vote? ge2017.com',
                target2: "_blank"
              }
            ];

            // So sorry for this but this handles cards
            // Pushing didn't work for some reason
            if (results.parties[0].matches.plus.length > 0 && results.parties[0].chances.plus.length > 0) {
              extraCards = [
                {
                  name: "You and your matched party",
                  description: yourParty
                },
                {
                  name: "You and your area",
                  description: yourArea
                }
              ];
            } else {
              if (results.parties[0].matches.plus.length > 0) {
                extraCards = [
                  {
                    name: "You and your matched party",
                    description: yourParty
                  }
                ];
              } else {
                extraCards = [
                  {
                    name: "You and your area",
                    description: yourArea
                  }
                ];
              }
            }

            explaain.addClientCards([{
              "@id": "//api.explaain.com/Detail/partymatch",
              name: "You and your matched party",
              description: yourParty,
            }]);

            mainResults = function () {
              var data = results.parties.map(function(party) {
                return {
                  type: 'resultParty',
                  image: party.image && ("/img/party-thumbnails/" + party.image) || '/img/party-logos/party.jpg',
                  name: party.name,
                  description: party.description || "We don't have a description for this party yet!",
                  renderPercentages: function () {
                    return new Percentages({
                      matchPercentage: party.matchPercentage,
                      chancePercentage: party.chancePercentage,
                      scorePercentage: party.score*100
                    })
                  },
                  showDetailsButton: {
                    cardKey: '//api.explaain.com/Detail/partymatch'
                  },
                }
              });

              return new CardGroup({cards: data, nextStep: 'result', stepParams: {}})
            }
          }
          break;

        case 'localCandidates':
          shareButtonCard = [];
          extraCards = [];


          var mainResults = results.data.candidates;
          var clientCards = [];

          mainResults.forEach(function(localCandidate){
            clientCards.push({
              "@id": "//api.explaain.com/Headline/localCandidate_"+localCandidate.id,
              "@type": "http://api.explaain.com/Headline",
              image: localCandidate.image_url,
              name: localCandidate.name,
              description: (new LocalCandidateDetails(localCandidate)).render()
            });
            localCandidate.cardHref = "//api.explaain.com/Headline/localCandidate_"+localCandidate.id;
          });
          explaain.addClientCards(clientCards);
          break;

        case 'getRegistered':
          shareButtonCard = [];
          extraCards = [];
          mainResults = function() {
            var data = [{
              type: 'Detail',
              name: 'Get registered!',
              description: 'Go to [this site](https://www.gov.uk/register-to-vote)'
            }];
            return new CardGroup({cards: data, nextStep: 'result', stepParams: {}})
          }
          break;

        case 'learnResult':
          shareButtonCard = [];
          extraCards = [];
          mainResults = function() {
            return new CardGroup({cards: model.user.currentlyLearning, nextStep: 'result', stepParams: {}})
          }
          break;

        default:
          break;
      }

      /* hack */
      var template;
      switch(resultsType){
        case "getRegistered": template = "OrganizationResultsGetRegistered"; break;
        default: template = "OrganizationResults"; break;
      }
      /* end hack */
      model.user.results.push([
        [
          {
            mainResults: mainResults ? mainResults : function(){},
            isLocalCandidates: resultsType == 'localCandidates',
            footer: [
              yourFooter
            ],
            type: template, // Temporary, /* hack */
            constituencyResults: {},
            moreStuff: {
              heading: "Have another question?",
              buttonText: "Get your answer",
              buttonAction: function(){routes.root().push()}
            },
            toggleDetailsButton: {
              toggle: function () {
                // Toggle the extra cards
                $('#more-details').toggleClass('hide');

                // Reset slick after hiding it
                $('.slick-container').slick('unslick').slick('reinit');

                // Change button text
                $('#toggle-details-btn').text($('#toggle-details-btn').text() == 'More details' ? 'Fewer details' : 'More details');
              }
            },
            shareButtonCard: shareButtonCard[0],
            renderExtraCards: function(cards){
              return new CardGroup({
                cards: cards,
                extraAttributes: '#more-details.hide'
              });
            },
            extraCards: extraCards
          }
        ]
      ]);
      setTimeout(function(){
        deferred.resolve();
      },500);
    }
  )
  return deferred.promise;
}

class QuizLanding {
  constructor (params) {
    const qp = model.user.quizProgress;
    const self = this;
    var randomyGraphyThing;

    console.log("Quiz-Landing page")
    self.launchRandomRefresh = function() {
      // if(!self.quizStarted){
      randomyGraphyThing = setTimeout(function(){
        self.refresh();
      },1000);
      // }
    }

    self.clickStartQuiz = function(){
      clearTimeout(randomyGraphyThing);
      $('.body.quiz').addClass('moving');
      routes.quiz({begin: true}).push()
    }
  }

  render() {
    const qp = model.user.quizProgress;
    const self = this;
    self.launchRandomRefresh();

    return helpers.assembleCards({
      clickStartQuiz: self.clickStartQuiz,
      partiesRandomChartData: [
        {
          color: "red",
          photo: "/img/leader-faces/corbyn.png",
          percentage: parseInt((Math.random()*100))+"%",
          fullName: "Labour",
          name: "Lab"
        },
        {
          color: "green",
          photo: "/img/leader-faces/wood.png",
          percentage: parseInt((Math.random()*100))+"%",
          fullName: "Green",
          name: "Green"
        },
        {
          color: "blue",
          photo: "/img/leader-faces/may.png",
          percentage: parseInt((Math.random()*100))+"%",
          fullName: "Conservative",
          name: "Con"
        },
        {
          color: "purple",
          photo: "/img/leader-faces/nuttall.png",
          percentage: parseInt((Math.random()*100))+"%",
          fullName: "Ukip",
          name: "Ukip"
        },
        {
          color: "orange",
          photo: "/img/leader-faces/farron.png",
          percentage: parseInt((Math.random()*100))+"%",
          fullName: "Liberal Democrats",
          name: "Lib"
        }
      ]
    }, CardTemplates.landingView)
  }
}

class QuizResults {
  constructor(params) {

  }

  render() {
    return new Quiz({finalResults: true});
  }

}

class Quiz {
  constructor(params) {
    console.log("Quiz page")

    const self = this;
    const qp = model.user.quizProgress;
    const quiz = model.questions;
    qp.questionPointer = qp.questionPointer ? qp.questionPointer : 0;
    qp.quizStarted = params && params.finalResults ? params.finalResults : qp.quizStarted;
    qp.prioritiesSet = qp.prioritiesSet ? qp.prioritiesSet : false;
    qp.constituencyView = qp.constituencyView ? qp.constituencyView : false;
    qp.quizResults = qp.quizResults ? qp.quizResults : false;
    qp.quizResultsPage = qp.prioritiesSet || false;
    self.countrySelected = params && params.finalResults ? params.finalResults : self.countrySelected;
    self.quizStarted = qp.quizStarted;
    self.quizResults = qp.quizResults;
    self.quizResultsPage = qp.quizResultsPage;
    self.quizSafeSeat = qp.quizSafeSeat;
    self.resultsData = qp.resultsData;
    self.startingQuiz = qp.startingQuiz;
    self.selectedCountry = qp.country;
    self.nextButtonText = qp.nextButtonText;
    self.countrySelected = params && params.finalResults || self.selectedCountry!==null;
    self.finalResults = params && params.finalResults ? params.finalResults : false;
    self.beginTheQuiz = params && params.begin;
    self.params = params

    self.startStudentCompare = function(){
      trackEvent("Student Compare Started",{type: "Quiz"});
      routes.step({name:'postcode-compare'}).push();
    }

    self.startSingleSentence = function(){
      trackEvent("Single Sentence Started",{type: "Quiz"});
      routes.phrase({name: 'iWantTo'}).push();
    }

    /* ------------
      Construct quiz
    */

    self.isWaiting = model.user.isWaiting === "quiz-input";

    self.startQuiz = function() {
      trackEvent("Quiz Started",{type: "Quiz"});
      qp.quizStarted = true;
      $('.body.quiz').addClass('moving');
      // self.next();
    }

    // Initialise quiz questions
    if(!quiz.quizQuestions) {
      quiz.quizQuestions = config[SiteBrand].quizQuestions;

    	var initialOrder = []; // holds the question order, as loaded from file
    	quiz.questionDB = {} // holds the question objects
    	// groups of questions to shuffle within themselves
      var randomiseGroupsSet = new Set();
      quiz.quizTopics = new Set(); // for priority labelling
      quiz.quizQuestions.forEach(function(q,I) {
    		q.I = I; // initial index
    		initialOrder.push(q.debate);
        quiz.quizTopics.add(q.issue);
    		quiz.questionDB[q.debate] = q;
    		if(config[SiteBrand].randomise) randomiseGroupsSet.add(q.randomiseGroup);
    	});
    	var randomiseGroups = Array.from(randomiseGroupsSet);

      qp.questionSeries = initialOrder;
      quiz.questionDB = JSON.parse(JSON.stringify(config[SiteBrand].quizQuestions));

      /* ---
        Shuffle questions
      */
      if(config[SiteBrand].randomise) {

        // within each group of indexes, shuffle
        var questionSeries = initialOrder;

        randomiseGroupsSet.forEach(function(rGroup) {
          var questions = quiz.questionDB.filter((q)=>q.randomiseGroup == rGroup);

          var indexes = new Set();
          questions.forEach((q,i)=> indexes.add(q.I));
          indexes = Array.from(indexes);
          // console.log("This group's indexes",indexes);

          questions.forEach((q,i,arr) => {
            var randI = indexes[Math.floor(Math.random() * indexes.length)]
            qp.questionSeries[randI] = q.debate;
            indexes.splice(indexes.indexOf(randI),1);
          })
        })
        // console.log("shuffled question order",qp.questionSeries);
      }
      /* ---- */
    }

    quiz.questionDB = {};
    JSON.parse(JSON.stringify(config[SiteBrand].quizQuestions)).forEach((q) => quiz.questionDB[q.debate] = q);

    if(config[SiteBrand].numbering) {
      qp.questionSeries.forEach((k,i) => {
        quiz.questionDB[k].question = (i+1)+". "+quiz.questionDB[k].question;
      })
    }
    if(config[SiteBrand].insertYesNo) {
      qp.questionSeries.forEach((k,i) => {
        quiz.questionDB[k].answers.yes.forEach((a,j) => {
          console.log(a);
          a.label = "Yes, " + a.label
        })
        quiz.questionDB[k].answers.no.forEach((a,j) => {
          a.label = "No, " + a.label
        })
      })
    }

    self.currentQuestion = quiz.questionDB[qp.questionSeries[qp.questionPointer]];
    console.log("Running quiz with question order:",qp.questionSeries)
    // console.log("Running quiz with question DB:",quiz.questionDB)
    console.log("----")
    console.log("Committed answers:",qp.opinions)
    console.log("Tentative answers:",qp.answers)
    console.log("Current question",self.currentQuestion);
    console.log("----")

    // Topics for prioritising
    // This needs to run after every question
    // Because topics for weighting cannot include those entirely skipped by users
    self.defineCalculableTopics = function() {
      var oldPriorities = JSON.parse(JSON.stringify(quiz.quizTopics));
      console.log("Old priorities",oldPriorities);
      quiz.quizTopics = new Set(); // for priority labelling

      // This will also be used by self.recalculateOpinions
      qp.calculableQuestions = qp.questionSeries.filter((q,i)=>{
        // get questions that have not been answered 'false' (i.e. skipped)
        return typeof qp.answers[i] !== 'undefined' && qp.answers[i] !== false
      });
      console.log("calculableQuestions",qp.calculableQuestions)

      qp.calculableQuestions.forEach(function(q) {
        quiz.quizTopics.add(quiz.questionDB[q].issue);
      })
      quiz.quizTopics = Array.from(quiz.quizTopics);
      quiz.quizTopics.forEach(function(topic,i) {
        quiz.quizTopics[i] = {
          issue: topic,
          label: topic,
          highPriority: oldPriorities.length && oldPriorities.find((p)=>p.issue == topic) ? oldPriorities.find((p)=>p.issue == topic).highPriority  : false,
          topicTogglePriority: () => {
            console.log("Restoring previous priority",oldPriorities.find((p)=>p.issue == topic))
            self.reprioritiseTopic(topic,i);
          }
        }
      });
      self.refresh();
    }

    self.next = function() {
      self.updateShareLinks();

      if (qp.questionPointer > 0) qp.startingQuiz = false;
      trackEvent("Question Answered",{type: "Quiz", questionNumber: qp.answers.length, question: quiz.questionDB[qp.questionSeries.length-1], answer: qp.answers[qp.answers.length-1], opinion: qp.opinions[qp.questionPointer-1], fullData: qp});
      if(qp.questionPointer < qp.questionSeries.length){
        self.refresh();
      } else {
        trackEvent("Results Got",{type: "Quiz", party: qp.resultsData.name, percentage: qp.resultsData.percentage, fullData: qp});
        qp.quizResults = true;
        qp.quizResultsPage = true;
        qp.country.parties.forEach(function(_party){
          _party.quizResults = true;
        });
        self.refresh();
      }
    }

    /* ---
      Resolve question
    */
    self.answerYes = function(){ self.answer("yes") }
    self.answerNo = function(){ self.answer("no") }
    self.answer = function(answer) {
      console.log("Answer Yes/No");
      qp.answers.push(answer);
      self.submitOpinion(answer === "yes" ? 0.8 : 0.2);
      if (qp.answers.length==qp.questionSeries.length) {
        qp.nextButtonText = 'See Results >';
      }
      self.next();
    }
    self.answerSubquestion = function(answer) {
      console.log("Improve on Yes/No");
      // qp.answers[qp.answers.length-1] = answer;
      self.submitOpinion(answer,true);
      self.next();
    }
    self.skipSubquestion = function() {
      console.log("Stay with Yes/No");
      var opinion = qp.answers[qp.answers.length-1] === "yes" ? 0.8 : 0.2;
      self.submitOpinion(opinion,true);
      self.next();
    }

    self.submitOpinion = function(opinion, commitToAnswer = false, thisQuestion = self.currentQuestion) {
      if(commitToAnswer) {
        console.log("Next Q")
        qp.opinions.push(opinion);
        qp.questionPointer++;
        self.refresh();
        self.next();
      } else {
        console.log("Same Q")
      }

      model.user.opinions.issues = model.user.opinions.issues || {};
      var issue = thisQuestion.issue;
      var debate = thisQuestion.debate;

      if(opinion === false) {
        console.log("Question skipped, won't consider in calculations")

        // Erase from model

        // if(model.user.opinions.issues[issue]) {
        //   console.log("LEN BEF",model.user.opinions.issues[issue].debates.length)
        //   if(model.user.opinions.issues[issue].debates[debate])
        //     delete model.user.opinions.issues[issue].debates[debate]
        //
        //   if(model.user.opinions.issues[issue].debates.length < 1) {
        //     console.log("LEN AFT",model.user.opinions.issues[issue].debates.length)
        //     delete model.user.opinions.issues[issue]
        //   }
        // }

        self.defineCalculableTopics();
        self.next();
        return false;
      }

      model.user.opinions.issues[issue] = model.user.opinions.issues[issue] || {};
      model.user.opinions.issues[issue].debates = model.user.opinions.issues[issue].debates || {};
      model.user.opinions.issues[issue].debates[debate] = model.user.opinions.issues[issue].debates[debate] || {};
      model.user.opinions.issues[issue].debates[debate].opinion = opinion;

      model.parties = allData.getAllData().partyStances;
      var partyMatches = api.getPartyMatches(model);
      function getOpinionText(question, opinion) {
        var aggAnswers = question.answers.yes.concat(question.answers.no).concat([{label: "Yes", opinion: 0.8},{label: "No", opinion: 0.2}]);
        var answer = {diff: 1};
        aggAnswers.forEach(function(_answer) {
          _answer.diff = Math.abs(opinion - _answer.opinion);
          answer = _answer.diff<answer.diff ? _answer : answer;
        })
        return answer.label;
      }
      var newScores = Object.keys(partyMatches).map(function(partyKey) {
        var party = partyMatches[partyKey];
        var userOpinionNum = opinion; //commitToAnswer ? qp.opinions[qp.questionPointer-1] : qp.opinions[qp.questionPointer];
        var partyOpinionObj = model.parties.opinions.issues[issue].debates[debate].parties[partyKey];
        var partyOpinionNum = partyOpinionObj ? partyOpinionObj.opinion : null;
        var matchScore = partyOpinionNum ? 1 - Math.abs(userOpinionNum - partyOpinionNum) : 0.5;

        if (model.parties.opinions.issues[issue].debates[debate].parties[partyKey] && partyOpinionNum > -1) {
          var userOpinion = getOpinionText(thisQuestion, opinion);
          var partyOpinion = getOpinionText(thisQuestion, partyOpinionNum) || -1;
          var newMatch =  {
            question: thisQuestion.question,
            userOpinion: userOpinion,
            partyOpinion: partyOpinion,
            isMatch: userOpinion == partyOpinion,
            matchScore: matchScore
          }
        }
        var newScore = {
          key: partyKey,
          percentage: (SiteBrand=='38degrees') ?  parseInt(matchScore*100) : parseInt(party.match*100),
          newMatch: newMatch ? newMatch : undefined
        }
        return newScore;
      });
      console.log('newScores');
      console.log(newScores);
      self.defineCalculableTopics();
      self.updatePartyPercentages(newScores);
    }

    self.recalculateOpinions = function() {
      // Clear opinions
      model.user.quizProgress.opinions = [];
      // Now resubmit them, mocking  currentQuestion  as  quiz.questionDB[q]
      qp.calculableQuestions.forEach((q) => {
        var mq = model.user.opinions.issues[quiz.questionDB[q].issue].debates[q];
        console.log("Recalculating question "+mq.debate+" with weighting "+mq.weight)
        self.submitOpinion(mq.opinion, true, quiz.questionDB[q]);
      });
    }

    self.reprioritiseTopic = function(topic,i) {
      console.log(`Changing priority of __${topic}__ from ${quiz.quizTopics[i].highPriority} to ${!quiz.quizTopics[i].highPriority}`);
      quiz.quizTopics[i].highPriority = !quiz.quizTopics[i].highPriority;
      var newWeight = quiz.quizTopics[i].highPriority ? 5 : 1;
      Object.keys(model.user.opinions.issues[topic].debates).forEach((k,i) => {
        console.log("!!!!! Changing priority",topic,k,newWeight,"of",model.user.opinions.issues[topic].debates);
        model.user.opinions.issues[topic].debates[k].weight = newWeight
      })
      self.recalculateOpinions();
    }

    self.setPriorities = function() {
      qp.prioritiesSet = self.prioritiesSet = true;
      self.refresh();
    }

    self.back = function() {
      qp.quizResults = false;
      qp.quizResultsPage = false;

      if(qp.answers.length > 0) {
        var now = {
          yesNo: qp.questionPointer === qp.opinions.length,
          subQ: typeof qp.answers[qp.questionPointer] === 'string'
        }
        var prev = {
          subQ: typeof qp.answers[qp.questionPointer-1] === 'number',
          skipped: qp.answers[qp.questionPointer-1] === false
        }
        console.log("-----")
        console.log(now);
        console.log(prev);

        if(now.subQ) {
          qp.answers.pop(); // reset yes/no
        } else
        if(now.yesNo) {
          qp.questionPointer--; // previous question
          qp.opinions.pop(); // reset model

          model.user.opinions.issues = model.user.opinions.issues || {};
          var issue = quiz.questionDB[qp.questionSeries[qp.questionPointer]].issue;
          var debate = quiz.questionDB[qp.questionSeries[qp.questionPointer]].debate;
          if(model.user.opinions.issues[issue]) {
            console.log("LEN BEF",model.user.opinions.issues[issue].debates.length)
            if(model.user.opinions.issues[issue].debates[debate])
              delete model.user.opinions.issues[issue].debates[debate]

            if(model.user.opinions.issues[issue].debates.length < 1) {
              console.log("LEN AFT",model.user.opinions.issues[issue].debates.length)
              delete model.user.opinions.issues[issue]
            }
          }

          if(prev.skipped) {
            qp.answers.pop();
          }
        }
      } else {
        if(qp.prioritiesSet) prioritiesSet = false;
        if(self.countrySelected){
          qp.country = null;
        } else {
          qp.quizStarted = false;
        }
      }

      self.refresh();
      self.next();
    }

    self.skipQuestion = function() {
      var skipOpinion = false;
      qp.answers.push(skipOpinion);
      self.submitOpinion(skipOpinion,true);
    }

    //NOTE: Jeremy, 'map' param is [{key:"green", percentage: 10}, {key: "labour", percentage: 90}]
    self.updatePartyPercentages = function(map) {
      console.log("updatePartyPercentages");
      if(qp.country){
        var topParty = {percentage: 0}
        map.forEach(function(party){
          qp.country.parties.forEach(function(_party){
            if(party.key===_party.key){
              _party.percentage = parseInt(party.percentage) + "%";
              _party.percentageText = parseInt(party.percentage) + "%";
              if (party.newMatch)
                _party.matches.push(party.newMatch);
              if (party.percentage > topParty.percentage) {
                topParty = party;
              }
            }
          })
        })
        qp.resultsData = {
          logo: '/img/party-logos/'+topParty.key+'.png',
          name: allData.getAllData().allParties.filter(function(party){return party.key==topParty.key})[0].name,
          percentage: parseInt(topParty.percentage)+"%",
          percentageText: parseInt(topParty.percentage)+"%"
        }
      }
    }

    //self.updatePartyPercentages([{key: "labour",percentage: 50}]) <-- THIS IS EXAMPLE!!
    self.partiesChartData = qp.country ? qp.country.parties : [];

    /* -------------------------
      All questions answered
    */

    self.updateShareLinks = function() {
        // console.log("Old share URLs",qp.facebookShareAlignmentHref,qp.twitterShareAlignmentHref);
      // self.facebookShareConstituencyHref = null;
      // self.twitterShareConstituencyHref = null;

      var subdomain = config[SiteBrand].subdomain ? config[SiteBrand].subdomain+"." : '';
      var shareData = model.user.quizProgress.resultsData;
      try { var perc = shareData.percentage.slice(0,-1); } catch(e) {} // temp try/catch, don't fully recognise when this should be calculated
      var sharePath = `http://${subdomain}uk-election-2017-dev.herokuapp.com/shared/${encodeURIComponent(shareData.name)}/${perc}`;
      // encodeURIComponent(`http://ge2017.com/quiz/${shareData.name}/${shareData.percentage}`);
      qp.facebookShareAlignmentHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(sharePath)}`;
      qp.twitterShareAlignmentHref = "https://twitter.com/intent/tweet?text="+encodeURIComponent(`I support ${shareData.percentage} of ${shareData.name} policies. Who should you vote for? #GE2017 ${sharePath}`);

      // console.log("New share URLs",qp.facebookShareAlignmentHref,qp.twitterShareAlignmentHref);

      self.refresh();
    }

    self.postcodeBinding = [model.user, 'postcode'];
    self.postcodeSubmit = function(e) {
      qp.constituencyView = true;
      console.log(e);
      e.stopPropagation();
      model.landedOnResult = 1;
      model.user.isWaiting = "postcode-input";
      self.refresh();
      api.getContenders(model.user.postcode).then(function(result){
        console.log('result');
        console.log('result');
        console.log('result');
        console.log('result');
        console.log(result);
        qp.quizChanceResults = result;
        delete model.user.isWaiting;
        trackEvent("Rerouting on Constituency Result",qp.resultsData);
        routes.quizResults().push();
      });
      return false;
    }

    if (self.finalResults == true) {
      setTimeout(function(){
        $('.body.quiz').addClass('moving')}
      ,10);
      qp.standaloneResults = false;
      self.partiesChartData = qp.country ? self.partiesChartData.map(function(party) {
        if (!(qp.quizChanceResults.parties.filter(function(_party) {
          return party.key == _party.key
        }).length)) {
          if (SiteBrand != '38degrees')
            party.faded = true;
        }
        return party;
      })
      :
      [];

      self.partiesChartDataChances = qp.country ? qp.country.parties.filter(function(party) {
        return qp.quizChanceResults.parties.filter(function(_party) {
          return party.key == _party.key
        }).length;
      })
      :
      [];

      var tempMaxParty = {percentage: 0};
      self.partiesChartDataChances.forEach(function(party) {
        if (parseInt(party.percentage) > parseInt(tempMaxParty.percentage)) {
          tempMaxParty = {
            color: party.color,
            photo: party.photo,
            name: party.fullName,
            key: party.key,
            percentage: party.percentage,
            percentageText: party.percentageText + " Match",
            matches: party.matches,
            quizResults: party.quizResults
          }
          // tempMaxParty = party;
          // tempMaxParty.name = tempMaxParty.fullName;
        }
      });
      self.partiesChartDataTopMatch = [tempMaxParty]

      qp.quizSafeSeat = self.partiesChartDataChances.length==1 ? true : false;
      if (model.user.postcode.length && !qp.localCandidateData || !qp.localCandidateData.length) {
        getResults('localCandidates')
        .then(function(results) {
          console.log('results')
          console.log('results')
          console.log('results')
          console.log('results')
          console.log(results)
          qp.localCandidateData = model.user.results[model.user.results.length-1][0][0].mainResults;

          qp.country.parties.forEach(function(party) {
            if (qp.localCandidateData.filter(function(candidate) {
              return party.dClubNames.indexOf(candidate.party_name) > -1;
            }).length == 0) {
              party.faded = true;
            }
          })
          self.refresh();
        })
      }
      // setTimeout(function() {
      //   self.refresh(); //This is not good as it just puts it on repeat!
      // },10)
    }
  }
  render(){
    const self = this;
    const countriesData = allData.getAllData().countriesData;
    const qp = model.user.quizProgress;
    const quiz = model.questions;
    const subquestions = self.currentQuestion ? self.currentQuestion.answers[qp.answers[qp.questionPointer]] : null;
    console.log("Subquestions",subquestions);
    // On Landing Page button click
    if((self.beginTheQuiz || !self.params) && !qp.hasStarted) {
      qp.hasStarted = true;
      console.log("Starting quiz",self.params)
      self.startQuiz();
    }

    if(subquestions){
      subquestions.forEach(function(subanswer){
        subanswer.answer = function(){
          self.answerSubquestion(subanswer.opinion);
        }
      })
    }
    countriesData.forEach(function(country){
      country.parties.forEach(function(party){
        const matches = party.matches;
        party.openMatches = function(){
          var tempKey = 'http://api.explaain.com/QuizMatch/' + parseInt(Math.random()*100000000000);
          var tempCard = {
            '@id': tempKey,
            '@type': 'QuizMatch',
            name: matches.length ? 'How you and ' + party.fullName + ' match:' : "Answer a question to see how you match",
            matches: matches.length ? matches : []
          }
          // var tempKey2 = 'http://api.explaain.com/QuizMatch/' + parseInt(Math.random()*100000000000);
          // var tempCard2 = {
          //   '@id': tempKey2,
          //   '@type': 'QuizMatch',
          //   name: 'How you and ' + party.fullName + ' match:',
          //   matches: [matches[1]]
          // }
          explaain.addClientCards(tempCard)
          // explaain.addClientCards(tempCard2)
          explaain.showOverlay(tempKey);
        }

        country.select = function(){
          trackEvent("Country Selected",{type: "Quiz", code: country.code, country: country.label});
          qp.country = country; // we set the whole country object here
          self.countrySelected = true;
          /*qp.*/
          qp.country.parties.forEach(function(party){
            party.percentage = "0%";
            party.percentageText = "0%";
          })
          console.log(country)
          // qp.country = country; // This thing's causing mad loop errors
          // qp.x = country
          qp.startingQuiz = true;
          // self.next();
        }
      })
    })
    var facebookShareHref;
    var twitterShareHref;
    if (SiteBrand == 'unilad') {
      facebookShareHref = "https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fbit.ly%2Funilad-ge2017&display=popup&ref=plugin&src=share_button";
      twitterShareHref = "https://twitter.com/intent/tweet?text="+"Use%20GE2017.com%20To%20Decide%20Who%20To%20Vote%20For%20In%20The%20General%20Election%20%23GE2017%20-%20http%3A%2F%2Fbit.ly%2Funilad-ge2017%20via%20%40UNILAD";
    } else {
      facebookShareHref = "https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fge2017.com&display=popup&ref=plugin&src=share_button";
      twitterShareHref = "https://twitter.com/intent/tweet?text="+"Use%20GE2017.com%20To%20Decide%20Who%20To%20Vote%20For%20In%20The%20General%20Election%20%23GE2017%20-%20ge2017.com";
    }
    var safeSeatMessage = "This means the party you matched isn't as likely to win. You can still vote for them or explore other candidates standing in your area below.."

    var partyResults = qp.prioritiesSet && !qp.constituencyView;
    return helpers.assembleCards({
      topLineConditional: self.quizStarted && self.countrySelected && !partyResults && !qp.quizResults,
      constituencyView: qp.constituencyView,
      setPriorities: self.setPriorities,
      submitPriorities: self.submitPriorities,
      // quizPrioritiesNotSet: false,
      isSubquestion: subquestions !== undefined,
      resultsOnwards: true,
      quizTopics: quiz.quizTopics,
      quizResults: qp.quizResults,
      quizResultsPage: qp.quizResultsPage,
      prioritiesSet: qp.prioritiesSet,
      quizPriorityPage: qp.quizResults && !qp.prioritiesSet,
      partyResults: partyResults,
      properResults: self.quizResults && qp.prioritiesSet,
      resultLogo: self.resultsData.logo,
      resultName: self.resultsData.name,
      resultPercentage: self.resultsData.percentage,
      currentQuestionI: self.currentQuestionI,
      currentQuestion: self.currentQuestion,
      currentQuestionAnswered: qp.answers[qp.questionPointer]!==undefined,
      currentQuestionYes: qp.answers[qp.questionPointer]==="yes",
      currentQuestionNo: qp.answers[qp.questionPointer]==="no",
      currentSubquestion: self.currentQuestion ? self.currentQuestion.answers[qp.answers[qp.questionPointer]] : null,
      progressBarWidth: ((qp.questionPointer/qp.questionSeries.length)*100) + "%",
      answerYes: self.answerYes,
      answerNo: self.answerNo,
      skipSubquestion: self.skipSubquestion,
      nextButtonText: self.nextButtonText,
      partiesChartData: self.partiesChartData,
      partiesChartDataChances: self.partiesChartDataChances,
      partiesChartDataTopMatch: self.partiesChartDataTopMatch,
      // openMatches: self.openMatches,
      partiesRandomChartData: self.partiesRandomChartData,
      quizStarted: self.quizStarted,
      startStudentCompare: self.startStudentCompare,
      startSingleSentence: self.startSingleSentence,
      startingQuiz: self.startingQuiz && qp.answers[qp.questionPointer]==undefined,
      nowProgressingThroughQuiz: self.quizStarted && !self.startingQuiz && !self.quizResults,
      safeSeatMessage: safeSeatMessage,
      countrySelected: self.countrySelected,
      countriesData: countriesData,
      quizSafeSeat: self.quizSafeSeat,
      selectedCountry: self.selectedCountry,
      postcodeSubmit: self.postcodeSubmit,
      postcodeBinding: self.postcodeBinding,
      isWaiting: self.isWaiting,
      finalResults: self.finalResults,
      back: self.back,
      skipQuestion: self.skipQuestion,
      facebookShareHref: facebookShareHref,
      twitterShareHref: twitterShareHref,
      facebookShareAlignmentHref: qp.facebookShareAlignmentHref,
      twitterShareAlignmentHref: qp.twitterShareAlignmentHref,
      standaloneResults: qp.standaloneResults,
      localCandidateData: qp.localCandidateData,
      standaloneResults: qp.standaloneResults,
      beginTheQuiz: self.beginTheQuiz
    }, CardTemplates.quizMaster);
  }
}

/*const templatesUrl = '//explaain-api.herokuapp.com/templates';
helpers.loadTemplates(templatesUrl).then(function(templates){
  for(var key in templates){
    CardTemplates[key] = templates[key];
  };

});*/

const _templates = require("../tmp/templates.js");
for(var key in _templates){
  CardTemplates[key] = _templates[key];
};

//if(location.hostname==="localhost" || location.hostname.split('.')[1]==="ngrok"){
require("../development/templates.js")(CardTemplates);
require("../development/model.js")(model);
// require("../development/generatePartyStances.js")(model,allData.getData().partyStances)();
hyperdom.append(document.body, new App());

designers.onWindowResize();
