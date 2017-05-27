module.exports = {
  getData: function () {
    return quizQuestions;
  }
};



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
   issue: "welfare",
   debate: "38-welfare-1",
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
     ]
   }
 },
 {
   question: "Should the spare room subsidy (so called 'bedroom tax') be scrapped?",
   issue: "welfare",
   debate: "38-welfare-2",
   answers: {
     yes: [
       {
         label: "scrap it immediately.",
         opinion: 1,
       },
       {
         label: "and incentivise local authorities to help\ntenants ‘downsize' as well.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "maintain the tax as it currently stands.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should corporation tax rates be increased?",
   issue: "tax",
   debate: "38-tax-2",
   answers: {
     yes: [
       {
         label: "reinstate the higher level of\ncorporation tax for large businesses.",
         opinion: 1,
       },
       {
         label: "increase it slightly for larger corporations.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "but it shouldnt drop either, keep it at 20%.",
         opinion: 0.4,
       },
       {
         label: "and drop it further to 17%",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should we get rid of the deficit by 2025?",
   issue: "economy",
   debate: "38-economy-1",
   answers: {
     yes: [
       {
         label: "aim for a balanced budget by 2025.",
         opinion: 1,
       },
       {
         label: "but aim to do it within 5 years",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "reducing it is important but not at the cost of cutting public services.",
         opinion: 0.4,
       },
       {
         label: "i think we should eliminate it before 2025.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should there be a cap on how much landlords can charge for rent?",
   issue: "living-costs",
   debate: "38-living-costs-1",
   answers: {
     yes: [
       {
         label: "there should be a living rent for all through rent controls. ",
         opinion: 1,
       },
       {
         label: "by capping rent on certain new contracts at the level of inflation. ",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "the free market should dictate price.",
         opinion: 0.4,
       },
       {
         label: "but increasing the amount of housing built will make rent more affordable.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should there be a higher levy charged on companies hiring migrant workers?",
   issue: "immigration",
   debate: "38-immigration-1",
   answers: {
     yes: [
       {
         label: "companies who employ migrants should pay £2000 a year per migrant they employ full time.",
         opinion: 1,
       },
       {
         label: "but make it a voluntary contribution as part of the high net worth investment visa.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "don't increase, create a Migration Impact Fund paid for centrally by exisitng budgets.",
         opinion: 0.4,
       },
       {
         label: "there is no need for this type of charge.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should there be a fresh vote in parliament to bring back fox hunting?",
   issue: "environment",
   debate: "38-environment-1",
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
         label: "there should be no vote, fox hunting should remain illegal. ",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should the national living wage be increased by more than inflation?",
   issue: "living-costs",
   debate: "38-living-costs-2",
   answers: {
     yes: [
       {
         label: "raise it to the 'living wage' level, expected to be £10 p/hr by 2020.",
         opinion: 1,
       },
       {
         label: "yes and it should be given to those aged 18 or over as well.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "it should rise at 60% of median earnings by 2020.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should income tax go up for people earning over £80,000 per year?",
   issue: "tax",
   debate: "38-tax-3",
   answers: {
     yes: [
       {
         label: "and  gaurantee tax won't go up for anyone earning less than £80,000. ",
         opinion: 1,
       {
         label: "but look at increasing corporation tax at the same time. ",
         opinion: 1,
       },
     ],
     no: [
       {
         label: "tax should go up for all taxpayers with an additional 1p extra per £ of income tax.",
         opinion: 0.4,
       },
       {
         label: "and increase the amount a person can earn before being taxed. ",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should we ban pesticides which kill bees?",
   issue: "enviornment",
   debate: "38-environment-2",
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
         label: "we should use them but only under strict controls ",
         opinion: 0.4,
       },
     ]
   }
 },
 {
   question: "Should there be a second EU referendum on the final Brexit deal?",
   issue: "eu",
   debate: "38-eu-1",
   answers: {
     yes: [
       {
         label: "the British people should have the final say via a referendum.",
         opinion: 1,
       },
       {
         label: "but MPs should vote as well.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "parliament should have the final vote.",
         opinion: 0.4,
       },
       {
         label: "the results of the referendum should be the mandate at that's it.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should the government take over the running of railways, water companies and the royal mail?",
   issue: "economy",
   debate: "38-economy-2",
   answers: {
     yes: [
       {
         label: "bring them back into public ownership as their current contracts expire.",
         opinion: 1,
       },
       {
         label: "but only when service levels drop and for short periods of time.",
         opinion: 0.8,
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
   question: "Should we create more grammar schools?",
   issue: "education",
   debate: "38-education-1",
   answers: {
     yes: [
       {
         label: "we should lift the ban on creating new grammar schools.",
         opinion: 1,
       },
     ],
     no: [
       {
         label: "they're vanity projects that don't work.",
         opinion: 0.4,
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
   issue: "environment",
   debate: "38-environment-3",
   answers: {
     yes: [
       {
         label: "as it would make us more dependent on fossil fuels.",
         opinion: 1,
       },
       {
         label: "because of its impact on climate change and the local enviornment. ",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "the industry should be further developed.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should we be trying to reduce immigration below 100,000 extra new arrivals per year?",
   issue: "immigration",
   debate: "38-immigration-2",
   answers: {
     yes: [
       {
         label: "annual net migraiton should be in the tens of thousands.",
         opinion: 1,
       },
     ],
     no: [
       {
         label: "net migration should be zero.",
         opinion: 0.4,
       },
       {
         label: "there should be no official targets.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should the UK aim to stay in the European Union's \"Single Market\" after Brexit?",
   issue: "eu",
   debate: "38-eu-2",
   answers: {
     yes: [
       {
         label: "we must maintain access to the single market",
         opinion: 1,
       },
       {
         label: "we should prioritise retaining access as part of a negotiating strategy.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "we will be leaving the single market.",
         opinion: 0
       },
     ]
   }
 }
];
