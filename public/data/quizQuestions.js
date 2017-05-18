/* Sample data for Quiz for 18 May 2017 */
var quizQuestions = [
 {
   question: "Should cannabis be legalised?",
   issue: "health",
   debate: "health-1",
   answers: {
     yes: [
       {
         label: "but for medical use.",
         opinion: 0.6
       },
       {
         label: "and decriminalise all drugs over time.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "but reduce punishment for personal use.",
         opinion: 0.4
       },
       {
         label: "and make punishment for personal use more severe.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should tuition fees be scrapped?",
   issue: "education",
   debate: "education-1",
   answers: {
     yes: [
       {
         label: "for all students.",
         opinion: 1
       },
       {
         label: "but only for certain degrees",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "but they should be reduced.",
         opinion: 0.4
       },
       {
         label: "they should increase in line with inflation.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should there be a cap on how much landlords can charge for rent?",
   issue: "housing",
   debate: "housing-1",
   answers: {
     yes: [
       {
         label: "there should be a numerical cap for each area.",
         opinion: 1
       },
       {
         label: "it should match inflation rates but no higher.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "but letting fees should be scrapped.",
         opinion: 0.4
       },
       {
         label: "anyone should be able to set the rent they want.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the UK have voted to leave the EU?",
   issue: "eu",
   debate: "eu-1",
   answers: {
     yes: [
       {
         label: "and we should leave the single market.",
         opinion: 1
       },
       {
         label: "but we should stay in the single market.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "but we should get on with it.",
         opinion: 0.5
       },
       {
         label: "and there should be a second vote.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should companies have to pay more to hire someone from outside the UK?",
   issue: "jobs",
   debate: "jobs-1",
   answers: {
     yes: [
       {
         label: "but only for certain professions. ",
         opinion: 0.6
       },
       {
         label: "and for all professions.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "but they should try to hire people from the UK first.",
         opinion: 0.6
       },
       {
         label: "they should hire who they want from where they want.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should fox hunting be legal?",
   issue: "environment",
   debate: "enivornment-1",
   answers: {
     yes: [
       {
         label: "as it's a traditional rural event.",
         opinion: 0.9
       },
       {
         label: "as government shouldn't tell people what to do",
         opinion: 1
       }
     ],
     no: [
       {
         label: "and make it a prisonable offence.",
         opinion: 0
       },
       {
         label: "but I'm not sure why.",
         opinion: 0.5
       }
     ]
   }
 },
 {
   question: "If you earn more than 95% of the rest of the country, should your tax go up?",
   issue: "tax",
   debate: "tax-1",
   answers: {
     yes: [
       {
         label: "as they can afford to pay more.",
         opinion: 0.6
       },
       {
         label: "but only if it funds the NHS and social care.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "all taxes should increase.",
         opinion: 0
       },
       {
         label: "focus on tax avoidance instead.",
         opinion: 0.4
       }
     ]
   }
 },
 {
   question: "Should there be a second EU referendum on the terms of leaving ?",
   issue: "eu",
   debate: "eu-2",
   answers: {
     yes: [
       {
         label: "the people should decide the terms.",
         opinion: 1
       },
       {
         label: "but alongisde a seperate vote by MPs.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "but we should let MPs have a vote on it.",
         opinion: 0.8
       },
       {
         label: "we should just leave with no vote.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the government own utlilites like the railway, post office and water companies?",
   issue: "public services",
   debate: "public services-1",
   answers: {
     yes: [
       {
         label: "but only these type of core utilities.",
         opinion: 0.8
       },
       {
         label: "and plan to nationalise more if we need to.",
         opinion: 1
       }
     ],
     no: [
       {
         label: "we should leave things as they are.",
         opinion: 0.5
       },
       {
         label: "we should sell more things to the private companies.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should all EU citizens currently living in the UK be immediately given the right to stay?",
   issue: "eu",
   debate: "eu-3",
   answers: {
     yes: [
       {
         label: "they should be treated like citizens of this country.",
         opinion: 1
       },
       {
         label: "but only if UK citizens in the EU are given the same rights.",
         opinion: 0.6
       }
     ],
     no: [
       {
         label: "assess on an individual basis.",
         opinion: 0.2
       },
       {
         label: "they should have the same rights as all other immigrants.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should we all pay more tax to fund the NHS and social care?",
   issue: "tax",
   debate: "tax-2",
   answers: {
     yes: [
       {
         label: "but only to fund that and nothing else.",
         opinion: 1
       },
       {
         label: "it should be around 1p in the £ pound more.",
         opinion: 0.8
       }
     ],
     no: [
       {
         label: "only those who earn more than the rest should.",
         opinion: 0.4
       },
       {
         label: "there should be no tax increases.",
         opinion: 0
       }
     ]
   }
 },
 {
   question: "Should the UK carry out airstrikes on another country without MPs voting on it?",
   issue: "defence",
   debate: "defence-1",
   answers: {
     yes: [
       {
         label: "and it should be when any ally asks us to.",
         opinion: 1
       },
       {
         label: "but only when there is an immediate danger to the UKs interest.",
         opinion: 0.8
       }
     ],
     no: [
       {
         label: "and MPs should be able to vote on every strike.",
         opinion: 0.4
       },
       {
         label: "but in certain situations the PM should just do it.",
         opinion: 0
       }
     ]
   }
 }
];
