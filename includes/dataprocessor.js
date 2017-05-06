module.exports = class DataProcessor {

  constructor() {}

  processConstituencySeats(data) {
    return {
      heading: data.text.heading,
      subheading: data.text.subheading,
      constituencies: data.seats.map(function(seat){
        return {
          location: seat.location,
          partyString: seat.parties.map(function(party){
            return party.name;
          }).join(" vs "),
          numberOfParties: seat.parties.length,
          swingSeat: (seat.parties.length > 1),
          party1: seat.parties[0].name,
          party1Color: seat.parties[0].color,
          party1Height: (100/seat.parties.length) + '%',
          party2: seat.parties[1] ? seat.parties[1].name : null,
          party2Color: seat.parties[1] ? seat.parties[1].color : null,
          party2Height: (100/seat.parties.length) + '%'
        }
      })
    };
  }

}
