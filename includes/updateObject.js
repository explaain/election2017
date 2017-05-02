module.exports = function(){
  return function(obj, objUpdates) {
    var objKeys = Object.keys(objUpdates);
    objKeys.forEach(function(key) {
      obj[key] = objUpdates[key];
    })
    return obj;
  }
}
