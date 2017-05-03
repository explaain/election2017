module.exports = function(h,getObjectPathProperty,markdownToHtml,CardTemplates){
  const getCardDom = function(data, template) {
    data.type = data.type || (data["@type"] ? data["@type"].split('/')[data["@type"].split('/').length-1] : 'Detail');
    const dom = template.map(function(element) {
      // If element is not passing a param map, then the whole data object is going to be used and passed to templates
      var params = {};
      if(element.map){
        element.map.forEach(function(kv){
          params[kv[0]] = getObjectPathProperty(data, kv[1]);
        });
      } else {
        params = data;
      }
      var content,
        attr = {};
      if(
        element.condition
        &&
        (
          !getObjectPathProperty(params, element.condition) && !element.condition.match(/^!/)
          ||
          getObjectPathProperty(params, element.condition.replace(/^!/,"")) && element.condition.match(/^!/)
        )
      )
        return undefined;
      else if (element.template)
        content = getCardDom(params, CardTemplates[element.template.var ? getObjectPathProperty(params, element.template.var) : element.template])
      else if (!element.content)
        content = '';
      else if (element.loop)
        content = getObjectPathProperty(params, element.loop).map(function(el){return getCardDom(el, element.content)});
      else if (element.content.constructor === Array)
        content = getCardDom(params, element.content);
      else if (element.content.var)
        content = getObjectPathProperty(params, element.content.var) || ''; //'var' MUST use dot notation, not []
      else
        content = element.default ? element.default : element.content;

      if (element.attr) {
        var attrKeys = Object.keys(element.attr);
        attrKeys.forEach(function(attrKey) {
          if (attrKey == "style" && typeof(element.attr.style) == "object") {
            var styleKeys = Object.keys(element.attr.style);
            var styles = {}
            styleKeys.forEach(function(styleKey) {
              var style = element.attr.style[styleKey];
              styles[styleKey] = style.var ? getObjectPathProperty(data, style.var) : style; //'var' MUST use dot notation, not []
              if (styleKey == "background-image" && style.var) {
                styles[styleKey] = 'url("' + styles[styleKey] + '")'
              }
            });
            attr[attrKey] = styles;
          } else {
            attr[attrKey] = element.attr[attrKey].var ? getObjectPathProperty(params, element.attr[attrKey].var) :  element.attr[attrKey]; //'var' MUST use dot notation, not []
          }
        })
      }
      if (element.content && element.content.markdown) {
        return h.rawHtml(element.dom, attr, markdownToHtml(content));
      } else {
        return h(element.dom, attr, content);
      }
    });
    return dom;
  }
  return getCardDom;
}
