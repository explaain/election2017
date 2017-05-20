/* Sample data for Quiz for 18 May 2017 */
var quizQuestions = [
 {
   question: "1. Should cannabis be legalised?",
   issue: "health",
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
   question: "2. Should tuition fees be scrapped?",
   issue: "education",
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
   question: "3. Should there be a cap on how much landlords can charge for rent?",
   issue: "housing",
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
   question: "4. Should the UK have voted to leave the EU?",
   issue: "eu",
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
   question: "5. Should companies have to pay more to hire someone from outside the UK?",
   issue: "jobs",
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
   question: "6. Should fox hunting be legal?",
   issue: "environment",
   debate: "enivornment-1",
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
   question: "7. If you earn more than 95% of the rest of the country, should your tax go up?",
   issue: "tax",
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
   question: "8. Should there be a second EU referendum on the terms of leaving ?",
   issue: "eu",
   debate: "eu-2",
   answers: {
     yes: [
       {
         label: "Yes, the people should decide the terms.",
         opinion: 1
       },
       {
         label: "Yes, but alongisde a seperate vote by MPs.",
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
   question: "9. Should the government own utlilites like the railway, post office and water companies?",
   issue: "public services",
   debate: "public services-1",
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
   question: "10. Should all EU citizens currently living in the UK be immediately given the right to stay?",
   issue: "eu",
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
   question: "11. Should we all pay more tax to fund the NHS and social care?",
   issue: "tax",
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
   question: "12. Should the UK carry out airstrikes on another country without MPs voting on it?",
   issue: "defence",
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
 }
];
