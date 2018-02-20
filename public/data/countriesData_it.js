module.exports = {
  getData: function () {
    return countriesData;
  }
};

const countriesData = [
    {
      label: "Italy",
      code: "italy",
      parties: [
        {
          color: "blue",
          photo: "/img/leader-faces/may.png",
          fullName: "+Europa",
          name: "+Europa",
          key: "+Europa",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Conservative and Unionist Party"
          ]
        },
        {
          color: "red",
          photo: "/img/leader-faces/corbyn.png",
          fullName: "Liberi e Uguali",
          name: "LeU",
          key: "LeU",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Labour Party",
            "Labour and Co-operative Party"
          ]
        },
        {
          color: "orange",
          photo: "/img/leader-faces/farron.png",
          fullName: "MoVimento 5 Stelle",
          name: "M5S",
          key: "M5S",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Liberal Democrats"
          ]
        },
        {
          color: "green",
          photo: "/img/leader-faces/lucas.png",
          fullName: "Coalizione di Centro Destra",
          name: "CdX",
          key: "CdX",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Green Party",
            "Scottish Green Party"
          ]
        },
      ]
  }
]
