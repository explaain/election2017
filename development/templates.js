//NOTE: Jeremy has replaced some of these, copied from api.explaain.com

module.exports = function(CardTemplates){
  CardTemplates.card =
  //   {
  //     "dom": "div.card",
  //     "attr": {
  //       "data-uri": {
  //         "var": "@id",
  //       },
  //       "style": "height: auto"
  //     },
  //     "content": [
  //       {
  //         "dom": "div.card-visible",
  //         "content": [
  //           {
  //             "dom": "div.close",
  //             "content": [
  //               {
  //                 "dom": "i.fa.fa-times",
  //                 "attr": {
  //                   "data-hidden": "true"
  //                 }
  //               }
  //             ]
  //           },
  //           {
  //             "dom": "div.content",
  //             "attr": {
  //               "class": {
  //                 "var": "@type"
  //               }
  //             },
  //             "template": {
  //               "var": "type"
  //             }
  //           },
  //           {
  //             "dom": "a.card-icon",
  //             "attr": {
  //               "target": "_blank",
  //               "tabindex": "-1"
  //             },
  //             "content": [
  //               {
  //                 "dom": "img",
  //                 "attr": {
  //                   "src": "http://app.explaain.com/card-logo.png"
  //                 }
  //               }
  //             ]
  //           }
  //         ]
  //       },
  //       {
  //         "dom": "button.edit-button",
  //         "attr": {
  //           "tabindex": "-1"
  //         },
  //         "content": [
  //           {
  //             "dom": "i.fa.fa-pencil",
  //             "attr": {
  //               "aria-hidden": "true"
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ;
  CardTemplates.card = {
    "dom": "div.card",
    "attr": {
      "class": {
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
  // CardTemplates.Person = [
  //   {
  //     "dom": "h2",
  //     "content": {
  //       "var": "name"
  //     }
  //   },
  //   {
  //     "dom": "div.card-image",
  //     "content": [{
  //       "dom": "img",
  //       "attr": {"src": {
  //         "var": "image"
  //       }}
  //     }]
  //   },
  //   {
  //     "dom": "div.body-content",
  //     "content": {
  //       "var": "description",
  //       "markdown": true
  //     }
  //   }
  // ];
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
          "markdown": true
        }
      }
    ]
  };

  CardTemplates.postcodeCompare = {
    "dom": "div.content.postcode-compare.wow",
    "attr": {
      "class": {
        "var": "constituencyResults.resultsClass"
      }
    },
    "content": [
      { "template": "postcodeFormHeader" },
      {
        "dom": "form.postcode-form",
        "attr": {
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
            "dom": "button.btn.btn-success",
            "attr": {
              "type": "submit"
            },
            "content": [
              {
                "dom": "span",
                "content": "Compare",
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
            "dom": "p",
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
            "content": "First, choose your area"
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
        "dom": "section.divider",
        "content": [
          {
            "dom": "div.step-number.step-2",
            "condition": "constituencyResults",
            "content": "2"
          },
          {
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "Next, set it in stone 🎉"
          },
          {
            "dom": "p",
            "condition": "constituencyResults",
            "content": "Make sure you’re registered to vote. It takes 3 minutes and is all done online."
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
                            "dom": "button.btn.btn-primary",
                            "content": "Learn more"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "dom": "p.small",
                    "content": [
                      { "dom": "br" },
                      { "dom": "br" }
                    ]
                  }
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
                  // {
                  //   "condition": "constituencyResults",
                  //   "dom": "div.bold",
                  //   "content": "Make your vote count"
                  // },
                  {
                    "template": "registerButton"
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
            "content": "You never know who else might vote the same way. Share with 10 friends and make everyone's vote count #GE2017"
          },
          {
            "template": "shareButtons",
            "mapping": [
              ["facebookShareHref", "constituencyResults.facebookShareHref"],
              ["twitterShareHref", "constituencyResults.twitterShareHref"]
            ]
          },
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
          // }
        ]
      }
    ]
  }

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
          {
            "condition": "!constituencyResults",
            "content": [
              {
                "dom": "div.bold",
                "content": "or go straight to register"
              },
              {
                "template": "registerButton"
              },
              {
                "template": "linkToGovUKWebsiteHint"
              }
            ]
          },
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
                  {
                    "dom": "p.small",
                    "content": [
                      { "dom": "br" },
                      { "dom": "br" }
                    ]
                  }
                ]
              },
              {
                "dom": ".column50",
                "content": [
                  {
                    "template": "registerButton"
                  },
                  {
                    "template": "linkToGovUKWebsiteHint"
                  }
                ]
              }
            ]
          }
        ]
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
          "default": "Please enter your postcode"
        }
      },
      {
        "dom": "p",
        "condition": "!constituencyResults",
        "content": {
          "var": "subtitle"
        }
      }
    ]
  }

  CardTemplates.linkToGovUKWebsiteHint = {
    "dom": "p.small",
    "content": "This link will take you to the official gov.uk website"
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
            "dom": "button.btn.btn-primary",
            "content": "Register To Vote  >"
          }
        ]
      }
    ]
  }

  /*CardTemplates.footer =
    {
      "dom": ".footer",
      "content": [
        {
          "dom": "div",
          "condition": "footerContentTemplate",
          "template": {
            "var": "footerContentTemplate"
          }
        }
      ]
    }
  ;*/

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
        {
          "dom": "p.small",
          "content": "This link will take you to the official gov.uk website"
        }
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
          "dom": "div.subheading",
          "content": {
            "var": "constituencyResults.subheading",
            "markdown": "true"
          }
        },
        {
          "dom": ".seat-list",
          "loop": "constituencyResults.constituencies",
          "content": [
            {
              "template": "constituency"
            }
          ]
        },
        {
          "dom": "div.calculate",
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
                  "content": "Share on Facebook"
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
                  "content": "Share on Twitter"
                }
              ]
            }
          ]
        }
      ]
    }
  ;

  // Usage:
  // return h('div', getCardDom({type: "people", people: [{type: "person", name: "Sarah", age: "26"},{type: "person", name: "Chris", age: "34"}]}, CardTemplates['loopExample']));
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

}
