module.exports = {
  getData: function () {
    return quizQuestions;
  }
};








/* Sample data for Quiz for 18 May 2017 */
var quizQuestions = [
  {
    question: "Should taxes be increased to fund the NHS and social care?",
    issue: "tax",
    debate: "38-tax-1",
    answers: {
      yes: [
        {
          label: "with an increase in income tax for the highest 5 percent of earners",
          opinion: 1,
        },
        {
          label: "with a 1p increase on income tax for basic, higher and additional rates",
          opinion: 1,
        }
      ],
      no: [
        {
          label: "fund the NHS through a crackdown on corporation tax evasion instead.",
          opinion: 0.4,
        },
        {
          label: "button text.",
          opinion: 0
        }
      ]
    }
  },
  // {
  //   question: "Should the 4 year freeze on increases to benefits payments be scrapped?",
  //   issue: "welfare",
  //   debate: "38-welfare-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "button text.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should the bedroom tax be scrapped?",
  //   issue: "welfare",
  //   debate: "38-welfare-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "scrap it imediately. ",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "maintain the tax as it currently stands.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should corporation tax rates be increased?",
  //   issue: "tax",
  //   debate: "38-tax-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "reinstate the higher level of\ncorporation tax for large businesses.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "increase it slightly for larger corporations.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "but it shouldnt drop either, keep it at 20%.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "and drop it further to 17%",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should we get rid of the deficit by 2025?",
  //   issue: "economy",
  //   debate: "38-economy-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "aim for a balanced budget by 2025.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "but aim to do it within 5 years",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should there be a cap on how much landlords can charge for rent?",
  //   issue: "living-costs",
  //   debate: "38-living-costs-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "there should be a living rent for all through rent controls. ",
  //         opinion: 1,
  //       },
  //       {
  //         label: "by making three-year tenancies the norm and rent to be capped at the level of inflation. ",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should there be a higher levy charged on companies hiring migrant workers?",
  //   issue: "immigration",
  //   debate: "38-immigration-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "companies who employ migrants should pay £2000 a year per migrant they employ full time.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "but make it a voluntary contribution as part of the high net worth investment visa.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "don't increase, establish a Migration Impact Fund paid for centrally by exisitng budgets.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should there be a fresh vote in parliament to bring back fox hunting?",
  //   issue: "environment",
  //   debate: "38-environment-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "there should be a free vote where MPs can vote how they wish.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "there should be no vote, fox hunting should remain illegal. ",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should the national living wage be increased by more than inflation?",
  //   issue: "living-costs",
  //   debate: "38-living-costs-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "raise it to the 'living wage' level which is expected to be £10 p/hr by 2020.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "it should rise at 60% of median earnings by 2020.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should income tax go up for people earning over £80,000 per year?",
  //   issue: "tax",
  //   debate: "38-tax-3",
  //   answers: {
  //     yes: [
  //       {
  //         label: "and  gaurantee tax won't go up for anyone earning less than £80,000 ",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "tax should go up for all taxpayers with an additional 1p extra per £ of income tax.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "and increase the amount a person can earn before being taxed. ",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should we ban pesticides which kill bees?",
  //   issue: "environment",
  //   debate: "38-environment-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "as soon as our relationship with EU allows us to.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "until their use in agriculture is proven not to harm bees or other pollinators.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should there be a second EU referendum on the final Brexit deal?",
  //   issue: "eu",
  //   debate: "38-eu-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "the British people should have the final say.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "parliament should have the final vote.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should the government take over the running of railways, water companies and the royal mail?",
  //   issue: "economy",
  //   debate: "38-economy-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "bring them back into public ownership as their current contracts expire.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should we create more grammar schools?",
  //   issue: "education",
  //   debate: "38-education-1",
  //   answers: {
  //     yes: [
  //       {
  //         label: "lift the ban on the creation of selective schools, including grammar schools.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "scrap any plans to re-introduce them.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should fracking be banned?",
  //   issue: "environment",
  //   debate: "38-environment-3",
  //   answers: {
  //     yes: [
  //       {
  //         label: "as it would make us more dependent on fossil fuels.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "because of its impact on climate change and the local environment. ",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "the industry should be further developed.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should we be trying to reduce immigration below 100,000 extra new arrivals per year?",
  //   issue: "immigration",
  //   debate: "38-immigration-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "annual net migraiton should be in the tens of thousands.",
  //         opinion: 1,
  //       },
  //       {
  //         label: "button text.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text.",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "there should be no official targets.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // },
  // {
  //   question: "Should the UK aim to stay in the European Union's \"Single Market\" after Brexit?",
  //   issue: "eu",
  //   debate: "38-eu-2",
  //   answers: {
  //     yes: [
  //       {
  //         label: "we must maintain access to the single market",
  //         opinion: 1,
  //       },
  //       {
  //         label: "we should prioritise retaining access as part of a negotiating strategy.",
  //         opinion: 0.8,
  //       }
  //     ],
  //     no: [
  //       {
  //         label: "button text",
  //         opinion: 0.4,
  //       },
  //       {
  //         label: "we will be leaving the sinlge market.",
  //         opinion: 0
  //       }
  //     ]
  //   }
  // }
];
