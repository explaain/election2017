/* Some data processing function were moved there from views/index.js
 *   to remove code duplication
 */

module.exports = class DataProcessor {

  constructor() {}

  processSentenceData(model, helpers) {
    var dataUpdates = [];
    var goto = {};
    model.selectedPhrases.forEach(function(phrase) {
      switch (phrase.key) {
        case 'postcode':
          model.user.postcode = phrase.data;
          break;

        case 'voteOn':
          goto = {
            type: 'dashboards',
            route: 'dashboard',
            name: 'decide',
            task: 'decide'
          }
          break;

        case 'brexit':
          dataUpdates.push({
              data: 'user.quizFlow.3',
              value: ["brexit-1","brexit-2","brexit-3","brexit-4"],
              action: "toggle"
            })
          goto = {
            type: 'step',
            route: 'step',
            name: 'question',
            final: 'quiz-priority',
            next: 'postcode',
            task: 'issue-$apply'
            // http://localhost:1234/steps/result?type=postcode&resultsType=partyResults
          }
          break;

        default:

      }
    })
    helpers.updateData(dataUpdates);
    console.log(goto)
    return goto;
  }

  processConstituencySeats(data) {
    return {
      heading: data.text.heading,
      subheading: data.text.subheading,
      twitterShareHref: data.twitterShareHref,
      facebookShareHref: data.facebookShareHref,
      resultsClass: 'resultsLoaded',
      numberOfSwingSeats: 'swings-' + data.numberOfSwingSeats,
      calculateText: "[How did we calculate this?](http://api.explaain.com/Detail/59106472116f53001109340c)",
      whereIWillBeText: "[I don't know where I'll be on election day!](http://api.explaain.com/Detail/5911b79aac223e0011e45fa9)",
      constituencies: data.seats.map(function(seat){
        return {
          location: seat.location,
          uniHomeLocation: seat.uniHomeLocation,
          partyString: seat.parties.map(function(party){
            return party.name;
          }).join(" vs "),
          numberOfParties: seat.parties.length,
          swingSeat: (seat.parties.length > 1),
          swingIcon: (seat.parties.length > 1) ? 'fa-random' : 'fa-lock',
          swingClass: "swing-" + (seat.parties.length > 1),
          party1: seat.parties[0].name.replace(' Party', ''),
          party1Color: seat.parties[0].colorLight,
          party1Height: (100/seat.parties.length) + '%',
          party1Image: "/img/party-logos/" + seat.parties[0].logo,
          party2: seat.parties[1] ? seat.parties[1].name.replace(' Party', '') : null,
          party2Color: seat.parties[1] ? seat.parties[1].colorLight : null,
          party2Height: (100/seat.parties.length) + '%',
          party2Image: seat.parties[1] ? "/img/party-logos/" + seat.parties[1].logo : null
        }
      })
    };
  }

}
