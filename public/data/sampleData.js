var data = {
  user: {
    opinions: {
      issues: {
        "brexit": {
          debates: {
            "brexit-level": {
              opinion: 0.4,
              weight: 1
            },
            "mp-vote": {
              opinion: 1,
              weight: 0.5
            }
          }
        },
        "health": {

        }
      }
    }
  },
  parties: {
    opinions: {
      issues: {
        "brexit": {
          debates: {
            "brexit-level": {
              parties: {
                "conservative": {
                  opinion: 0.8
                }, "labour": {
                  opinion: 0.6
                }
              }
            },
            "mp-vote": {
              parties: {
                "conservative": {
                  opinion: 0
                }, "labour": {
                  opinion: 0
                }
              }
            }
          }
        },
        "health": {

        }
      }
    }
  },
  results: {
    "my-constituency": {
      "ge2015": {
        parties: {
          "labour": {
            share: 34,
            votes: 33145,
            shareMargin: 6,
            voteMargin: 5492
          },
          "conservative": {
            share: 29,
            votes: 27653,
            shareMargin: -6,
            voteMargin: -5492
          }
        }
      },
      "euRef2016": {
        choices: {
          "leave": {
            share: 35,
            votes: 33145,
            shareMargin: 6,
            voteMargin: 5492
          },
          "remain": {
            share: 29,
            votes: 27653,
            shareMargin: -6,
            voteMargin: -5492
          }
        }
      }
    }
  }
};
