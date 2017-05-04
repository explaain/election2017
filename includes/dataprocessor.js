module.exports = class DataProcessor {

  constructor() {}

  processConstituencySeats(data) {
    return {
      heading: data.text.heading,
      subheading: data.text.subheading,
      constituencies: data.seats.map(function(seat){
        return {
          location: seat.location,
          parties: seat.parties.map(function(party){
            return party.name;
          }).join(" vs ")
        }
      })
    };
  }

}
