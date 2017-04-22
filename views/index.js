var hyperdom = require('hyperdom');
var h = hyperdom.html;


var model = {
  name:''
}

function render() {
  return h("div",
    h("label", "what's your name?"),
    h('input', {
       required: true,
       placeholder: 'What is your name',
       binding: [model, 'name']
    }),
    h("div", "hi " + model.name))
}

hyperdom.append(document.body, render,model);
