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
  eventTrackerInitiator = require("../includes/event-tracker-initiator")(trackEvent)
;

// Describing different routes of app
// warn. at the moment /dashboards and /steps are redirected to "/" in index.ejs
//   by express routing - this was made to avoid 404 errors on page refresh
const routes = {
  root: router.route('/'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name'),
  students: router.route('/students'), //'student' too?
  policy: router.route('/policy')
};

router.start();

Model = model;

class App {
  constructor(data) {
    if (Standalone) {
      var logoRoute = routes.students();
    } else {
      var logoRoute = routes.root();
    }
    this.header = new Header(logoRoute);
    this.footer = new Footer();
  }

  render() {

    if (Embed) {

      var params = {
        name: StepName
      }
      var step = new Step(params);
      return h('div',step);

    } else {

      return h('div.body' + (Standalone ? '.standalone' : ''),
        h('div.main',
          h('div.top-strip'),

          this.header,

          routes.root(function () {
            var dashboard = new Dashboard({dashboard: 'home'});
            return h("div", dashboard)
          }),

          routes.dashboard(function (params) {
            var dashboard = new Dashboard({dashboard: params.name});
            return h("div", dashboard)
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

          this.footer
        )
      )
    }
  }
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
        h("img.ge2017-logo", {"src": "/img/ge2017logo.png"})
      ),
      (new Progress())
    )
  }
}


class Footer {
  render() {
    eventTrackerInitiator();
    return h("footer",
      h("a.discard-card-style",
        {
          "href": "http://api.explaain.com/Detail/5911ba3cac223e0011e45faf"
        },
        h("button.btn.btn-default",
          "Who's behind this?"
        )
      )
    )
  }
}

class Progress {
  render() {
    const self = this;
    var progress_total = 2;
    var progress_current = 0;
    var quizFlow = [];
    model.user.quizFlow.forEach(function(quiz){
      quizFlow = quizFlow.concat(quiz);
    });
    if(quizFlow.length>0){
      progress_total += quizFlow.length;
      var progress_quiz = 0;
      if(model.landedOnPostcode||model.landedOnResult){
        progress_quiz=quizFlow.length;
      } else {
        progress_quiz=quizFlow.indexOf(model.question)!==-1?quizFlow.indexOf(model.question)+1:0;
      }
      progress_current += progress_quiz;
    }
    progress_current+=model.landedOnPostcode;
    progress_current+=model.landedOnResult;
    // todo: why does it lead you to postdode-compare?
    // Answer (from Jeremy) - currently it's just a shortcut so we can demo it to people without having a button on the dashboard!
    return routes.step({
      name: 'postcode-compare',
      type: 'step',
      next: 'result'}).a(
      h(".progress",
        h(".progress-inner",{style: {width: ((progress_current/progress_total)*100)+"%"}})
      )
    )
  }
}


class Dashboard {

  constructor(params) {
    this.dashboard = model.dashboards[params.dashboard] || { title: "Goodness me, you're early! 😳", subtitle: "This feature is coming soon...! 👻", tasks: []};
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

      case 'postcode':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode',
          name: 'Please enter your postcode:',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
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
        trackEvent("Landed Students");
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode-compare',
          name: 'Student? Unsure where to vote from? <img src="/img/thinking.png">',
          subtitle: 'Compare your two postcodes to see [where your vote counts most](http://api.explaain.com/Detail/5911ce5cac223e0011e45fb1).',
          subheading: 'Why do we need this?',
          description: 'We need your postcode to [show data](http://api.explaain.com/Detail/5911c1b2ac223e0011e45fb0) relating to your [constituency](http://api.explaain.com/Detail/588cdf6d29d97f1200703d3c) 👌'
        }])
        break;

      case 'result':
        model.landedOnResult = 1; // todo: temporary, refactor
        model.user.results[model.user.results.length-1].forEach(function(cards){
          data.cardGroups.push(cards);
        })
        break;

      case 'partyStories':
        data.cardGroups.push(partyStories)
        break;

      case 'sampleStory':
        data.cardGroups.push(self.step.cardUrls)
        break;

      case 'question':
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
        return ([new Card(cards[0])]);
      } else {
        return (new CardGroup({cards:cards,nextStep:params.next, stepParams: self.step}));
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
    designers.uniqueStepLayout(self.step);
  }

  render() {
    const self = this;
    return h("section.step",
      (self.error?h('p.error', self.error):null),
      h("div.cards",self.headers,self.cardGroups)
    )
  }
}

class CardGroup {

  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    const onReady = function() {
      designers.onCardGroupReady();
    }
    const cards = self.data.cards.map(function(card){
      return (new Card(card, onReady));
    })

    return h('.card-carousel.layer',
      h('div',
        h("div.slick-container",{role: "listbox"},cards)
      )
    )
  }

}

class Card {
  constructor(data, onReady) {
    const self = this;
    self.data = data;
    self.cardContent = new CardContent(self.data, onReady);
  }

  render() {
    // todo: something is not right here...
    delete CardTemplates.card.content[0].content[1].template;
    CardTemplates.card.content[0].content[1].content = this.cardContent;
    return helpers.assembleCards(this.data, CardTemplates.card);
  }
}

class CardContent {

  constructor(data, onReady) {
    const self = this;
    self.data = data;
    self.onReady = onReady;
  }

  render() {
    const self = this;

    if (typeof self.data === 'string') {
      var cardKey = self.data;
      if (model.cards[cardKey]) {
        self.data = model.cards[cardKey];
      } else {
        http.get(cardKey)
        .then(function (res) {
          model.cards[cardKey] = res.body;
          self.refresh();
          self.onReady();
          // self.cardContent.refresh();
          // deferred.resolve(res.body);
        });
        // return h('div.hello', 'Hello');
      }
    }

    const data = self.data;
    switch (data.type) {

      case 'postcode':
        data.isWaiting = model.user.isWaiting === "postcode-input";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.user.isWaiting = "postcode-input";
          self.refresh();
          getResults().then(function(){
            delete model.user.isWaiting;
            routes.step({ name: data.nextStep, type: data.type }).push();
          });
          return false;
        }
        return helpers.assembleCards(data, 'postcodeInput');

      case 'vote-worth':
        data.isWaiting = model.user.isWaiting === "vote-worth";
        data.postcodeBinding = [model.user, 'postcode'];
        if(model.user.resultsOptions.length){
          const latestResults = model.user.resultsOptions[model.user.resultsOptions.length-1];
          data.constituencyResults = dataProcessor.processConstituencySeats(latestResults);
        }
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
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
        console.log('Defaulting');
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

// todo: should this be in APIService?
function getResults(){
  var deferred = q.defer();
  api.getResults(model.user.postcode, model.user)
    .then(function(results) {
      helpers.updateObject(model.user, results.data.user);
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
      }
      model.user.results.push([
        [
          {
            image: results.parties[0] && results.parties[0].image && ("/img/party-thumbnails/" + results.parties[0].image) || '/img/party-logos/party.jpg',
            name: results.parties[0] && results.parties[0].name,
            description: results.parties[0] && results.parties[0].description || "We don't have a description for this party yet!",
            footer: [
              yourFooter
            ],
            type: "OrganizationResults", // Temporary,
            constituencyResults: {},
            moreStuff: {
              heading: "Add more stuff!",
              buttonText: "Add more stuff",
              buttonAction: function(){routes.root().push()}
            },
            shareButtonCard: shareButtonCard[0],
            renderExtraCards: function(cards){
              return new CardGroup({cards: cards});
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
require("../development/generatePartyStances.js")(model,partyStances)();
hyperdom.append(document.body, new App());

designers.onWindowResize();
