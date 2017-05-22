module.exports = {
  getData: function () {
    return partyStances;
  }
};


var partyStances = {
  opinions: {
    issues: {
      "brexit": {
        description: "Brexit",
        debates: {
          "brexit-1": {
            question: "Do you agree with the UKs decision to leave the EU?' [Learn more](http://api.explaain.com/Detail/5916ec717f9f9e0011533eea)\"",
            description: "",
            buttons: {
              "button0": {
                opinion: "No, it should be stopped"
              },
              "button025": {
                opinion: ""
              },
              "button05": {
                opinion: "Yes, but there should be a second vote on the terms"
              },
              "button075": {
                opinion: ""
              },
              "button1": {
                opinion: "Yes, I do"
              }
            },
            parties: {
              "conservative": {
                opinion: 1
              },
              "labour": {
                opinion: 0.7
              },
              "lib-dem": {
                opinion: 0.5
              },
              "ukip": {
                opinion: 1
              },
              "plaid-cymru": {
                opinion: 0
              },
              "green": {
                opinion: 0.5
              },
              "snp": {
                opinion: 0
              }
            }
          }
        }
      },
      "education": {
        description: "Tuition fees",
        debates: {
          "education-1": {
            question: "Should tuition fees be scrapped?.' [Learn more](http://api.explaain.com/Detail/5902f54fe04b710011c7af58)",
            description: "",
            buttons: {
              "button0": {
                opinion: "No"
              },
              "button025": {
                opinion: "No, but they should be reduced"
              },
              "button05": {
                opinion: "Yes, but only for degrees that are most needed"
              },
              "button075": {
                opinion: "Yes, but only for UK citizens"
              },
              "button1": {
                opinion: "Yes, for everyone"
              }
            },
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 0
              },
              "ukip": {
                opinion: 0.5
              },
              "plaid-cymru": {
                opinion: 1
              },
              "green": {
                opinion: 1
              },
              "snp": {
                opinion: 1
              }
            }
          }
        }
      },
      "transport": {
         description: "Trains",
         debates: {
           "transport-1": {
              question: "Should the railways be owned by people who pay tax? [Learn more](http://api.explaain.com/Detail/5916ef1f7f9f9e0011533eed)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "No"
                },
                "button025": {
                  opinion: "No, but government should regulate it more"
                },
                "button05": {
                  opinion: ""
                },
                "button075": {
                  opinion: "Yes, but only for unprofitable routes"
                },
                "button1": {
                  opinion: "Yes, the whole thing!"
                }
              },
              parties: {
                "conservative": {
                  opinion: 0
                },
                "labour": {
                  opinion: 1
                },
                "lib-dem": {
                  opinion: 0
                },
                "ukip": {
                  opinion: 0
                },
                "plaid-cymru": {
                  opinion: 0.5
                },
                "green": {
                  opinion: 1
                },
                "snp": {
                  opinion: 1
                }
              }
            }
          }
        },
        "economy": {
         description: "Tax",
         debates: {
           "economy-1": {
              question: "Do you agree that taxes should increase for those who earn more than 95% of people (over £80,000 per year)? [Learn more](http://api.explaain.com/Detail/5916f08a7f9f9e0011533eef/)' ",
              description: "",
              buttons: {
                "button0": {
                  opinion: "No, reduce tax for everyone"
                },
                "button025": {
                  opinion: "No, keep it as it is"
                },
                "button05": {
                  opinion: ""
                },
                "button075": {
                  opinion: "Yes, but only by a 1p per pound"
                },
                "button1": {
                  opinion: "Yes, to a full 50% or more"
                }
              },
              parties: {
                "conservative": {
                  opinion: 0
                },
                "labour": {
                  opinion: 1
                },
                "lib-dem": {
                  opinion: 0.75
                },
                "ukip": {
                  opinion: 0.25
                },
                "plaid-cymru": {
                  opinion: 0
                },
                "green": {
                  opinion: 1
                },
                "snp": {
                  opinion: 0
                }
              }
            },
            "economy-2": {
               question: "The minimum wage should be increased to £10 per hour [Learn more](http://api.explaain.com/)'",
               description: "",
               buttons: {
                 "button0": {
                   opinion: "No, there should be no minimum wage"
                 },
                 "button025": {
                   opinion: "No, there should be a minimum wage but it should be lowered"
                 },
                 "button05": {
                   opinion: "No, it should stay as it is"
                 },
                 "button075": {
                   opinion: "Yes, £10 is about right"
                 },
                 "button1": {
                   opinion: "Yes, but it should be more than £10"
                 }
               },
               parties: {
                 "conservative": {
                   opinion: 0.5
                 },
                 "labour": {
                   opinion: 0.75
                 },
                 "lib-dem": {
                   opinion: 0.5
                 },
                 "ukip": {
                   opinion: 0.5
                 },
                 "plaid-cymru": {
                   opinion: 0.75
                 },
                 "green": {
                   opinion: 1
                 },
                 "snp": {
                   opinion: 1
                 }
               }
             }
          }
        },
        "housing": {
         description: "Houses",
         debates: {
           "housing-1": {
              question: "Who should the government prioritise building houses for? [Learn more](http://api.explaain.com/Detail/5916f4237f9f9e0011533ef1)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "We don't need more houses"
                },
                "button025": {
                  opinion: "People in social (council) housing"
                },
                "button05": {
                  opinion: "Refugees and immigrants"
                },
                "button075": {
                  opinion: "The homeless and displaced"
                },
                "button1": {
                  opinion: "Anyone and everyone"
                }
              },
              parties: {
                "conservative": {
                  opinion: 1
                },
                "labour": {
                  opinion: 0.75
                },
                "lib-dem": {
                  opinion: 0.75
                },
                "ukip": {
                  opinion: 1
                },
                "plaid-cymru": {
                  opinion: 0.4
                },
                "green": {
                  opinion: 0.75
                },
                "snp": {
                  opinion: 0.5
                }
              }
            }
          }
        },
        "defence": {
         description: "Nuclear weapons",
         debates: {
           "defence-1": {
              question: "Should the UK have nuclear weapons? [Learn more](http://api.explaain.com/Detail/5916f5a67f9f9e0011533ef2)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "No, they should be scrapped now"
                },
                "button025": {
                  opinion: "No, but they should be phased out over time"
                },
                "button05": {
                  opinion: ""
                },
                "button075": {
                  opinion: "Yes, but reduce the number we have"
                },
                "button1": {
                  opinion: "Yes, keep things as they are"
                }
              },
              parties: {
                "conservative": {
                  opinion: 1
                },
                "labour": {
                  opinion: 1
                },
                "lib-dem": {
                  opinion: 0.75
                },
                "ukip": {
                  opinion: 1
                },
                "plaid-cymru": {
                  opinion: 0
                },
                "green": {
                  opinion: 0
                },
                "snp": {
                  opinion: 0
                }
              }
            }
          }
        },
        "nhs": {
         description: "NHS",
         debates: {
           "NHS-1": {
              question: "Do you agree that funding the NHS should be a priority over funding for foreign aid?'  [Learn more](http://api.explaain.com/Detail/5916f6b87f9f9e0011533ef3)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "No, we should continue to fund foreign aid at current levels"
                },
                "button025": {
                  opinion: "No, but we should reduce foreign aid"
                },
                "button05": {
                  opinion: "Yes, but only for a set period of time"
                },
                "button075": {
                  opinion: "Yes, permanantly reduce the foreign aid budget"
                },
                "button1": {
                  opinion: "Yes, scrap the foreign aid budget completly"
                }
              },
              parties: {
                "conservative": {
                  opinion: 0.5
                },
                "labour": {
                  opinion: 0.75
                },
                "lib-dem": {
                  opinion: 0.75
                },
                "ukip": {
                  opinion: 0.5
                },
                "plaid-cymru": {
                  opinion: 1
                },
                "green": {
                  opinion: 1
                },
                "snp": {
                  opinion: 1
                }
              }
            }
          }
        },
        "environment": {
         description: "Global Warming",
         debates: {
           "environment-1": {
              question: "Should protecting the environment be the main priority for government? [Learn more](http://api.explaain.com/)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "No, the warnings are exaggerated"
                },
                "button025": {
                  opinion: "No, but we should be aware of it"
                },
                "button05": {
                  opinion: "Yes, but not at the cost of jobs or the economy"
                },
                "button075": {
                  opinion: ""
                },
                "button1": {
                  opinion: "Yes, even if it means job loses"
                }
              },
              parties: {
                "conservative": {
                  opinion: 0.5
                },
                "labour": {
                  opinion: 0.5
                },
                "lib-dem": {
                  opinion: 0.5
                },
                "ukip": {
                  opinion: 0.25
                },
                "plaid-cymru": {
                  opinion: 1
                },
                "green": {
                  opinion: 1
                },
                "snp": {
                  opinion: 1
                }
              }
            }
          }
        },
        "immigration": {
         description: "Immigration",
         debates: {
           "immigration-1": {
              question: "Reducing the levels of immigration to and from the UK is vital [Learn more](http://api.explaain.com/Detail/58fb7f0ea22aa10011cfd270)'",
              description: "",
              buttons: {
                "button0": {
                  opinion: "Disagree, the UK should allow additional immigration"
                },
                "button025": {
                  opinion: "Disagree, the current levels are fine"
                },
                "button05": {
                  opinion: ""
                },
                "button075": {
                  opinion: "Agreed, and leaving the EU will help reduce it"
                },
                "button1": {
                  opinion: "Agreed, and there should be a points based system for everyone"
                }
              },
              parties: {
                "conservative": {
                  opinion: 1
                },
                "labour": {
                  opinion: 0.75
                },
                "lib-dem": {
                  opinion: 0.25
                },
                "ukip": {
                  opinion: 1
                },
                "plaid-cymru": {
                  opinion: 0.25
                },
                "green": {
                  opinion: 0
                },
                "snp": {
                  opinion: 0
                }
              }
            }
          }
        }
     }
  }
};
