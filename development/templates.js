/* Most of templates are fetched from http://explaain-api.herokuapp.com/templates
 * This file overrides loaded templates with the templates defined below
 * This has been made in order to develop templates faster without a need
 *   to go to build them on http://explaain-api.herokuapp.com/
 */

//NOTE: Jeremy has replaced some of these, copied from api.explaain.com

module.exports = function(CardTemplates){
  CardTemplates.card = {
    "dom": "div.card",
    "attr": {
      "class": {
        // Value will be taken from data.type
        "var": "type"
      },
      "data-uri": {
        "var": "@id"
      },
      "style": "height: auto"
    },
    "content": [
      {
        "dom": "div.card-visible",
        "content": [
          {
            "dom": "div.close",
            "content": [
              {
                "dom": "i.fa.fa-times",
                "attr": {
                  "data-hidden": "true"
                }
              }
            ]
          },
          {
            // Will load template, which is specified in data.type
            "template": {
              "var": "type"
            }
          },
          {
            "dom": "a.card-icon",
            "attr": {
              "target": "_blank",
              "tabindex": "-1"
            },
            "content": [
              {
                "dom": "img",
                "attr": {
                  "src": "//explaain-app.herokuapp.com/card-logo.png"
                }
              }
            ]
          }
        ]
      },
      {
        "dom": "button.edit-button",
        "attr": {
          "tabindex": "-1"
        },
        "content": [
          {
            "dom": "i.fa.fa-pencil",
            "attr": {
              "aria-hidden": "true"
            }
          }
        ]
      }
    ]
  };
  CardTemplates.Person = {
    "dom": "div.content",
    "content": [
      {
        "dom": "h2",
        "content": {
          "var": "name"
        }
      },
      {
        "dom": "div.card-image",
        "content": [
          {
            "dom": "img",
            "attr": {
              "src": {
                "var": "image"
              }
            }
          }
        ]
      },
      {
        "dom": "div.body-content",
        "content": {
          "var": "description",
          // Changes <a> in HTML to link to Explaain cards
          "markdown": true
        }
      }
    ]
  };

  CardTemplates.postcodeCompare = {
    "dom": "div.content.postcode-compare",
    "attr": {
      "class": {
        // Gets value from data.constituencyResults.resultsClass
        "var": "constituencyResults.resultsClass"
      }
    },
    "content": [
      // This loads template with postcodeFormHeader name
      { "template": "postcodeFormHeader" },
      {
        "template":"error",
        // Mapping example
        "mapping": [
          ["error", "postcodeError"]
        ]
      },
      {
        "dom": "form.postcode-form",
        "attr": {
          // postcodeSubmit is a function, which will be executed on click
          "onsubmit": {
            "var": "postcodeSubmit"
          }
        },
        "content": [
          {
            "dom": "input.form-control",
            "attr": {
              "autofocus": "true",
              "type": "text",
              "name": "postcode",
              "placeholder": "Home Postcode",
              // Two way binding with input and model through data
              // (search for postcodeBinding in views/index.js)
              "binding": {
                "var": "postcodeBinding"
              }
            }
          },
          {
            "dom": "input.form-control",
            "attr": {
              "type": "text",
              "name": "postcode",
              "placeholder": "Uni Postcode",
              "binding": {
                "var": "postcodeUniBinding"
              }
            }
          },
          {
            "dom": "button.btn.btn-primary",
            "attr": {
              "type": "submit"
            },
            "content": [
              {
                "dom": "span",
                "content": "Compare",
                // Simple condition
                "condition": "!constituencyResults"
              },
              {
                "dom": "span",
                "content": "Go Again",
                "condition": "constituencyResults"
              }
            ]
          }
        ]
      },
      {
        "dom": "div.body-content",
        "condition": "!constituencyResults",
        "content": [
          {
            "dom": "h3",
            "condition": "!isWaiting",
            "content": {
              "var": "subheading"
            }
          },
          {
            "dom": "p.explaainified",
            "condition": "!isWaiting",
            "content": {
              "var": "description",
              "markdown": true
            }
          }
        ]
      },
      {
        "dom": "div.body-content.results",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-1",
            "condition": "constituencyResults",
            "content": "1"
          },
          {
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "First, here are your options"
          },
          {
            "dom": "div",
            "condition": "!isWaiting",
            "template": "constituencyResults"
          }
        ]
      },
      {
        "condition": "isWaiting",
        "template": "loading"
      },
      {
        "dom": "section.get-registered.divider",
        "content": [
          {
            "dom": "div.step-number.step-2",
            "condition": "constituencyResults",
            "content": "2"
          },
          {
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "Next, here's how to make the most of your vote ✊"
          },
          {
            "dom": "p",
            "condition": "constituencyResults",
            "content": "Make sure you're informed about the issues."
          },
          {
            "dom": "p.small-link",
            "condition": "constituencyResults",
            "content":{
               "var": "constituencyResults.whereIWillBeText",
               "markdown": "true"
             }
          },
          {
            "dom": "div.layout-table",
            "content": [
              {
                "dom": "div.column.learn-more",
                "condition": "constituencyResults",
                "content": [
                  {
                    "dom": "p",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "attr": {
                          "onclick": {
                            "var": "onLearnMore"
                          }
                        },
                        "content": [
                          {
                            "dom": "a.discard-card-style",
                            "attr": {
                              "href": "//api.explaain.com/Detail/5911d608ac223e0011e45fb3"
                            },
                            "content": [
                              {
                                "dom": "button.btn.btn-primary",
                                "content": "Learn more"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // {
                  //   "dom": "p.small",
                  //   "content": [
                  //     { "dom": "br" },
                  //     { "dom": "br" }
                  //   ]
                  // }
                ]
              },
              {
                "dom": "div.column",
                "content": [
                  {
                    "condition": "!constituencyResults",
                    "dom": "div.bold",
                    "content": "or try out the quiz"
                  },
                  {
                    "dom": "p.goToQuiz",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "content": [
                          {
                            "dom": "a.btn.btn-success",
                            "attr": {
                              // "onclick": "gotToQuiz"
                              "href": "/quiz"
                            },
                            "content": "Go to the quiz  >"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "template": "linkToGovUKWebsiteHint"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "dom": "div.footer",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-3",
            "content": "3"
          },
          {
            "dom": "h2",
            "content": "Finally, share and spread the power"
          },
          {
            "dom": "p",
            "content": "Let friends know where their vote is most effective this election by sharing this tool."
          },
          {
            "template": "shareButtons",
            "mapping": [
              ["facebookShareHref", "constituencyResults.facebookShareHref"],
              ["twitterShareHref", "constituencyResults.twitterShareHref"]
            ]
          },
        ]
      }
    ]
  }

  CardTemplates.OrganizationResults = {
    "dom": "div.content.OrganizationResults.results",
    "attr": {
      "class": {
        // Gets value from data.constituencyResults.resultsClass
        "resultsLoaded": true
      }
    },
    "content": [
      // This loads template with postcodeFormHeader name
      { "template": "postcodeFormHeader" },
      {
        "dom": "div.body-content.results.no-top-border",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-1",
            "condition": "constituencyResults",
            "content": "1"
          },
          {
            "dom": "div",
            "condition": "!isLocalCandidates",
            "content": [{
              "dom": "div",
              "condition": "!isWaiting",
              "content": {
                "func": ['mainResults']
              }
            }],
          },
          {
            "dom": "div",
            "condition": "isLocalCandidates",
            "content": [
              {
                "dom": "div.local-candidates-container",
                "condition": "!isWaiting",
                "loop": "mainResults",
                "content": [{"template": "localCandidatePlate"}]
              },
              {
                "dom": "div.clearfix",
                "content": ""
              }
            ],
          },
          // {
          //   "dom": "div.OrganizationContainer",
          //   "condition": "!isWaiting",
          //   "template": "Organization"
          //   // "loop": "resultParties",
          //   // "content": [
          //   //   {
          //   //     "template": "cell"
          //   //   }
          //   // ]
          // },
          // {
          //   "dom": "div",
          //   "condition": "!isWaiting",
          //   "content": {
          //     "func": ['renderPercentages']
          //   }
          // },
          // {
          //   "dom": "div",
          //   "condition": "!isWaiting",
          //   "template": "showMoreOverlay",
          //   "mapping" : [["showDetailsButton"]]
          // },
          // {
          //   "dom": "div",
          //   "condition": "!isWaiting",
          //   "template": "showMore",
          //   "mapping" : [["toggleDetailsButton"]]
          // },
          // {
          //   "dom": "div",
          //   "condition": "!isWaiting",
          //   "content": {
          //       "func": ['renderExtraCards', 'extraCards']
          //   }
          // },
          {
            "dom": "div",
            "condition": "!isWaiting",
            "template": "more-stuff",
            "mapping": [['moreStuff']]
          },
          // {
          //   "dom": "div",
          //   "condition": "!isWaiting",
          //   "template": "share",
          //   "mapping": [['shareButtonCard']]
          // }
        ]
      },
      {
        "condition": "isWaiting",
        "template": "loading"
      },
      {
        "dom": "section.get-registered.divider",
        "content": [
          {
            "dom": "div.step-number.step-2",
            "condition": "constituencyResults",
            "content": "2"
          },
          {
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "Next, here's how to make the most of your vote ✊"
          },
          {
            "dom": "p",
            "condition": "constituencyResults",
            "content": "Make sure you’re registered to vote. It takes 3 minutes and is all done online."
          },
          {
            "dom": "p.small-link",
            "condition": "constituencyResults",
            "content":{
               "var": "constituencyResults.whereIWillBeText",
               "markdown": "true"
             }
          },
          {
            "dom": "div.layout-table",
            "content": [
              {
                "dom": "div.column.learn-more",
                "condition": "constituencyResults",
                "content": [
                  {
                    "dom": "p",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "attr": {
                          "onclick": {
                            "var": "onLearnMore"
                          }
                        },
                        "content": [
                          {
                            "dom": "a.discard-card-style",
                            "attr": {
                              "href": "//api.explaain.com/Detail/5911d608ac223e0011e45fb3"
                            },
                            "content": [
                              {
                                "dom": "button.btn.btn-primary",
                                "content": "Learn more"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // {
                  //   "dom": "p.small",
                  //   "content": [
                  //     { "dom": "br" },
                  //     { "dom": "br" }
                  //   ]
                  // }
                ]
              },
              {
                "dom": "div.column",
                "content": [
                  {
                    "condition": "!constituencyResults",
                    "dom": "div.bold",
                    "content": "or go straight to register"
                  },
                  {
                    "dom": "p.gotToQuiz",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "content": [
                          {
                            "dom": "a.btn.btn-success",
                            "attr": {
                              // "onclick": "gotToQuiz"
                              "href": "/quiz"
                            },
                            "content": "Go to the quiz  >"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "template": "linkToGovUKWebsiteHint"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "dom": "div.footer",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-3",
            "content": "3"
          },
          {
            "dom": "h2",
            "content": "Finally, multiply your vote"
          },
          {
            "dom": "p",
            "content": "If everyone who used this site today shared it with 4 friends, we'd inform over 500,000 voters a week."
          },
          {
            "template": "shareButtons",
            "mapping": [
              ["facebookShareHref", "constituencyResults.facebookShareHref"],
              ["twitterShareHref", "constituencyResults.twitterShareHref"]
            ]
          },
        ]
      }
    ]
  }

  /* hack */
  CardTemplates.OrganizationResultsGetRegistered = {
    "dom": "div.content.OrganizationResults.no-overflow.results",
    "attr": {
      "class": {
        // Gets value from data.constituencyResults.resultsClass
        "resultsLoaded": true
      }
    },
    "content": [
      // This loads template with postcodeFormHeader name
      { "template": "postcodeFormHeader" },
      {
        "dom": "div.body-content.results.no-top-border.contains-cards.get-registered",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-1",
            "condition": "constituencyResults",
            "content": "1"
          },
          {
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "Here's how you register 🎉"
          },
          {
            "dom": "p",
            "condition": "constituencyResults",
            "content": "Make sure you’re registered to vote. It takes 3 minutes and is all done online."
          },
          {
            "dom": "p.small-link",
            "condition": "constituencyResults",
            "content":{
               "var": "constituencyResults.whereIWillBeText",
               "markdown": "true"
             }
          },
          {
            "dom": "div.layout-table",
            "content": [
              {
                "dom": "div.column.learn-more",
                "condition": "constituencyResults",
                "content": [
                  {
                    "dom": "p",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "attr": {
                          "onclick": {
                            "var": "onLearnMore"
                          }
                        },
                        "content": [
                          {
                            "dom": "a.discard-card-style",
                            "attr": {
                              "href": "//api.explaain.com/Detail/5911d608ac223e0011e45fb3"
                            },
                            "content": [
                              {
                                "dom": "button.btn.btn-primary",
                                "content": "Learn more"
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  },
                  // {
                  //   "dom": "p.small",
                  //   "content": [
                  //     { "dom": "br" },
                  //     { "dom": "br" }
                  //   ]
                  // }
                ]
              },
              // {
              //   "dom": "div.column",
              //   "content": [
              //     {
              //       "condition": "!constituencyResults",
              //       "dom": "div.bold",
              //       "content": "or go straight to register"
              //     },
              //     {
              //       "template": "registerButton"
              //     },
              //     {
              //       "template": "linkToGovUKWebsiteHint"
              //     }
              //   ]
              // }
            ]
          },
          // {
          //   "dom": "div",
          //   "condition": "!isLocalCandidates",
          //   "content": [{
          //     "dom": "div",
          //     "condition": "!isWaiting",
          //     "content": {
          //       "func": ['mainResults']
          //     }
          //   }],
          // },
          {
            "dom": "div",
            "condition": "isLocalCandidates",
            "content": [
              {
                "dom": "div.local-candidates-container",
                "condition": "!isWaiting",
                "loop": "mainResults",
                "content": [{"template": "localCandidatePlate"}]
              },
              {
                "dom": "div.clearfix",
                "content": ""
              }
            ],
          },
        ]
      },
      {
        "condition": "isWaiting",
        "template": "loading"
      },
      {
        "dom": "section.get-registered.divider",
        "content": [
          {
            "dom": "div.step-number.step-2",
            "condition": "constituencyResults",
            "content": "2"
          },

          {
            "dom": "div",
            "condition": "!isWaiting",
            "template": "more-stuff",
            "mapping": [['moreStuff']]
          }
        ]
      },
      {
        "dom": "div.footer",
        "condition": "constituencyResults",
        "content": [
          {
            "dom": "div.step-number.step-3",
            "content": "3"
          },
          {
            "dom": "h2",
            "content": "Finally, multiply your vote"
          },
          {
            "dom": "p",
            "content": "You never know who else might vote the same way. Share with 10 friends and make everyone's vote count #GE2017"
          },
          {
            "template": "shareButtons",
            "mapping": [
              ["facebookShareHref", "constituencyResults.facebookShareHref"],
              ["twitterShareHref", "constituencyResults.twitterShareHref"]
            ]
          },
        ]
      }
    ]
  }
  /* end hack */

  CardTemplates.voteWorth = {
    "dom": "div",
    "content": [
      { "template": "postcodeFormHeader" },
      {
        "dom": "div.body-content",
        "content": [
          {
            "dom":"form.postcode-form",
            "condition": "!isWaiting",
            "attr":{
              "onsubmit":{
                "var":"postcodeSubmit"
              }
            },
            "content":[
              {
                "dom":"input.form-control",
                "attr": {
                  "autofocus":"true",
                  "type":"text",
                  "required": "true",
                  "pattern": "^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$",
                  "name":"postcode",
                  "placeholder":"Postcode",
                  "binding":{
                    "var":"postcodeBinding"
                  }
                }
              },
              {
                "dom":"button.btn.btn-success",
                "attr":{
                  "type":"submit"
                },
                "content":"Go!"
              }
            ]
          },
          {
            "condition": "isWaiting",
            "template": "loading"
          },
          {
            "dom": "h3",
            "content": {
              "var": "subheading"
            }
          },
          {
            "dom": "p",
            "content": {
              "var": "description",
              "markdown": true
            }
          },
          {
            "dom": "div",
            "condition": "constituencyResults",
            "template": "constituencyResults"
          },
          {
            "condition": "constituencyResults",
            "template": "shareButtons"
          }
        ]
      },
      {
        "dom": "div.footer",
        "content": [
          // {
          //   "condition": "!constituencyResults",
          //   "content": [
          //     {
          //       "dom": "div.bold",
          //       "content": "or go straight to register"
          //     },
          //     {
          //       "template": "registerButton"
          //     },
          //     {
          //       "template": "linkToGovUKWebsiteHint"
          //     }
          //   ]
          // },
          {
            "condition": "constituencyResults",
            "content": [
              {
                "dom": ".column50",
                "content": [
                  {
                    "dom": "p",
                    "content": [
                      {
                        "dom": "a.discard-card-style",
                        "attr": {
                          "onclick": {
                            "var": "onLearnMore"
                          }
                        },
                        "content": [
                          {
                            "dom": "button.btn.btn-success",
                            "content": "Learn more"
                          }
                        ]
                      }
                    ]
                  },
                  // {
                  //   "dom": "p.small",
                  //   "content": [
                  //     { "dom": "br" },
                  //     { "dom": "br" }
                  //   ]
                  // }
                ]
              },
              // {
              //   "dom": ".column50",
              //   "content": [
              //     {
              //       "template": "registerButton"
              //     },
              //     {
              //       "template": "linkToGovUKWebsiteHint"
              //     }
              //   ]
              // }
            ]
          }
        ]
      }
    ]
  };

  CardTemplates.resultParty = {
    "dom": "div.content",
    "content": [
      {
        "dom": "h2",
        "content": {
          "var": "name"
        }
      },
      {
        "dom": "div.card-image",
        "content": [
          {
            "dom": "img",
            "attr": {
              "src": {
                "var": "image"
              }
            }
          }
        ]
      },
      {
        "dom": "div.body-content",
        "content": {
          "var": "description",
          "markdown": true
        }
      },
      {
        "dom": "div",
        "content": {
          "func": ['renderPercentages']
        }
      },
      {
        "dom": "div",
        "template": "showMoreOverlay",
        "mapping" : [["showDetailsButton"]]
      }
    ]
  }


  CardTemplates.postcodeFormHeader = {
    "dom": "div",
    "content":
    [
      {
        "dom": "h2",
        "condition": "!constituencyResults",
        "content": {
          "var": "name",
          "default": "Please enter your postcode",
          "html": true
        }
      },
      {
        "dom": "p",
        "condition": "!constituencyResults",
        "content": {
          "var": "subtitle",
          "markdown": true
        }
      }
    ]
  }

  CardTemplates.linkToGovUKWebsiteHint = {
    "dom": "p.small",
    // "content": "This link will take you to the official gov.uk website"
    "content": ""
  }

  CardTemplates.registerButton = {
    "dom": "p.register",
    "content": [
      {
        "dom": "a.discard-card-style",
        "attr": {
          "href": "https://www.gov.uk/register-to-vote",
          "target":"_blank"
        },
        "content": [
          {
            "dom": "button.btn.btn-success",
            "content": "Register To Vote  >"
          }
        ]
      }
    ]
  }

  CardTemplates.partiesTable =
    {
      "dom": "table",
      "loop": "rows",
      "content": [
        {
          "template":"row"
        }
      ]
    }
  ;

  CardTemplates.row =
    {
      "dom": "tr",
      "loop": "cells",
      "content": [
        {
          "template":"cell"
        }
      ]
    }
  ;

  CardTemplates.cell =
    {
      "dom": "td",
      "content": {
        "var": "value"
      }
    }
  ;

  CardTemplates.loading =
    {
      "dom": 'img.loading.showing',
      "attr": {
        'src': '/img/loading.gif'
      }
    }
  ;

  CardTemplates.voteNow =
    {
      "dom": "div",
      "content": [
        {
          "dom": ".bold",
          "content": "or go straight to register"
        },
        {
          "dom": "p",
          "content": [
            {
              "dom": "a.discard-card-style",
              "attr": {
                "href": "https://www.gov.uk/register-to-vote",
                "target":"_blank",
              },
              "content": [
                {
                  "dom": "button.btn.btn-primary",
                  "content": "Register >"
                }
              ]
            }
          ]
        },
        // {
        //   "dom": "p.small",
        //   "content": "This link will take you to the official gov.uk website"
        // }
      ]
    }
  ;

  CardTemplates.constituencyResults =
    {
      "dom": ".seats",
      "attr": {
        "class": {
          "var": "constituencyResults.numberOfSwingSeats"
        }
      },
      "content": [
        {
          "dom": "div.bold",
          "content": {
            "var": "constituencyResults.heading"
          }
        },
        {
          "dom": "div.subheading.explaainified",
          "content": {
            "var": "constituencyResults.subheading",
            "markdown": "true"
          }
        },
        {
          "dom": ".seat-list",
          // Loop example
          //NOTE: "data.constituencyResults.constituencies.something"
          // will turn into just "data.something" in the 'constituency' template
          // (the scope changes similar to mapping)
          "loop": "constituencyResults.constituencies",
          "content": [
            {
              "template": "constituency"
            }
          ]
        },
        {
          "dom": "p.small-link",
          "content":{
             "var": "constituencyResults.calculateText",
             "markdown": "true"
           }
        }
      ]
    }
  ;

  CardTemplates.constituency =
    {
      "dom": "div.seat.column50",
      "content": [
        {
          "dom": "div.impact",
          "condition": "swingSeat",
          "content": [
            {
              "dom": "span",
              "content": "Most Impact"
            },
            {
              "dom": "i.fa.fa-caret-down"
            }
          ]
        },
        {
          "dom": "div.versus.bold.line1em",
          "attr": {
            "class": {
              "var": "swingClass"
            }
          },
          "content": [
            {
              "dom": "div.location",
              "content": {
                "var": "uniHomeLocation"
              }
            },
            {
              "dom": "div.constituency",
              "content": {
                "var": "location"
              }
            },
            {
              "dom": "i.swing-icon.fa",
              "attr": {
                "class": {
                  "var": "swingIcon"
                }
              }
            },
            {
              "dom": "div.parties-container",
              "content": [
                {
                  "dom": "div.parties",
                  "content": [
                    {
                      "dom": "span.name",
                      "content": {
                        "var": "party1"
                      },
                      "attr": {
                        "style": {
                          "color": {
                            "var": "party1Color"
                          }
                        }
                      }
                    },
                    {
                      "dom": "span.vs",
                      "condition": "!swingSeat",
                      "content": " safe seat "
                    },
                    {
                      "dom": "div.vs",
                      "condition": "swingSeat",
                      "content": " vs "
                    },
                    {
                      "dom": "span.name",
                      "content": {
                        "var": "party2"
                      },
                      "attr": {
                        "style": {
                          "color": {
                            "var": "party2Color"
                          }
                        }
                      }
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ;

  CardTemplates.shareButtons =
    {
      "dom": "div.share-buttons",
      "content": [
        {
          "dom": "p",
          "content": {
            "var": "shareHeading",
            "default": "Share this to help friends and family #GE2017"
          }
        },
        {
          "dom": "a.discard-card-style",
          "attr": {
            "target":"_blank",
            "href": {
              "var": "facebookShareHref"
            }
          },
          "content": [
            {
              "dom": "button.btn.btn-facebook",
              "icon": "fa-facebook",
              "content": [
                {
                  "dom": "i.fa.fa-facebook"
                },
                {
                  "dom": "span",
                  "content": "Facebook"
                }
              ]
            }
          ]
        },
        {
          "dom": "a.discard-card-style",
          "attr": {
            "target":"_blank",
            "href": {
              "var": "twitterShareHref"
            }
          },
          "content": [
            {
              "dom": "button.btn.btn-twitter",
              "icon": "fa-twitter",
              "content": [
                {
                  "dom": "i.fa.fa-twitter"
                },
                {
                  "dom": "span",
                  "content": "Twitter"
                }
              ]
            }
          ]
        }
      ]
    }
  ;

  CardTemplates.loopExample =
    {
      "dom": ".people",
      "loop": "people", // changing the scope of data
      "content": [
        {
          "dom": ".person",
          "content": [
            {
              "dom": "div",
              "content": {
                "var": "name"
              }
            },
            {
              "dom": "div",
              "content": {
                "var": "age"
              }
            }
          ]
        }
      ]
    }
  ;

  CardTemplates.postcodeInput = {
    "dom":"div.content",
    "content":[
      { "template": "postcodeFormHeader" },
      {
        "dom":"div.body-content",
        "content":[
          {
            "dom":"form.postcode-form",
            "condition": "!isWaiting",
            "attr":{
              "onsubmit":{
                "var":"postcodeSubmit"
              }
            },
            "content":[
              {
                "dom":"input.form-control",
                "attr": {
                  "autofocus":"true",
                  "type":"text",
                  "required": "true",
                  "pattern": "^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$",
                  "name":"postcode",
                  "placeholder":"Postcode",
                  "binding":{
                    "var":"postcodeBinding"
                  }
                }
              },
              {
                "dom":"button.btn.btn-success",
                "attr":{
                  "type":"submit"
                },
                "content":"Go!"
              }
            ]
          },
          {
            "condition": "isWaiting",
            "template": "loading"
          },
          {
            "dom":"h3",
            "content":{
              "var":"subheading"
            }
          },
          {
            "dom":"p",
            "content":{
              "var":"description",
              "markdown":true
            }
          }
        ]
      }
    ]
  }

  CardTemplates.question = {
    "dom": ".content",
    "content": [
      {
        "dom": "h2",
        "content": {
          "var": "name"
        }
      },
      {
        "dom": ".body-content",
        "content": {
          "var": "description",
          "markdown": true
        }
      },
      {
        "dom": "section.questions",
        "content": [
          {
            "loop": "answers",
            "content": [{"template": "answer"}]
          }
        ]
      }
    ]
  }

  CardTemplates.answer = {
    "dom": "a",
    "attr": {
      "class": {
        "var": "class"
      },
      "onclick": {
        "var": "onclick"
      }
    },
    "content": [
      {
        "dom": "h5",
        "content": {
          "var": "label"
        }
      }
    ]
  }

  CardTemplates.policy = {
    "dom": ".content",
    "content": [
      {
        "dom": "div",
        "content": [
          {
            "dom": "h2",
            "content": "GE2017.com - Privacy Policy"
          },
          {
            "dom": "div.body-content",
            "content": [
              {
                "dom": "p",
                "content": "Last updated: 09/05/2017"
              },
              {
                "dom": "p",
                "content": 'Explaain LTD. ("us", "we", or "our") operates www.ge2017.com (the "Site"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information we receive from users of the Site.'
              },
              {
                "dom": "p",
                "content": 'We use your Personal Information only for providing and improving the Site. By using the Site, you agree to the collection and use of information in accordance with this policy.'
              },
              {
                "dom": "h3",
                "content": 'Information Collection And Use'

              },
              {
                "dom": "p",
                "content": 'While using our Site, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to your postcode, Facebook login identification, email address and Facebook Messenger identification.'

              },
              {
                "dom": "h3",
                "content": 'Log Data'

              },
              {
                "dom": "p",
                "content": 'Like many site operators, we collect information that your browser sends whenever you visit our Site ("Log Data").'

              },
              {
                "dom": "p",
                "content": 'This Log Data may include information such as your computer\'s Internet Protocol ("IP") address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, the time spent on those pages and other statistics.'
              },
              {
                "dom": "p",
                "content": 'In addition, we may use third party services such as Google Analytics that collect, monitor and analyze the collected data for the purposes of improving this service for users.'
              },
              {
                "dom": "h3",
                "content": 'Communications'

              },
              {
                "dom": "p",
                "content": 'We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information related to your vote on or before June 8th 2017. You will receive one email after June 8th 2017 asking if you wish to remain in contact with the company of which you can opt-in or out of at your discretion. '
              },
              {
                "dom": "h3",
                "content": 'Cookies'
              },
              {
                "dom": "p",
                "content": 'Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer\'s hard drive.'
              },
              {
                "dom": "p",
                "content": 'Like many sites, we use "cookies" to collect information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.'
              },
              {
                "dom": "h3",
                "content": 'Security'
              },
              {
                "dom": "p",
                "content": 'The security of your Personal Information is important to us, but remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.'
              },
              {
                "dom": "h3",
                "content": 'Changes To This Privacy Policy'
              },
              {
                "dom": "p",
                "content": 'This Privacy Policy is effective as of 02/05/2017 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.'
              },
              {
                "dom": "p",
                "content": 'We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.'
              },
              {
                "dom": "p",
                "content": 'If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.'
              },
              {
                "dom": "h3",
                "content": 'Contact Us'
              },
              {
                "dom": "p",
                "content": 'If you have any questions about this Privacy Policy, please contact us at hello@explaain.com'
              }
            ]
          }
        ]
      }
    ]
  }
  CardTemplates.error = {
    "dom":"p.error",
    "condition": "error",
    "content":{
      "var":"error"
    }
  }
  CardTemplates["more-stuff"] = {
    "dom":"section.card-body.text-center",
    "content":[
      {
        "dom": "h2",
        "content": {
          "var": "heading"
        }
      },
      {
        "dom": "button.btn.btn-lg.btn-primary",
        "attr": {
          "onclick": {
            "var": "buttonAction"
          }
        },
        "content": {
          "var": "buttonText"
        }
      }
    ]
  }


  CardTemplates.quizPriority = {
    "dom":"div.content.priorities",
    "content":[
      {
        "dom":"div.body-content",
        "content":[
          {
            "dom": "h2.q-priority",
            "content": "Finally, do you care more about certain issues than others?"
          },
          {
            "dom": "p.helper-text.helper-desc",
            "content": "Click on as many topics as you like and we’ll weight your answer on those topics more highly."
          },
          {
            "dom": "div.priority",
            "loop": "quizTopics",
            "content":[
              {
                "dom": "a.quiz-topic-plate",
                "attr": {
                  "class": {
                    "var": "highPriorityClass"
                  },
                  // "style": {
                  //   "background-color": {
                  //     "var": "color"
                  //   }
                  // },
                  "onclick": {
                    "var": "topicTogglePriority"
                  },
                  // "data-label": {
                  //   "var": "label"
                  // },
                },
                "content": [
                  {
                    "dom": "div",
                    "content": [
                      {
                        "dom": "span",
                        "content": {
                          "var": "label"
                        }
                      },
                      {
                        "dom": "span.t-featured",
                        "content": "🌟",
                        "condition": "highPriority"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "dom": "a.submitPriorities.btn.btn-success.bigActionButton",
            "content": "Calculate my results",
            "attr": {
              "onclick": {
                "var": "setPriorities"
              }
            }
          }
        ]
      }
    ]
  }

  CardTemplates.gotoPostcodeButton = {
    "dom":"section.card-body",
    "content":[
      {
        "dom": "button.btn.btn-lg.btn-primary",
        "attr": {
          "onclick": {
            "var": "buttonAction"
          }
        },
        "content": {
          "var": "buttonText"
        }
      }
    ]
  }



  CardTemplates.localCandidatePlate = {
    "dom": "a.local-candidate-plate.internal",
    "attr":{
      "href": {
        "var": "cardHref"
      }
    },
    "content": [
      {
        "dom": "div.lc-image",
        "attr": {
          "style": {
            "background-image": {
              "var": "image_url"
            }
          },
        },
      },
      {
        "dom": "h3.lc-name",
        "content": {
          "var": "name"
        }
      },
      {
        "dom": "h4.lc-party-name",
        "content": {
          "var": "party_name"
        }
      }
    ]
  }

  CardTemplates.showMore = {
    "dom": "div",
    "content": [
      {
        "dom": ".btn.btn-default#toggle-details-btn",
        "attr": {
          "onclick": {
            "var": "toggle"
          }
        },
        "content": "More details"
      }
    ]
  }
  CardTemplates.showMoreOverlay = {
    "dom": "div",
    "content": [
      {
        "dom": "a.btn.btn-default#toggle-details-btn",
        "attr": {
          "href": {
            "var": "cardKey"
          }
        },
        "content": "More details"
      }
    ]
  }
  CardTemplates.landingView = {
    "dom": "section.step",
    "content": [
      {
        "dom": ".quizTopLine",
        "content": [
          { "dom": "div.spacer" }
        ],
      },
      {
      "dom": "div",
      "condition": "!countrySelected",
      "content": [
        {
          "dom":"div",
          "content": [
            {
              "dom": ".card.quiz-percentages",
              "content": [
                {
                  "dom": ".card-visible.text-center",
                  "content": [
                    {
                      "dom": ".content.quiz-intro",
                      "content": [
                        {
                          "dom": "div.step-number.step-2",
                          "condition": "quizResultsPage",
                          "content": "2"
                        },
                        {
                          "dom": "h2",
                          "content": "Where do you stand on these 12 issues?"
                        },
                        {
                          "dom": "p",
                          "content": "See who you match with in real time as you give your views on the election's hottest topics."
                        },
                        {
                          "dom": "p.italics",
                          "content": "The results may surprise you…"
                        },
                        {
                          "template": "quizPercentages",
                          "mapping": [
                            ["data", "partiesRandomChartData"]
                          ]
                        }
                      ]
                    },
                    {
                      "dom": ".startQuiz",
                      "content": "Find your match >",
                      "condition": "!quizStarted",
                      "attr": {
                        "onclick": {
                          "var": "clickStartQuiz"
                        }
                      }
                    }
                  ]
                }
              ]
            },
            {
              "dom": "p.or",
              "content": "or"
            },
            {
              "dom": ".card.quiz-extra",
              "content": [
                {
                  "dom": ".card-visible.text-center",
                  "content": [
                    {
                      "dom": "h2",
                      "content": "Student? Find out where you should vote."
                    },
                    {
                      "dom": "p",
                      "content": "Compare your postcodes to see where your vote has most impact."
                    },
                    {
                      "dom": "a.btn.btn-primary",
                      "content": "Find out >",
                      "condition": "!quizStarted",
                      "attr": {
                        // "onclick": {
                        //   "var": "startStudentCompare"
                        // }
                        "href": "/students"
                      }
                    }
                    // {
                    //   "dom": "h2",
                    //   "content": "I know what I want my vote to do"
                    // },
                    // {
                    //   "dom": "p",
                    //   "content": "Just tell me what’s possible"
                    // },
                    // {
                    //   "dom": "button.btn.btn-primary",
                    //   "content": "Find out >",
                    //   "condition": "!quizStarted",
                    //   "attr": {
                    //     "onclick": {
                    //       "var": "startSingleSentence"
                    //     }
                    //   }
                    // }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }],
  },
  CardTemplates.quizMaster = {
    "dom": "section.step",
    "content": [
      {
        "dom": ".quizTopLine",
        "condition": "topLineConditional",
        "content": [
          {
            "dom": "div",
            "content": [
              {
                "dom": ".quizSkip",
                "content": "Skip >",
                "attr": {
                  "onclick": {
                    "var": "skipQuestion"
                  }
                },
                "condition": "!isSubquestion"
              },
              {
                "dom": ".quizBack",
                "content": "< Back",
                "attr": {
                  "onclick": {
                    "var": "back"
                  }
                },
                // "condition": "!standaloneResults && !finalResults"
              }
            ]
          },
          {
            "template": "quizProgress",
            "condition": "countrySelected",
            "mapping": [
              ["progressBarWidth", "progressBarWidth"],
              ["countrySelected", "countrySelected"],
              ["noProgressBarNeeded", "standaloneResults"]
            ]
          }
        ]
      },
      {
        "dom": "span.pickAVotingOption",
        "condition": "showCarouselResults",
        "content": "Pick a voting option or"
      },
      {
        "dom": "a.btn.btn-default.retake",
        "attr": {
          "href": "/quiz"
        },
        "condition": "quizResults",
        "content": "⟲ Retake Quiz"
      },
      { // Party results
        "dom": ".card.results-top",
        "condition": "partyResults",
        "content": [
          {
            "dom": ".card-visible.text-center",
            "content": [
              {
                "dom": ".content",
                "content": [
                  {
                    "dom": "div.step-number.step-1",
                    "content": "1"
                  },
                  {
                    "dom": "h2.bestMatchSoFar",
                    "content": "Based on the manifestos, your best match is..."
                  },
                  {
                    "dom": ".quizPercentages.topLayer.basic-top-match",
                    "condition": "quizResultsPage",
                    "content": [
                      {
                        "loop": "partiesChartDataTopMatch",
                        "content": [{"template": "quizPercentagesParty"}]
                      },
                    ]
                  },
                  {
                    "dom": "div.quizResults",
                    "content": [
                      {
                        "dom": "img.oldResultsFormat",
                        "attr": {
                          "src": {
                            "var": "resultLogo"
                          }
                        }
                      },
                      {
                        "dom": "h2.oldResultsFormat",
                        "content": {
                          "var": "resultName"
                        }
                      },
                      {
                        "dom": "h2.oldResultsFormat",
                        "content": {
                          "var": "resultPercentage"
                        }
                      },
                      {
                        "dom": ".action-buttons",
                        "content": [
                          {
                            "dom": "p.shareText",
                            "content": "Share your results:"
                          },
                          {
                            "template": "shareButtons",
                            "mapping": [
                              ["facebookShareHref", "facebookShareAlignmentHref"],
                              ["twitterShareHref", "twitterShareAlignmentHref"]
                            ]
                          },
                        ]
                      },
                      {
                        "dom": "p.postcode-instructions",
                        "content": "... now add your postcode and see the options in your constituency."
                      },
                      {
                        "dom":"form.postcode-form",
                        "condition": "!isWaiting",
                        "attr":{
                          "onsubmit":{
                            "var":"postcodeSubmit"
                          }
                        },
                        "content":[
                          {
                            "dom":"input.form-control",
                            "attr": {
                              "autofocus":"true",
                              "type":"text",
                              "required": "true",
                              "pattern": "^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$",
                              "name":"postcode",
                              "placeholder":"Postcode",
                              "binding":{
                                "var":"postcodeBinding"
                              }
                            }
                          },
                          {
                            "dom":"button.btn.btn-success",
                            "attr":{
                              "type":"submit"
                            },
                            "content":"Go!"
                          }
                        ]
                      },
                      {
                        "condition": "isWaiting",
                        "template": "loading"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "dom": ".card.priority",
        "condition": "quizPriorityPage",
        "content": [
          {
            "dom": ".card-visible.text-center",
            "content": [
              {
                "dom": ".content",
                "content": [
                  {
                    "template": "quizPriority",
                    "mapping": [
                      ["quizTopics", "quizTopics"],
                      ["setPriorities", "setPriorities"]
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      { // Country selector
        "dom": "div",
        "condition": "!countrySelected",
        "content": [
          {
            "dom": "h2",
            "content": "Where are you voting?"
          },
          {
            "dom": "div.countries",
            "loop": "countriesData",
            "content": [
              {
                "template": "quizCountrySelector"
              }
            ]
          },
          {
            "dom": "a.explaain-link.dark.standalone-link",
            "content": "Voting in Northern Ireland?",
            "attr": {
              "href": "//api.explaain.com/Detail/591e31c8bf3ba60011c9fa24"
            }
          }
        ]
      },
      { // Questions
        "dom": "div.questions",
        "condition": "countrySelected",
        "content": [
          {
            "condition": "!quizResults",
            "template": "quizQuestion",
            "mapping": [
              ["question", "currentQuestion"],
              ["subquestion", "currentSubquestion"],
              ["answered", "currentQuestionAnswered"],
              ["yesAnswered","currentQuestionYes"],
              ["noAnswered","currentQuestionNo"],
              ["answerYes","answerYes"],
              ["answerNo","answerNo"],
              ["skipSubquestion", "skipSubquestion"],
              ["quizResults", "quizResults"],
              ["nextButtonText", "nextButtonText"]
            ]
          },
          {
            "condition": "showStandardResults",
            "dom": ".card.finalResult",
            "content": [{"template": "yourTacticalMatch"}]
          },
          {
            "dom": ".card-carousel-nav.cardAnim",
            "condition": "showCarouselResults",
            "content": [
              {
                "dom": "div.carousel-nav-container",
                "content": [
                  {
                    "dom": "a.carousel-nav-item",
                    "content": "Vote on principles",
                    "attr": {
                      "data-carousel-link": "0"
                    }
                  },
                  {
                    "dom": "a.carousel-nav-item",
                    "content": "Vote tactically",
                    "attr": {
                      "data-carousel-link": "1"
                    }
                  },
                  {
                    "dom": "a.carousel-nav-item",
                    "content": "I hate 'em all",
                    "attr": {
                      "data-carousel-link": "2"
                    }
                  },
                  {
                    "dom": "a.carousel-nav-item",
                    "content": "Swap my vote",
                    "attr": {
                      "data-carousel-link": "3"
                    }
                  }
                ]
              }
            ]
          },
          {
            "dom": ".card-carousel.cardAnim",
            "condition": "showCarouselResults",
            "content": [
              /* /////
                # Carousel, requires animating
                - use conditionals to define carousel position
              */
              // #1: Vote for your top
              {
                "dom": ".card.finalResult.noAnim",
                "content": [
                  {
                    "dom": ".card-visible.text-center",
                    "content": [
                      {
                        "dom": "div.step-number",
                        "content": "1"
                      },
                      {
                        "dom": "h2.bestMatchSoFar",
                        "content": "Vote for your best match"
                      },
                      {
                        "dom": ".quizPercentages.topLayer",
                        "content": [
                          {
                            "loop": "partiesChartDataTopMatch",
                            "content": [{"template": "quizPercentagesParty"}]
                          }
                        ]
                      },
                      {
                        "dom": "p.small" // For standardised margin bottom
                      }
                    ]
                  }
                ]
              },
              // #2: Vote for your best chance
              {
                "dom": ".card.finalResult.noAnim",
                "content": [{"template": "yourTacticalMatch"}]
              },
              // #3: Spoil your ballot
              {
                "dom": ".card.finalResult.NWA.noAnim",
                "content": [
                  {
                    "dom": ".card-visible.text-center",
                    "content": [
                      {
                        "dom": "div.step-number",
                        "content": "3"
                      },
                      {
                        "dom": "h3",
                        // "condition": "finalResults",
                        "content": "What if I don't like any of them?"
                      },
                      {
                        "dom": "h4",
                        // "condition": "finalResults",
                        "content": "Spoil your ballot!"
                      },
                      {
                        "dom": "img",
                        "attr": {
                          "src": "/img/spoilyourballot.gif"
                        }
                      }
                    ]
                  }
                ]
              },
              // #4: Swap your vote
              {
                "dom": ".card.finalResult.noAnim",
                "content": [
                  {
                    "dom": ".card-visible.text-center",
                    "content": [
                      {
                        "dom": "div.step-number",
                        "content": "4"
                      },
                      {
                        "dom": "h3",
                        // "condition": "finalResults",
                        "content": "What if I don't like any of them?"
                      },
                      {
                        "dom": "a.swapvote",
                        "attr": {
                          "href": "https://www.swapmyvote.uk",
                          "target": "_blank"
                        },
                        "content": [{
                          "dom": "img.swapvote",
                          "attr": {
                            "src": "/img/swapmyvote.png",
                          }
                        }]
                      },
                      {
                        "dom": "p.small" // For standardised margin bottom
                      }
                    ]
                  }
                ]
              }
              /* ///// Carousel ends ///// */
            ]
          },
          {
            "template": "quizPercentagesWrapper",
            "mapping": [
              ["data", "partiesChartData"],
              ["chancesData", "partiesChartDataChances"],
              ["openMatches", "openMatches"],
              ["quizResults", "quizResults"],
              ["finalResults", "finalResults"],
              ["quizResultsPage", "quizResultsPage"],
              ["prioritiesSet", "prioritiesSet"],
              ["resultLogo", "resultLogo"],
              ["resultName", "resultName"],
              ["resultPercentage", "resultPercentage"],
              ["postcodeSubmit", "postcodeSubmit"],
              ["postcodeBinding", "postcodeBinding"],
              ["isWaiting", "isWaiting"],
              ["startingQuiz", "startingQuiz"],
              ["nowProgressingThroughQuiz", "nowProgressingThroughQuiz"],
              ["partiesChartDataTopMatch", "partiesChartDataTopMatch"],
              ["partiesChartDataTopMatchTactical", "partiesChartDataTopMatchTactical"]
            ]
          },
          {
            "dom": ".card.finalResult",
            "condition": "finalResults",
            "content": [
              {
                "dom": ".card-visible.text-center",
                "content": [
                  {
                    "dom": "div.step-number.step-3",
                    "condition": "showStandardResults",
                    "content": "3"
                  },
                  {
                    "dom": "h2",
                    "content": "View your local candidates"
                  },
                  {
                    "dom": "p",
                    "content": "Click on a candidate to see their full profile"
                  },
                  {
                    "dom": "div",
                    // "condition": "isLocalCandidates",
                    "content": [
                      {
                        "dom": "div.local-candidates-container",
                        // "condition": "!isWaiting",
                        "loop": "localCandidateData",
                        "content": [{"template": "localCandidatePlate"}]
                      },
                      {
                        "dom": "div.clearfix",
                        "content": ""
                      }
                    ]
                  }
                ]
              }
            ],
          },
          {
            "condition": "prioritiesSet",
            "template": "quizShareCard",
            "mapping": [
              ["quizResults", "quizResults"],
              ["finalResults", "finalResults"],
              ["facebookShareHref", "facebookShareHref"],
              ["twitterShareHref", "twitterShareHref"],
              ["prioritiesSet", "prioritiesSet"]
            ]
          }
        ]
      }
    ]
  }
  CardTemplates.yourTacticalMatch = {
    "dom": ".card-visible.text-center",
    "content": [
      {
        "dom": "div.step-number",
        "condition": "showStandardResults",
        "content": "1"
      },
      {
        "dom": "div.step-number",
        "condition": "showCarouselResults",
        "content": "2"
      },
      {
        "dom": "h2.tactical-top-match",
        "condition": "showStandardResults",
        "content": "Based on where you are and your views, this is your top contender..."
      },
      {
        "dom": "h2.tactical-top-match",
        "condition": "showCarouselResults",
        "content": "Vote tactically, for someone who stands a chance"
      },
      {
        "dom": ".quizPercentages.topLayer.tactical-top-match",
        "condition": "!quizSafeSeat",
        "content": [
          {
            "loop": "partiesChartDataTopMatchTactical",
            "content": [{"template": "quizPercentagesParty"}]
          },
        ]
      },
      {
        "dom": ".quizSafeSeatText.topLayer.tactical-top-match",
        "condition": "quizSafeSeat",
        "content": [
          {
            "dom": "h2.pink",
            "content": "You're in a safe seat"
          },
          {
            "dom": "p.explaained",
            "content": {
              "var": "safeSeatMessage",
              "markdown": true
            }
          }
        ]
      },
      {
        "dom": "h2.hybrid-top-match",
        "content": "Here are the parties' chances of winning in your area"
      },
      {
        "dom": ".quizPercentages.hybrid-top-match",
        "content": [
          {
            "loop": "partiesHybridList",
            "content": [
              {
                "dom": "a.quizPercentagesParty.inline.discard-card-style",
                "attr": {
                  "onclick": {
                    "var": "openMatches"
                  },
                  "class": {
                    "var": "matchClass"
                  }
                },
                "content": [
                  {
                    "dom": ".quizPercentagesPartyBadge",
                    "condition": "badgeText",
                    "content": {
                      "var": "badgeText"
                    }
                  },
                  {
                    "dom": ".quizPercentagesPartyFace.inline",
                    "attr": {
                      "style": {
                        "background-image": {
                          "var": "photo"
                        },
                        "background-color": {
                          "var": "color"
                        },
                      }
                    }
                  },
                  {
                    "dom": ".quizPercentagesPartyMatch",
                    "condition": "isMatch",
                    "content": "Your Match"
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        "dom": "p.small.scrollDown",
        "condition": "finalResults",
        "content": "Scroll down to see how we reached this match"
      }
    ]
  },
  CardTemplates.quizProgress = {
    "dom": "div.progress-container",
    "condition": "!noProgressBarNeeded",
    "content": [
      {
        "dom":".progress",
        "content": [
          {
            "dom": ".progress-inner",
            "attr": {
              "style": {
                "width": {
                  "var": "progressBarWidth"
                }
              }
            }
          }
        ]
      }
    ]
  }
  CardTemplates.quizQuestion = {
    "dom": "div",
    "content": [
      {
        "dom": ".card",
        "content": [
          {
            "dom": ".card-visible.text-center",
            "content": [
              {
                "dom": "h2",
                "content": {
                  "var": "question.question"
                }
              },
              {
                "dom": "a.helper-text.explaain-link",
                "condition": "question.helperCard",
                "content": "What does this mean?",
                "attr": {
                  "href": {
                    "var": "question.helperCard"
                  }
                }
              },
              {
                "template": "quizQuestionYesNo",
                "condition": "!answered"
              },
              // {
              //   "dom": ".quizSubquestionLabel.yes",
              //   "condition": "yesAnswered",
              //   "content": "Yes"
              // },
              // {
              //   "dom": ".quizSubquestionLabel.no",
              //   "condition": "noAnswered",
              //   "content": "No"
              // },
              {
                "template": "quizSubquestion",
                "condition": "answered",
                "mapping": [
                  ["subanswers","subquestion"],
                  ["answered","answered"],
                  ["skipSubquestion","skipSubquestion"],
                  ["nextButtonText","nextButtonText"]
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  CardTemplates.quizQuestionYesNo = {
    "dom": ".quizAnswersYesNo",
    "content": [
      {
        "dom": ".quizAnswerYesNo.no.initial.quizPop",
        "content": "No",
        "attr": {
          "onclick": {
            "var": "answerNo"
          }
        }
      },
      {
        "dom": ".quizAnswerYesNo.yes.initial.quizPop",
        "content": "Yes",
        "attr": {
          "onclick": {
            "var": "answerYes"
          }
        }
      }
    ]
  }
  CardTemplates.quizSubquestion = {
    "dom": ".quizSubquestion",
    "content": [
      {
        "dom": ".quizSubquestionOr",
        "content": "Any other details:"
      },
      {
        "loop": "subanswers",
        "content": [{"template": "quizSubquestionAnswer"}]
      },
      {
        "dom": ".quizSubquestionOr",
        "content": "or"
      },
      {
        "dom": ".quizSubquestionSkip.quizPop.quick",
        "content": {
          "var": "nextButtonText"
        },
        "attr": {
          "onclick": {
            "var": "skipSubquestion"
          }
        }
      }
    ]
  }
  CardTemplates.quizSubquestionAnswer = {
    "dom": ".quizSubquestionAnswer.secondary.quizPop",
    "content": {
      "var": "label"
    },
    "attr": {
      "onclick": {
        "var": "answer"
      }
    }
  }
  CardTemplates.quizPercentagesWrapper = {
    "dom": "div.tacticalBreakdown",
    "content": [
      {
        "dom": ".card.percentageHeads",
        "content": [
          {
            "dom": ".card-visible.text-center",
            "content": [
              {
                "dom": "div.step-number.step-2",
                "condition": "prioritiesSet",
                "content": "2"
              },
              {
                "dom": "h2.seeHowAlt",
                "condition": "quizResultsPage",
                "content": "Here is how you matched the major parties' manifestos overall:"
              },
              {
                "dom": "h2.seeHow",
                "condition": "prioritiesSet",
                "content": "Here is how you matched the major parties' manifestos overall:"
              },
              {
                "dom": "h3.seeHow",
                "condition": "prioritiesSet",
                "content": "Your party matches:"
              },
              {
                "dom": "h2.breakdown",
                "condition": "finalResults",
                "content": "Here's a breakdown of the people you can vote for in your area:"
              },
              {
                "dom": "p.small.tactical-info",
                "condition": "finalResults",
                "content": "We’ve used local polls, past results and betting odds to show you who is currently standing the highest chance of winning where you are."
              },
              {
                "dom": "h3.inTheLead",
                "condition": "finalResults",
                "content": "In the lead in your area:"
              },
              {
                "dom": ".quizPercentages.middleLayer.basic-top-match",
                "condition": "finalResults",
                "content": [
                  {
                    "loop": "partiesChartDataTopMatch",
                    "content": [{"template": "quizPercentagesParty"}]
                  },
                ]
              },
              {
                "template": "quizPercentages"
              }
            ]
          }
        ]
      }
    ]
  }
  CardTemplates.quizPercentages = {
    "dom": "div",
    "content": [
      {
        "dom": "div.quizResults",
        "condition": "quizResultsPage",
        "content": [
          {
            "dom": "h3.bestMatch",
            "content": "Your best match is:"
          },
          {
            "dom": "img",
            "attr": {
              "src": {
                "var": "resultLogo"
              }
            }
          },
          {
            "dom": "h2",
            "content": {
              "var": "resultName"
            }
          },
          {
            "dom": "h2",
            "content": {
              "var": "resultPercentage"
            }
          },
          {
            "dom": "p.resultTips",
            "content": "Click on a party leader's face to see how you match with their party's views."
          }
        ]
      },
      {
        "dom": "p.waiting-text",
        "condition": "startingQuiz",
        "content": "Submit an answer to see how you match."
      },
      {
        "dom": ".quizPercentages.middleLayer",
        "condition": "finalResults",
        "content": [
          {
            "loop": "chancesData",
            "content": [{"template": "quizPercentagesParty"}]
          }
        ]
      },
      {
        "dom": "h3.otherParties",
        "condition": "finalResults",
        "content": "Other parties standing in your area (and how you matched them):"
      },
      {
        "dom": ".quizPercentages",
        "content": [
          {
            "loop": "data",
            "content": [{"template": "quizPercentagesParty"}]
          }
        ]
      },
      {
        "dom": "p.info-text.fading-info",
        "condition": "finalResults",
        "content": "As you’re in a safe seat we’ve greyed out the parties who are unlikely to unseat the 2015 winning party due to the margin by which they won."
      },
      {
        "dom": "p.info-text",
        "condition": "nowProgressingThroughQuiz",
        "content": "This is how you've matched with the parties so far."
      },
      {
        "dom": ".partyNameSpacer",
        "condition": "quizResults"
      }
    ]
  }
  CardTemplates.quizPercentagesParty = {
    "dom": "a.quizPercentagesParty.discard-card-style",
    "attr": {
      "onclick": {
        "var": "openMatches"
      },
      "class": {
        "var": "matchClass"
      }
    },
    "content": [
      {
        "dom": "div.partyFade",
        "condition": "faded"
      },
      {
        "dom": ".quizPercentagesPartyPodium",
        "attr": {
          "style": {
            "height": {
              "var": "percentage"
            },
            "background-color": {
              "var": "color"
            },
          }
        }
      },
      {
        "dom": ".quizPercentagesPartyFace.absolute",
        "attr": {
          "style": {
            "bottom": {
              "var": "percentage"
            },
            "background-image": {
              "var": "photo"
            },
            "background-color": {
              "var": "color"
            },
          }
        }
      },
      {
        "dom": ".quizPercentagesPartyPercent.absolute",
        "condition": "quizResults",
        "attr": {
          "style": {
            "bottom": {
              "var": "percentage"
            }
          }
        },
        "content": {
          "var": "percentageText"
        }
      },
      {
        "dom": ".quizPercentagesPartyBadge.absolute",
        "condition": "badgeText",
        "attr": {
          "style": {
            "bottom": {
              "var": "percentage"
            }
          }
        },
        "content": {
          "var": "badgeText"
        }
      },
      {
        "dom": ".quizPercentagesPartyName.absolute",
        "condition": "quizResults",
        "attr": {
          "style": {
            "color": {
              "var": "color"
            }
          }
        },
        "content": {
          "var": "name"
        }
      }
    ]
  };
  CardTemplates.quizCountrySelector = {
    "dom": "div",
    "content": [
      {
        "dom": ".card",
        "content": [
          {
            "dom": ".card-visible.text-center.quizCountrySelector",
            "attr": {
              "onclick": {
                "var": "select"
              },
              "class": {
                "var": "selected"
              }
            },
            "content": [
              {
                "dom": "h2",
                "content": [
                  {
                    "dom": "span",
                    "content": {
                      "var": "label"
                    }
                  },
                  {
                    "dom": "span",
                    "condition": "!selected",
                    "content": " >"
                  },
                ]
              },
              {
                "loop": "parties",
                "content": [
                  {
                    "dom": ".quizPercentagesPartyFace.inline",
                    "attr": {
                      "style": {
                        "background-image": {
                          "var": "photo"
                        },
                        "background-color": {
                          "var": "color"
                        },
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
  CardTemplates.quizShareCard = {
    "dom": "div",
    "content": [
      {
        "dom": ".card",
        "content": [
          {
            "dom": ".card-visible.text-center.action-buttons",
            "content": [
              {
                "dom": "div.step-number.step-3",
                "condition": "quizResults",
                "content": "3"
              },
              {
                "dom": "div.step-number.step-4",
                "condition": "finalResults",
                "content": "4"
              },
              // {
              //   "dom": "h2",
              //   "content": "Now, make sure you’re registered to vote"
              // },
              // {
              //   "template": "registerButton"
              // },
              {
                "dom": "h3",
                "content": "Challenge friends to see where they stand"
              },
              {
                "template": "shareButtons",
                "mapping": [
                  ["facebookShareHref", "facebookShareHref"],
                  ["twitterShareHref", "twitterShareHref"]
                ]
              },
              {
                "dom": "div.politicalanimal",
                "content": [
                  {
                    "dom": "img",
                    "attr": {
                      "src": "/img/politicalanimal.png"
                    },
                    "content": "Challenge friends to see where they stand"
                  }
                ]
              },
            ]
          }
        ]
      }
    ]
  };
};
