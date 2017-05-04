const
  hyperdom = require('hyperdom'),
  h = hyperdom.html,
  router = require('hyperdom-router'),
  windowEvents = require('hyperdom/windowEvents'),
  api = require('../services/APIService'),
  http = require('httpism'),
  model = require('../models/model'),
  CardTemplates = {},
  Helpers = require("../includes/helpers"),
  helpers = new Helpers(model,h,CardTemplates,http, router)
;

const routes = {
  root: router.route('/'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name')
};

router.start();

Model = model;

var WideDecide = function() {
  // if (window.innerWidth > 600) {
  //   console.log('hi');
  //   if (!$('section.step').hasClass('wide')) {
  //     $('section.step').addClass('wide');
  //   }
  // } else {
  //   console.log('hi2');
  //   $('section.step').removeClass('wide');
  // }
}

class App {
  constructor(data) {
    this.header = new Header();

    // todo: remove this
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

  render() {

    return h('div.body',
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
          return h('div',
            step
          );
        })
      )
    )
  }
}


class Header {
  render() {
    return h("header",
      routes.root().a({"class": "home " + routes.root(function(){return "fade-hidden"})},
        h("i.fa.fa-arrow-left"),
        " Home"
      ), routes.root().a(
        h("img.ge2017-logo", {"src": "/img/logo.png"})
      ),
      (new Progress())
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
          if(getModel(path)){
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
    this.error = params.error;
    this.params = params;

    if (params.task && model.tasks[params.task].dataUpdates)
      helpers.updateData(model.tasks[params.task].dataUpdates);



    window.onresize = function() {
      WideDecide();
    }

    var data = {
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
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode-compare',
          name: 'Student and not sure where to vote from?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'result':
        model.landedOnResult = 1; // todo: temporary, refactor
        model.user.results[model.user.results.length-1].forEach(function(cards){
          // params.name = 'Organization';
          data.cardGroups.push(cards);
        })
        console.log(JSON.stringify(data.cardGroups))
        break;

      case 'story':
        // var cards = [];
        // partyStories.forEach(function(card) {
        //   card.push({
        //
        //   });
        // })
        data.cardGroups.push(partyStories)
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

      default:
        data.cardGroups.push([{
          name: "Goodness me, you're early! 😳",
          description: "This feature is coming soon...! 👻"
        }])
    }
    this.cardGroups = data.cardGroups.map(function(cards){
      cards.forEach(function(card, i) {
        if(!cards[i].nextStep){
          cards[i].nextStep = params.next;
        }
        console.log(cards[i].type)
        cards[i].type = cards[i].type || params.name;
        console.log(cards[i].type)
      });
      if (cards.constructor !== Array || cards.length == 1) {
        return ([new Card(cards[0])]);
        // return (new CardGroup({cards:cards,nextStep:params.next}));
      } else {
        return (new CardGroup({cards:cards,nextStep:params.next}));
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
    WideDecide();
    if (this.step.label == 'Party stories') {
      $('div.body').addClass('backColor');
    } else {
      $('div.body').removeClass('backColor');
    }
  }

  render() {
    // igor: apply function: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
    return h("section.step"
      + ( (this.params.name=='result' || this.params.name=='story') && window.innerWidth > 600 ? ".wide" : ""),
      h('p.error', this.error ? 'Sorry, we didn\'t recognise that postcode!' : ''),
      h.apply(null,
        ["div.cards"].concat(this.headers).concat(this.cardGroups)
      )
    )
  }
}

class CardGroup {

  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    const cards = self.data.cards.map(function(card){
      return (new Card(card));
    })

    return h('.card-carousel.layer',
      h('div',
        h.apply(null,
          ["div.slick-container",{role: "listbox"}].concat(cards)
        )
      )
    )
  }
}

class Card {
  constructor(data) {
    this.cardContent = new CardContent(data);
    this.data = data;
  }

  render() {
    // todo: something is not right here...
    delete CardTemplates.card.content[0].content[1].template;
    CardTemplates.card.content[0].content[1].content = this.cardContent;
    return helpers.assembleCards(this.data, CardTemplates.card);
  }
}

class CardContent {

  constructor(data) {
    console.log(data)
    this.data = data;
  }

  render() {

    const self = this;
    var data = self.data; // todo: const data is redeclared somewhere - this is not good. investigate where is it redeclared

    switch (self.data.type) {

      case 'postcode':
        data.isWaiting = model.user.isWaiting === "postcode-input";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.user.isWaiting = "postcode-input";
          helpers.rerender();
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
        // todo: duplicating code - should be a function for processing results?
        if(model.user.resultsOptions.length){
          const latestResults = model.user.resultsOptions[model.user.resultsOptions.length-1];
          data.constituencyResults = {
            heading: latestResults.text.heading,
            subheading: latestResults.text.subheading,
            constituencies: latestResults.seats.map(function(seat){
              return {
                location: seat.location,
                parties: seat.parties.map(function(party){
                  return party.name;
                }).join(" vs ")
              }
            })
          }
        }
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.user.isWaiting = "vote-worth";
          helpers.rerender();
          api.getPostcodeOptions(model.user.postcode).then(function(results){
            model.user.isWaiting = false;
            if (results.error) {
              // todo: duplicating code + refactor this
              console.log("Sorry, we didn't recognise that postcode!")
              routes.step({
                name: 'vote-worth',
                type: 'step',
                error: 'bad-postcode',
              }).replace();
            } else {
              model.user.resultsOptions.push(results);
              helpers.rerender();
            }
          });
          return false;
        }
        return helpers.assembleCards(data, 'voteWorth');

      case 'postcode-compare':
        data.isWaiting = model.user.isWaiting === "postcode-compare";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeUniBinding = [model.user, 'postcode_uni'];
        // todo: duplicating code - should be a function for processing results?
        if(model.user.resultsCompare.length){
          const latestResults = model.user.resultsCompare[model.user.resultsCompare.length-1];
          data.constituencyResults = {
            heading: latestResults.text.heading,
            subheading: latestResults.text.subheading,
            constituencies: latestResults.seats.map(function(seat){
              return {
                location: seat.location,
                parties: seat.parties.map(function(party){
                  return party.name;
                }).join(" vs ")
              }
            })
          }
        }
        data.onLearnMore = function(e){
          e.stopPropagation();
          routes.root().push();
        }
        data.postcodeSubmit = function(e){
          e.stopPropagation();
          model.user.isWaiting = "postcode-compare";
          api.comparePostcodes(model.user.postcode, model.user.postcode_uni).then(function(results){
            delete model.user.isWaiting;
            if (results.error) {
              // todo: duplicating code + refactor this
              console.log("Sorry, we didn't recognise that postcode!")
              routes.step({
                name: 'postcode-compare',
                type: 'step',
                error: 'bad-postcode',
              }).replace();
            } else {
              model.user.resultsCompare.push(results);
              helpers.rerender();
            }
          });
          return false;
        }
        return helpers.assembleCards(data, 'postcodeCompare');

      case 'result':
        // igor: todo: this will be removed as this was developed especially for demo on 25 Apr 2017, so no refactoring needed here
        // igor: todo: this is very ugly, so needs to be refactored asap
        $("h1").addClass("hide");
        window.setTimeout(function(){
          $("h1").removeClass("hide");
        })
        $(".slick-container").addClass("hide")
        window.setTimeout(function(){
          $(".slick-container:not(.slick-initialized)").removeClass("hide").slick({
            dots: false,
            infinite: false,
            adaptiveHeight: true,
            // centerMode: true,
            centerPadding: '15px',
            slidesToShow: 1,
            arrows: true,
            variableWidth: true,
            // swipeToSlide: true
          });
        },100)
        const description = helpers.markdownToHtml(self.data.description);
        return h('div.content.text-left',
          h('img', {'src': self.data.image, 'class': 'party-logo'}),
          h('h2', self.data.name),
          h('div.body-content'/*,
            h.rawHtml('p', description)*/
          ),
          (self.data.footer?
            h('div.footer',
              self.data.footer.map(function(elem){
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

      case 'story':
        // igor: todo: this will be removed as this was developed especially for demo on 25 Apr 2017, so no refactoring needed here
        // igor: todo: this is very ugly, so needs to be refactored asap
        $("h1").addClass("hide");
        window.setTimeout(function(){
          $("h1").removeClass("hide");
        })
        $(".slick-container").addClass("hide")
        window.setTimeout(function(){
          var slickContainer = $(".slick-container:not(.slick-initialized)").removeClass("hide").slick({
            dots: false,
            infinite: false,
            // adaptiveHeight: true,
            // centerMode: true,
            centerPadding: '15px',
            slidesToShow: 1,
            arrows: true,
            // variableWidth: true,
            // swipeToSlide: true
          });
          slickContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('div.body').addClass('backColor').css('background-color', allParties.filter(function(party) {
              return party.key == partyStories[nextSlide].party;
            })[0].colorLight);
          });
        },100)
        self.data.name = self.data.header;
        self.data.description = self.data.content;
        return helpers.assembleCards(self.data, 'Organization');

      case 'question':
        const tasksDom = [];
        self.data.tasks.forEach(function(name) {
          const task = model.tasks[name];
          task.dataUpdates = [{data: ("user.opinions.issues."+self.data.issueKey+".debates."+self.data.debateKey+".opinion"), value: task.goto.opinion}]
          tasksDom.push(
            routes[(self.data.nextQuestion&&task.goto.name==="question"?"step":task.goto.type)]({
              name: self.data.nextQuestion?task.goto.name:(task.goto.name!=="question"?task.goto.name:self.data.final),
              task: name,
              nextQuestion: self.data.nextQuestion,
              final: self.data.final,
              next: self.data.nextStep?self.data.nextStep:task.goto.next
            }).a( { "class": "task " + (task.subtype?" "+task.subtype:"")},
              h('h5', task.label)
            )
          );
        });
        return h('.content',
          h('h2', self.data.name),
          h('div.body-content',
            h.rawHtml('p', helpers.markdownToHtml(self.data.description))
          ),
          h('section.questions',tasksDom)
        )

      default:
        console.log('Defaulting');
        return helpers.assembleCards(self.data, self.data.type);

    }

  }

}

// todo: this will not be needed soon
class ShareButtons {
  render() {
    return h("div.share-buttons",
      h("p","Share this to help friends and family #GE2017"),
      h("a.discard-card-style",{target:"_blank",href: "https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button"},
        h("button.btn.btn-facebook","Facebook")
      ),
      h("a.discard-card-style",{target:"_blank",href: "https://twitter.com/intent/tweet?text="+"I know how to use my %23GE2017 vote" + (model.user.constituency ? " in %23" + model.user.constituency.name.replace(/\s/g, '') : "") + ". How are you using your vote? ge2017.com"},
        h("button.btn.btn-twitter","Twitter")
      )
    );
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

function getResults(){
  return new Promise(function(resolve,reject){
    api.getResults(model.user.postcode, model.user)
      .then(function(results) {
        helpers.updateObject(model.user, results.data.user);
        // igor: We have to refactor results a bit to make them reusable in cards
        // igor: change this content to create cards based on the data you retrieve
        // igor: in content you can use your markup language [...](...) or simple HTML, both will work just fine
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
              type: "Organization" // Temporary
            }
          ],
          shareButtonCard,
          extraCards
        ]);
        resolve();
      }
    )
  })
}

const templatesUrl = '//explaain-api.herokuapp.com/templates';
helpers.loadTemplates(templatesUrl).then(function(templates){
  for(var key in templates){
    CardTemplates[key] = templates[key];
  };
  // for development purposes, populates temporary templates for CardTemplates
  // todo: 1) wait for refactoring to complete
  //       2) move templates from development/templates.js to server
  //       3) comment the lines below or remove it completely
  require("../development/templates.js")(CardTemplates);
  require("../development/model.js")(model);
  hyperdom.append(document.body, new App());
});
