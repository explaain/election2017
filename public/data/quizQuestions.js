module.exports = {
  getData: function () {
    return quizQuestions;
  }
};


/* Sample data for Quiz for 18 May 2017 */
var quizQuestions = [
 {
   question: "Should cannabis be legalised?",
   issue: "health",
   randomiseGroup: 0,
   debate: "health-1",
   answers: {
     yes: [
       {
         label: "Yes, but for medical use.",
         opinion: 0.6
       },
       {
         label: "Yes, and decriminalise all drugs over time.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "No, but reduce punishment for personal use.",
         opinion: 0.4
       },
       {
         label: "No, and make punishment for personal use more severe.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should tuition fees be scrapped?",
   issue: "education",
   randomiseGroup: 0,
   debate: "education-1",
   answers: {
     yes: [
       {
         label: "Yes, for all students.",
         opinion: 1
       },
       {
         label: "Yes, but only for certain degrees",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "No, but they should be reduced.",
         opinion: 0.4
       },
       {
         label: "No, they should increase in line with inflation.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should there be a cap on how much landlords can charge for rent?",
   issue: "housing",
   randomiseGroup: 0,
   debate: "housing-1",
   answers: {
     yes: [
       {
         label: "Yes, there should be a numerical cap for each area.",
         opinion: 1
       },
       {
         label: "Yes, it should match inflation rates but no higher.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "No, but letting fees should be scrapped.",
         opinion: 0.4
       },
       {
         label: "No, anyone should be able to set the rent they want.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the UK have voted to leave the EU?",
   issue: "eu",
   randomiseGroup: 1,
   debate: "eu-1",
   answers: {
     yes: [
       {
         label: "Yes, and we should leave the single market.",
         opinion: 1
       },
       {
         label: "Yes, but we should stay in the single market.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "No, but we should get on with it.",
         opinion: 0.5
       },
       {
         label: "No, and there should be a second vote.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should companies have to pay more to hire someone from outside the UK?",
   issue: "jobs",
   randomiseGroup: 1,
   debate: "jobs-1",
   answers: {
     yes: [
       {
         label: "Yes, but only for certain professions. ",
         opinion: 0.6
       },
       {
         label: "Yes, and for all professions.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "No, but they should try to hire people from the UK first.",
         opinion: 0.6
       },
       {
         label: "No, they should hire who they want from where they want.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should fox hunting be legal?",
   issue: "environment",
   randomiseGroup: 1,
   debate: "environment-1",
   answers: {
     yes: [
       {
         label: "Yes, as it's a traditional rural event.",
         opinion: 0.9
       },
       {
         label: "Yes, as government shouldn't tell people what to do",
         opinion: 1
       }
     ],
     no: [
       {
         label: "No, and make it a prisonable offence.",
         opinion: 0
       },
       {
         label: "No, but I'm not sure why.",
         opinion: 0.5
       }
     ]
   }
 },
 {
   question: "If you earn more than 95% of the rest of the country, should your tax go up?",
   issue: "tax",
   randomiseGroup: 1,
   debate: "tax-1",
   answers: {
     yes: [
       {
         label: "Yes, as they can afford to pay more.",
         opinion: 0.6
       },
       {
         label: "Yes, but only if it funds the NHS and social care.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "No, all taxes should increase.",
         opinion: 0
       },
       {
         label: "No, focus on tax avoidance instead.",
         opinion: 0.4
       }
     ]
   }
 },
 {
   question: "Should there be a second EU referendum on the terms of leaving ?",
   issue: "eu",
   randomiseGroup: 1,
   debate: "eu-2",
   answers: {
     yes: [
       {
         label: "Yes, the people should decide the terms.",
         opinion: 1
       },
       {
         label: "Yes, but alongside a seperate vote by MPs.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "No, but we should let MPs have a vote on it.",
         opinion: 0.8
       },
       {
         label: "No, we should just leave with no vote.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the government own utlilites like the railway, post office and water companies?",
   issue: "public-services",
   randomiseGroup: 1,
   debate: "public-services-1",
   answers: {
     yes: [
       {
         label: "Yes, but only these type of core utilities.",
         opinion: 0.8
       },
       {
         label: "Yes, and plan to nationalise more if we need to.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "No, we should leave things as they are.",
         opinion: 0.5
       },
       {
         label: "No, we should sell more things to the private companies.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should all EU citizens currently living in the UK be immediately given the right to stay?",
   issue: "eu",
   randomiseGroup: 1,
   debate: "eu-3",
   answers: {
     yes: [
       {
         label: "Yes, they should be treated like citizens of this country.",
         opinion: 1
       },
       {
         label: "Yes, but only if UK citizens in the EU are given the same rights.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "No, assess on an individual basis.",
         opinion: 0.2
       },
       {
         label: "No, they should have the same rights as all other immigrants.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should we all pay more tax to fund the NHS and social care?",
   issue: "tax",
   randomiseGroup: 1,
   debate: "tax-2",
   answers: {
     yes: [
       {
         label: "Yes, but only to fund that and nothing else.",
         opinion: 1
       },
       {
         label: "Yes, it should be around 1p in the £ pound more.",
         opinion: 0.8
       }
     ],
     no: [
       {
         label: "No, only those who earn more than the rest should.",
         opinion: 0.4
       },
       {
         label: "No, there should be no tax increases.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the UK carry out airstrikes on another country without MPs voting on it?",
   issue: "defence",
   randomiseGroup: 1,
   debate: "defence-1",
   answers: {
     yes: [
       {
         label: "Yes, and it should be when any ally asks us to.",
         opinion: 1
       },
       {
         label: "Yes, but only when there is an immediate danger to the UK.",
         opinion: 0.8
       }
     ],
     no: [
       {
         label: "No, and MPs should be able to vote on every strike.",
         opinion: 0.4
       },
       {
         label: "No, but in certain situations the PM should just do it.",
         opinion: 0
       }
     ]
   }
 },
 {
    question: "Should taxes be increased to fund the NHS and social care?",
    randomiseGroup: "firstThree",
    issue: "tax",
    debate: "38-tax-1",
    helperCard:"//api.explaain.com/Detail/5929a06cc3fde500115269a3",
    answers: {
      yes: [
        {
          label: "with an increase in income tax for the highest 5 percent of earners.",
          opinion: 1,
        },
        {
          label: "with a 1p increase on income tax for basic, higher and additional rates.",
          opinion: 1,
        },
      ],
      no: [
        {
          label: "fund the NHS through a crackdown on corporation tax evasion instead.",
          opinion: 0.4,
        },
        {
          label: "we should fund the NHS but not through tax increases.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should the pensions 'triple lock' remain in use?",
    randomiseGroup: "firstThree",
    issue: "welfare",
    debate: "38-welfare-1",
    helperCard:"//api.explaain.com/Detail/592da145c45b930011674602",
    answers: {
      yes: [
        {
          label: "until at least the end of next parliament.",
          opinion: 1,
        },
        {
          label: "until 2020 and then replace it with a new system.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "it should be phased out and replaced in 2020.",
          opinion: 0.4,
        },
        {
          label: "a different system for protecting pensions should be explored.",
          opinion: 0.2,
        },
      ]
    }
  },
  {
    question: "Should the so-called 'bedroom tax' be scrapped?",
    randomiseGroup: "firstThree",
    issue: "welfare",
    debate: "38-welfare-2",
    helperCard:"//api.explaain.com/Detail/5929a172c3fde500115269a5",
    answers: {
      yes: [
        {
          label: "scrap it immediately.",
          opinion: 1,
        },
        {
          label: "and incentivise local authorities to help tenants ‘downsize' as well.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "but its impact on those who have had it cut should be assessed.",
          opinion: 0.2
        },
        {
          label: "maintain the tax as it currently stands.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should corporation tax rates be increased?",
    randomiseGroup: "remainder",
    issue: "tax",
    debate: "38-tax-2",
    helperCard:"//api.explaain.com/Detail/5929a1b4c3fde500115269a6",
    answers: {
      yes: [
        {
          label: "reinstate the higher level of corporation tax for large businesses.",
          opinion: 1,
        },
        {
          label: "increase it slightly for larger corporations.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "but it shouldn't drop either, keep it at 19%.",
          opinion: 0.4,
        },
        {
          label: "and drop it further to 17%.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should there be a fresh vote in parliament to bring back fox hunting?",
    randomiseGroup: "remainder",
    issue: "environment",
    debate: "38-environment-1",
    helperCard:"//api.explaain.com/Detail/5929a1dbc3fde500115269a7",
    answers: {
      yes: [
        {
          label: "there should be a free vote where MPs can vote how they wish.",
          opinion: 1,
        },
        {
          label: "but only to bring the laws of England in line with the rest of the UK.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "the ban should remain be periodically reassessed. ",
          opinion: 0.2
        },
        {
          label: "there should be no vote, fox hunting should remain illegal. ",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should the national living wage be increased by more than inflation?",
    randomiseGroup: "remainder",
    issue: "living-costs",
    debate: "38-living-costs-2",
    helperCard:"//api.explaain.com/Detail/5929a2bfc3fde500115269ab",
    answers: {
      yes: [
        {
          label: "raise it to the 'living wage' level, expected to be £10 p/hr by 2020.",
          opinion: 1,
        },
        {
          label: "and it should be given to those aged 18 or over as well.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "it should rise at 60% of median earnings by 2020.",
          opinion: 0.2
        },
        {
          label: "it should not rise at all.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should we ban pesticides which kill bees?",
    randomiseGroup: "remainder",
    issue: "environment",
    debate: "38-environment-2",
    helperCard:"//api.explaain.com/Detail/5929a32bc3fde500115269ad",
    answers: {
      yes: [
        {
          label: "as soon as our relationship with EU allows us to.",
          opinion: 1,
        },
        {
          label: "until their use in agriculture is proven not to harm bees or other pollinators.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "we should use them but only under strict controls. ",
          opinion: 0.4,
        },
        {
          label: "we should use them more frequently on certain crops. ",
          opinion: 0,
        },
      ]
    }
  },
  {
    question: "Should the government take over the running of railways, water companies and the Royal Mail?",
    randomiseGroup: "remainder",
    issue: "economy",
    debate: "38-economy-2",
    helperCard:"//api.explaain.com/Detail/5929a36ec3fde500115269ae",
    answers: {
      yes: [
        {
          label: "bring them back into public ownership as their current contracts expire.",
          opinion: 1,
        },
        {
          label: "but only when service levels drop and for short periods of time.",
          opinion: 0.6,
        },
      ],
      no: [
        {
          label: "keep things as they are.",
          opinion: 0.4,
        },
        {
          label: "and increase the involvement of the private sector in their running.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should we create additional grammar schools?",
    randomiseGroup: "remainder",
    issue: "education",
    debate: "38-education-1",
    helperCard:"//api.explaain.com/Detail/5929a878c3fde500115269af",
    answers: {
      yes: [
        {
          label: "we should lift the ban on creating new grammar schools.",
          opinion: 1,
        },
        {
          label: "and explore new ways of creating additional types of selection schools.",
          opinion: 1,
        },
      ],
      no: [
        {
          label: "they're vanity projects that don't work.",
          opinion: 0,
        },
        {
          label: "scrap any plans to re-introduce them.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should fracking be banned?",
    randomiseGroup: "remainder",
    issue: "environment",
    debate: "38-environment-3",
    helperCard:"//api.explaain.com/Detail/5929a89ec3fde500115269b0",
    answers: {
      yes: [
        {
          label: "as it would make us more dependent on fossil fuels.",
          opinion: 1,
        },
        {
          label: "because of its impact on climate change and the local environment. ",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "studies should be carried out to assess the pros and cons of use.",
          opinion: 0.4
        },
        {
          label: "the industry should be further developed.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should we be trying to reduce immigration below 100,000 extra new arrivals per year?",
    randomiseGroup: "remainder",
    issue: "immigration",
    debate: "38-immigration-2",
    helperCard:"//api.explaain.com/Detail/5929a8dac3fde500115269b1",
    answers: {
      yes: [
        {
          label: "annual net migraiton should be in the tens of thousands.",
          opinion: 1,
        },
        {
          label: "but net migration should be zero, not thousands.",
          opinion: 1,
        },
      ],
      no: [
        {
          label: "net migration should be zero.",
          opinion: 0.4,
        },
        {
          label: "there should be no official target.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Should the UK aim to stay in the European Union's \"Single Market\" after Brexit?",
    randomiseGroup: "remainder",
    issue: "eu",
    debate: "38-eu-2",
    helperCard:"//api.explaain.com/Detail/5929a90ac3fde500115269b2",
    answers: {
      yes: [
        {
          label: "we must maintain access to the single market.",
          opinion: 1,
        },
        {
          label: "we should prioritise retaining access as part of a negotiating strategy.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "on the whole but certain industries should retain access.",
          opinion: 0.4
        },
        {
          label: "we will be leaving the single market.",
          opinion: 0
        },
      ]
    }
  },
  {
    question: "Do you think there should be another referendum on Scottish independence?",
    randomiseGroup: "remainder",
    issue: "independence",
    debate: "38-independence-1",
    helperCard:"",
    answers: {
      yes: [
        {
          label: "but only if the UK leaves the single market.",
          opinion: 0.6,
        },
        {
          label: "but only after Brexit talks are complete.",
          opinion: 0.8,
        },
      ],
      no: [
        {
          label: "the results of the 2014 referendum should be respected.",
          opinion: 0.2
        },
        {
          label: "at least not in the next 10 years.",
          opinion: 0.4
        },
      ]
    }
  }
];
