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

var model = {

  step: -1,

  user: {
    postcode: '',
    opinions: {
      issues: {}
    },
    results: [],
    quizFlow: [],
    isWaiting: false
  },

  //Dashboards are collections of tasks
  dashboards: {
    home: {
      title: "What do you want to do? 🙋",
      subtitle: "Choose an option below. You can come back here later to choose another!",
      tasks: [
        "brexit",
        "decide",
        "leaders",
        "vote-worth"
      ]
    },
    brexit: {
      title: "What did you want to do about Brexit?",
      subtitle: "Select one option to continue.",
      tasks: [
        "brexit-stop",
        "brexit-support",
        "brexit-commons",
        "brexit-soft"
      ]
    },
    decide: {
      title: "What matters to you?",
      subtitle: "Each topic contains 5 questions that divides or unites the parties.",
      tasks: [
        "issue-nhs",
        "issue-immigration",
        "issue-brexit",
        "issue-education",
        "issue-$apply"
      ]
    }
  },

  //Tasks are a series of steps, and are chosen from the dashboard
  tasks: {
    brexit: {
      icon: 'compass',
      label: "What can I do about Brexit?",
      color: "#42c299",
      goto: {
        type: 'dashboard',
        name: 'brexit'
      }
    },
    decide: {
      icon: 'map-o',
      label: "Decide who to vote for",
      color: "#e74289",
      goto: {
        type: 'dashboard',
        name: 'decide'
      }
    },
    leaders: {
      icon: 'users',
      label: "Learn about the leaders",
      color: "#c042de",
      goto: {
        type: 'dashboard',
        name: 'leaders'
      }
    },
    "vote-worth": {
      icon: 'check-square-o',
      label: "How much does my vote count?",
      color: "#00a2e5",
      goto: {
        type: 'dashboard',
        name: 'vote-worth'
      }
    },
    "brexit-stop": {
      icon: "hand-paper-o",
      label: "Stop it completely",
      color: "#42c299",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.agreement',
          value: 0
        }
      ]
    },
    "brexit-support": {
      icon: "thumbs-o-up",
      label: "Get on with it",
      color: "#e74289",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.agreement',
          value: 5
        }
      ]
    },
    "brexit-commons": {
      icon: "handshake-o",
      label: "Leave but let MPs have a say on the terms",
      color: "#c042de",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.argeement',
          value: 4
        },
        {
          data: 'user.opinions.issues.brexit.vote',
          value: true
        }
      ]
    },
    "brexit-soft": {
      icon: "hand-rock-o",
      label: "I want to stop a hard Brexit",
      color: "#00a2e5",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.agreement',
          value: 3
        }
      ]
    },
    "issue-nhs": {
      icon: 'h-square',
      label: "NHS",
      color: "#42c299",
      // igor: please note, there is no "goto", because this task ONLY sets
      // the value and does NOT routes to a next step
      /*goto: {
      },*/
      dataUpdates: [
        {
          data: 'user.quizFlow.1',
          value: ["nhs1","nhs2"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ]
    },
    "issue-immigration": {
      icon: 'id-card-o',
      label: "Immigration",
      color: "#e74289",
      goto: {
        type: 'dashboard',
        name: 'something'
      }
    },
    "issue-brexit": {
      icon: 'newspaper-o',
      label: "Brexit",
      color: "#c042de",
      goto: {
        type: 'dashboard',
        name: 'something'
      }
    },
    "issue-education": {
      icon: 'graduation-cap',
      label: "Education",
      color: "#00a2e5",
      goto: {
        type: 'dashboard',
        name: 'something'
      }
    },
    "issue-$apply": {
      label: "Submit",
      color: "#42c299",
      goto: {
        type: 'step',
        name: 'question',
        // igor: "final" means the step name where you will be redirected after quiz
        // igor: do not use "next" here, as we do not know what would the next step be (question)
        // igor: "next" will be updated dynamically based on the next question
        final: 'postcode'
      },
      onIf: [
        "user.quizFlow.1"
      ]
    },
    // igor: Those are *answers* to questions. You may utilise any features of tasks here!
    "question-nhs1-1": {
      label: "Go straight to postcode",
      goto: {
        type: 'step',
        name: 'postcode'
      }
    },
    "question-nhs1-2": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      }
    },
    "question-nhs1-3": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      }
    },
    "question-nhs1-4": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      }
    },
    "question-nhs2-1": {
      label: "Go to dashboard",
      goto: {
        type: 'dashboard',
        name: 'decide'
      }
    },
    "question-nhs2-2": {
      label: "Finish quiz",
      goto: {
        type: 'step',
        name: 'question'
      }
    }
  },

  // Steps are essentially pages
  steps: {
    postcode: {
      label: "Please provide your postcode"
    },
    result: {
      label: "Here are your results"
    },
    question: {

    }
  },

  // Questions
  questions: {
    "nhs1": {
      question: "The UK should spend...",
      tasks: [
        "question-nhs1-1",
        "question-nhs1-2"
      ],
      skip: "I don't care"
    },
    "nhs2": {
      question: "The UK should spend!!!",
      tasks: [
        "question-nhs2-1",
        "question-nhs2-2"
      ],
      skip: "I don't care"
    }
  }
};

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
      var taskRoute;
      // igor: now tasks become hidden/shown basing
      // on tasks conditions and model values
      var visible = true;
      if(task.onIf){
        visible = false;
        task.onIf.forEach(function(path){
          if(getModel(path)){
            visible = true;
          }
        })
      }
      console.log("VISIBLE")
      console.log(visible)
      if(task.goto){
        tasksDOM.push(
          routes[task.goto.type](
            { name: task.goto.name, task: name, next: task.goto.next }
          ).a(
            {
              "class": "task"+(visible?"":" hide"),
              "style":{"background-color": task.color}
            },
            h('i.fa.fa-'+task.icon,{attributes: {"aria-hidden":true}}),
            h('h5', task.label)
          )
        );
      } else {
        tasksDOM.push(
          h( "a",
            {
              "class": "task"+(visible?"":" hide"),
              "style":{"background-color": task.color},
              onclick: function(e){
                updateData(task.dataUpdates);
              }
            },
            h('i.fa.fa-'+task.icon,{attributes: {"aria-hidden":true}}),
            h('h5', task.label)
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
      cards.nextStep = params.next;
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
              // igor: function(onclick) is misleading, because it passes the *event*, so function(e) is better
              // igor: also, it is good to wrap inputs and action buttons in the form, because otherwise "submit-on-enter" just won't work
              // igor: make sure to stop the propagation and return false to stop the default behaviour of a form
              {
                'class': { 'hide': model.user.isWaiting },
                'onsubmit': function(e) {
                  e.stopPropagation();
                  model.user.isWaiting = true;
                  // igor: todo: this will be removed as this was developed especially for demo on 25 Apr 2017, so no refactoring needed here
                  // igor: todo: move api calls to another place to make the template result agnostic
                  api.getResults(model.user.postcode, model.user)
                    .then(function(results) {
                      model.user.isWaiting = false;
                      // igor: We have to refactor results a bit to make them reusable in cards
                      // igor: change this content to create cards based on the data you retrieve
                      // igor: in content you can use your markup language [...](...) or simple HTML, both will work just fine
                      model.user.results.push([
                        [
                          {
                            image: '/img/party-logos/conservative.png',
                            header: "The Conservative Party",
                            content: "Have promised to 'get on with the job of Brexit' and have stood on a policy of leaving the [single market](http://api.explaain.com/Organization/58987dc975ce1100114b63ed), [European Court of Justice](http://api.explaain.com/Detail/58ff4aca3de78b0011a3a4ea) and controlling all [immigration](http://api.explaain.com/Detail/58fb7f0ea22aa10011cfd270)."
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
                      routes.step({ name: data.nextStep, type: data.type }).push();
                    })
                  return false;
                }
              },
              h('input.form-control', { autofocus: true, type: "text", 'name': 'postcode', 'placeholder': 'Postcode', binding: [model.user, 'postcode'] }),
              h('input.btn.btn-success', {type: "submit"}, "Go!")
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': model.user.isWaiting } }),
            h('p', this.data.description)
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
              final: self.data.final
            }).a( { "class": "task" },
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

hyperdom.append(document.body, new App());
