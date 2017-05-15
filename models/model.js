/* Master model */

module.exports = {
  step: -1,
  // todo: those are temporary here, refactor
  question: '',
  landedOnPostcode: 0,
  landedOnResult: 0,
  landedOnQuizPriority: 0,

  cards: {

  },

  showProgressBar: false,
  progressBarCurrent: 0,
  progressBarTotal: 2,

  featuredTopics: [],

  user: {
    postcode: '',
    postcode_uni: '',
    opinions: {
      issues: {}
    },
    results: [],
    resultsCompare: [],
    resultsOptions: [],
    quizFlow: [],
    isWaiting: false
  },

  selectedPhrases: [
    {
      key: "iWantTo"
    }
  ],

  phraseOptionLists: {
    parties: [
      "labour",
      "conservative",
      // "lib-dem",
      // "green",
      // "ukip",
      // "snp"
    ],
    topics: [
      // "allIssues",
      "brexit",
      "nhs",
      "education",
      "economy",
      "education",
      "transport",
    //"economy",
        //"housing",
        //"defence",
        //"health",
        //"environment",
        //"immigration"

    ],
    outcomes: [
      "hardBrexit",
      "tuitionFees",
      "nationalisingRailways",
      "increasingTax",
      "moreHouses",
      "nuclearWeapons",
      "nhsFunding",
      "protectingEnvironment",
      "immigration",
      "minimumWage"
    ]
  },

  myPhrases: {
    iWantTo: {
      text: "I want to",
      options: [
        "voteFor",
        "voteAgainst",
        "decide",
        "findOut",
        "registerToVote",
        "learnAbout",
        "beRemindedTo"
      ]
    },
    voteFor: {
      text: "vote for",
      optionList: [
        // "parties",
        // "topics",
        "outcomes"
      ],
      next: "postcode"
    },
    voteAgainst: {
      text: "vote against",
      optionList: [
        // "parties",
        // "topics",
        "outcomes"
      ],
      next: "postcode"
    },
    decide: {
      text: "decide",
      options: [
        "whoToVoteFor",
        "whereToRegisterToVote"
      ],
      // optionList: [
      //   // "parties",
      //   "topics"
      // ],
      next: "postcode"
    },
    whoToVoteFor: {
      text: "who to vote for",
      options: '',
      goto: {
        type: '',
        name: ''
      }
    },
    whereToRegisterToVote: {
      text: "where to register to vote",
      options: '',
      goto: {
        type: '',
        name: ''
      }
    },
    voteOn: {
      text: "vote on",
      options: [
        "allIssues"
      ],
      // optionList: [
      //   // "parties",
      //   "topics"
      // ],
      next: "postcode"
    },
    registerToVote: {
      text: "register to vote",
      goto: {
        type: '',
        name: ''
      }
    },
    findOut: {
      text: "find out",
      options: [
        // "myConstituency",
        "howTo",
        "why",
        "who",
        "where",
        "what",
        // "whether",
        // "learnAbout"
      ]
    },
    myConstituency: {
      text: "what my constituency is",
      goto: {
        type: '',
        name: ''
      }
    },
    howTo: {
      text: "how to",
      options: [
        "support",
        "oppose",
        "spoilMyBallot",
        "votePersonProxyPostal",
        "registerToVote",
        "voteSwap"
      ],
    },
    support: {
      text: "support a Party",
      optionList: [
        "parties",
        "topics"
      ],
      next: "postcode"
    },
    oppose: {
      text: "support a Topic",
      optionList: [
        "parties",
        "topics"
      ],
      next: "postcode"
    },
    spoilMyBallot: {
      text: "spoil my ballot",
      goto: {
        type: '',
        name: ''
      }
    },
    voteSwap: {
      text: "vote swap",
      goto: {
        type: '',
        name: ''
      }
    },
    why: {
      text: "why",
      optionList: [
        "whyElection"
      ]
    },
    whyElection: {
      text: "we are having an election",
      goto: {
        type: '',
        name: ''
      }
    },
    who: {
      text: "who",
      options: [
        "areCandidates",
        "myMP",
        // "winLocal",
        // "areParties",
        // "areLeaders",
        // "winNational",
        "shouldVoteFor"
      ],
      next: "postcode"
    },
    areCandidates: {
      text: "my candidates are",
      next: "postcode"
    },
    myMP: {
      text: "my MP is",
      next: "postcode"
    },
    winLocal: {
      text: "is winning in my area",
      next: "postcode"
    },
    areParties: {
      text: "are the parties I can vote for?",
      next: "postcode"
    },
    areLeaders: {
      text: "are the main party leaders?",
      next: "postcode"
    },
    winNational: {
      text: "is winning overall",
      options: "",
    },
    shouldVoteFor: {
      text: "I should vote for",
      next: "postcode"
    },
    where: {
      text: "where",
      options: [
        "shouldRegister"
      ]
    },
    shouldRegister: {
      text: "should I register to vote",
      options: "",
      goto: {
        type: '',
        name: ''
      }
    },
    what: {
      text: "what",
      options: [
        "isBallotSpoiling",
        "pointOfVoting",
        "safeSwingSeat",
        "voteWorth"
      ]
    },
    isBallotSpoiling: {
      text: "is spoiling my ballot",
      goto: {
        type: '',
        name: ''
      }
    },
    pointOfVoting: {
      text: "is the point of voting",
      goto: {
        type: '',
        name: ''
      }
    },
    safeSwingSeat: {
      text: "are safe and swing seats",
      goto: {
        type: '',
        name: ''
      }
    },
    voteWorth: {
      text: "is my vote worth",
      goto: {
        type: '',
        name: ''
      }
    },
    learnAbout: {
      text: "learn about",
      options: [
        "registeringToVote",
        "voteSwapping",
        "votingSystems",
        "voting",
        "votingInPerson",
        "votingByProxy",
        "votingByPost"
      ],
    },
    registeringToVote: {
      text: "registering to vote",
      options: "",
    },
    voteSwapping: {
      text: "vote swapping",
      goto: {
        type: '',
        name: ''
      }
    },
    votingSystems: {
      text: "how our voting system works",
      options: "",
    },
    voting: {
      text: "voting",
      options: "",
    },
    votePersonProxyPostal: { //Skipping?
      text: "different ways of voting",
      options: [
        "voteInPerson",
        "voteByProxy",
        "voteByPost"
      ],
    },
    votingInPerson: {
      text: "voting in person",
      options: "",
    },
    votingByProxy: {
      text: "voting by proxy",
      options: "",
      finish: true
    },
    votingByPost: {
      text: "voting by post",
      options: "",
    },
    beRemindedTo: {
      text: "be reminded to",
      optionList: "register",
    },
    postcode: {
      text: "and my postcode is",
      input: true,
      dataUpdates: []
    },
    finish: {
      text: ".",
      goto: {
        type: '',
        name: ''
      }
    },
    labour: {
      text: "Labour",
      dataUpdates: []
    },
    conservative: {
      text: "Conservatives",
      dataUpdates: []
    },
    "lib-dem": {
      text: "Lib Dem",
      dataUpdates: []
    },
    snp: {
      text: "SNP",
      dataUpdates: []
    },
    green: {
      text: "Green",
      dataUpdates: []
    },
    ukip: {
      text: "Ukip",
      dataUpdates: []
    },
    allIssues: {
      text: "all issues",
      dataUpdates: []
    },
    brexit: {
      text: "Brexit",
      dataUpdates: []
    },
    immigration: {
      text: "immigration",
      dataUpdates: []
    },
    nhs: {
      text: "NHS",
      dataUpdates: []
    },
    education: {
      text: "education",
      dataUpdates: []
    },
    economy: {
      text: "economy",
      dataUpdates: []
    },
    transport: {
      text: "transport",
      dataUpdates: []
    },
    hardBrexit: {
      text: "hard Brexit"
    },
    tuitionFees: {
      text: "tuition fees"
    },
    nationalisingRailways: {
      text: "nationalising railways"
    },
    increasingTax: {
      text: "increasing tax"
    },
    moreHouses: {
      text: "more houses"
    },
    nuclearWeapons: {
      text: "nuclear weapons"
    },
    nhsFunding: {
      text: "NHS funding"
    },
    protectingEnvironment: {
      text: "protecting environment"
    },
    immigration: {
      text: "immigration"
    },
    minimumWage: {
      text: "minimum wage"
    },

  },

  // phrases: {
  //   home: {
  //     // title: "What do you want to do?",
  //     text: "I want to ${doSomething}",
  //     options: {
  //       doSomething: {
  //         "know what I can do about Brexit": {
  //           goto: {
  //             type: 'phrase',
  //             name: 'brexit',
  //           },
  //         },
  //         "decide who to vote for": {
  //           goto: {
  //             type: 'phrase',
  //             name: 'decide',
  //           },
  //         },
  //         "learn about the parties": {
  //           goto: {
  //             type: 'phrase',
  //             name: 'partyStories'
  //           },
  //         },
  //        "know how much my vote counts for": {
  //           goto: {
  //             type: 'phrase',
  //             name: 'vote-worth'
  //           },
  //        },
  //       },
  //     },
  //   },
  //   home1: {
  //     // title: "What do you want to do1?",
  //     text: "I want to ${doSomething}",
  //     options: {
  //       doSomething: {
  //         "Know what I can do about Brexit?": {
  //           goto: {
  //             type: 'dashboard',
  //             name: 'brexit',
  //             task: 'brexit',
  //           },
  //         },
  //         "Decide who to vote for": {
  //           goto: {
  //             type: 'dashboard',
  //             name: 'decide',
  //             task: 'decide',
  //           },
  //         },
  //         "Learn about the parties": {
  //           goto: {
  //             type: 'step',
  //             name: 'partyStories'
  //           },
  //         },
  //        "Know how much my vote counts for": {
  //           goto: {
  //             type: 'step',
  //             name: 'vote-worth'
  //           },
  //        },
  //       },
  //     },
  //   },
  // },

  //Dashboards are collections of tasks
  dashboards: {
    home: {
      title: "What do you want to do? 🙋",
      subtitle: "Choose an option below. You can come back here later to choose another!",
      tasks: [
        "brexit",
        "decide",
        "parties",
        "vote-worth"
      ]
    },
    brexit: {
      title: "What did you want to do about Brexit?",
      subtitle: "Select one option to continue.",
      tasks: [
        "brexit-soft",
        "brexit-support",
        "brexit-commons",
        "brexit-stop"
      ]
    },
    decide: {
      title: "What matters to you?",
      subtitle: "Each topic contains 5 questions that divides or unites the parties.",
      tasks: [
        "issue-nhs",
        "issue-immigration",
        "issue-brexit",
        "issue-education",
        "issue-$apply"
      ]
    }
  },

  //Tasks are a series of steps, and are chosen from the dashboard
  tasks: {
    brexit: {
      icon: 'compass',
      label: "What can I do about Brexit?",
      color: "#42c299",
      goto: {
        type: 'dashboard',
        name: 'brexit'
      }
    },
    decide: {
      icon: 'map-o',
      label: "Decide who to vote for",
      color: "#e74289",
      goto: {
        type: 'dashboard',
        name: 'decide'
      },
      // igor: we want to be sure that the selection of quizzes
      // is flushed every time you pick up "decide" option
      dataUpdates: [
        {
          data: 'user.quizFlow',
          value: []
        }
      ]
    },
    parties: {
      icon: 'users',
      label: "Learn about the parties",
      color: "#c042de",
      goto: {
        type: 'step',
        name: 'partyStories'
      }
    },
    "vote-worth": {
      icon: 'check-square-o',
      label: "How much does my vote count?",
      color: "#00a2e5",
      goto: {
        type: 'step',
        name: 'vote-worth'
      }
    },
    "postcode-compare": {
      icon: 'check-square-o',
      label: "How much does my vote count?",
      color: "#00a2e5",
      goto: {
        type: 'step',
        name: 'postcode-compare'
      }
    },
    "brexit-support": {
      icon: "thumbs-o-up",
      label: "Get on with it",
      color: "#e74289",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
          value: 1
        }
      ]
    },
    "brexit-soft": {
      icon: "hand-rock-o",
      label: "I want to stop a hard Brexit",
      color: "#00a2e5",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
          value: 0.6
        }
      ]
    },
    "brexit-commons": {
      icon: "handshake-o",
      label: "Leave but let MPs have a say on the terms",
      color: "#c042de",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
          value: 0.8
        },
        {
          data: 'user.opinions.issues.brexit.debates.brexit-4.opinion',
          value: 1
        }
      ]
    },
    "brexit-stop": {
      icon: "hand-paper-o",
      label: "Stop it completely",
      color: "#42c299",
      goto: {
        type: 'step',
        name: 'postcode',
        next: 'result'
      },
      dataUpdates: [
        {
          data: 'user.opinions.issues.brexit.debates.brexit-1.opinion',
          value: 0
        }
      ]
    },
    "issue-nhs": {
      subtype: "multi-choice",
      icon: 'h-square',
      label: "NHS",
      color: "#42c299",
      // igor: please note, there is no "goto", because this task ONLY sets
      // the value and does NOT routes to a next step
      /*goto: {
      },*/
      dataUpdates: [
        {
          data: 'user.quizFlow.1',
          value: ["nhs-1","nhs-2","nhs-3"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      conditions: [
        "user.quizFlow.1"
      ]
    },
    "issue-immigration": {
      subtype: "multi-choice",
      icon: 'id-card-o',
      label: "Immigration",
      color: "#e74289",
      dataUpdates: [
        {
          data: 'user.quizFlow.2',
          value: ["immigration-1","immigration-2","immigration-3"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      conditions: [
        "user.quizFlow.2"
      ]

    },
    "issue-brexit": {
      subtype: "multi-choice",
      icon: 'newspaper-o',
      label: "Brexit",
      color: "#c042de",
      dataUpdates: [
        {
          data: 'user.quizFlow.3',
          value: ["brexit-1","brexit-2","brexit-3", "brexit-4"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      conditions: [
        "user.quizFlow.3"
      ]

    },
    "issue-education": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Education",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["education-1","education-2","education-3"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      conditions: [
        "user.quizFlow.4"
      ]

    },
    "issue-transport": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Transport",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["Transport-1"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      // conditions: [
      //   "user.quizFlow.4"
      // ]
    },
    "issue-economy": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Economy",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["economy-1"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      // conditions: [
      //   "user.quizFlow.4"
      // ]
    },
    "issue-housing": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Housing",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["housing-1"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      // conditions: [
      //   "user.quizFlow.4"
      // ]
    },
    "issue-defence": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Defence",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["defence-1"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      // conditions: [
      //   "user.quizFlow.4"
      // ]
    },
    "issue-environment": {
      subtype: "multi-choice",
      icon: 'graduation-cap',
      label: "Environment",
      color: "#00a2e5",
      dataUpdates: [
        {
          data: 'user.quizFlow.4',
          value: ["environment-1"],
          // igor: see "toggle" usage here: we make this task to
          // behave like a checkbox
          action: "toggle"
        }
      ],
      // conditions: [
      //   "user.quizFlow.4"
      // ]
    },
    "issue-$apply": {
      subtype: "multi-submit",
      label: "Start quiz!",
      color: "#00a2e5",
      goto: {
        type: 'step',
        name: 'question',
        // igor: "final" means the step name where you will be redirected after quiz
        // igor: the "next" here is where you will be redirected *after* the quiz
        // igor: note: you may interrupt the quiz by injecting any task with any route!
        final: 'quiz-priority',
        next: 'postcode'
      },
      conditions: [
        "user.quizFlow.1",
        "user.quizFlow.2",
        "user.quizFlow.3",
        "user.quizFlow.4"
      ]
    },
    // igor: Those are *answers* to questions. You may utilise any features of tasks here!
    // igor: the card below (question-nhs1-1) is a simple "interrupting" card!
    "question-nhs1-1": {
      label: "Jump straight to postcodes",
      goto: {
        type: 'step',
        name: 'quiz-priority',
        next: 'postcode'
      },
      dataUpdates: []
    },
    "question-nhs1-2": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      }
    },
    "question-nhs1-3": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      },
      dataUpdates: []
    },
    "question-nhs1-4": {
      label: "Go to question 2",
      goto: {
        type: 'step',
        name: 'question'
      },
      dataUpdates: []
    },
    // igor: the card below (question-nhs2-1) is a simple "interrupting" card!
    "question-nhs2-1": {
      label: "Go to dashboard",
      goto: {
        type: 'dashboard',
        name: 'decide'
      },
      dataUpdates: []
    },
    "question-nhs2-2": {
      label: "Finish quiz",
      goto: {
        type: 'step',
        name: 'question'
      },
      dataUpdates: []
    },
    "question-agree": {
      label: "Agree",
      goto: {
        type: 'step',
        name: 'question',
        opinion: 1
      }
    },
    "question-neutral": {
      label: "Neutral",
      goto: {
        type: 'step',
        name: 'question',
        opinion: 0.5
      }
    },
    "question-disagree": {
      label: "Disagree",
      goto: {
        type: 'step',
        name: 'question',
        opinion: 0
      }
    },
    "question-$skip": {
      subtype: "link",
      label: "I don't care 🙈 >",
      goto: {
        type: 'step',
        name: 'question'
      }
    },
  },

  // Steps are essentially pages
  steps: {
    goToResults: {
      label: "Loading your results..."
    },
    postcode: {
      label: "Where are you voting from?"
    },
    'quiz-priority': {
      label: "Finally, what matters most to you?"
    },
    'local-candidates-test': {

    },
    "vote-worth": {

    },
    "postcode-compare": {

    },
    result: {
      label: "Here are your results",
      sublabel: "Based on what you want and where you are..."
    },
    question: {

    },
    partyStories: {
      label: "Party stories"
    },
    proxyVotingStory: {
      label: "Proxy Voting",
      cardUrls: [
        "http://api.explaain.com/Detail/59172171a1f5940011a03b63",
        "http://api.explaain.com/Detail/59172231a1f5940011a03b65",
        "http://api.explaain.com/Detail/591722fba1f5940011a03b66",
      ]
    },
    sampleStory: {
      label: "Generic example story",
      cardUrls: [
        "http://api.explaain.com/Detail/591706ca7f9f9e0011533ef7",
        "http://api.explaain.com/Detail/5917066c7f9f9e0011533ef6",
        "http://api.explaain.com/Detail/591707247f9f9e0011533ef8",
        "http://api.explaain.com/Detail/591707647f9f9e0011533ef9"
      ]
    },
    policy: {
      label: "Privacy Policy"
    }
  },

  // Questions
  questions: {
    // "nhs1": {
    //   question: "Question 1",
    //   tasks: [
    //     "question-nhs1-1",
    //     "question-nhs1-2",
    //     "question-$skip"
    //   ]
    // },
    // "nhs2": {
    //   question: "Question 2",
    //   tasks: [
    //     "question-nhs2-1",
    //     "question-nhs2-2",
    //     "question-$skip"
    //   ]
    // }
  }
};
