/* This file is used widely in views/index.js
 * Please read annotations to each function in this class for more info
 */

const q = require("q");

module.exports = class Helpers {

  // Dependencies
  constructor(model, h, cardTemplates,http, router) {
    this.model = model;
    this.h = h;
    this.cardTemplates = cardTemplates;
    this.http = http;
    this.router = router;
  }

  // The template engine (script), wrapping Hyperdom
  // See development/templates.js for sample templating format
  assembleCards(data, template) {
    // todo: resolve issue with global and local scopes (remember the problem with passing function)
    const self = this;

    if (typeof data === 'string') {
      data = {
        "@id": data
      }
    }
    // Defining a type of the template
    data.type = data.type || (data["@type"] ? data["@type"].split('/')[data["@type"].split('/').length-1] : 'Detail');
    // You can pass either this or that
    if (template === undefined) { template = data.type }
    if (typeof template === 'string') { template = self.cardTemplates[template]; }
    const element = template;
    var params = {};
    // Mapping - maps data from parent template to a child template
    if(element.mapping){
      element.mapping.forEach(function(kv){
        if(kv.length == 2)
          params[kv[0]] = self.getObjectPathProperty(data, kv[1]);
        else {
          let props = self.getObjectPathProperty(data, kv[0]);
          for(var key in props){
            params[key] = props[key];
          }
        }
      });
    } else {
      params = data;
    }
    var content,
      attr = {};
    // Condition in templates is a boolean checker, if false - the content is ignored
    if(
      element.condition
      &&
      (
        !self.getObjectPathProperty(params, element.condition) && !element.condition.match(/^!/)
        ||
        self.getObjectPathProperty(params, element.condition.replace(/^!/,"")) && element.condition.match(/^!/)
      )
    )
      return undefined;
    // If a content is a template
    else if (element.template)
      content = self.assembleCards(params, element.template.var ? self.getObjectPathProperty(params, element.template.var) : element.template)
    // If no content
    else if (!element.content)
      content = '';
    // Loops
    else if (element.loop) {
      content = self.getObjectPathProperty(params, element.loop).map(function(_params){return element.content.map(function(_element){return self.assembleCards(_params, _element);})});
    }
    // If content is Array - that means it contains children templates or other data
    else if (element.content.constructor === Array)
      content = element.content.map(function(el){return self.assembleCards(params, el); });
    // If content has "var", it will take it from the variable
    else if (element.content.var)
      content = self.getObjectPathProperty(params, element.content.var) || ''; //'var' MUST use dot notation, not []
    // You can execute a function and pass params inside that function from a template
    else if (element.content.func)
      content = self.getObjectPathProperty(params, element.content.func[0]).apply(null,element.content.func.slice(1).map(function(p){return self.getObjectPathProperty(params, p)}));
    // Default value
    else
      content = element.default ? element.default : element.content;

    // Processing "attr", see development/templates.js for sample templating format
    if (element.attr) {
      var attrKeys = Object.keys(element.attr);
      attrKeys.forEach(function(attrKey) {
        if (attrKey == "style" && typeof(element.attr.style) == "object") {
          var styleKeys = Object.keys(element.attr.style);
          var styles = {}
          styleKeys.forEach(function(styleKey) {
            var style = element.attr.style[styleKey];
            var styleValue;
            if(style.var) {
              styleValue = self.getObjectPathProperty(data, style.var);
            } else if (style.func) {
              styleValue = self.getObjectPathProperty(params, style.func[0]).apply(null,style.func.slice(1).map(function(p){return self.getObjectPathProperty(params, p)}));
            } else {
              styleValue = style;
            }
            styles[styleKey] = styleValue;
            if (styleKey == "background-image" && style.var) {
              styles[styleKey] = 'url("' + styles[styleKey] + '")'
            }
          });
          attr[attrKey] = styles;
        } else {
          attr[attrKey] = element.attr[attrKey].var ? self.getObjectPathProperty(params, element.attr[attrKey].var) :  element.attr[attrKey]; //'var' MUST use dot notation, not []
        }
      })
    }
    if (!element.dom){
      return content;
    } else if (element.content && element.content.markdown) {
      return self.h.rawHtml(element.dom, attr, self.markdownToHtml(content));
    } else if (element.content && element.content.html) {
      return self.h.rawHtml(element.dom, attr, content);
    } else {
      return self.h(element.dom, attr, content);
    }
  }

  // Gets a model by path, not used a lot
  getModel(path){
    const self = this;
    return self.getObjectPathProperty(self.model, path);  // a moving reference to internal objects within model
  }

  // Gets a value from object from a "dot" notation path
  // if there is an object model={a:{b:{c:"hello!"}}}, then
  // getObjectPathProperty(model, "a.b.c") returns "hello!"

  getObjectPathProperty(object, path){
    const self = this;
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

  /*loadTemplates(templateUrl){
    const self = this;
    var deferred = q.defer();
    self.http.get(templateUrl)
    .then(function (res) {
      deferred.resolve(res.body);
    });
    return deferred.promise;
  }*/

  // A simple function to turn Exmplain markdown into links
  // Explain markdown looks like [Text](URL)
  markdownToHtml(text) {
    const self = this;
    return text.replace(
      /\[([^\]]+)\]\(([^\)]+)\)/g,
      "<a class='internal' tabindex='-1' href='$2'>$1</a>"
    );
  }

  // Updates data in model
  updateData(dataUpdates) {
    const self = this;
    dataUpdates.forEach(function(update) {
      self.updateModel(update.data, update.value, update.action);
    });
  }

  // Updates model
  updateModel(path, value, action) {
    console.log('path, value, action')
    console.log(path, value, action)
    const self = this;
    var schema = self.model;  // a moving reference to internal objects within model
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
        console.log('no action')
        schema[pList[len-1]] = value;
    }
  }

  // Updates a single object
  updateObject(obj, objUpdates) {
    const self = this;
    var objKeys = Object.keys(objUpdates);
    objKeys.forEach(function(key) {
      obj[key] = objUpdates[key];
    })
    return obj;
  }

  /* Throws error
   * @err - text of error
   * @modelProp - property for the error - saves to model.user.<ErrorProperty>
   * defaults to model.user.error
   */
  throwError(err,modelProp){
    const self = this;
    if(!modelProp){
      modelProp = "error";
      $('html, body').animate({ scrollTop: 0}, 500);
    }
    self.model.user[modelProp] = err;
    setTimeout(function(){
      delete self.model.user[modelProp];
    },500);
  }

}
