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
   helperCard:"http://api.explaain.com/Detail/5929a06cc3fde500115269a3",
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
   issue: "welfare",
   debate: "38-welfare-1",
   helperCard:"http://api.explaain.com/Detail/5929a0a2c3fde500115269a4",
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
   question: "Should the spare room subsidy (so called 'bedroom tax') be scrapped?",
   issue: "welfare",
   debate: "38-welfare-2",
   helperCard:"http://api.explaain.com/Detail/5929a172c3fde500115269a5",
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
   issue: "tax",
   debate: "38-tax-2",
   helperCard:"http://api.explaain.com/Detail/5929a1b4c3fde500115269a6",
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
         label: "but it shouldn't drop either, keep it at 20%.",
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
   question: "Should we get rid of the deficit by 2025?",
   issue: "economy",
   debate: "38-economy-1",
   helperCard:"http://api.explaain.com/Detail/5929a232c3fde500115269a8",
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
         label: "I think we should eliminate it before 2025.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should there be a cap on how much landlords can charge for rent?",
   issue: "living-costs",
   debate: "38-living-costs-1",
   helperCard:"http://api.explaain.com/Detail/5929a25ac3fde500115269a9",
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
         label: "the free market should dictate rent costs.",
         opinion: 0.4,
       },
       {
         label: "but increasing the number of houses built will make rent more affordable.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should those hiring migrant workers have to pay a fee to government to do so?",
   issue: "immigration",
   debate: "38-immigration-1",
   helperCard:"http://api.explaain.com/Detail/5929a296c3fde500115269aa",
   answers: {
     yes: [
       {
         label: "those who employ a migrant full time should pay £2000 a year.",
         opinion: 1,
       },
       {
         label: "but make it a voluntary contribution as part of certain types of visa.",
         opinion: 0.8,
       },
     ],
     no: [
       {
         label: "don't increase it, create a 'Migration Impact Fund' paid for centrally by exisitng budgets.",
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
   helperCard:"http://api.explaain.com/Detail/5929a1dbc3fde500115269a7",
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
   issue: "living-costs",
   debate: "38-living-costs-2",
   helperCard:"http://api.explaain.com/Detail/5929a2bfc3fde500115269ab",
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
   question: "Should income tax go up for people earning over £80,000 per year?",
   issue: "tax",
   debate: "38-tax-3",
   helperCard:"http://api.explaain.com/Detail/5929a302c3fde500115269ac",
   answers: {
     yes: [
       {
         label: "and  gaurantee tax won't go up for anyone earning less than £80,000. ",
         opinion: 1,
       },
       {
         label: "but look at increasing corporation tax at the same time. ",
         opinion: 1,
       },
     ],
     no: [
       {
         label: "increase tax for all taxpayers via an additional 1p extra per £ of income tax.",
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
   helperCard:"http://api.explaain.com/Detail/5929a32bc3fde500115269ad",
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
         label: "the results of the referendum should be the mandate and that's it.",
         opinion: 0
       },
     ]
   }
 },
 {
   question: "Should the government take over the running of railways, water companies and the Royal Mail?",
   issue: "economy",
   debate: "38-economy-2",
   helperCard:"http://api.explaain.com/Detail/5929a36ec3fde500115269ae",
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
   issue: "education",
   debate: "38-education-1",
   helperCard:"http://api.explaain.com/Detail/5929a878c3fde500115269af",
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
   issue: "environment",
   debate: "38-environment-3",
   helperCard:"http://api.explaain.com/Detail/5929a89ec3fde500115269b0",
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
   issue: "immigration",
   debate: "38-immigration-2",
   helperCard:"http://api.explaain.com/Detail/5929a8dac3fde500115269b1",
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
   issue: "eu",
   debate: "38-eu-2",
   helperCard:"http://api.explaain.com/Detail/5929a90ac3fde500115269b2",
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
 }
];
