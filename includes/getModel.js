module.exports = function(getObjectPathProperty,model){
  return function(path){
    return getObjectPathProperty(model, path);  // a moving reference to internal objects within model
  }
}
