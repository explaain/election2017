module.exports = {
  getData: function() {
    return partyStances;
  }
};


var partyStances = {
  opinions: {
    issues: {
      "health": {
        description: "Health",
        debates: {
          "health-1": {
            question: "Should cannabis be legalised?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0.2,

              },
              "labour": {
                opinion: 0.5,

              },
              "lib-dem": {
                opinion: 1,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 0.6,

              },
              "plaid-cymru": {
                opinion: 0.6
              }
            }
          }
        }
      },
      "education": {
        description: "Education",
        debates: {
          "education-1": {
            question: "Should tuition fees be scrapped?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0,

              },
              "labour": {
                opinion: 1,

              },
              "lib-dem": {
                opinion: 0,

              },
              "ukip": {
                opinion: 0.6,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 1,

              },
              "plaid-cymru": {
                opinion: 1
              }
            }
          },
          "38-education-1": {
            question: "Should we create more grammar schools?",
            parties: {
              "conservative": {
                opinion: 1
              },
              "labour": {
                opinion: 0.4
              },
              "lib-dem": {
                opinion: 0.4
              },
              "plaid-cymru": {
                opinion: 0.4
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 0
              }
            }
          }
        }
      },
      "housing": {
        description: "Housing",
        debates: {
          "housing-1": {
            question: "Should there be a cap on how much landlords can charge for rent?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0,

              },
              "labour": {
                opinion: 1,

              },
              "lib-dem": {
                opinion: 0.4,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 0.6,

              },
              "plaid-cymru": {
                opinion: 0.4
              }
            }
          },
          "housing-2": {
            question: "Who should the government prioritise building houses for? [Learn more](//api.explaain.com/Detail/5916f4237f9f9e0011533ef1)'",
            description: "",
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
      "eu": {
        description: "EU",
        debates: {
          "eu-1": {
            question: "Should the UK have voted to leave the EU?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0.75,

              },
              "labour": {
                opinion: 0.5,

              },
              "lib-dem": {
                opinion: 0,

              },
              "ukip": {
                opinion: 1,

              },
              "green": {
                opinion: 0,

              },
              "snp": {
                opinion: 0,

              },
              "plaid-cymru": {
                opinion: 0.5
              }
            }
          },
          "eu-2": {
            question: "Should there be a second EU referendum on the terms of leaving?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0,

              },
              "labour": {
                opinion: 0.4,

              },
              "lib-dem": {
                opinion: 1,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 0.6,

              },
              "plaid-cymru": {
                opinion: 0
              }
            }
          },
          "eu-3": {
            question: "Should all EU citizens currently living in the UK be immediately given the right to stay?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0.6,

              },
              "labour": {
                opinion: 1,

              },
              "lib-dem": {
                opinion: 1,

              },
              "ukip": {
                opinion: 0.2,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 1,

              },
              "plaid-cymru": {
                opinion: 1
              }
            }
          },
          "38-eu-1": {
            question: "Should there be a second EU referendum on the final Brexit deal?",
            parties: {
              "conservative": {
                opinion: 0.4
              },
              "labour": {
                opinion: 0.4
              },
              "lib-dem": {
                opinion: 1
              },
              "green": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              }
            }
          },
          "38-eu-2": {
            question: "Should the UK aim to stay in the European Union's \"Single Market\" after Brexit?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 0.8
              },
              "lib-dem": {
                opinion: 1
              },
              "green": {
                opinion: 0.8
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 1
              }
            }
          }
        }
      },
      "jobs": {
        description: "Jobs",
        debates: {
          "jobs-1": {
            question: "Should companies have to pay more to hire someone from outside the UK?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 1,

              },
              "labour": {
                opinion: 0,

              },
              "lib-dem": {
                opinion: 0,

              },
              "ukip": {
                opinion: 1,

              },
              "green": {
                opinion: 0,

              },
              "snp": {
                opinion: 0,

              },
              "plaid-cymru": {
                opinion: 0
              }
            }
          },
          "jobs-2": {
            question: "The minimum wage should be increased to £10 per hour [Learn more](//api.explaain.com/)'",
            description: "",
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
      "environment": {
        description: "Environment",
        debates: {
          "environment-1": {
            question: "Should fox hunting be legal?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 1,

              },
              "labour": {
                opinion: 0.5,

              },
              "lib-dem": {
                opinion: 0.5,

              },
              "ukip": {
                opinion: 0.6,

              },
              "green": {
                opinion: 0,

              },
              "snp": {
                opinion: 0,

              },
              "plaid-cymru": {
                opinion: 0.5
              }
            }
          },
          "environment-2": {
            question: "Should protecting the environment be the main priority for government? [Learn more](//api.explaain.com/)'",
            description: "",
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
          },
          "38-environment-1": {
            question: "Should there be a fresh vote in parliament to bring back fox hunting?",
            parties: {
              "conservative": {
                opinion: 1
              },
              "labour": {
                opinion: 0
              },
              "snp": {
                opinion: 0.5
              }
            }
          },
          "38-environment-2": {
            question: "Should we ban pesticides which kill bees?",
            parties: {
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 0.8
              },
              "ukip": {
                opinion: 0.5
              },
              "conservative": {
                opinion: 0.2
              }
            }
          },
          "38-environment-3": {
            question: "Should fracking be banned?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 0.8
              },
              "green": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 1
              }
            }
          }
        }
      },
      "tax": {
        description: "Tax",
        debates: {
          "tax-1": {
            question: "If you earn more than 95% of the rest of the country, should your tax go up?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0,

              },
              "labour": {
                opinion: 1,

              },
              "lib-dem": {
                opinion: 0.4,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 1,

              },
              "plaid-cymru": {
                opinion: 0.4
              }
            }
          },
          "tax-2": {
            question: "Should we all pay more tax to fund the NHS and social care?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0.4,

              },
              "labour": {
                opinion: 0.4,

              },
              "lib-dem": {
                opinion: 0.8,

              },
              "ukip": {
                opinion: 0.4,

              },
              "green": {
                opinion: 0.4,

              },
              "snp": {
                opinion: 1,

              },
              "plaid-cymru": {
                opinion: 0.4
              }
            }
          },
          "38-tax-1": {
            issue: "tax",
            question: "Should taxes be increased to fund the NHS and social care?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 1
              },
              "green": {
                opinion: 0.6
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 1
              }
            }
          },
          "38-tax-2": {
            question: "Should corporation tax rates be increased?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 0.8
              },
              "lib-dem": {
                opinion: 0.6
              },
              "green": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 0.6
              }
            }
          },
          "38-tax-3": {
            question: "Should income tax go up for people earning over £80,000 per year?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 0.4
              },
              "ukip": {
                opinion: 0.5
              }
            }
          }
        }
      },
      "public-services": {
        description: "Public Services",
        debates: {
          "public-services-1": {
            question: "Should the government own utlilites like the railway, post office and water companies?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0,

              },
              "labour": {
                opinion: 1,

              },
              "lib-dem": {
                opinion: 0.5,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 1,

              },
              "snp": {
                opinion: 0.5,

              },
              "plaid-cymru": {
                opinion: 0.5,

              }
            }
          }
        }
      },
      "defence": {
        description: "Defence",
        debates: {
          "defence-1": {
            question: "Should the UK carry out airstrikes on another country without MPs voting on it?",
            buttons: {},
            parties: {
              "conservative": {
                opinion: 0.8,

              },
              "labour": {
                opinion: 0.4,

              },
              "lib-dem": {
                opinion: 0.4,

              },
              "ukip": {
                opinion: 0,

              },
              "green": {
                opinion: 0.4,

              },
              "snp": {
                opinion: 0.4,

              },
              "plaid-cymru": {
                opinion: 0.4
              }
            }
          },
          "defence-2": {
            question: "Should the UK have nuclear weapons? [Learn more](//api.explaain.com/Detail/5916f5a67f9f9e0011533ef2)'",
            description: "",
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
      "immigration": {
        description: "Immigration",
        debates: {
          "immigration-1": {
            question: "Reducing the levels of immigration to and from the UK is vital [Learn more](//api.explaain.com/Detail/58fb7f0ea22aa10011cfd270)'",
            description: "",
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
          },
          "38-immigration-1": {
            question: "Should there be a higher levy charged on companies hiring migrant workers?",
            parties: {
              "conservative": {
                opinion: 1
              },
              "labour": {
                opinion: 0.8
              },
              "lib-dem": {
                opinion: 0.4
              },
              "ukip": {
                opinion: 0.5
              }
            }
          },
          "38-immigration-2": {
            question: "Should we be trying to reduce net migration to below 100,000 per year?",
            parties: {
              "conservative": {
                opinion: 0.8
              },
              "labour": {
                opinion: 0.2
              },
              "ukip": {
                opinion: 1
              },
              "greens": {
                opinion: 0.2
              },
              "lib-dem": {
                opinion: 0.2
              },
            }
          }
        }
      },
      "welfare": {
        description: "Welfare",
        debates: {
          "38-welfare-1": {
            question: "Should the pensions 'triple lock' remain in use?",
            parties: {
              "conservative": {
                opinion: 0.8
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 1
              },
              "ukip": {
                opinion: 1
              },
              "snp": {
                opinion: 1
              }
            },
          },
          "38-welfare-2": {
            question: "Should the so-called 'bedroom tax' be scrapped?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "lib-dem": {
                opinion: 1
              },
              "green": {
                opinion: 1
              },
              "plaid-cymru": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 1
              }

            }
          }
        }
      },
      "economy": {
        description: "Economy",
        debates: {
          "38-economy-1": {
            question: "Should we get rid of the deficit by 2025?",
            parties: {
              "conservative": {
                opinion: 1
              },
              "labour": {
                opinion: 0.8
              },
              "lib-dem": {
                opinion: 0.8
              },
              "ukip": {
                opinion: 0.5
              }
            }
          },
          "38-economy-2": {
            question: "Should the government take over the running of railways, water companies and the royal mail?",
            parties: {
              "labour": {
                opinion: 1
              },
              "green": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              },
              "conservative": {
                opinion: 0.5
              }
            }
          }
        }
      },
      "living-costs": {
        description: "Living Costs",
        debates: {
          "38-living-costs-1": {
            question: "Should there be a cap on how much landlords can charge for rent?",
            parties: {
              "labour": {
                opinion: 0.8
              },
              "lib-dem": {
                opinion: 0.8
              },
              "green": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              }
            }
          },
          "38-living-costs-2": {
            question: "Should the national living wage be increased by more than inflation?",
            parties: {
              "conservative": {
                opinion: 0
              },
              "labour": {
                opinion: 1
              },
              "green": {
                opinion: 1
              },
              "plaid-cymru": {
                opinion: 1
              },
              "ukip": {
                opinion: 0.5
              },
              "snp": {
                opinion: 1
              }
            }
          }
        }
      },
      "independence": {
        description: "independence",
        debates: {
          "38-independence-1": {
            question: "Do you think there should be another referendum on Scottish independence?",
            parties: {
              "labour": {
                opinion: 0
              },
              "lib-dem": {
                opinion: 0
              },
              "conservative": {
                opinion: 0
              },
              "green": {
                opinion: 0.6
              },
              "snp": {
                opinion: 1
              }
            }
          }
        }
      }
    }
  }
}
