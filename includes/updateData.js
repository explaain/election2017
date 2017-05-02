module.exports = function(updateModel){
  return function(dataUpdates) {
    dataUpdates.forEach(function(update) {
      updateModel(update.data, update.value, update.action);
    });
  }
}
