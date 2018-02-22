module.exports = {
  getData: function () {
    return countriesData;
  }
};

const countriesData = [
    {
      label: "Italia",
      code: "italy",
      parties: [
        {
          color: "blue",
          photo: "/img/italian-parties/peu.png",
          fullName: "+Europa",
          name: "+EU",
          key: "+EU",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Conservative and Unionist Party"
          ]
        },
        {
          color: "red",
          photo: "/img/italian-parties/leu.png",
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
          color: "#e0bf49",
          photo: "/img/italian-parties/m5s.png",
          fullName: "Movimento 5 Stelle",
          name: "M5S",
          key: "M5S",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Liberal Democrats"
          ]
        },
        {
          color: "lightblue",
          photo: "/img/italian-parties/cdx.png",
          fullName: "Coalizione di Centro Destra",
          name: "Cdx",
          key: "Cdx",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Green Party",
            "Scottish Green Party"
          ]
        },
        {
          color: "green",
          photo: "/img/italian-parties/pd.png",
          fullName: "Partito Democratico",
          name: "PD",
          key: "PD",
          matches: [],
          quizResults: false,
          dClubNames: [
            "Green Party",
            "Scottish Green Party"
          ]
        }
      ]
  }
]
