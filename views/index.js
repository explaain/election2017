var hyperdom = require('hyperdom');
var h = hyperdom.html;
var router = require('hyperdom-router');
var api = require('../services/APIService');

var routes = {
  root: router.route('/'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name')
};

router.start();

const model = require('../models/model')

class App {
  constructor() {
    this.header = new Header();
  }

  render() {

    return h('div',
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
  }
}


class Header {
  render() {
    return h("header",
      routes.root().a(
        h("i.fa.fa-th-large.menu")
      )
    )
  }
}


class Dashboard {

  constructor(params) {
    this.dashboard = model.dashboards[params.dashboard] || { title: "Goodness me, you're early! 😳", subtitle: "This feature is coming soon...! 👻", tasks: []};
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

    if (params.task && model.tasks[params.task].dataUpdates)
      updateData(model.tasks[params.task].dataUpdates);

    var data = {
      sliders: []
    };
    switch (params.name) {

      case 'postcode':
        data.sliders.push([{
          type: 'postcode',
          name: 'Where are you voting from?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'postcode-compare':
        data.sliders.push([{
          type: 'postcode',
          name: 'Student and not sure where to vote from?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'result':
        model.user.results[model.user.results.length-1].forEach(function(cards){
          data.sliders.push(cards)
        })
        break;

      case 'question':
        var quizFlow = [];
        model.user.quizFlow.forEach(function(quiz){
          quizFlow = quizFlow.concat(quiz);
        })
        const questionName = params.nextQuestion?params.nextQuestion:quizFlow[0];
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
          name: question.question,
          tasks: question.tasks,
          nextQuestion: nextQuestion,
          final: finalStep
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
    if(this.step.label){
      this.headers.push(
        h("h1",this.step.label)
      );
    }

  }

  render() {
    // igor: apply function: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
    return h("section.step",
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
    return h('div.card',
      h('div.card-visible',
        h('div.close'),
        this.cardContent,
        h('a.card-icon.external', {'href': 'http://explaain.com'},
          h('img', {'src': 'http://app.explaain.com/card-logo.png'})
        )
      )
    )
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
        var data = this.data;
        return h('content',
          h('h2', this.data.name),
          h('div.body-content',
            h('form.postcode-form',
              {
                'class': { 'hide': model.user.isWaiting },
                'onsubmit': function(e) {
                  e.stopPropagation();
                  model.user.isWaiting = true;
                  getResults().then(function(){
                    routes.step({ name: data.nextStep, type: data.type }).push();
                  });
                  return false;
                }
              },
              h('input.form-control', { autofocus: true, type: "text", 'name': 'postcode', 'placeholder': 'Postcode', binding: [model.user, 'postcode'] }),
              h('button.btn.btn-success', {type: "submit"}, "Go!")
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
            h('p', this.data.description)
          )
        )
        break;


      case 'postcode-compare':
        var data = this.data;
        return h('content',
          h('h2', { 'class': {'hide': model.user.resultsCompare.length }}, this.data.name),
          h('div.body-content',
            h('form.postcode-form',
              {
                'class': { 'hide': model.user.isWaiting },
                'onsubmit': function(e) {
                  e.stopPropagation();
                  model.user.isWaiting = true;
                  getResultsCompare().then(function(){
                    routes.step({
                      name: 'postcode-compare',
                      type: 'step',
                      next: data.nextStep,
                      attempt: model.user.resultsCompare.length
                    }).replace();
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
                  h("div.bold","Looks like you're spoilt for your choice"),
                  h("div","Both are contested seats")
                ].concat(model.user.resultsCompare[model.user.resultsCompare.length-1].seats.map(function(seat){
                  return h("div.seat",
                    h("div.location.small",seat.location),
                    h("div.versus.bold.line1em",{style: {border: "solid 1px " + seat.color}},seat.parties.join(" vs "))
                  )
                })).concat([
                  h("p.small.line1em",
                    h(".small","Not convinced it's worth it? 😱"),
                    h("a.small",{
                      onclick: function(e){
                        // do something
                      }
                    },"Click here for 5 reason it is >")
                  )
                ])
              )
              :
              undefined
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
            h('p', { 'class': {'hide': model.user.resultsCompare.length }}, this.data.description)
          ),
          h('div.footer',
            h("p",(model.user.resultsCompare.length?"Go and register!":"or go straight to register")),
            h("p",
              h("a",{href:"http://gov.uk#learnmore",target:"_blank"},
                h("button.btn.btn-link","Learn more")
              ),
              h("a",{href:"http://gov.uk",target:"_blank"},
                h("button.btn.btn-primary","Register >")
              )
            ),
            h("p.small", "This link will take you to the official gov.uk website")
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
        const content = this.data.content.replace(/\[([^\]]+)\]\(([^\)]+)\)/g,"<a class='internal' tabindex='-1' href='$2'>$1</a>");
        return h('div.content.text-left',
          h('img', {'src': this.data.image, 'class': 'party-logo'}),
          h('h2', this.data.header),
          h('div.body-content',
            h.rawHtml('p', content)
          ),
          (this.data.footer?
            h('div.footer',
              h.rawHtml('p', this.data.footer)
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
          tasksDom.push(
            routes[(self.data.nextQuestion&&task.goto.name==="question"?"step":task.goto.type)]({
              name: self.data.nextQuestion?task.goto.name:(task.goto.name!=="question"?task.goto.name:self.data.final),
              task: name,
              nextQuestion: self.data.nextQuestion,
              final: self.data.final,
              next: self.data.nextStep?self.data.nextStep:task.goto.next
            }).a( { "class": "task" + (task.subtype?" "+task.subtype:"")  },
              h('h5', task.label)
            )
          );
        });
        return h('content',
          h('h2', this.data.name),
          h('div.body-content',
            h('p', this.data.description)
          ),
          h('section.questions',tasksDom)
        )

      default:
        return h('content',
          h('h2', this.data.name),
          h('div.body-content',
            h('p', this.data.description)
          )
        )
    }
    if (this.data.type == 'postcode') {

    } else {
      return h('content',
        h('h2', this.data.name),
        h('div.body-content',
          h('p', this.data.description)
        )
      )
    }
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
  var schema = model;  // a moving reference to internal objects within model
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
        model.user.isWaiting = false;
        // igor: We have to refactor results a bit to make them reusable in cards
        // igor: change this content to create cards based on the data you retrieve
        // igor: in content you can use your markup language [...](...) or simple HTML, both will work just fine
        model.user.results.push([
          [
            {
              image: results.parties[0].image || '/img/party-logos/party.jpg',
              header: results.parties[0].name,
              content: results.parties[0].description || "Description...",
              footer:
                '<p>Share this to help friends and family #GE2017</p>'+
                '<a class="discard-card-style" href="https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=https%3A%2F%2Fdevelopers.facebook.com%2F&display=popup&ref=plugin&src=share_button" target="_blank"><button class="btn btn-facebook">Facebook</button></a>'+
                '<a class="discard-card-style" href="https://twitter.com/intent/tweet?text='+model.user.postcode+'" target="_blank"><button class="btn btn-twitter">Twitter</button></a>'
            }
          ],
          [
            {
              header: "You and your matched party",
              content: '<i class="fa fa-check" aria-hidden="true"></i> Both you and the Conservatives want Brexit'
            },
            {
              header: "You and your area",
              content: '<i class="fa fa-check" aria-hidden="true"></i> This is a Conservative seat<br /><i class="fa fa-check" aria-hidden="true"></i> This is a SAFE seat with a majority of 9,671 (26.7% of the vote)'
            }
          ]
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

hyperdom.append(document.body, new App());
