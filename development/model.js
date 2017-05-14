/* This code populates some test entries to Model.
 * We made it like that so we separate test model entries from real entries
 */

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
  model.dashboards.home.tasks.push("!TEST-generic-story");
  model.tasks["!TEST-generic-story"] = {
    subtype: "multi-submit",
    color: "#00a2e5",
    label: "TEST Generic Story",
    goto: {
      type: 'step',
      name: 'sampleStory',
      next: 'result'
    },
    dataUpdates: []
  };
  model.dashboards.home.tasks.push("!TEST-sentence");
  model.tasks["!TEST-sentence"] = {
    subtype: "multi-submit",
    color: "#00a2e5",
    label: "TEST Sentence",
    goto: {
      type: 'phrase',
      name: 'iWantTo'
    },
    dataUpdates: []
  };
}
