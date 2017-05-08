module.exports = function(model){
  model.dashboards.home.tasks.push("!TEST-postcode-compare");
  model.tasks["!TEST-postcode-compare"] = {
    subtype: "multi-submit",
    color: "#00a2e5",
    label: "TEST comparing postcodes",
    goto: {
      type: 'step',
      name: 'postcode-compare',
      next: 'result'
    },
    dataUpdates: []
  };
}
