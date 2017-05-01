var hyperdom = require('hyperdom');
var h = hyperdom.html;
var router = require('hyperdom-router');
var api = require('../services/APIService');
var http = require('httpism');

var routes = {
  root: router.route('/'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name')
};

router.start();

const model = require('../models/model')
Model = model;
var CardTemplates = {};

class App {
  constructor(data) {
    this.header = new Header();

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
            "question-agree",
            "question-neutral",
            "question-disagree"
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
      routes.root().a(
        h("img.ge2017-logo", {"src": "/img/logo.png"}),
        h("i.fa.fa-th-large.menu")
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
          updateData(task.dataUpdates);
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

class Question {
  constructor(params) {

  }
}

class Step {
  constructor(params) {
    this.step = model.steps[params.name];
    this.error = params.error;

    if (params.task && model.tasks[params.task].dataUpdates)
      updateData(model.tasks[params.task].dataUpdates);

    var data = {
      sliders: []
    };
    switch (params.name) {

      case 'postcode':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.sliders.push([{
          type: 'postcode',
          name: 'Please enter your postcode:',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'vote-worth':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.sliders.push([{
          type: 'postcode',
          name: 'Want to see how much your vote is worth?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'postcode-compare':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.sliders.push([{
          type: 'postcode',
          name: 'Student and not sure where to vote from?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'result':
        model.landedOnResult = 1; // todo: temporary, refactor
        model.user.results[model.user.results.length-1].forEach(function(cards){
          data.sliders.push(cards)
        })
        break;

      case 'story':
        // var cards = [];
        // partyStories.forEach(function(card) {
        //   card.push({
        //
        //   });
        // })
        data.sliders.push(partyStories)
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
        data.sliders.push([{
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
        data.sliders.push([{
          name: "Goodness me, you're early! 😳",
          description: "This feature is coming soon...! 👻"
        }])
    }
    this.sliders = data.sliders.map(function(cards){
      if(!cards.nextStep){
        cards.nextStep = params.next;
      }
      return (new CardSlider({cards:cards,nextStep:params.next,type: params.name}));
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
    if (this.step.label == 'Party stories') {
      $('div.body').addClass('backColor');
    } else {
      $('div.body').removeClass('backColor');
    }
  }

  render() {
    // igor: apply function: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
    return h("section.step",
      h('p.error', this.error ? 'Sorry, we didn\'t recognise that postcode!' : ''),
      h.apply(null,
        ["div.cards"].concat(this.headers).concat(this.sliders)
      )
    )
  }
}

class CardSlider {
  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    const cards = self.data.cards.map(function(card){
      card.nextStep = self.data.nextStep;
      card.type = self.data.type;
      return (new Card(card));
    })

    return h('div.card-carousel.layer',
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
    // igor: this doesn't seem right as CardTemplates should never be modified
    // igor: to refactor
    delete CardTemplates.card[0].content[0].content[1].template;
    CardTemplates.card[0].content[0].content[1].content = this.cardContent;
    return getCardDom(this.data, CardTemplates.card)[0];

    // return h('div.card',
    //   h('div.card-visible',
    //     h('div.close'),
    //     this.cardContent,
    //     h('a.card-icon.external', {'href': 'http://api.explaain.com/Detail/5893a4f189218d1200c75e51'},
    //       h('img', {'src': 'http://app.explaain.com/card-logo.png'})
    //     )
    //   )
    // )
  }
}

// igor: local "loading" didn't work because after onclick it triggers render() immediately and... redefines loading to "false" :)
// igor: a better way to go is to have a global user state as "isWaiting", that should make sense!

class CardContent {
  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    switch (this.data.type) {
      case 'postcode':
        var data = this.data; //Necessary??
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          $(e.srcElement).html('<img class="loading showing" src="/img/loading.gif">');
          model.user.isWaiting = true;
          getResults().then(function(){
            routes.step({ name: data.nextStep, type: data.type }).push();
          });
          return false;
        }
        console.log(CardTemplates['postcodeInput'])
        console.log(data)
        return h('div', getCardDom(data, CardTemplates['postcodeInput']));
        // return h('.content',
        //   h('h2', this.data.name),
        //   h('div.body-content',
        //     h('form.postcode-form',
        //       {
        //         'class': { 'hide': model.user.isWaiting },
        //         'onsubmit': function(e) {
        //           e.stopPropagation();
        //           model.user.isWaiting = true;
        //           getResults().then(function(){
        //             routes.step({ name: data.nextStep, type: data.type }).push();
        //           });
        //           return false;
        //         }
        //       },
        //       h('input.form-control', { autofocus: true, type: "text", 'name': 'postcode', 'placeholder': 'Postcode', binding: [model.user, 'postcode'] }),
        //       h('button.btn.btn-success', {type: "submit"}, "Go!")
        //     ),
        //     h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
        //     h('p', this.data.description)
        //   )
        // )
        break;


      case 'vote-worth':
        var data = this.data;
        return h('.content',
          h('h2', { 'class': {'hide': model.user.resultsOptions.length }}, this.data.name),
          h('div.body-content',
            h('form.postcode-form',
              {
                'class': { 'hide': model.user.isWaiting },
                'onsubmit': function(e) {
                  e.stopPropagation();
                  model.user.isWaiting = true;
                  api.getPostcodeOptions(model.user.postcode).then(function(results){
                    model.user.isWaiting = false;
                    if (results.error) {
                      console.log("Sorry, we didn't recognise that postcode!")
                      routes.step({
                        name: 'vote-worth',
                        type: 'step',
                        error: 'bad-postcode',
                      }).replace();
                    } else {
                      model.user.resultsOptions.push(results);
                      routes.step({
                        name: 'vote-worth',
                        type: 'step',
                        next: data.nextStep,
                        attempt: model.user.resultsOptions.length
                      }).replace();
                    }
                  });
                  return false;
                }
              },
              h('input.form-control', { autofocus: true, type: "text", 'name': 'postcode', 'placeholder': 'Home Postcode', binding: [model.user, 'postcode'] }),
              // h('input.form-control', { type: "text", 'name': 'postcode-uni', 'placeholder': 'Uni Postcode', binding: [model.user, 'postcode_uni'] }),
              h('button.btn.btn-success', {type: "submit"}, "Compare")
            ),
            (model.user.resultsOptions.length?
              h("div.seats",{'class': { 'hide': model.user.isWaiting }},
                [
                  h("div.bold",model.user.resultsOptions[model.user.resultsOptions.length-1].text.heading),
                  h("div",model.user.resultsOptions[model.user.resultsOptions.length-1].text.subheading)
                ].concat(model.user.resultsOptions[model.user.resultsOptions.length-1].seats.map(function(seat){
                  return h("div.seat.column50",
                    h("div.location.small",seat.location),
                    h("div.versus.bold.line1em",{style: {border: "solid 1px " /*+ seat.color*/}},seat.parties.map(function(elem){return elem.name;}).join(" vs "))
                  )
                })).concat([
                  /*h("p.small.line1em",
                    h(".small","Not convinced it's worth it? 😱"),
                    h("a.discard-card-style.small",{
                      onclick: function(e){
                        // do something
                      }
                    },"Click here for 5 reason it is >")
                  )*/
                  (new ShareButtons())
                ])
              )
              :
              undefined
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
            h('p', { 'class': {'hide': model.user.resultsOptions.length }}, this.data.description)
          ),
          h('div.footer',
            (
              !model.user.resultsOptions.length?
              [
                h("div.bold","or go straight to register"),
                h("p",
                  h("a.discard-card-style",{href:"https://www.gov.uk/register-to-vote",target:"_blank"},
                    h("button.btn.btn-primary","Register >")
                  )
                ),
                h("p.small", "This link will take you to the official gov.uk website")
              ]
              :
              [
                h(".column50",
                  h("p",
                    routes.root().a({"class":"discard-card-style"},
                      h("button.btn.btn-success","Learn more")
                    )
                  ),
                  h("p.small",
                    h("br"),
                    h("br")
                  )
                ),
                h(".column50",
                  h("div.big.bold","Go and register!"),
                  h("p",
                    h("a.discard-card-style",{href:"https://www.gov.uk/register-to-vote",target:"_blank"},
                      h("button.btn.btn-primary","Register >")
                    )
                  ),
                  h("p.small", "This link will take you to the official gov.uk website")
                )
              ]
            )
          )
        )
        break;

      case 'postcode-compare':
        var data = this.data;
        //return h('div', getCardDom(data, CardTemplates['postcodeCompare']));
        return h('.content',
          h('h2', { 'class': {'hide': model.user.resultsCompare.length }}, this.data.name),
          h('div.body-content',
            h('form.postcode-form',
              {
                'class': { 'hide': model.user.isWaiting },
                'onsubmit': function(e) {
                  e.stopPropagation();
                  model.user.isWaiting = true;
                  api.comparePostcodes(model.user.postcode, model.user.postcode_uni).then(function(results){
                    if (results.error) {
                      console.log("Sorry, we didn't recognise that postcode!")
                      routes.step({
                        name: 'postcode-compare',
                        type: 'step',
                        error: 'bad-postcode',
                      }).replace();
                    } else {
                      model.user.isWaiting = false;
                      model.user.resultsCompare.push(results);
                      routes.step({
                        name: 'postcode-compare',
                        type: 'step',
                        next: data.nextStep,
                        attempt: model.user.resultsCompare.length
                      }).replace();
                    }
                  });
                  return false;
                }
              },
              h('input.form-control', { autofocus: true, type: "text", 'name': 'postcode', 'placeholder': 'Home Postcode', binding: [model.user, 'postcode'] }),
              h('input.form-control', { type: "text", 'name': 'postcode-uni', 'placeholder': 'Uni Postcode', binding: [model.user, 'postcode_uni'] }),
              h('button.btn.btn-success', {type: "submit"}, "Compare")
            ),
            (model.user.resultsCompare.length?
              h("div.seats",{'class': { 'hide': model.user.isWaiting }},
                [
                  h("div.bold",model.user.resultsCompare[model.user.resultsCompare.length-1].text.heading),
                  h("div",model.user.resultsCompare[model.user.resultsCompare.length-1].text.subheading)
                ].concat(model.user.resultsCompare[model.user.resultsCompare.length-1].seats.map(function(seat){
                  return h("div.seat.column50",
                    h("div.location.small",seat.location),
                    h("div.versus.bold.line1em",{style: {border: "solid 1px " /*+ seat.color*/}},seat.parties.map(function(elem){return elem.name;}).join(" vs "))
                  )
                })).concat([
                  /*h("p.small.line1em",
                    h(".small","Not convinced it's worth it? 😱"),
                    h("a.discard-card-style.small",{
                      onclick: function(e){
                        // do something
                      }
                    },"Click here for 5 reason it is >")
                  )*/
                  (new ShareButtons())
                ])
              )
              :
              undefined
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
            h('p', { 'class': {'hide': model.user.resultsCompare.length }}, this.data.description)
          ),
          h('div.footer',
            (
              !model.user.resultsCompare.length?
              [
                h("div.bold","or go straight to register"),
                h("p",
                  h("a.discard-card-style",{href:"https://www.gov.uk/register-to-vote",target:"_blank"},
                    h("button.btn.btn-primary","Register >")
                  )
                ),
                h("p.small", "This link will take you to the official gov.uk website")
              ]
              :
              [
                h(".column50",
                  h("p",
                    routes.root().a({"class":"discard-card-style"},
                      h("button.btn.btn-success","Learn more")
                    )
                  ),
                  h("p.small",
                    h("br"),
                    h("br")
                  )
                ),
                h(".column50",
                  h("div.big.bold","Go and register!"),
                  h("p",
                    h("a.discard-card-style",{href:"https://www.gov.uk/register-to-vote",target:"_blank"},
                      h("button.btn.btn-primary","Register >")
                    )
                  ),
                  h("p.small", "This link will take you to the official gov.uk website")
                )
              ]
            )
          )
        )
        break;

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
            centerMode: true,
            centerPadding: '15px',
            slidesToShow: 1,
            arrows: false
          });
        },100)
        const content = markdownToHtml(this.data.content);
        return h('div.content.text-left',
          h('img', {'src': this.data.image, 'class': 'party-logo'}),
          h('h2', this.data.header),
          h('div.body-content',
            h.rawHtml('p', content)
          ),
          (this.data.footer?
            h('div.footer',
              this.data.footer.map(function(elem){
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
            adaptiveHeight: true,
            centerMode: true,
            centerPadding: '15px',
            slidesToShow: 1,
            arrows: false
          });
          slickContainer.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            $('div.body').addClass('backColor').css('background-color', allParties.filter(function(party) {
              return party.key == partyStories[nextSlide].party;
            })[0].colorLight);
          });
        },100)
        return h('div.content.text-left',
          h('img', {'src': this.data.image, 'class': 'party-logo'}),
          h('h2', this.data.header),
          h('div.body-content',
            h.rawHtml('p', markdownToHtml(this.data.content))
          ),
          (this.data.footer?
            h('div.footer',
              this.data.footer.map(function(elem){
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

      case 'question':
        const tasksDom = [];
        this.data.tasks.forEach(function(name) {
          const task = model.tasks[name];
          task.dataUpdates = [{data: ("user.opinions.issues."+self.data.issueKey+".debates."+self.data.debateKey+".opinion"), value: task.goto.opinion}]
          tasksDom.push(
            routes[(self.data.nextQuestion&&task.goto.name==="question"?"step":task.goto.type)]({
              name: self.data.nextQuestion?task.goto.name:(task.goto.name!=="question"?task.goto.name:self.data.final),
              task: name,
              nextQuestion: self.data.nextQuestion,
              final: self.data.final,
              next: self.data.nextStep?self.data.nextStep:task.goto.next
            }).a( { "class": "task" + (task.subtype?" "+task.subtype:"")},
              h('h5', task.label)
            )
          );
        });
        return h('.content',
          h('h2', this.data.name),
          h('div.body-content',
            h.rawHtml('p', markdownToHtml(this.data.description))
          ),
          h('section.questions',tasksDom)
        )

      default:
        return h('.content',
          h('h2', this.data.name),
          h('div.body-content',
            h('p', this.data.description)
          )
        )
    }
    if (this.data.type == 'postcode') {

    } else {
      return h('.content',
        h('h2', this.data.name),
        h('div.body-content',
          h('p', this.data.description)
        )
      )
    }
  }

}

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

updateData = function(dataUpdates) {
  dataUpdates.forEach(function(update) {
    updateModel(update.data, update.value, update.action);
  });
}

// igor: we now need different actions for tasks, the one of them is "toggle"
// igor: "toggle" works like a checkbox
// igor: by default it just sets the value
function updateModel(path, value, action) {
    var schema = model;  // a moving reference to internal objects within model
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    switch(action){
      case "toggle":
        if(schema[pList[len-1]]){
          delete schema[pList[len-1]];
        } else {
          schema[pList[len-1]] = value;
        }
        break;
      default:
        schema[pList[len-1]] = value;
    }

}

function getModel(path){
  return getObjectPathProperty(model, path);  // a moving reference to internal objects within model
}

function getObjectPathProperty(object, path){
  var schema = object;  // a moving reference to internal objects within the object
  var pList = path.split('.');
  var len = pList.length;
  for(var i = 0; i < len-1; i++) {
      var elem = pList[i];
      if( !schema[elem] ) schema[elem] = {}
      schema = schema[elem];
  }
  return schema[pList[len-1]];
}

function getResults(){
  return new Promise(function(resolve,reject){
    api.getResults(model.user.postcode, model.user)
      .then(function(results) {
        updateObject(model.user, results.data.user);
        model.user.isWaiting = false;
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
          extraCards = [];
        } else {
          results.parties[0].matches.plus.forEach(function(match) {
            yourParty += '<i class="fa fa-check" aria-hidden="true"></i> '
            + match.description + '<br>';
          })
          results.parties[0].chances.plus.forEach(function(chance) {
            yourArea += '<i class="fa fa-check" aria-hidden="true"></i> '
            + chance.description + '<br>';
          })
          extraCards = [
            {
              header: "You and your matched party",
              content: yourParty
            },
            {
              header: "You and your area",
              content: yourArea
            }
          ];
        }
        model.user.results.push([
          [
            {
              image: results.parties[0] && results.parties[0].image && ("/img/party-logos/" + results.parties[0].image) || '/img/party-logos/party.jpg',
              header: results.parties[0] && results.parties[0].name,
              content: results.parties[0] && results.parties[0].description || "We don't have a description for this party yet!",
              footer: [
                yourFooter
              ]
            }
          ],
          extraCards
        ]);
        resolve();
      }
    )
  })
}

function getResultsCompare(){
  return new Promise(function(resolve,reject){
    // igor: todo: change this to real API call instead of set timeout!
    setTimeout(function(){
      model.user.isWaiting = false;
      model.user.resultsCompare.push({
        seats: [
          {
            location: "Eastborne",
            parties: ["Conservative","Lib Dem"],
            color: "#000099"
          },
          {
            location: "Bristol South",
            parties: ["Labour","Conservative"],
            color: "#990000"
          }
        ]
      });
      resolve();
    },1000)
  })
};

var updateObject = function(obj, objUpdates) {
  var objKeys = Object.keys(objUpdates);
  objKeys.forEach(function(key) {
    obj[key] = objUpdates[key];
  })
  return obj;
}

var markdownToHtml = function(text) {
  return text.replace(/\[([^\]]+)\]\(([^\)]+)\)/g,"<a class='internal' tabindex='-1' href='$2'>$1</a>");
}



var getCardDom = function(data, template) {
  console.log(template)
  data.type = data.type || data["@type"].split('/')[data["@type"].split('/').length-1];
  var dom = [];
  template.forEach(function(element) {
    var content,
        attr = {};
    if (element.template)
      content = getCardDom(data, CardTemplates[element.template.var ? getObjectPathProperty(data, element.template.var) : element.template])
    else if (!element.content)
      content = '';
    else if (element.content.constructor === Array)
      content = getCardDom(data, element.content);
    else if (element.content.var)
      content = getObjectPathProperty(data, element.content.var) || ''; //'var' MUST use dot notation, not []
    else
      content = element.default ? element.default : element.content;

    if (element.attr) {
      var attrKeys = Object.keys(element.attr);
      attrKeys.forEach(function(attrKey) {
        attr[attrKey] = element.attr[attrKey].var ? getObjectPathProperty(data, element.attr[attrKey].var) :  element.attr[attrKey]; //'var' MUST use dot notation, not []
      })
    }
    dom.push(h(element.dom, attr, content));
  });
  return dom;
}

const loadTemplates = function(templateUrl){
  return new Promise(function(resolve,reject){
    http.get(templateUrl)
    .then(function (res) {
      resolve(res.body);
    });
  });
}

const _temporaryTemplates = function(){
  var tempData = {
    name: "Barack Obama",
    description: "Barack Hussein Obama II is the 44th and current President of the United States. He is the first African American to hold the office. In January 2005, Obama was sworn in as a U.S.",
    "@id": "http://localhost:5002/Person/58d8f23994a3d81e88797d09",
    "@type": "http://localhost:5002/Person"
  };
  CardTemplates.card = [
    {
      "dom": "div.card",
      "attr": {
        "data-uri": {
          "var": "@id",
        },
        "style": "height: auto"
      },
      "content": [
        {
          "dom": "div.card-visible",
          "content": [
            {
              "dom": "div.close",
              "content": [
                {
                  "dom": "i.fa.fa-times",
                  "attr": {
                    "data-hidden": "true"
                  }
                }
              ]
            },
            {
              "dom": "div.content",
              "attr": {
                "class": {
                  "var": "@type"
                }
              },
              "template": {
                "var": "type"
              }
            },
            {
              "dom": "a.card-icon",
              "attr": {
                "target": "_blank",
                "tabindex": "-1"
              },
              "content": [
                {
                  "dom": "img",
                  "attr": {
                    "src": "http://app.explaain.com/card-logo.png"
                  }
                }
              ]
            }
          ]
        },
        {
          "dom": "button.edit-button",
          "attr": {
            "tabindex": "-1"
          },
          "content": [
            {
              "dom": "i.fa.fa-pencil",
              "attr": {
                "aria-hidden": "true"
              }
            }
          ]
        }
      ]
    }
  ];
  CardTemplates["Person"] = [
    {
      "dom": "h2",
      "content": {
        "var": "name"
      }
    },
    {
      "dom": "div.card-image",
      "content": [{
        "dom": "img",
        "attr": {"src": {
          "var": "image"
        }}
      }]
    },
    {
      "dom": "div.body-content",
      "content": {
        "var": "description",
        "markdown": true
      }
    }
  ];
  CardTemplates.postcodeCompare = [
    {
      "dom": "h2",
      "content": {
        "var": "name",
        "default": "Please enter your postcode"
      }
    },
    {
      "dom": "div.body-content",
      "content": [
        {
          "dom": "form.postcode-form",
          "attr": {
            "onsubmit": {
              "var": "postcodeSubmit"
            }
          },
          "content": [
            {
              "dom": "input.form-control",
              "attr": {
                "autofocus": "true",
                "type": "text",
                "name": "postcode",
                "placeholder": "Home Postcode",
                "binding": {
                  "var": "postcodeBinding"
                }
              }
            },
            {
              "dom": "input.form-control",
              "attr": {
                "autofocus": "true",
                "type": "text",
                "name": "postcode",
                "placeholder": "Uni Postcode",
                "binding": {
                  "var": "postcodeUniBinding"
                }
              }
            },
            {
              "dom": "button.btn.btn-success",
              "attr": {
                "type": "submit"
              },
              "content": "Compare"
            }
          ]
        },
        {
          "dom": "h3",
          "content": {
            "var": "subheading"
          }
        },
        {
          "dom": "p",
          "content": {
            "var": "description",
            "markdown": true
          }
        }
      ]
    },

  ]

  CardTemplates.voteNow = [
    {
      "dom": ".footer",
      "content": [
        {
          "dom": ".bold",
          "content": "or go straight to register"
        },
        {
          "dom": "p",
          "content": [
            {
              "dom": "a.discard-card-style",
              "attr": {
                "href": "https://www.gov.uk/register-to-vote",
                "target":"_blank",
              },
              "content": [
                {
                  "dom": "button.btn.btn-primary",
                  "content": "Register >"
                }
              ]
            }
          ]
        },
        {
          "dom": "p.small",
          "content": "This link will take you to the official gov.uk website"
        }
      ]
    }
  ]

  console.log(tempData);
  console.log(CardTemplates.card);
  var tempDom = getCardDom(tempData, CardTemplates.card);
  console.log(tempDom);
  console.log(CardTemplates)
}



loadTemplates('//explaain-api.herokuapp.com/templates').then(function(_templates){
  CardTemplates = _templates;
  _temporaryTemplates(); // todo: this is needed for development purposes, move templated to backend once tested
  hyperdom.append(document.body, new App());
});
