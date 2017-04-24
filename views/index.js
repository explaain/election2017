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
    results: []
  },

  //Dashboards are collections of tasks
  dashboards: {
    home: {
      title: "What do you want to do?",
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
    }
  },

  //Tasks are a series of steps, and are chosen from the dashboard
  tasks: {
    brexit: {
      label: "What can I do about Brexit?",
      color: "#42c299",
      goto: {
        type: 'dashboard',
        name: 'brexit'
      }
    },
    decide: {
      label: "Decide who to vote for",
      color: "#e74289",
      goto: {
        type: 'dashboard',
        name: 'decide'
      }
    },
    leaders: {
      label: "Learn about the leaders",
      color: "#c042de",
      goto: {
        type: 'dashboard',
        name: 'leaders'
      }
    },
    "vote-worth": {
      label: "How much does my vote count?",
      color: "#00a2e5",
      goto: {
        type: 'dashboard',
        name: 'vote-worth'
      }
    },
    "brexit-stop": {
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
      label: "I want my MP to have a vote on the final deal",
      color: "#c042de",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.vote',
          value: true
        }
      ]
    },
    "brexit-soft": {
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
    }
  },

  // Steps are essentially pages
  steps: {
    postcode: {

    },
    result: {

    }
  }
};

class App {
  constructor() {
    this.header = new Header();
  }

  render() {

    return h('div',
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
    this.dashboard = model.dashboards[params.dashboard] || { title: "Goodness me, you're early!", subtitle: "This feature is coming soon...!", tasks: []};
  }

  render() {

    var tasksDOM = [h("p.task-category", "Popular")];

    if (!this.dashboard.tasks.length) {
      tasksDOM.push(h("p", "No tasks to display"))
    }

    this.dashboard.tasks.forEach(function(name) {
      var task = model.tasks[name];
      var taskRoute;
      switch (task.goto.type) {
        case 'dashboard':
          taskRoute = routes.dashboard
          break;

        case 'step':
          taskRoute = routes.step
          break;

        default:
          taskRoute = -1;
      }
      tasksDOM.push(
        taskRoute({ name: task.goto.name, task: name, next: task.goto.next }).a( { "class": "task", "style":{"background-color": task.color} },
          h('h5', task.label)
        )
      );
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
    if (params.task && model.tasks[params.task].dataUpdates)
      updateData(model.tasks[params.task].dataUpdates);

    var data = {
      cards: []
    };
    switch (params.name) {
      case 'postcode':
        data.cards.push({
          type: 'postcode',
          name: 'Where are you voting from?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency'
        })
        break;

      case 'result':
        model.user.results[model.user.results.length-1].forEach(function(result){
          data.cards.push({
            type: 'result',
            result: result
          })
        })
        break;

      default:
        data.cards.push({
          name: "Goodness me, you're early!",
          description: "This feature is coming soon...!"
        })
    }
    
    this.cards = data.cards.map(function(_data){
      _data.nextStep = params.next;
      return (new Card(_data));
    })
    
  }

  render() {
    /*if (!this.cards || !this.cards.length) {
      this.card
    }*/
    return h.apply(null,["div"].concat(this.cards));
  }
}

class Card {
  constructor(data) {
    this.cardContent = new CardContent(data);
    this.data = data;
  }

  render() {

    return h('div.cards',
      h('div.card',
        h('div.card-visible',
          // h('div.close', h("i.fa.fa-times", '')),
          h('div.close'),
          this.cardContent,
          h('a.card-icon.external', {'href': 'http://explaain.com'},
            h('img', {'src': 'http://app.explaain.com/card-logo.png'})
          )
        )
      )
    )
  }
}

class CardContent {
  constructor(data) {
    this.data = data;
  }

  render() {
    var loading = false;
    switch (this.data.type) {
      case 'postcode':
        var data = this.data;
        return h('content',
          h('h2', this.data.name),
          h('div.body-content',
            h('input', { 'name': 'postcode', 'placeholder': 'Postcode', binding: [model.user, 'postcode'] }),
            h('button.btn.btn-success',
              {'onclick': function(onclick) {
                console.log(loading);
                loading = true;
                console.log(loading);
                api.getResults(model.user.postcode)
                  .then(function(results) {
                    // igor: We have to refactor results a bit to make them reusable in cards
                    // igor: change this content to create cards based on the data you retrieve
                    // igor: in content you can use your markup language [...](...) or simple HTML, both will work just fine
                    model.user.results.push([
                      {
                        header: results.finalResult.party,
                        content: "(test) Anything about the best Party. API does not yet return anything. [Theresa May](http://api.explaain.com/Person/58d6bba03df21d00114b8a11)"
                      },
                      {
                        header: results.finalResult.party,
                        content: results.finalResult.party
                      },
                      {
                        header: results.finalResult.party,
                        content: results.finalResult.party
                      }
                    ]);
                    routes.step({ name: data.nextStep, type: data.type }).push();
                  })
                }
              }, "Go!"
            ),
            h('img.loading', { 'src': '/img/loading.gif', 'class': { 'showing': loading } }), //This doesn't work yet!
            h('p', this.data.description)
          )
        )
        break;

      case 'result':
        const content = this.data.result.content.replace(/\[([^\]]+)\]\(([^\)]+)\)/g,"<a href='$2'>$1</a>");
        return h('div.content.text-left',
          h('h2', this.data.result.header),
          h('div.body-content',
            h.rawHtml('p', content)
            // h('input', { 'name': 'postcode', 'placeholder': 'Postcode', binding: [model, 'postcode'] }),
            // h('button.btn.btn-success',
            //   {'onclick': function(onclick) {
            //     api.loadConstituency(model.user.postcode)
            //       .then(function(results) {
            //         console.log(this.data.nextStep);
            //         routes.step({ name: this.data.nextStep, type: this.data.type }).push();
            //       })
            //     }
            //   }, "Go!"
            // ),
          )
        )
        break;

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
    updateModel(update.data, update.value);
  });
}

function updateModel(path, value) {
    var schema = model;  // a moving reference to internal objects within model
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
        var elem = pList[i];
        if( !schema[elem] ) schema[elem] = {}
        schema = schema[elem];
    }

    schema[pList[len-1]] = value;
}

hyperdom.append(document.body, new App());
