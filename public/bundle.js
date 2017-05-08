(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(model,partyStances){
  return function(){
    var issueKeys = Object.keys(partyStances.opinions.issues);
    issueKeys.forEach(function(issueKey, i) {
      var debateKeys = Object.keys(partyStances.opinions.issues[issueKey].debates);
      debateKeys.forEach(function(debateKey, j) {
        model.questions[debateKey] = {
          question: partyStances.opinions.issues[issueKey].debates[debateKey].question,
          issue: {
            key: issueKey,
            description: partyStances.opinions.issues[issueKey].description,
            index: i
          },
          debate: {
            key: debateKey,
            description: partyStances.opinions.issues[issueKey].debates[debateKey].description,
            index: j
          },
          tasks: [
            "question-disagree",
            "question-neutral",
            "question-agree"
          ]
        }
      })
    })
  }
}

},{}],2:[function(require,module,exports){
module.exports = function(model){
  model.dashboards.home.tasks.push("!TEST-postcode-compare");
  model.tasks["!TEST-postcode-compare"] = {
    subtype: "multi-submit",
    color: "#00a2e5",
    label: "TEST comparing postcodes",
    goto: {
      type: 'step',
      name: 'postcode-compare',
      next: 'result'
    },
    dataUpdates: []
  };
}

},{}],3:[function(require,module,exports){
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
                  "src": "http://app.explaain.com/card-logo.png"
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
              "autofocus": "true",
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
            "dom": "h2",
            "condition": "constituencyResults",
            "content": "Secondly, make your vote count 🎉"
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
                "dom": "div.column",
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
            "dom": "h2",
            "content": "Thirdly, multiply your vote"
          },
          {
            "dom": "p",
            "content": "Share with 10 friends and make everyone's vote count #GE2017"
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

},{}],4:[function(require,module,exports){
module.exports = class DataProcessor {

  constructor() {}

  processConstituencySeats(data) {
    return {
      heading: data.text.heading,
      subheading: data.text.subheading,
      twitterShareHref: data.twitterShareHref,
      facebookShareHref: data.facebookShareHref,
      resultsClass: 'resultsLoaded',
      constituencies: data.seats.map(function(seat){
        return {
          location: seat.location,
          partyString: seat.parties.map(function(party){
            return party.name;
          }).join(" vs "),
          numberOfParties: seat.parties.length,
          swingSeat: (seat.parties.length > 1),
          swingIcon: (seat.parties.length > 1) ? 'fa-random' : 'fa-lock',
          swingClass: "swing-" + (seat.parties.length > 1),
          party1: seat.parties[0].name.replace(' Party', ''),
          party1Color: seat.parties[0].colorLight,
          party1Height: (100/seat.parties.length) + '%',
          party1Image: "/img/party-logos/" + seat.parties[0].logo,
          party2: seat.parties[1] ? seat.parties[1].name.replace(' Party', '') : null,
          party2Color: seat.parties[1] ? seat.parties[1].colorLight : null,
          party2Height: (100/seat.parties.length) + '%',
          party2Image: seat.parties[1] ? "/img/party-logos/" + seat.parties[1].logo : null
        }
      })
    };
  }

}

},{}],5:[function(require,module,exports){
/*
 * This module is made for visual design JavaScript
 * Dependencies - jQuery, Slick
 *
 */

module.exports = class Designers {

  onWindowResize(){
    const self = this;
    $(window).on("resize",function(){
      self.adaptLayout()
    })
  }

  adaptLayout() {
    if ($(window).innerWidth() > 600) {
      // $('section.step').addClass('wide');
    } else {
      $('section.step').removeClass('wide');
    }
  }

  onStepLoad(){
    $(".slick-container").hide();
    setTimeout(function(){
      $(".slick-container").show();
      $(".slick-container:not(.slick-initialized)").slick({
        dots: false,
        infinite: false,
        adaptiveHeight: true,
        centerPadding: '15px',
        slidesToShow: 1,
        arrows: true,
        variableWidth: true
      });
    })
  }

  uniqueStepLayout(step){
    if (step.label == 'Party stories') {
      $('div.body').addClass('backColor');
    } else {
      $('div.body').removeClass('backColor');
    }
  }

}

},{}],6:[function(require,module,exports){
module.exports = class Helpers {

  constructor(model, h, cardTemplates,http, router) {
    this.model = model;
    this.h = h;
    this.cardTemplates = cardTemplates;
    this.http = http;
    this.router = router;
  }

  assembleCards(data, template) {
    // todo: resolve issue with global and local scopes (remember the problem with passing function)
    const self = this;
    data.type = data.type || (data["@type"] ? data["@type"].split('/')[data["@type"].split('/').length-1] : 'Detail');
    if (typeof template === 'string') { template = self.cardTemplates[template]; }
    const element = template;
    var params = {};
    if(element.mapping){
      element.mapping.forEach(function(kv){
        params[kv[0]] = self.getObjectPathProperty(data, kv[1]);
      });
    } else {
      params = data;
    }
    var content,
      attr = {};
    if(
      element.condition
      &&
      (
        !self.getObjectPathProperty(params, element.condition) && !element.condition.match(/^!/)
        ||
        self.getObjectPathProperty(params, element.condition.replace(/^!/,"")) && element.condition.match(/^!/)
      )
    )
      return undefined;
    else if (element.template)
      content = self.assembleCards(params, element.template.var ? self.getObjectPathProperty(params, element.template.var) : element.template)
    else if (!element.content)
      content = '';
    else if (element.loop)
      content = self.getObjectPathProperty(params, element.loop).map(function(_params){return element.content.map(function(_element){return self.assembleCards(_params, _element);})});
    else if (element.content.constructor === Array)
      content = element.content.map(function(el){return self.assembleCards(params, el); });
    else if (element.content.var)
      content = self.getObjectPathProperty(params, element.content.var) || ''; //'var' MUST use dot notation, not []
    else if (element.content.func)
      content = self.getObjectPathProperty(params, element.content.func[0]).apply(null,element.content.func.slice(1).map(function(p){return self.getObjectPathProperty(params, p)}));
    else
      content = element.default ? element.default : element.content;

    if (element.attr) {
      var attrKeys = Object.keys(element.attr);
      attrKeys.forEach(function(attrKey) {
        if (attrKey == "style" && typeof(element.attr.style) == "object") {
          var styleKeys = Object.keys(element.attr.style);
          var styles = {}
          styleKeys.forEach(function(styleKey) {
            var style = element.attr.style[styleKey];
            var styleValue;
            if(style.var) {
              styleValue = self.getObjectPathProperty(data, style.var);
            } else if (style.func) {
              styleValue = self.getObjectPathProperty(params, style.func[0]).apply(null,style.func.slice(1).map(function(p){return self.getObjectPathProperty(params, p)}));
            } else {
              styleValue = style;
            }
            styles[styleKey] = styleValue;
            if (styleKey == "background-image" && style.var) {
              styles[styleKey] = 'url("' + styles[styleKey] + '")'
            }
          });
          attr[attrKey] = styles;
        } else {
          attr[attrKey] = element.attr[attrKey].var ? self.getObjectPathProperty(params, element.attr[attrKey].var) :  element.attr[attrKey]; //'var' MUST use dot notation, not []
        }
      })
    }
    if (!element.dom){
      return content;
    } else if (element.content && element.content.markdown) {
      return self.h.rawHtml(element.dom, attr, self.markdownToHtml(content));
    } else if (element.content && element.content.html) {
      return self.h.rawHtml(element.dom, attr, content);
    } else {
      return self.h(element.dom, attr, content);
    }
  }

  getModel(path){
    const self = this;
    return self.getObjectPathProperty(self.model, path);  // a moving reference to internal objects within model
  }

  getObjectPathProperty(object, path){
    const self = this;
    var schema = object;  // a moving reference to internal objects within the object
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
      var elem = pList[i];
      if( !schema[elem] ) schema[elem] = {}
      schema = schema[elem];
    }
    return schema[pList[len-1]];
  }

  loadTemplates(templateUrl){
    const self = this;
    return new Promise(function(resolve,reject){
      self.http.get(templateUrl)
      .then(function (res) {
        resolve(res.body);
      });
    });
  }

  markdownToHtml(text) {
    const self = this;
    return text.replace(
      /\[([^\]]+)\]\(([^\)]+)\)/g,
      "<a class='internal' tabindex='-1' href='$2'>$1</a>"
    );
  }

  updateData(dataUpdates) {
    const self = this;
    dataUpdates.forEach(function(update) {
      self.updateModel(update.data, update.value, update.action);
    });
  }

  updateModel(path, value, action) {
    const self = this;
    var schema = self.model;  // a moving reference to internal objects within model
    var pList = path.split('.');
    var len = pList.length;
    for(var i = 0; i < len-1; i++) {
      var elem = pList[i];
      if( !schema[elem] ) schema[elem] = {}
      schema = schema[elem];
    }
    switch(action){
      case "toggle":
        if(schema[pList[len-1]]){
          delete schema[pList[len-1]];
        } else {
          schema[pList[len-1]] = value;
        }
        break;
      default:
        schema[pList[len-1]] = value;
    }
  }

  updateObject(obj, objUpdates) {
    const self = this;
    var objKeys = Object.keys(objUpdates);
    objKeys.forEach(function(key) {
      obj[key] = objUpdates[key];
    })
    return obj;
  }

  throwError(err){
    const self = this;
    self.model.user.error = err;
    setTimeout(function(){
      delete self.model.user.error;
    },500);
  }

}

},{}],7:[function(require,module,exports){
module.exports = {
  step: -1,
  // todo: those are temporary here, refactor
  question: '',
  landedOnPostcode: 0,
  landedOnResult: 0,

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
        name: 'story'
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
        final: 'postcode',
        next: 'result'
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
        name: 'postcode',
        next: 'result'
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
    postcode: {
      label: "Where are you voting from?"
    },
    "vote-worth": {

    },
    "postcode-compare": {

    },
    result: {
      label: "Here are your results",
      sublabel: "Generated from over 68,520 possible combinations..."
    },
    question: {

    },
    story: {
      label: "Party stories"
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

},{}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],10:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":8}],11:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
var httpism = require('./httpism');
var middleware = require('./browserMiddleware');
var utils = require('./middlewareUtils');

module.exports = httpism(
  undefined,
  {},
  [
    middleware.jsonp,
    utils.exception,
    middleware.form,
    middleware.json,
    middleware.text,
    utils.querystring,
    middleware.send
  ]
);

},{"./browserMiddleware":13,"./httpism":14,"./middlewareUtils":16}],13:[function(require,module,exports){
var window = require('global');
var utils = require('./middlewareUtils');
var querystringLite = require('./querystring-lite');
var randomString = require('random-string');

function middleware(name, fn) {
  exports[name] = fn;
  fn.middleware = name;
}

middleware('json', function(request, next) {
  if (request.body instanceof Object) {
    request.body = JSON.stringify(request.body);
    utils.setHeaderTo(request, "content-type", "application/json");
  }

  utils.setHeaderTo(request, "accept", "application/json");

  return next().then(function(response) {
    if (utils.shouldParseAs(response, "json", request)) {
      response.body = JSON.parse(response.body, request.options.jsonReviver);
    }
    return response;
  });
});

function randomGlobal(value) {
  var name;

  do {
    name = '_' + randomString({length: 20});
  } while(typeof window[name] !== 'undefined');

  window[name] = value;

  return name;
}

middleware('jsonp', function(request, next) {
  var jsonp = request.options.jsonp;

  if (jsonp) {
    request.options.querystring = request.options.querystring || {};

    return new Promise(function (resolve, reject) {
      var callbackName = randomGlobal(function(v) {
        delete window[callbackName];
        document.head.removeChild(script);
        resolve({
          statusCode: 200,
          headers: {},
          body: v
        });
      });

      request.options.querystring[jsonp] = callbackName;

      utils.mergeQueryString(request);

      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = request.url;
      script.onerror = function(error) {
        reject(new Error('could not load script tag for JSONP request: ' + request.url));
      };
      document.head.appendChild(script);
    });
  }

  return next();
});

middleware('text', function(request, next) {
  if (typeof request.body === 'string') {
    utils.setHeaderTo(request, "content-type", "text/plain;charset=UTF-8");
  }

  return next();
});

middleware('form', function(request, next) {
  if (request.options.form && request.body instanceof Object) {
    var querystring = request.options.qs || querystringLite;
    setBodyToString(request, querystring.stringify(request.body));
    utils.setHeaderTo(request, "content-type", "application/x-www-form-urlencoded");
  }

  return next().then(function(response) {
    var querystring = request.options.qs || querystringLite;
    if (utils.shouldParseAs(response, "form", request)) {
      response.body = querystring.parse(response.body);
    }
    return response;
  });
});

function setBodyToString(r, s) {
  r.body = s;
}

function parseHeaders(headers) {
  var object = {};
  var lines = headers.split('\n');

  for(var n = 0; n < lines.length; n++) {
    var line = lines[n];
    var match = /^(.*?):(.*)/.exec(line);

    if (match) {
      object[match[1].toLowerCase()] = match[2].trim();
    }
  }

  return object;
}

function toUpperCase(x) {
  return x.toUpperCase();
}

function formatHeaderName(name) {
  return name.replace(/^([a-z])/, toUpperCase).replace(/-([a-z])/g, toUpperCase);
}

function setHeaders(headers, xhr) {
  var headerNames = Object.keys(headers);

  for (var n = 0; n < headerNames.length; n++) {
    var key = headerNames[n];
    var headerName = formatHeaderName(key);
    xhr.setRequestHeader(headerName, headers[key]);
  }
}

function responseUrl(xhr, requestUrl) {
  var origin = location.origin;
  var responseUrl = xhr.responseURL;
  
  if (responseUrl) {
    if (responseUrl.substring(0, origin.length) == origin) {
      return responseUrl.substring(origin.length);
    } else {
      return responseUrl;
    }
  } else {
    return requestUrl;
  }
}

middleware('send', function(request) {
  var Xhr = request.options.xhr || window.XMLHttpRequest;
  var xhr = new Xhr();
  var reject;

  var promise = new Promise(function (fulfil, _reject) {
    reject = _reject;
    xhr.open(request.method, request.url, true);
    xhr.onload = function () {
      var statusCode = xhr.status;

      var response = {
        body: statusCode == 204? undefined: xhr.responseText,
        headers: parseHeaders(xhr.getAllResponseHeaders()),
        statusCode: statusCode,
        url: responseUrl(xhr, request.url),
        xhr: xhr,
        statusText: xhr.statusText
      };

      fulfil(response);
    };

    xhr.onerror = function () {
      reject(new Error('failed to connect to ' + request.method + ' ' + request.url));
    };

    if (!isCrossDomain(request.url) && !request.headers['x-requested-with']) {
      request.headers['x-requested-with'] = 'XMLHttpRequest'
    }

    setHeaders(request.headers, xhr);
    xhr.withCredentials = !!request.options.withCredentials;

    xhr.send(request.body);
  });

  function abort() {
    xhr.abort();
    var error = new Error('aborted connection to ' + request.method + ' ' + request.url);
    error.aborted = true;
    reject(error);
  }
  addAbortToPromise(promise, abort);

  return promise;
});

function isCrossDomain(url) {
  return /^https?:\/\//.test(url);
}

function addAbortToPromise(promise, abort) {
  var then = promise.then;
  promise.then = function () {
    var p = then.apply(this, arguments);
    p.abort = abort;
    addAbortToPromise(p, abort);
    return p;
  };
}

},{"./middlewareUtils":16,"./querystring-lite":18,"global":11,"random-string":45}],14:[function(require,module,exports){
var merge = require('./merge');
var resolveUrl = require('./resolveUrl');
var utils = require('./middlewareUtils');

function client(url, options, middlewares) {
  return new Httpism(url, options, middlewares);
}

function Httpism(url, options, middlewares) {
  this.url = url;
  this._options = options;
  this.middlewares = middlewares;
}

Httpism.prototype.send = function(method, url, body, _options, api) {
  var options = merge(_options, this._options)
  var request = {
    method: method,
    url: resolveUrl(this.url, url),
    headers: lowerCaseHeaders(options.headers || {}),
    body: body,
    options: options
  };

  var self = this;

  function sendToMiddleware(index, req) {
    if (index < self.middlewares.length) {
      var middleware = self.middlewares[index];
      return middleware(req, function (nextRequest) { return sendToMiddleware(index + 1, nextRequest || req); }, self);
    }
  }

  return sendToMiddleware(0, request).then(function (response) {
    return makeResponse(self, response);
  }, function (e) {
    if (e.redirectResponse) {
      return e.redirectResponse;
    } else {
      throw e;
    }
  });
};

function lowerCaseHeaders(headers) {
  Object.keys(headers).forEach(function (key) {
    var lower = key.toLowerCase();
    if (key.toLowerCase() != key) {
      headers[lower] = headers[key];
      delete headers[key];
    }
  });

  return headers;
}

function makeResponse(api, response) {
  return utils.extend(new Httpism(api.url, api._options, api.middlewares), response);
}

function findMiddlewareIndexes(names, middlewares) {
  return names.map(function (name) {
    for(var n = 0; n < middlewares.length; n++) {
      if (middlewares[n].middleware == name) {
        return n;
      }
    }

    return -1;
  }).filter(function (i) {
    return i >= 0;
  });
}

function insertMiddlewareIntoIndex(middlewares, m, index) {
  middlewares.splice(index, 0, m);
}

Httpism.prototype.api = function (url, options, middlewares) {
  var args = parseClientArguments(url, options, middlewares);

  var api = new Httpism(
    resolveUrl(this.url, args.url),
    merge(args.options, this._options),
    this.middlewares.slice()
  );

  if (args.middlewares) {
    args.middlewares.forEach(function (m) {
      api.insertMiddleware(m);
    });
  }

  return api;
};

Httpism.prototype.insertMiddleware = function(m) {
  if (m.before || m.after) {
    var position = m.before || m.after;
    var names = typeof position === 'string'? [position]: position;
    var indexes = findMiddlewareIndexes(names, this.middlewares);
    if (indexes.length) {
      var index = m.before? Math.min.apply(Math, indexes): Math.max.apply(Math, indexes) + 1;

      if (index >= 0) {
        insertMiddlewareIntoIndex(this.middlewares, m, index);
        return;
      }
    }

    throw new Error('no such middleware: ' + (m.before || m.after));
  } else {
    this.middlewares.unshift(m);
  }
}

Httpism.prototype.removeMiddleware = function(name) {
  var indexes = findMiddlewareIndexes([name], this.middlewares);
  for (var i=indexes.length-1; i>=0; i--) {
    this.middlewares.splice(indexes[i], 1);
  }
}

function addMethod(method) {
  Httpism.prototype[method] = function (url, options) {
    return this.send(method, url, undefined, options, this);
  };
}

function addMethodWithBody(method) {
  Httpism.prototype[method] = function (url, body, options) {
    return this.send(method, url, body, options, this);
  };
}

addMethod('get');
addMethod('delete');
addMethod('head');
addMethodWithBody('post');
addMethodWithBody('put');
addMethodWithBody('patch');
addMethodWithBody('options');

function parseClientArguments() {
  var url, options, middlewares;

  for(var n = 0; n < arguments.length; n++) {
    var arg = arguments[n];

    if (typeof arg === 'string') {
      url = arg;
    } else if (typeof arg === 'function') {
      middlewares = [arg];
    } else if (arg instanceof Array) {
      middlewares = arg;
    } else if (arg instanceof Object) {
      options = arg;
    }
  }

  return {
    url: url,
    options: options,
    middlewares: middlewares
  };
}

module.exports = client;

},{"./merge":15,"./middlewareUtils":16,"./resolveUrl":19}],15:[function(require,module,exports){
module.exports = function(x, y) {
  if (x && y) {
    var r = {};

    Object.keys(y).forEach(function (ykey) {
      r[ykey] = y[ykey];
    });

    Object.keys(x).forEach(function (xkey) {
      r[xkey] = x[xkey];
    });

    return r;
  } else if (y) {
    return y;
  } else {
    return x;
  }
};

},{}],16:[function(require,module,exports){
var merge = require("./merge");
var querystringLite = require('./querystring-lite');
var obfuscateUrlPassword = require('./obfuscateUrlPassword');

module.exports.setHeaderTo = function (request, header, value) {
  if (!request.headers[header]) {
    return request.headers[header] = value;
  }
};

var responseBodyTypes = {
  json: function(response) {
    return contentTypeIs(response, "application/json");
  },
  text: function(response) {
    return contentTypeIsText(response) || contentTypeIs(response, "application/javascript");
  },
  form: function(response) {
    return contentTypeIs(response, "application/x-www-form-urlencoded");
  },
  stream: function() {
    return false;
  }
};

function contentTypeIs(response, expectedContentType) {
  var re = new RegExp("^\\s*" + expectedContentType + "\\s*($|;)");
  return re.test(response.headers["content-type"]);
}

function contentTypeIsText(response) {
  return contentTypeIs(response, "text/.*");
}

module.exports.shouldParseAs = function(response, type, request) {
  if (request.options.responseBody) {
    return type === request.options.responseBody;
  } else {
    var bodyType = responseBodyTypes[type];
    if (bodyType) {
      return bodyType(response);
    }
  }
};

function extend(object, extension) {
  var keys = Object.keys(extension);

  for (var n = 0; n < keys.length; n++) {
    var key = keys[n];
    object[key] = extension[key];
  }

  return object;
}

exports.extend = extend;

exports.exception = function(request, next) {
  return next().then(function(response) {
    var exceptions = request.options.exceptions;
    var isException = exceptions == false? false: typeof exceptions == 'function'? exceptions(response): response.statusCode >= 400;

    if (isException) {
      var msg = request.method.toUpperCase() + " " + obfuscateUrlPassword(request.url) + " => " + response.statusCode + " " + response.statusText;
      var error = extend(new Error(msg), response);
      throw error;
    } else {
      return response;
    }
  });
};

exports.querystring = function(request, next) {
  if (request.options.querystring instanceof Object) {
    exports.mergeQueryString(request);
  }

  return next();
};

exports.mergeQueryString = function(request) {
  var qs = request.options.qs || querystringLite;

  var split = request.url.split("?");
  var path = split[0];
  var querystring = qs.parse(split[1] || '');
  var mergedQueryString = merge(request.options.querystring, querystring);
  request.url = path + "?" + qs.stringify(mergedQueryString);
};

},{"./merge":15,"./obfuscateUrlPassword":17,"./querystring-lite":18}],17:[function(require,module,exports){
module.exports = function(url) {
  return url.replace(/^([-a-z]*:\/\/[^:]*:)[^@]*@/, function(_, first) { return first + '********@'; });
};

},{}],18:[function(require,module,exports){
module.exports = {
  parse: function (string) {
    var params = {};

    string.split('&').forEach(function (component) {
      var split = component.split('=')
      if (split[1]) {
        params[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
      }
    });

    return params;
  },

  stringify: function (params) {
    return Object.keys(params)
      .filter(function (key) {
        return typeof(params[key]) !== 'undefined';
      })
      .map(function (key) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
      })
      .join('&');
  }
};

},{}],19:[function(require,module,exports){
// from https://gist.github.com/Yaffle/1088850

/*jslint regexp: true, white: true, maxerr: 50, indent: 2 */
 
function parseURI(url) {
  var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
  // authority = '//' + user + ':' + pass '@' + hostname + ':' port
  return (m ? {
    href     : m[0] || '',
    protocol : m[1] || '',
    authority: m[2] || '',
    host     : m[3] || '',
    hostname : m[4] || '',
    port     : m[5] || '',
    pathname : m[6] || '',
    search   : m[7] || '',
    hash     : m[8] || ''
  } : null);
}
 
module.exports = function (base, href) {// RFC 3986
 
  function removeDotSegments(input) {
    var output = [];
    input.replace(/^(\.\.?(\/|$))+/, '')
         .replace(/\/(\.(\/|$))+/g, '/')
         .replace(/\/\.\.$/, '/../')
         .replace(/\/?[^\/]*/g, function (p) {
      if (p === '/..') {
        output.pop();
      } else {
        output.push(p);
      }
    });
    return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
  }
 
  href = parseURI(href || '');
  base = parseURI(base || '');
 
  return !href || !base ? null : (href.protocol || base.protocol) +
         (href.protocol || href.authority ? href.authority : base.authority) +
         removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
         (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
         href.hash;
};

},{}],20:[function(require,module,exports){
var routism = require('routism');
var hyperdom = require('hyperdom');
var h = hyperdom.html;
var refresh;

function Routes() {
  this.routes = [];
  this.routesChanged = false;
}

Routes.prototype.recognise = function (pathname) {
  if (this.routesChanged) {
    this.compiledRoutes = routism.compile(this.routes);
    this.routesChanged = false;
  }

  return this.compiledRoutes.recognise(pathname);
};

Routes.prototype.add = function (pattern) {
  var route = {pattern: pattern};
  this.routes.push({pattern: pattern, route: route});
  this.routesChanged = true;
  return route;
};

function Router() {
  this.routes = new Routes();
}

Router.prototype.start = function (history) {
  this.history = history;
  this.history.start();
  this.started = true;
};

Router.prototype.stop = function () {
  if (this.started) {
    this.history.stop();

    var keys = Object.keys(this);
    for (var n = 0; n < keys.length; n++) {
      if (keys[n] != 'routes') {
        delete this[keys[n]];
      }
    }
  }
};

Router.prototype.isNotFound = function () {
  if (this.currentRoute.isNotFound) {
    return this.currentRoute;
  }
};

Router.prototype.makeCurrentRoute = function () {
  var location = this.history.location();
  var href = location.pathname + location.search;

  var routeRecognised = this.routes.recognise(location.pathname);

  if (routeRecognised) {
    var routeParams  = associativeArrayToObject(routeRecognised.params);
    var searchParams = exports.querystring.parse((location.search || '').substring(1));

    var params = merge(searchParams, routeParams);

    var expandedUrl = expand(routeRecognised.route.pattern, params);
    var self = this;

    if (this.currentRoute) {
      this.currentRoute.depart();
    }

    this.currentRoute = {
      route: routeRecognised.route,
      params: params,
      href: href,
      expandedUrl: expandedUrl,
      ondeparture: undefined,

      depart: function () {
        if (this.ondeparture) {
          this.ondeparture();
          this.ondeparture = undefined;
        }
      },

      arrive: function () {
        if (this.onarrival) {
          this.onarrival(this.params);
        }
      },

      setParams: function (params, pushOrReplace) {
        var url = expand(this.route.pattern, params);
        self.pushOrReplace(pushOrReplace, url, {refresh: false});
        this.params = params;
        if (this.expandedUrl != url) {
          this.arrive();
        }
        this.expandedUrl = url;
        this.href = url;
        self.currentHref = url;
      },

      push: function (params) {
        this.setParams(params, 'push');
      },

      replace: function (params) {
        this.setParams(params, 'replace');
      }
    };
  } else {
    this.currentRoute = {
      isNotFound: true,
      href: href
    };
  }
};

Router.prototype.setupRender = function () {
  if (h.currentRender && !h.currentRender.routerEstablished) {
    h.currentRender.routerEstablished = true;

    this.lastHref = this.currentHref;

    var location = this.history.location();
    var href = location.pathname + location.search;
    this.currentHref = href;

    this._isNewHref = this.lastHref != this.currentHref;

    if (this._isNewHref) {
      this.makeCurrentRoute();
    }
  }
};

Router.prototype.isNewHref = function () {
  return this._isNewHref;
};

Router.prototype.isCurrentRoute = function (route) {
  if (this.currentRoute && this.currentRoute.route === route) {
    return this.currentRoute;
  }
};

Router.prototype.add = function (pattern) {
  return this.routes.add(pattern);
};

Router.prototype.pushOrReplace = function (pushReplace, url, options) {
  var refreshAfter = typeof options == 'object' && options.hasOwnProperty('refresh')? options.refresh: true;

  if ((options && options.force) || !this.currentRoute || this.currentRoute.expandedUrl != url) {
    this.history[pushReplace](url);

    this.currentRoute.depart();

    if (refresh && refreshAfter) {
      refresh();
    }
  }
};

Router.prototype.push = function (url, options) {
  this.pushOrReplace('push', url, options);
};

Router.prototype.replace = function (url, options) {
  this.pushOrReplace('replace', url, options);
};

function createRouter() {
  return new Router();
}

function escapeRegex(pattern) {
  return pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

var splatVariableRegex = /(\:([a-z\-_]+)\\\*)/ig;
var variableRegex = /(:([-a-z_]+))/ig;

function compilePattern(pattern) {
  return escapeRegex(pattern)
    .replace(splatVariableRegex, "(.+)")
    .replace(variableRegex, "([^\/]+)");
}

function preparePattern(pattern) {
  var match;
  var variableRegex = new RegExp('(:([-a-z_]+))', 'ig');
  var variables = [];

  while (match = variableRegex.exec(pattern)) {
    variables.push(match[2]);
  }

  var patternRegex = new RegExp('^' + compilePattern(pattern));

  return {
    regex: patternRegex,
    variables: variables
  };
}

function matchUnder(pattern) {
  var patternVariables = preparePattern(pattern);

  return function (path) {
    var match = patternVariables.regex.exec(path);

    if (match) {
      var params = {};

      for (var n = 1; n < match.length; n++) {
        params[patternVariables.variables[n - 1]] = match[n];
      }

      return params;
    }
  };
}

var router = createRouter();

exports.start = function (options) {
  if (!router) {
    router = createRouter();
  }
  router.start((options && options.history) || exports.historyApi);
};

exports.stop = function () {
  router.stop();
};

exports.clear = function () {
  router.stop();
  router = undefined;
};

exports.querystring = {
  parse: function(search) {
    var params = {};

    (search || '').split('&').map(function (param) {
      var v = param.split('=').map(decodeURIComponent);
      params[v[0]] = v[1];
    });

    return params;
  },
  stringify: function(paramsObject) {
    var query = Object.keys(paramsObject).map(function (key) {
      var param = paramToString(paramsObject[key]);

      if (param != '') {
        return encodeURIComponent(key) + '=' + encodeURIComponent(param);
      }
    }).filter(function (param) {
      return param;
    }).join('&');

    return query;
  }
};

exports.route = function (pattern) {
  var route = router.add(pattern);

  function routeFn (paramBindings, render) {
    if (typeof paramBindings === 'function') {
      render = paramBindings;
      paramBindings = undefined;
    }

    router.setupRender();

    var currentRoute = router.started && router.isCurrentRoute(route);

    if (!render) {
      var params = paramBindings || {};
      var url = expand(pattern, params);


      return {
        push: function (ev) {
          if (ev) {
            ev.preventDefault();
          }

          router.push(url);
        },

        replace: function (ev) {
          if (ev) {
            ev.preventDefault();
          }

          router.replace(url);
        },

        active: currentRoute && currentRoute.expandedUrl == url,

        href: url,

        a: function () {
          return this.link.apply(this, arguments);
        },

        link: function () {
          var options;
          var content;

          if (arguments[0] && arguments[0].constructor == Object) {
            options = arguments[0];
            content = Array.prototype.slice.call(arguments, 1);
          } else {
            options = {};
            content = Array.prototype.slice.call(arguments, 0);
          }

          options.href = url;
          options.onclick = this.push.bind(this);

          return h.apply(h, ['a', options].concat(content));
        }
      };
    } else {
      if (!router.started) {
        throw new Error("router not started yet, start with require('hyperdom-router').start([history])");
      }

      refresh = h.refresh;
      var isNew = router.isNewHref();

      if (currentRoute) {
        if (paramBindings) {
          currentRoute.onarrival = paramBindings.onarrival && h.refreshify(paramBindings.onarrival, {refresh: 'promise'});
          delete paramBindings.onarrival;
          currentRoute.ondeparture = paramBindings.ondeparture;
          delete paramBindings.ondeparture;
          var pushBindings = pushFromBindings(paramBindings);

          if (isNew) {
            setParamBindings(currentRoute.params, paramBindings);
            currentRoute.arrive();
          } else {
            applyParamBindings(currentRoute.params, paramBindings, pushBindings);
          }
        }

        return render(currentRoute.params);
      }
    }
  }

  var _underRegExp;
  function underRegExp() {
    if (!_underRegExp) {
      _underRegExp = matchUnder(pattern);
    }

    return _underRegExp;
  }

  routeFn.under = function (_paramBindings, _fn) {
    var paramBindings, fn;

    if (typeof _paramBindings === 'function') {
      fn = _paramBindings;
    } else {
      paramBindings = _paramBindings;
      fn = _fn;
    }

    var params = underRegExp()(router.history.location().pathname);

    if (params && paramBindings && fn) {
      router.setupRender();

      var pushBindings = pushFromBindings(paramBindings);

      if (router.isNewHref()) {
        setParamBindings(params, paramBindings);
      } else {
        applyParamBindings(router.currentRoute.params, paramBindings, pushBindings);
      }
    }

    if (fn) {
      if (params) {
        return fn(params);
      }
    } else {
      return {
        active: !!params
      };
    }
  };

  routeFn.pattern = pattern;
  
  return routeFn;
};

function pushFromBindings(paramBindings) {
  var pushBindings = paramBindings.push;
  delete paramBindings.push;
  return pushBindings;
}

function setParamBindings(params, paramBindings) {
  var paramKeys = Object.keys(paramBindings);
  for (var n = 0; n < paramKeys.length; n++) {
    var param = paramKeys[n];
    var value = params[param];

    var paramBinding = paramBindings[param];
    var binding = h.binding(paramBinding, {refresh: 'promise'})
    if (binding.set) {
      binding.set(value);
    }
  }
}

function applyParamBindings(params, paramBindings, pushBindings) {
  var bindings = Object.keys(paramBindings).map(function (key) {
    return {
      key: key,
      binding: h.binding(paramBindings[key])
    };
  });

  var allBindingsHaveGetters = !bindings.some(function (b) {
    return !b.binding.get;
  });

  if (allBindingsHaveGetters) {
    var newParams = {};
    var push = false;

    var paramKeys = Object.keys(params);
    for(var n = 0; n < paramKeys.length; n++) {
      var param = paramKeys[n];
      newParams[param] = params[param];
    }

    for(n = 0; n < bindings.length; n++) {
      var b = bindings[n];
      if (b.binding.get) {
        var value = b.binding.get();
        newParams[b.key] = value;

        if (pushBindings && value != params[b.key]) {
          push = push || pushBindings[b.key];
        }
      }
    }

    if (push) {
      router.currentRoute.push(newParams);
    } else {
      router.currentRoute.replace(newParams);
    }
  }
}

exports.notFound = function (render) {
  var notFoundRoute = router.isNotFound();

  if (notFoundRoute) {
    return render(notFoundRoute.href);
  }
};

function associativeArrayToObject(array) {
  var o = {};

  for(var n = 0; n < array.length; n++) {
    var pair = array[n];
    o[pair[0]] = pair[1];
  }

  return o;
}

function merge(obj1, obj2) {
  var o = clone(obj1);

  Object.keys(obj2).forEach(function(key) {
    o[key] = obj2[key];
  });

  return o;
}

function paramToString(p) {
  if (p === undefined || p === null) {
    return '';
  } else {
    return p;
  }
}

function clone(thing) {
  return JSON.parse(JSON.stringify(thing));
}

function expand(pattern, params) {
  var onlyQueryParams = clone(params);

  var url = pattern.replace(/:([a-z_][a-z0-9_]*)\*/gi, function (_, id) {
    var param = params[id];
    delete onlyQueryParams[id];
    return encodeURI(paramToString(param));
  });

  url = url.replace(/:([a-z_][a-z0-9_]*)/gi, function (_, id) {
    var param = params[id];
    delete onlyQueryParams[id];
    return encodeURIComponent(paramToString(param));
  });

  var query = exports.querystring.stringify(onlyQueryParams);

  if (query) {
    return url + '?' + query;
  } else {
    return url;
  }
}

exports.historyApi = {
  start: function () {
    var self = this;
    if (!this.listening) {
      window.addEventListener('popstate', function(ev) {
        if (self.active) {
          self.popstate = true;
          self.popstateState = ev.state;
          if (refresh) {
            refresh();
          }
        }
      });
      this.listening = true;
    }

    this.active = true;
  },
  stop: function () {
    // I _think_ this is a chrome bug
    // if we removeEventListener then history.back() doesn't work
    // Chrome Version 43.0.2357.81 (64-bit), Mac OS X 10.10.3
    // yeah...
    this.active = false;
  },
  location: function () {
    return window.location;
  },
  push: function (url) {
    window.history.pushState(undefined, undefined, url);
  },
  state: function (state) {
    window.history.replaceState(state);
  },
  replace: function (url) {
    window.history.replaceState(undefined, undefined, url);
  }
};

exports.hash = {
  start: function () {
    var self = this;
    if (!this.listening) {
      this.hashchangeListener = function() {
        if (!self.pushed) {
          if (refresh) {
            refresh();
          }
        } else {
          self.pushed = false;
        }
      }
      window.addEventListener('hashchange', this.hashchangeListener);
      this.listening = true;
    }
  },
  stop: function () {
    this.listening = false;
    window.removeEventListener('hashchange', this.hashchangeListener);
  },
  location: function () {
    var path = window.location.hash || '#';

    var m = /^#(.*?)(\?.*)?$/.exec(path);

    return {
      pathname: '/' + m[1],
      search: m[2] || ''
    }
  },
  push: function (url) {
    this.pushed = true;
    window.location.hash = url.replace(/^\//, '');
  },
  state: function () {
  },
  replace: function (url) {
    return this.push(url);
  }
};

},{"hyperdom":26,"routism":46}],21:[function(require,module,exports){
var listener = require('./listener');
var binding = require('./binding')

module.exports = function(tag, attributes, children) {
  var type = inputType(tag, attributes)
  var bind = inputTypeBindings[type] || bindTextInput;

  var bindingAttr = binding(attributes.binding);
  bind(attributes, children, bindingAttr.get, bindingAttr.set);
}

var inputTypeBindings = {
  text: bindTextInput,

  textarea: bindTextInput,

  checkbox: function (attributes, children, get, set) {
    attributes.checked = get();

    attachEventHandler(attributes, 'onclick', function (ev) {
      attributes.checked = ev.target.checked;
      set(ev.target.checked);
    });
  },

  radio: function (attributes, children, get, set) {
    var value = attributes.value;
    attributes.checked = get() == attributes.value;
    attributes.on_hyperdomsyncchecked = listener(function (event) {
      attributes.checked = event.target.checked;
    });

    attachEventHandler(attributes, 'onclick', function (event) {
      var name = event.target.name;
      if (name) {
        var inputs = document.getElementsByName(name);
        for (var i = 0, l = inputs.length; i < l; i++) {
          inputs[i].dispatchEvent(customEvent('_hyperdomsyncchecked'));
        }
      }
      set(value);
    });
  },

  select: function (attributes, children, get, set) {
    var currentValue = get();

    var options = children.filter(function (child) {
      return child.tagName.toLowerCase() == 'option';
    });

    var values = [];
    var selectedIndex;

    for(var n = 0; n < options.length; n++) {
      var option = options[n];
      var hasValue = option.properties.hasOwnProperty('value');
      var value = option.properties.value;
      var text = option.children.map(function (x) { return x.text; }).join('');

      values.push(hasValue? value: text);

      var selected = value == currentValue || text == currentValue;

      if (selected) {
        selectedIndex = n;
      }

      option.properties.selected = selected;
      option.properties.value = n;
    }

    if (selectedIndex !== undefined) {
      attributes.selectedIndex = selectedIndex;
    }

    attachEventHandler(attributes, 'onchange', function (ev) {
      attributes.selectedIndex = ev.target.selectedIndex;
      set(values[ev.target.value]);
    });
  },

  file: function (attributes, children, get, set) {
    var multiple = attributes.multiple;

    attachEventHandler(attributes, 'onchange', function (ev) {
      if (multiple) {
        set(ev.target.files);
      } else {
        set(ev.target.files[0]);
      }
    });
  }
};

function inputType(selector, attributes) {
  if (/^textarea\b/i.test(selector)) {
    return 'textarea';
  } else if (/^select\b/i.test(selector)) {
    return 'select';
  } else {
    return attributes.type || 'text';
  }
}

function bindTextInput(attributes, children, get, set) {
  var textEventNames = ['onkeyup', 'oninput', 'onpaste', 'textInput'];

  var bindingValue = get();
  if (!(bindingValue instanceof Error)) {
    attributes.value = bindingValue != undefined? bindingValue: '';
  }

  attachEventHandler(attributes, textEventNames, function (ev) {
    if (get() != ev.target.value) {
      set(ev.target.value);
    }
  });
}

function attachEventHandler(attributes, eventNames, handler) {
  if (eventNames instanceof Array) {
    for (var n = 0; n < eventNames.length; n++) {
      insertEventHandler(attributes, eventNames[n], handler);
    }
  } else {
    insertEventHandler(attributes, eventNames, handler);
  }
}

function insertEventHandler(attributes, eventName, handler) {
  var previousHandler = attributes[eventName];
  if (previousHandler) {
    attributes[eventName] = sequenceFunctions(handler, previousHandler);
  } else {
    attributes[eventName] = handler;
  }
}

function sequenceFunctions(handler1, handler2) {
  return function (ev) {
    handler1(ev);
    return handler2(ev);
  };
}

function customEvent(name) {
  if (typeof Event == 'function') {
    return new Event(name);
  } else {
    var event = document.createEvent('Event');
    event.initEvent(name, false, false);
    return event;
  }
}

},{"./binding":22,"./listener":28}],22:[function(require,module,exports){
var refreshify = require('./refreshify');
var meta = require('./meta');

module.exports = function(b, options) {
  var binding = b

  if (b instanceof Array) {
    binding = bindingObject.apply(undefined, b)
  } else if (b instanceof Object && (typeof b.set === 'function' || typeof b.get === 'function')) {
    binding = b
  } else {
    throw Error('hyperdom bindings must be either an array [object, property, setter] or an object { get(), set(value) }, instead binding was: ' + JSON.stringify(b))
  }

  binding.set = refreshify(binding.set, options);

  return binding;
}

function bindingObject(model, property, setter) {
  var _meta;

  return {
    get: function () {
      return model[property];
    },

    set: function (value) {
      model[property] = value;
      if (setter) {
        return setter(value)
      }
    },

    meta: function() {
      return _meta || (_meta = meta(model, property));
    }
  };
}

},{"./meta":29,"./refreshify":35}],23:[function(require,module,exports){
var domComponent = require('./domComponent');
var hyperdomMeta = require('./meta');
var render = require('./render');

function Component(model, options) {
  var currentRender = render.currentRender();

  this.isComponent = options && options.hasOwnProperty('component') && options.component
  this.currentRender = currentRender;
  this.model = model;
  this.key = model.renderKey;
  this.component = undefined;
  this.mount = currentRender.mount;
}

Component.prototype.type = 'Widget';

Component.prototype.init = function () {
  var self = this;

  var vdom = this.render();

  var meta = hyperdomMeta(this.model);
  meta.components.add(this);

  this.component = domComponent.create();
  var element = this.component.create(vdom);

  if (self.model.onbeforeadd) {
    self.model.onbeforeadd()
  }

  if (self.model.onbeforeadd) {
    self.model.onbeforerender()
  }

  if (self.model.onadd || self.model.onrender) {
    this.currentRender.finished.then(function () {
      if (self.model.onadd) {
        self.model.onadd(self.component.element);
      }
      if (self.model.onrender) {
        self.model.onrender(self.component.element);
      }
    });
  }

  if (self.model.detached) {
    return document.createTextNode('');
  } else {
    return element;
  }
};

function beforeUpdate(model, element) {
  if (model.onbeforeupdate) {
    model.onbeforeupdate(element)
  }

  if (model.onbeforerender) {
    model.onbeforerender(element)
  }
}

function afterUpdate(model, element, oldElement) {
  if (model.onupdate) {
    model.onupdate(element, oldElement);
  }

  if (model.onrender) {
    model.onrender(element, oldElement);
  }
}

Component.prototype.update = function (previous) {
  var self = this;

  if (this.isComponent) {
    var keys = Object.keys(this.model);
    for(var n = 0; n < keys.length; n++) {
      var key = keys[n];
      previous.model[key] = self.model[key];
    }
    this.model = previous.model;
  }


  if (self.model.onupdate || self.model.onrender) {
    this.currentRender.finished.then(function () {
      afterUpdate(self.model, self.component.element, oldElement)
    });
  }

  this.component = previous.component;
  var oldElement = this.component.element

  beforeUpdate(this.model, oldElement)

  var element = this.component.update(this.render());

  if (self.model.detached) {
    return document.createTextNode('');
  } else {
    return element;
  }
};

Component.prototype.render = function () {
  return this.mount.renderComponent(this.model);
};

Component.prototype.refresh = function () {
  var oldElement = this.component.element

  beforeUpdate(this.model, oldElement)
  this.component.update(this.render());
  afterUpdate(this.model, this.component.element, oldElement)
};

Component.prototype.destroy = function (element) {
  var self = this;

  var meta = hyperdomMeta(this.model);
  meta.components.delete(this);

  if (self.model.onbeforeremove) {
    self.model.onbeforeremove(element)
  }

  if (self.model.onremove) {
    this.currentRender.finished.then(function () {
      self.model.onremove(element);
    });
  }

  this.component.destroy();
};

module.exports = Component;

},{"./domComponent":25,"./meta":29,"./render":36}],24:[function(require,module,exports){
function deprecationWarning() {
  var warningIssued = false;

  return function (arg) {
    if (!warningIssued) {
      console.warn(arg);
      warningIssued = true;
    }
  };
}

module.exports = {
  refresh: deprecationWarning(),
  currentRender: deprecationWarning(),
  component: deprecationWarning(),
  renderFunction: deprecationWarning(),
  refreshAfter: deprecationWarning(),
  norefresh: deprecationWarning(),
  mapBinding: deprecationWarning()
};

},{}],25:[function(require,module,exports){
var createElement = require('virtual-dom/create-element');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var toVdom = require('./toVdom');
var isVdom = require('./isVdom');

function DomComponent(options) {
  this.document = options && options.document;
}

function prepareVdom(object) {
  var vdom = toVdom(object);
  if (!isVdom(vdom)) {
    throw new Error('expected render to return vdom');
  } else {
    return vdom;
  }
}

DomComponent.prototype.create = function (vdom) {
  this.vdom = prepareVdom(vdom);
  return this.element = createElement(this.vdom, {document: this.document});
};

DomComponent.prototype.merge = function (vdom, element) {
  this.vdom = prepareVdom(vdom);
  return this.element = element;
};

DomComponent.prototype.update = function (vdom) {
  var oldVdom = this.vdom;
  this.vdom = prepareVdom(vdom);
  var patches = diff(oldVdom, this.vdom);
  return this.element = patch(this.element, patches);
};

DomComponent.prototype.destroy = function (options) {
  function destroyWidgets(vdom) {
    if (vdom.type === 'Widget') {
      vdom.destroy();
    } else if (vdom.children) {
      vdom.children.forEach(destroyWidgets);
    }
  }

  destroyWidgets(this.vdom);

  if (options && options.removeElement && this.element.parentNode) {
    this.element.parentNode.removeChild(this.element);
  }
};

function domComponent(options) {
  return new DomComponent(options);
}

exports.create = domComponent;

},{"./isVdom":27,"./toVdom":40,"virtual-dom/create-element":47,"virtual-dom/diff":48,"virtual-dom/patch":49}],26:[function(require,module,exports){
var rendering = require('./rendering')
var refreshify = require('./refreshify')
var binding = require('./binding')
var meta = require('./meta');
var render = require('./render')
var refreshEventResult = require('./refreshEventResult')
var Component = require('./component')

exports.html = rendering.html;
exports.html.refreshify = refreshify
exports.rawHtml = rendering.rawHtml
exports.jsx = rendering.jsx;
exports.attach = rendering.attach;
exports.replace = rendering.replace;
exports.append = rendering.append;
exports.appendVDom = rendering.appendVDom;
exports.binding = binding;
exports.meta = meta;
exports.refreshify = refreshify;
exports.norefresh = refreshEventResult.norefresh;
exports.component = function(model) {
  return new Component(model, {component: true})
}

exports.currentRender = render.currentRender

},{"./binding":22,"./component":23,"./meta":29,"./refreshEventResult":34,"./refreshify":35,"./render":36,"./rendering":37}],27:[function(require,module,exports){
var virtualDomVersion = require("virtual-dom/vnode/version")

module.exports = function(x) {
  var type = x.type;
  if (type == 'VirtualNode' || type == 'VirtualText') {
    return x.version == virtualDomVersion;
  } else {
    return type == 'Widget' || type == 'Thunk';
  }
};

},{"virtual-dom/vnode/version":65}],28:[function(require,module,exports){
var refreshify = require('./refreshify');

function ListenerHook(listener) {
  this.listener = refreshify(listener);
}

ListenerHook.prototype.hook = function (element, propertyName) {
  element.addEventListener(propertyName.substring(2), this.listener, false);
};

ListenerHook.prototype.unhook = function (element, propertyName) {
  element.removeEventListener(propertyName.substring(2), this.listener);
};

module.exports = function (listener) {
  return new ListenerHook(listener);
};

},{"./refreshify":35}],29:[function(require,module,exports){
module.exports = function (model, property) {
  var hyperdomMeta = model._hyperdomMeta;

  if (!hyperdomMeta) {
    hyperdomMeta = {};
    Object.defineProperty(model, '_hyperdomMeta', {value: hyperdomMeta});
  }

  if (property) {
    var meta = hyperdomMeta[property];

    if (!meta) {
      meta = hyperdomMeta[property] = {};
    }

    return meta;
  } else {
    return hyperdomMeta;
  }
};

},{}],30:[function(require,module,exports){
var hyperdomMeta = require('./meta');
var runRender = require('./render');
var Set = require('./set');
var refreshEventResult = require('./refreshEventResult')
var vtext = require("virtual-dom/vnode/vtext.js")
var PropertyHook = require('./propertyHook');

var lastId = 0;

function Mount(model, options) {
  var win = (options && options.window) || window;
  var router = typeof options == 'object' && options.hasOwnProperty('router')? options.router: undefined;
  this.requestRender = (options && options.requestRender) || win.requestAnimationFrame || win.setTimeout;

  this.model = model;

  this.renderQueued = false;
  this.mountRenderRequested = false;
  this.componentRendersRequested = undefined;
  this.id = ++lastId;
  this.mounted = true;
  this.router = router
}

Mount.prototype.refreshify = function(fn, options) {
  if (!fn) {
    return fn;
  }

  if (options && (options.norefresh == true || options.refresh == false)) {
    return fn;
  }

  var self = this

  return function () {
    var result = fn.apply(this, arguments);
    return refreshEventResult(result, self, options);
  };
}

Mount.prototype.transformFunctionAttribute = function(key, value) {
  return this.refreshify(value)
};

Mount.prototype.queueRender = function () {
  if (!this.renderQueued) {
    var self = this;

    var requestRender = this.requestRender;
    this.renderQueued = true;

    requestRender(function () {
      self.renderQueued = false;

      if (self.mounted) {
        if (self.mountRenderRequested) {
          self.refreshImmediately()
        } else if (self.componentRendersRequested) {
          self.refreshComponentsImmediately()
        }
      }
    });
  }
};

Mount.prototype.render = function() {
  if (this.router) {
    this.setupModelComponent(this.model)
    return this.router.render(this.model)
  } else {
    return this.renderComponent(this.model)
  }
};

Mount.prototype.refresh = function () {
  this.mountRenderRequested = true;
  this.queueRender();
};

Mount.prototype.refreshImmediately = function() {
  var self = this

  runRender(self, function () {
    var vdom = self.render();
    self.component.update(vdom);
    self.mountRenderRequested = false;
  })
}

Mount.prototype.refreshComponentsImmediately = function() {
  var self = this

  runRender(self, function () {
    for (var i = 0, l = self.componentRendersRequested.length; i < l; i++) {
      var w = self.componentRendersRequested[i];
      w.refresh();
    }
    self.componentRendersRequested = undefined;
  })
}

Mount.prototype.refreshComponent = function (component) {
  if (!this.componentRendersRequested) {
    this.componentRendersRequested = [];
  }

  this.componentRendersRequested.push(component);
  this.queueRender();
};

Mount.prototype.setupModelComponent = function(model) {
  var self = this;

  var meta = hyperdomMeta(model);

  if (!meta.mount) {
    meta.mount = this;
    meta.components = new Set();

    model.refresh = function () {
      self.refresh();
    };

    model.refreshImmediately = function () {
      self.refreshImmediately();
    };

    model.refreshComponent = function() {
      var meta = hyperdomMeta(this);
      meta.components.forEach(function (w) {
        self.refreshComponent(w);
      });
    };

    if (typeof model.onload == 'function') {
      this.refreshify(function () { return model.onload(); }, {refresh: 'promise'})();
    }
  }
}

Mount.prototype._renderComponent = function(model) {
  this.setupModelComponent(model)
  var vdom = typeof model.render == 'function'? model.render(): new vtext(JSON.stringify(model))

  if (vdom instanceof Array) {
    console.error('vdom returned from component cannot be an array, component: ', model)
    throw new Error('vdom returned from component cannot be an array');
  }

  if (vdom) {
    if (!vdom.properties) {
      vdom.properties = {};
    }

    vdom.properties._hyperdomMeta = new PropertyHook({
      component: model,
      render: runRender.currentRender()
    });
  }

  return vdom;
}

Mount.prototype.renderComponent = function(model) {
  if (typeof model.renderCacheKey === 'function') {
    var meta = hyperdomMeta(model);
    var key = model.renderCacheKey();
    if (key !== undefined && meta.cacheKey === key && meta.cachedVdom) {
      return meta.cachedVdom;
    } else {
      meta.cacheKey = key;
      return meta.cachedVdom = this._renderComponent(model);
    }
  } else {
    return this._renderComponent(model);
  }
};

Mount.prototype.detach = function () {
  this.mounted = false;
};

Mount.prototype.remove = function () {
  if (this.router) {
    this.router.reset()
  }
  this.component.destroy({removeElement: true});
  this.mounted = false;
};

module.exports = Mount;

},{"./meta":29,"./propertyHook":32,"./refreshEventResult":34,"./render":36,"./set":38,"virtual-dom/vnode/vtext.js":68}],31:[function(require,module,exports){
var render = require('./render');
var bindModel = require('./bindModel')

module.exports = function(tag, attributes, childElements) {
  var keys = Object.keys(attributes);
  var dataset;
  var currentRender = render.currentRender();

  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    var attribute = attributes[key];

    if (typeof(attribute) == 'function' && currentRender) {
      attributes[key] = currentRender.transformFunctionAttribute(key, attribute)
    }

    var rename = renames[key];
    if (rename) {
      attributes[rename] = attribute;
      delete attributes[key];
      continue;
    }

    if (dataAttributeRegex.test(key)) {
      if (!dataset) {
        dataset = attributes.dataset;

        if (!dataset) {
          dataset = attributes.dataset = {};
        }
      }

      var datakey = key
        .replace(dataAttributeRegex, '')
        .replace(/-([a-z])/ig, function(_, x) { return x.toUpperCase(); });

      dataset[datakey] = attribute;
      delete attributes[key];
      continue;
    }
  }

  if (attributes.__source) {
    if (!dataset) {
      dataset = attributes.dataset;

      if (!dataset) {
        dataset = attributes.dataset = {};
      }
    }

    dataset.fileName = attributes.__source.fileName;
    dataset.lineNumber = attributes.__source.lineNumber;
  }

  if (attributes.className) {
    attributes.className = generateClassName(attributes.className);
  }

  if (attributes.binding) {
    bindModel(tag, attributes, childElements);
    delete attributes.binding;
  }

  return attributes
}

var renames = {
  for: 'htmlFor',
  class: 'className',
  contenteditable: 'contentEditable',
  tabindex: 'tabIndex',
  colspan: 'colSpan'
};

var dataAttributeRegex = /^data-/;

function generateClassName(obj) {
  if (typeof(obj) == 'object') {
    if (obj instanceof Array) {
      var names = obj.map(function(item) {
        return generateClassName(item);
      });
      return names.join(' ') || undefined;
    } else {
      return generateConditionalClassNames(obj);
    }
  } else {
    return obj;
  }
}

function generateConditionalClassNames(obj) {
  return Object.keys(obj).filter(function (key) {
    return obj[key];
  }).join(' ') || undefined;
}

},{"./bindModel":21,"./render":36}],32:[function(require,module,exports){
function PropertyHook(value) {
  this.value = value;
}

PropertyHook.prototype.hook = function (element, property) {
  element[property] = this.value;
};

PropertyHook.prototype.unhook = function (element, property) {
  delete element[property];
};

module.exports = PropertyHook;

},{}],33:[function(require,module,exports){
var deprecations = require('./deprecations');
var refreshify = require('./refreshify');

module.exports = function(promise) {
  deprecations.refreshAfter('hyperdom.html.refreshAfter is deprecated');
  refreshify(function() { return promise }, {refresh: 'promise'})()
}

},{"./deprecations":24,"./refreshify":35}],34:[function(require,module,exports){
var deprecations = require('./deprecations');

module.exports = refreshAfterEvent

var norefresh = {};

function norefreshFunction() {
  return norefresh;
}

module.exports.norefresh = norefreshFunction

function refreshAfterEvent(result, mount, options) {
  var onlyRefreshAfterPromise = options && options.refresh == 'promise';
  var componentToRefresh = options && options.component;

  if (result && typeof(result.then) == 'function') {
    result.then(function (result) {
      var opts = cloneOptions(options)
      opts.refresh = undefined
      refreshAfterEvent(result, mount, opts);
    });
  }

  if (onlyRefreshAfterPromise) {
    return;
  }

  if (isComponent(result)) {
    mount.refreshComponent(result);
  } else if (result instanceof Array) {
    for (var i = 0; i < result.length; i++) {
      refreshAfterEvent(result[i], mount, options);
    }
  } else if (componentToRefresh) {
    if (componentToRefresh.refreshComponent) {
      componentToRefresh.refreshComponent()
    } else {
      componentToRefresh.refresh();
    }
  } else if (result === norefresh) {
    // don't refresh;
  } else if (result === norefreshFunction) {
    deprecations.norefresh('hyperdom.norefresh is deprecated, please use hyperdom.norefresh()');
    // don't refresh;
  } else {
    mount.refresh();
    return result;
  }
}

function isComponent(component) {
  return component
    && ((typeof component.init === 'function'
       && typeof component.update === 'function'
       && typeof component.destroy === 'function') || (typeof component.refreshComponent === 'function'));
}

function cloneOptions(options) {
  if (options) {
    return {
      norefresh: options.norefresh,
      refresh: options.refresh,
      component: options.component,
    }
  } else {
    return {}
  }
}

},{"./deprecations":24}],35:[function(require,module,exports){
var render = require('./render');

module.exports = function(fn, options) {
  return render.currentRender().mount.refreshify(fn, options)
}

},{"./render":36}],36:[function(require,module,exports){
var simplePromise = require('./simplePromise');

function runRender(mount, fn) {
  var render = new Render(mount);

  try {
    runRender._currentRender = render;

    return fn();
  } finally {
    render.finished.fulfill();
    runRender._currentRender = undefined;
  }
}

function Render(mount) {
  this.finished = simplePromise();
  this.mount = mount;
  this.attachment = mount;
}

Render.prototype.transformFunctionAttribute = function() {
  return this.mount.transformFunctionAttribute.apply(this.mount, arguments)
}

module.exports = runRender

runRender.currentRender = function () {
  return runRender._currentRender || defaultRender;
};

var defaultRender = {
  mount: {
    renderComponent: function(model) { return model.render() },
    refreshify: function(fn) { return fn }
  },

  transformFunctionAttribute: function (key, value) {
    return value
  }
}

},{"./simplePromise":39}],37:[function(require,module,exports){
var vhtml = require('./vhtml');
var domComponent = require('./domComponent');
var bindingMeta = require('./meta');
var toVdom = require('./toVdom');
var parseTag = require('virtual-dom/virtual-hyperscript/parse-tag');
var Mount = require('./mount');
var render = require('./render');
var deprecations = require('./deprecations');
var prepareAttributes = require('./prepareAttributes')
var binding = require('./binding')
var refreshAfter = require('./refreshAfter')
var refreshEventResult = require('./refreshEventResult')

exports.append = function (element, render, model, options) {
  return startAttachment(render, model, options, function(mount, domComponentOptions) {
    var component = domComponent.create(domComponentOptions);
    var vdom = mount.render();
    element.appendChild(component.create(vdom));
    return component;
  });
};

exports.replace = function (element, render, model, options) {
  return startAttachment(render, model, options, function(mount, domComponentOptions) {
    var component = domComponent.create(domComponentOptions);
    var vdom = mount.render();
    element.parentNode.replaceChild(component.create(vdom), element);
    return component;
  });
};

exports.appendVDom = function (vdom, render, model, options) {
  return startAttachment(render, model, options, function(mount) {
    var component = {
      create: function(newVDom) {
        vdom.children = [];
        if (newVDom) {
          vdom.children.push(newVDom);
        }
      },
      update: function(newVDom) {
        vdom.children = [];
        if (newVDom) {
          vdom.children.push(newVDom);
        }
      }
    };
    component.create(mount.render());
    return component;
  });
};

function startAttachment(render, model, options, attachToDom) {
  if (typeof render == 'object') {
    return start(render, attachToDom, model);
  } else {
    deprecations.renderFunction('hyperdom.append and hyperdom.replace with render functions are deprecated, please pass a component');
    return start({render: function () { return render(model); }}, attachToDom, options);
  }
}

function start(model, attachToDom, options) {
  var mount = new Mount(model, options);
  render(mount, function () {
    if (options) {
      var domComponentOptions = {document: options.document};
    }
    mount.component = attachToDom(mount, domComponentOptions);
  });
  return mount;
}

/**
 * this function is quite ugly and you may be very tempted
 * to refactor it into smaller functions, I certainly am.
 * however, it was written like this for performance
 * so think of that before refactoring! :)
 */
exports.html = function (hierarchySelector) {
  var hasHierarchy = hierarchySelector.indexOf(' ') >= 0;
  var selector, selectorElements;

  if (hasHierarchy) {
    selectorElements = hierarchySelector.match(/\S+/g);
    selector = selectorElements[selectorElements.length - 1];
  } else {
    selector = hierarchySelector;
  }

  var childElements;
  var vdom;
  var tag;
  var attributes = arguments[1];

  if (attributes && attributes.constructor == Object && typeof attributes.render !== 'function') {
    childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 2));
    prepareAttributes(selector, attributes, childElements);
    tag = parseTag(selector, attributes);
    vdom = vhtml(tag, attributes, childElements);
  } else {
    attributes = {};
    childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 1));
    tag = parseTag(selector, attributes);
    vdom = vhtml(tag, attributes, childElements);
  }

  if (hasHierarchy) {
    for(var n = selectorElements.length - 2; n >= 0; n--) {
      vdom = vhtml(selectorElements[n], {}, [vdom]);
    }
  }

  return vdom;
};

exports.jsx = function (tag, attributes) {
  var childElements = toVdom.recursive(Array.prototype.slice.call(arguments, 2));
  if (attributes) {
    prepareAttributes(tag, attributes, childElements);
  }
  return vhtml(tag, attributes || {}, childElements);
};

Object.defineProperty(exports.html, 'currentRender', {get: function () {
  deprecations.currentRender('hyperdom.html.currentRender is deprecated, please use hyperdom.currentRender() instead');
  return render._currentRender;
}});

Object.defineProperty(exports.html, 'refresh', {get: function () {
  deprecations.refresh('hyperdom.html.refresh is deprecated, please use component.refresh() instead');
  if (render._currentRender) {
    var currentRender = render._currentRender
    return function(result) {
      refreshEventResult(result, currentRender.mount)
    }
  } else {
    throw new Error('Please assign hyperdom.html.refresh during a render cycle if you want to use it in event handlers. See https://github.com/featurist/hyperdom#refresh-outside-render-cycle');
  }
}});

Object.defineProperty(exports.html, 'norefresh', {get: function () {
  deprecations.refresh('hyperdom.html.norefresh is deprecated, please use hyperdom.norefresh() instead');
  return refreshEventResult.norefresh
}});

Object.defineProperty(exports.html, 'binding', {get: function () {
  deprecations.refresh('hyperdom.html.binding() is deprecated, please use hyperdom.binding() instead');
  return binding
}});

Object.defineProperty(exports.html, 'refreshAfter', {get: function () {
  deprecations.refresh("hyperdom.html.refreshAfter() is deprecated, please use require('hyperdom/refreshAfter')() instead");
  return refreshAfter
}});

exports.html.meta = bindingMeta;

function rawHtml() {
  var selector;
  var html;
  var options;

  if (arguments.length == 2) {
    selector = arguments[0];
    html = arguments[1];
    options = {innerHTML: html};
    return exports.html(selector, options);
  } else {
    selector = arguments[0];
    options = arguments[1];
    html = arguments[2];
    options.innerHTML = html;
    return exports.html(selector, options);
  }
}

exports.html.rawHtml = rawHtml;

},{"./binding":22,"./deprecations":24,"./domComponent":25,"./meta":29,"./mount":30,"./prepareAttributes":31,"./refreshAfter":33,"./refreshEventResult":34,"./render":36,"./toVdom":40,"./vhtml":41,"virtual-dom/virtual-hyperscript/parse-tag":58}],38:[function(require,module,exports){
if (typeof Set === 'function') {
  module.exports = Set;
} else {
  module.exports = function() {
    this.items = [];
  };

  module.exports.prototype.add = function(widget) {
    if (this.items.indexOf(widget) == -1) {
      this.items.push(widget);
    }
  };

  module.exports.prototype.delete = function(widget) {
    var i = this.items.indexOf(widget);
    if (i !== -1) {
      this.items.splice(i, 1);
    }
  };

  module.exports.prototype.forEach = function(fn) {
    for(var n = 0; n < this.items.length; n++) {
      fn(this.items[n]);
    }
  };
}

},{}],39:[function(require,module,exports){
function SimplePromise () {
  this.listeners = [];
}

SimplePromise.prototype.fulfill = function (value) {
  if (!this.isFulfilled) {
    this.isFulfilled = true;
    this.value = value;
    this.listeners.forEach(function (listener) {
      listener();
    });
  }
};

SimplePromise.prototype.then = function (success) {
  if (this.isFulfilled) {
    success(this.value);
  } else {
    this.listeners.push(success);
  }
};

module.exports = function () {
  return new SimplePromise();
};

},{}],40:[function(require,module,exports){
var vtext = require("virtual-dom/vnode/vtext.js")
var isVdom = require('./isVdom');
var Component = require('./component')

function toVdom(object) {
  if (object === undefined || object === null) {
    return new vtext('');
  } else if (typeof(object) != 'object') {
    return new vtext(String(object));
  } else if (object instanceof Date) {
    return new vtext(String(object));
  } else if (object instanceof Error) {
    return new vtext(object.toString());
  } else if (isVdom(object)) {
    return object;
  } else if (typeof object.render === 'function') {
    return new Component(object);
  } else {
    return new vtext(JSON.stringify(object));
  }
}

module.exports = toVdom;

function addChild(children, child) {
  if (child instanceof Array) {
    for (var n = 0; n < child.length; n++) {
      addChild(children, child[n]);
    }
  } else {
    children.push(toVdom(child));
  }
}

module.exports.recursive = function (child) {
  var children = [];
  addChild(children, child);
  return children;
};

},{"./component":23,"./isVdom":27,"virtual-dom/vnode/vtext.js":68}],41:[function(require,module,exports){
'use strict';

var VNode = require('virtual-dom/vnode/vnode.js');
var isHook = require('virtual-dom/vnode/is-vhook');
var xml = require('./xml')

var softSetHook = require('virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js');

module.exports = h;

function h(tagName, props, children) {
  var tag = tagName;

  // support keys
  if (props.hasOwnProperty('key')) {
    var key = props.key;
    props.key = undefined;
  }

  // support namespace
  if (props.hasOwnProperty('namespace')) {
    var namespace = props.namespace;
    props.namespace = undefined;
  }

  // fix cursor bug
  if (tag.toLowerCase() === 'input' &&
    !namespace &&
    props.hasOwnProperty('value') &&
    props.value !== undefined &&
    !isHook(props.value)
  ) {
    props.value = softSetHook(props.value);
  }

  var vnode = new VNode(tag, props, children, key, namespace);

  if (props.xmlns) {
    xml.transform(vnode)
  }

  return vnode
}

},{"./xml":43,"virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js":57,"virtual-dom/vnode/is-vhook":61,"virtual-dom/vnode/vnode.js":66}],42:[function(require,module,exports){
var domComponent = require('./domComponent');
var rendering = require('./rendering');
var VText = require("virtual-dom/vnode/vtext.js")

function WindowWidget(attributes) {
  this.attributes = attributes;
  this.vdom = new VText('');
  this.component = domComponent.create();

  var self = this;
  this.cache = {};
  Object.keys(this.attributes).forEach(function (key) {
    self.cache[key] = rendering.html.refreshify(self.attributes[key]);
  });
}

WindowWidget.prototype.type = 'Widget';

WindowWidget.prototype.init = function () {
  applyPropertyDiffs(window, {}, this.attributes, {}, this.cache);
  return this.element = document.createTextNode('');
};

function uniq(array) {
  var sortedArray = array.slice();
  sortedArray.sort();

  var last;

  for(var n = 0; n < sortedArray.length;) {
    var current = sortedArray[n];

    if (last === current) {
      sortedArray.splice(n, 1);
    } else {
      n++;
    }
    last = current;
  }

  return sortedArray;
}

function applyPropertyDiffs(element, previous, current, previousCache, currentCache) {
  uniq(Object.keys(previous).concat(Object.keys(current))).forEach(function (key) {
    if (/^on/.test(key)) {
      var event = key.slice(2);

      var prev = previous[key];
      var curr = current[key];
      var refreshPrev = previousCache[key];
      var refreshCurr = currentCache[key];

      if (prev !== undefined && curr === undefined) {
        element.removeEventListener(event, refreshPrev);
      } else if (prev !== undefined && curr !== undefined && prev !== curr) {
        element.removeEventListener(event, refreshPrev);
        element.addEventListener(event, refreshCurr);
      } else if (prev === undefined && curr !== undefined) {
        element.addEventListener(event, refreshCurr);
      }
    }
  });
}

WindowWidget.prototype.update = function (previous) {
  applyPropertyDiffs(window, previous.attributes, this.attributes, previous.cache, this.cache);
  this.component = previous.component;
  return this.element;
};

WindowWidget.prototype.destroy = function () {
  applyPropertyDiffs(window, this.attributes, {}, this.cache, {});
};

module.exports = function (attributes) {
  return new WindowWidget(attributes);
};

},{"./domComponent":25,"./rendering":37,"virtual-dom/vnode/vtext.js":68}],43:[function(require,module,exports){
var AttributeHook = require('virtual-dom/virtual-hyperscript/hooks/attribute-hook')

var namespaceRegex = /^([a-z0-9_-]+)(--|:)([a-z0-9_-]+)$/i
var xmlnsRegex = /^xmlns(--|:)([a-z0-9_-]+)$/i

function transformTanName(vnode, namespaces) {
  var tagNamespace = namespaceRegex.exec(vnode.tagName)
  if (tagNamespace) {
    var namespaceKey = tagNamespace[1]
    var namespace = namespaces[namespaceKey]
    if (namespace) {
      vnode.tagName = tagNamespace[1] + ':' + tagNamespace[3]
      vnode.namespace = namespace
    }
  } else if (!vnode.namespace) {
    vnode.namespace = namespaces['']
  }
}

function transformProperties(vnode, namespaces) {
  var properties = vnode.properties

  if (properties) {
    var attributes = properties.attributes || (properties.attributes = {})

    var keys = Object.keys(properties);
    for (var k = 0, l = keys.length; k < l; k++) {
      var key = keys[k];
      if (key != 'style' && key != 'attributes') {
        var match = namespaceRegex.exec(key)
        if (match) {
          properties[match[1] + ':' + match[3]] = new AttributeHook(namespaces[match[1]], properties[key])
          delete properties[key]
        } else {
          var property = properties[key];
          var type = typeof property;
          if (type === 'string' || type === 'number' || type === 'boolean') {
            attributes[key] = property;
          }
        }
      }
    }
  }
}

function declaredNamespaces(vnode) {
  var namespaces = {
    '': vnode.properties.xmlns,
    xmlns: 'http://www.w3.org/2000/xmlns/'
  }

  var keys = Object.keys(vnode.properties)

  for (var k = 0, l = keys.length; k < l; k++) {
    var key = keys[k];
    var value = vnode.properties[key]

    if (key == 'xmlns') {
      namespaces[''] = value
    } else {
      var match = xmlnsRegex.exec(key)

      if (match) {
        namespaces[match[2]] = value
      }
    }
  }

  return namespaces
}

function transform(vnode) {
  var namespaces = declaredNamespaces(vnode)

  function transformChildren(vnode, namespaces) {
    transformTanName(vnode, namespaces)
    transformProperties(vnode, namespaces)

    if (vnode.children) {
      for (var c = 0, l = vnode.children.length; c < l; c++) {
        var child = vnode.children[c];
        if (!(child.properties && child.properties.xmlns)) {
          transformChildren(child, namespaces)
        }
      }
    }
  }

  transformChildren(vnode, namespaces)

  return vnode
}

module.exports.transform = transform

},{"virtual-dom/virtual-hyperscript/hooks/attribute-hook":56}],44:[function(require,module,exports){
"use strict";

module.exports = function isObject(x) {
	return typeof x === "object" && x !== null;
};

},{}],45:[function(require,module,exports){
/*
 * random-string
 * https://github.com/valiton/node-random-string
 *
 * Copyright (c) 2013 Valiton GmbH, Bastian 'hereandnow' Behrens
 * Licensed under the MIT license.
 */

'use strict';

var numbers = '0123456789',
    letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    specials = '!$%^&*()_+|~-=`{}[]:;<>?,./';


function _defaults (opts) {
  opts || (opts = {});
  return {
    length: opts.length || 8,
    numeric: typeof opts.numeric === 'boolean' ? opts.numeric : true,
    letters: typeof opts.letters === 'boolean' ? opts.letters : true,
    special: typeof opts.special === 'boolean' ? opts.special : false
  };
}

function _buildChars (opts) {
  var chars = '';
  if (opts.numeric) { chars += numbers; }
  if (opts.letters) { chars += letters; }
  if (opts.special) { chars += specials; }
  return chars;
}

module.exports = function randomString(opts) {
  opts = _defaults(opts);
  var i, rn,
      rnd = '',
      len = opts.length,
      randomChars = _buildChars(opts);
  for (i = 1; i <= len; i++) {
    rnd += randomChars.substring(rn = Math.floor(Math.random() * randomChars.length), rn + 1);
  }
  return rnd;
};

},{}],46:[function(require,module,exports){
(function() {
    var self = this;
    var variableRegex, splatVariableRegex, escapeRegex, addGroupForTo, addVariablesInTo, compile, recogniseIn, extractParamsForFromAfter;
    variableRegex = /(\:([a-z\-_]+))/gi;
    splatVariableRegex = /(\:([a-z\-_]+)\\\*)/gi;
    escapeRegex = function(pattern) {
        return pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    exports.table = function() {
        var self = this;
        var rows;
        rows = [];
        return {
            add: function(pattern, route) {
                var self = this;
                return rows.push({
                    pattern: pattern,
                    route: route
                });
            },
            compile: function() {
                var self = this;
                return exports.compile(rows);
            }
        };
    };
    exports.compile = function(routeTable) {
        var self = this;
        var groups, regexen, gen1_items, gen2_i, row;
        groups = [];
        regexen = [];
        gen1_items = routeTable;
        for (gen2_i = 0; gen2_i < gen1_items.length; ++gen2_i) {
            row = gen1_items[gen2_i];
            addGroupForTo(row, groups);
            regexen.push("(" + compile(row.pattern) + ")");
        }
        return {
            regex: new RegExp("^(" + regexen.join("|") + ")$"),
            groups: groups,
            recognise: function(input) {
                var self = this;
                return recogniseIn(self.regex.exec(input) || [], self.groups);
            }
        };
    };
    addGroupForTo = function(row, groups) {
        var group;
        group = {
            route: row.route,
            params: []
        };
        groups.push(group);
        return addVariablesInTo(row.pattern, group);
    };
    addVariablesInTo = function(pattern, group) {
        var match;
        while (match = variableRegex.exec(pattern)) {
            group.params.push(match[2]);
        }
        return void 0;
    };
    compile = function(pattern) {
        return escapeRegex(pattern).replace(splatVariableRegex, "(.+)").replace(variableRegex, "([^\\/]+)");
    };
    exports.compilePattern = function(pattern) {
        var self = this;
        return compile(pattern);
    };
    recogniseIn = function(match, groups) {
        var g, i, gen3_forResult;
        g = 0;
        for (i = 2; i < match.length; i = i + groups[g - 1].params.length + 1) {
            gen3_forResult = void 0;
            if (function(i) {
                if (typeof match[i] !== "undefined") {
                    gen3_forResult = {
                        route: groups[g].route,
                        params: extractParamsForFromAfter(groups[g], match, i)
                    };
                    return true;
                }
                g = g + 1;
            }(i)) {
                return gen3_forResult;
            }
        }
        return false;
    };
    extractParamsForFromAfter = function(group, match, i) {
        var params, p;
        params = [];
        for (p = 0; p < group.params.length; p = p + 1) {
            params.push([ group.params[p], decodeURIComponent(match[p + i + 1]) ]);
        }
        return params;
    };
}).call(this);
},{}],47:[function(require,module,exports){
var createElement = require("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":51}],48:[function(require,module,exports){
var diff = require("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":70}],49:[function(require,module,exports){
var patch = require("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":54}],50:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"../vnode/is-vhook.js":61,"is-object":44}],51:[function(require,module,exports){
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"../vnode/handle-thunk.js":59,"../vnode/is-vnode.js":62,"../vnode/is-vtext.js":63,"../vnode/is-widget.js":64,"./apply-properties":50,"global/document":10}],52:[function(require,module,exports){
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],53:[function(require,module,exports){
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"../vnode/is-widget.js":64,"../vnode/vpatch.js":67,"./apply-properties":50,"./update-widget":55}],54:[function(require,module,exports){
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"./create-element":51,"./dom-index":52,"./patch-op":53,"global/document":10,"x-is-array":71}],55:[function(require,module,exports){
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":64}],56:[function(require,module,exports){
'use strict';

module.exports = AttributeHook;

function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
        return new AttributeHook(namespace, value);
    }

    this.namespace = namespace;
    this.value = value;
}

AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === 'AttributeHook' &&
        prev.value === this.value &&
        prev.namespace === this.namespace) {
        return;
    }

    node.setAttributeNS(this.namespace, prop, this.value);
};

AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === 'AttributeHook' &&
        next.namespace === this.namespace) {
        return;
    }

    var colonPosition = prop.indexOf(':');
    var localName = colonPosition > -1 ? prop.substr(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
};

AttributeHook.prototype.type = 'AttributeHook';

},{}],57:[function(require,module,exports){
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],58:[function(require,module,exports){
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":9}],59:[function(require,module,exports){
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-thunk":60,"./is-vnode":62,"./is-vtext":63,"./is-widget":64}],60:[function(require,module,exports){
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],61:[function(require,module,exports){
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],62:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":65}],63:[function(require,module,exports){
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":65}],64:[function(require,module,exports){
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],65:[function(require,module,exports){
module.exports = "2"

},{}],66:[function(require,module,exports){
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./is-thunk":60,"./is-vhook":61,"./is-vnode":62,"./is-widget":64,"./version":65}],67:[function(require,module,exports){
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":65}],68:[function(require,module,exports){
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":65}],69:[function(require,module,exports){
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"../vnode/is-vhook":61,"is-object":44}],70:[function(require,module,exports){
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"../vnode/handle-thunk":59,"../vnode/is-thunk":60,"../vnode/is-vnode":62,"../vnode/is-vtext":63,"../vnode/is-widget":64,"../vnode/vpatch":67,"./diff-props":69,"x-is-array":71}],71:[function(require,module,exports){
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],72:[function(require,module,exports){
var http = require('httpism')

function APIService() {

}

APIService.prototype.getResults = function(postcode, userData) {

  var data = {};

  return delay(500).then(function(){
    return loadPostcodeData(postcode)
    .then(function(results) {
      if (results.error) {
        return results;
      }
      data = results;
      var constituency = results.user.constituency
      data.user = userData || {};
      data.user.constituency = constituency;
      return resultAlgorithm(data);
    }).then(function(results) {
      return results;
    })
  })
}

APIService.prototype.getPostcodeOptions = function(postcode) {
  var data = { seats: []};

  return delay(500).then(function(){
    return getContenders(postcode)
    .then(function(results) {
      console.log('contenders')
      console.log(results)
      if (results.error) {
        return results;
      } else {
        console.log(results)
        data.seats.push(results);
        if (data.seats[0].parties.length > 1) {
          data.text = {
            heading: "Looks like your vote is worth a lot!",
            subheading: "You're in a contested seat, so more than one party is in with a chance"
          }
        } else {
          data.text = {
            heading: "Looks like there's not much choice!",
            subheading: "You're in a safe seat, so it's unlikely the sitting MP will be booted out."
          }
        }
        console.log(data);
        return data;
      }
    });
  })
}

APIService.prototype.comparePostcodes = function(postcode1, postcode2) {
  var data = { seats: []};

  return delay(500).then(function(){
    return getContenders(postcode1)
    .then(function(results) {
      if (results.error) {
        return results;
      }
      data.seats.push(results);
      return getContenders(postcode2)
    }).then(function(results) {
      if (results.error) {
        return results;
      }
      data.seats.push(results);
      if (data.seats[0].parties.length > 1 && data.seats[1].parties.length > 1) {
        data.numberOfSwingSeats = "2",
        data.text = {
          heading: "Firstly, it looks like you're spoilt for choice!",
          subheading: "Both are contested seats"
        }
      } else if (data.seats[0].parties.length == 1 && data.seats[1].parties.length == 1) {
        data.numberOfSwingSeats = "0",
        data.text = {
          heading: "Firstly, it looks like there's not much choice!",
          subheading: "Both are safe seats."
        }
      } else {
        data.numberOfSwingSeats = "1",
        data.text = {
          heading: "Firstly, it looks like your vote is worth more in one place than the other!",
          subheading: "Only one of your constituencies is a contested seat."
        }
      };
      data.facebookShareHref = 'https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button';
      data.twitterShareHref = 'https://twitter.com/intent/tweet?text='+'I know how to choose between voting at home or in ' + (data.seats[1].location ? ' in %23' + data.seats[1].location.replace(/\s/g, '') : '') + ' in %23GE2017. How are you using your vote? ge2017.com';
      console.log(data)
      return data;
    })
  })
}

getContenders = function(postcode) {
  var user = {};
  return loadPostcodeData(postcode)
  .then(function(results) {
    if (results.error) {
      return results;
    } else {
      data = results;
      user = {constituency: results.user.constituency};
      return getPartyChances(data);
    }
  }).then(function(results) {
    if (results.error) {
      return results;
    } else {
      var threshold = 0.2;
      var partyKeys = Object.keys(results);
      var topPartyKeys = partyKeys.filter(function(partyKey) {
        return results[partyKey].chance > threshold;
      });
      var topParties = allParties.filter(function(party) {
        return topPartyKeys.indexOf(party.key) > -1;
      });

      return {
        location: user.constituency.name,
        parties: topParties
      };
    }
  });
}


APIService.prototype.loadPostcodeData = function(postcode) {

  var totalResults = {};
  var postcodeResults = {};

  return loadConstituency(postcode)
  .then(function(results) {
    console.log(results)
    if (results.error) {
      return results;
    } else {
      totalResults.user = {
        constituency : {
          name: results.constituency.name,
          id: results.constituency.codes.gss
        }
      };
      postcodeResults = results;
      var refAreaName = results.refArea.name;
      refAreaName = refAreaName.substring(0, refAreaName.length - 5);
      return loadEURefResults(refAreaName);
    }
  })
  .then(function(results) {
    console.log(results);
    if (results.error) {
      return results;
    } else {
      createObjectProps(totalResults, ['results','my-constituency','euRef2016','choices','leave']);
      totalResults.results["my-constituency"]["euRef2016"].choices["leave"].share = results[0].pctLeave;
      return loadGe2015Results(postcodeResults.constituency.codes.gss)
    }
  })
  .then(function(results) {
    if (results.error) {
      return results;
    } else {
      totalResults.results["my-constituency"]["ge2015"] = results["ge2015"];
      return loadPartyStances();
    }
  }).then(function(results) {
    if (results.error) {
      return results;
    } else {
      totalResults.parties = results;
      return totalResults;
    }
  })
}

APIService.prototype.resultAlgorithm = function(data) {
  var threshold = 0.7;
  var partyMatches = getPartyMatches(data);
  console.log('Party Matches:', partyMatches);
  var partyChances = getPartyChances(data);
  console.log('Party Chances:', partyChances);
  var partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    if (partyMatches[partyKey].match < threshold) {
      delete partyMatches[partyKey];
    }
  })
  var partyScores = {};
  finalPartiesList = [];
  partyKeys = Object.keys(partyMatches);
  partyKeys.forEach(function(partyKey) {
    try {
      partyScores[partyKey] = (partyMatches[partyKey].match*2+partyChances[partyKey].chance)/3;
    } catch(e) {
      partyScores[partyKey] = 0;
      console.log("Just set the score for " + partyKey + " to 0")
    }
    if (!partyScores[partyKey]) {
      delete partyScores[partyKey];
    } else {
      var party = allParties.filter(function(p) {return p.key == partyKey})[0];
      party.score = partyScores[partyKey];
      party.matches = {
        plus: partyMatches[partyKey].matches.filter(function(match) {
          return match.agreement > 0.5;
        })
      }
      party.chances = {
        plus: partyChances[partyKey].chances.filter(function(match) {
          return match.chance > 0.5;
        })
      }
      finalPartiesList.push(party);
    }
  });

  function compare(a,b) {
    if (a.score > b.score)
      return -1;
    if (a.score < b.score)
      return 1;
    return 0;
  }

  finalPartiesList.sort(compare);

  console.log('Final Parties List:', finalPartiesList);



  // partyKeys = Object.keys(partyScores);
  // var max = 0,
  //     winningParty = {};
  // partyKeys.forEach(function(partyKey) {
  //   if (partyScores[partyKey] >= max) {
  //     max = partyScores[partyKey];
  //     winningParty = {key: partyKey};
  //   }
  // })
  //
  // winningParty = allParties.filter(function(party) {
  //   return party.key == winningParty.key;
  // })[0];
  // if (!winningParty) {
  //   winningParty = allParties[Math.floor(Math.random()*allParties.length)];
  // }
  // var finalResult = {
  //     party: winningParty.name
  // }
  var totalData = {data: data, parties: finalPartiesList};
  return totalData;
}

APIService.prototype.getPartyMatches = function(data) {
  var partyMatchesByIssue = {},
      partyMatches = {};
  var agreements = getAgreements(data);
  allParties.forEach(function(party) {
    var partyKey = party.key;
    partyMatchesByIssue[partyKey] = [];
    try {
      var issueKeys = Object.keys(agreements[partyKey]);
      issueKeys.forEach(function(issueKey) {
        var debateKeys = Object.keys(agreements[partyKey][issueKey]);
        debateKeys.forEach(function(debateKey) {
          partyMatchesByIssue[partyKey].push(agreements[partyKey][issueKey][debateKey])
        });
      });
      partyMatches[partyKey] = { matches: partyMatchesByIssue[partyKey], match: 0 };
      partyMatchesByIssue[partyKey].forEach(function(match) {
        partyMatches[partyKey].match += match.agreement*match.weight;
      })
      partyMatches[partyKey].match /= partyMatchesByIssue[partyKey].length;
    } catch(e) {

    }
  });
  return partyMatches;
}

APIService.prototype.getAgreements = function(data) {
  var agreementMatrix = {};

  var issues = data.user.opinions.issues;
  var issueKeys = Object.keys(issues);
  issueKeys.forEach(function(issueKey) {
    var issue = issues[issueKey];
    try {
      var debates = issue.debates;
      var debateKeys = Object.keys(debates);
      debateKeys.forEach(function(debateKey) {
        var debate = debates[debateKey];
        try {
          var allPartiesDebate = data.parties.opinions.issues[issueKey].debates[debateKey];
          var partyKeys = Object.keys(allPartiesDebate.parties);
          partyKeys.forEach(function(partyKey) {
            createObjectProps(agreementMatrix, [partyKey, issueKey])
            agreementMatrix[partyKey][issueKey][debateKey] = {
              agreement: 1 - Math.abs(debate.opinion - allPartiesDebate.parties[partyKey].opinion),
              partyOpinion: allPartiesDebate.parties[partyKey].opinion,
              userOpinion: debate.opinion,
              weight: debate.weight || 1,
              description: allPartiesDebate.parties[partyKey].description || ("You both agree on " + allPartiesDebate.description)
            }
          })
        } catch (e) {

        }
      })
    } catch(e) {

    }
  })
  return agreementMatrix;
}

APIService.prototype.getPartyChances = function(data) {
  var partyChances = {};
  var euRefLeavePercent = data.results["my-constituency"]["euRef2016"].choices["leave"].share;

  var currentParty = {}
  currentParty = allParties.filter(function(party) {
    var partyResult = data.results["my-constituency"]["ge2015"].parties[party.key];
    return partyResult ? partyResult.rank == 1 : false;
  })[0];
  currentParty.name = allParties.filter(function(party) {
    return party.key == currentParty.key
  })[0].name;

  allParties.forEach(function(party) {
    partyKey = party.key;
    try {
      var ge2015MarginPercent = data.results["my-constituency"]["ge2015"].parties[partyKey].shareMargin;
      var partyBrexitStance = data.parties.opinions.issues["brexit"].debates["brexit-1"].parties[partyKey].opinion;
      var chanceFromGe2015MarginPercent = ge2015MarginPercent ? 0.5+(Math.sign(ge2015MarginPercent))*(Math.pow(Math.abs(ge2015MarginPercent),(1/4)))/(2*Math.pow(100,(1/4))) : 0; // Quite crude, ranges from 0.5 to 100 for positive input (should range from below 0.5 to below 100)
      var chanceFromEuOpinions = 1-Math.abs(partyBrexitStance - (1+euRefLeavePercent/25))/4; //Works best when 100% of people voted
      var totalChance = (3*chanceFromGe2015MarginPercent + chanceFromEuOpinions)/4;
      partyChances[partyKey] = {
        chance: totalChance
      }

      partyChances[partyKey].chances = [];
      partyChances[partyKey].chances.push({
        description: "This is a " + currentParty.name + " seat",
        chance: (currentParty.key == partyKey)
      });
      if (currentParty.key != partyKey) {
        partyRank = data.results["my-constituency"]["ge2015"].parties[partyKey].rank;
        partyChances[partyKey].chances.push({
          description: party.name + " came #" + partyRank + " in the 2015 general election",
          chance: (partyRank <= 3)
        })
      }



    } catch (e) {

    }
  })
  return partyChances;
}


APIService.prototype.loadConstituency = function(postcode) {
  // igor: todo: flush it soon!
  const apiKey = "DHSoK08gLM6tgVlJFleH4bnUiuHPE4DJkKQiSENT";
  var url = 'https://mapit.mysociety.org/postcode/' + postcode + '?api_key=' + apiKey;
  return http.get(url)
  .then(function (res) {
    console.log(res)
    var constituency = objectAsArray(res.body.areas).filter(function (data) {
      return data.type == 'WMC'
    });
    var refArea = objectAsArray(res.body.areas).filter(function (data) {
      return (data.type == 'OLF' || data.type == 'UTA')
    });
    return {constituency: constituency[0], refArea: refArea[0], all: res.body.areas}
  }, function (error) {
    return {error: true};
  })
};

APIService.prototype.loadEURefResults = function(areaName) {
  var results = leavePercentages.filter(function (res) {
    return res.area == areaName;
  });
  if (results.length==0) {
    var results = leavePercentages.filter(function (res) {
      return res.area.indexOf(areaName) > -1;
    });
  }
  if (results.length==0) {
    var results = leavePercentages.filter(function (res) {
      return res.area.indexOf(areaName.split(" ")[0]);
    });
  }
  return results;
}

APIService.prototype.loadGe2015Results = function(areaKey) {
  var result = {"ge2015": {parties:{}}};
  var resultsTemp = ge2015Results[areaKey];
  resultsTemp.forEach(function(party) {
    var partyKey = party.party;
    result["ge2015"].parties[partyKey] = party;
  })
  // var result = {
  //   "ge2015": {
  //     parties: {
  //       "labour": {
  //         share: 34,
  //         votes: 33145,
  //         shareMargin: 6,
  //         voteMargin: 5492
  //       },
  //       "conservative": {
  //         share: 29,
  //         votes: 27653,
  //         shareMargin: -6,
  //         voteMargin: -5492
  //       }
  //     }
  //   }
  // };
  return result;
}


APIService.prototype.loadPartyStances = function() {
  return partyStances;
}



function objectAsArray(obj) {
  return Object.keys(obj).map(function (key) { return obj[key]; });
}

var getResults = APIService.prototype.getResults;
var comparePostcodes = APIService.prototype.comparePostcodes;
var loadPostcodeData = APIService.prototype.loadPostcodeData;
var resultAlgorithm = APIService.prototype.resultAlgorithm;
var getAgreements = APIService.prototype.getAgreements;
var getPartyChances = APIService.prototype.getPartyChances;
var getPartyMatches = APIService.prototype.getPartyMatches;
var loadConstituency = APIService.prototype.loadConstituency;
var loadEURefResults = APIService.prototype.loadEURefResults;
var loadPartyStances = APIService.prototype.loadPartyStances;
var loadGe2015Results = APIService.prototype.loadGe2015Results;


// igor: a simulation of delay for http requests :)

function delay(t) {
  return new Promise(function(resolve) {
    setTimeout(resolve, t)
  });
}

function createObjectProps(globalObject, props) {
  var tempObject = globalObject;
  props.forEach(function(prop) {
    if(!tempObject[prop]) {
      tempObject[prop] = {}
    }
    tempObject = tempObject[prop];
  })
  return globalObject;
}


// getResults('SW96HP', { opinions: { issues: { brexit: { debates: { "brexit-1": { opinion: 1 } } } } } } );
// console.log(resultAlgorithm(dummyData));

module.exports = new APIService();

},{"httpism":12}],73:[function(require,module,exports){
const
  hyperdom = require('hyperdom'),
  h = hyperdom.html,
  router = require('hyperdom-router'),
  windowEvents = require('hyperdom/windowEvents'),
  api = require('../services/APIService'),
  http = require('httpism'),
  model = require('../models/model'),
  CardTemplates = {},
  helpers = new (require("../includes/helpers"))(model,h,CardTemplates,http, router),
  dataProcessor = new (require("../includes/dataprocessor"))(),
  designers = new (require("../includes/designers"))()
;

const routes = {
  root: router.route('/'),
  dashboard: router.route('/dashboards/:name'),
  step: router.route('/steps/:name'),
  students: router.route('/students') //'student' too?
};

router.start();

Model = model;

class App {
  constructor(data) {
    this.header = new Header();
  }

  render() {

    if (Embed) {

      var params = {
        name: StepName
      }
      var step = new Step(params);
      return h('div',step);

    } else {

      return h('div.body' + (Standalone ? '.standalone' : ''),
        h('div.main',
          h('div.top-strip'),

          this.header,

          routes.root(function () {
            var dashboard = new Dashboard({dashboard: 'home'});
            return h("div", dashboard)
          }),

          routes.dashboard(function (params) {
            var dashboard = new Dashboard({dashboard: params.name});
            return h("div", dashboard)
          }),

          routes.step(function (params) {
            var step = new Step(params);
            return h('div',step);
          }),

          routes.students(function (params) {
            var params = {
              name: StepName
            }
            console.log(params);
            var step = new Step(params);
            return h('div',step);
          })
        )
      )
    }
  }
}


class Header {
  render() {
    return h("header",
      routes.root().a({"class": "home " + routes.root(function(){return "fade-hidden"})},
        h("i.fa.fa-arrow-left"),
        " Home"
      ), routes.root().a(
        h("img.ge2017-logo", {"src": "/img/logo.png"})
      ),
      (new Progress())
    )
  }
}

class Progress {
  render() {
    const self = this;
    var progress_total = 2;
    var progress_current = 0;
    var quizFlow = [];
    model.user.quizFlow.forEach(function(quiz){
      quizFlow = quizFlow.concat(quiz);
    });
    if(quizFlow.length>0){
      progress_total += quizFlow.length;
      var progress_quiz = 0;
      if(model.landedOnPostcode||model.landedOnResult){
        progress_quiz=quizFlow.length;
      } else {
        progress_quiz=quizFlow.indexOf(model.question)!==-1?quizFlow.indexOf(model.question)+1:0;
      }
      progress_current += progress_quiz;
    }
    progress_current+=model.landedOnPostcode;
    progress_current+=model.landedOnResult;
    // todo: why does it lead you to postdode-compare?
    // Answer (from Jeremy) - currently it's just a shortcut so we can demo it to people without having a button on the dashboard!
    return routes.step({
      name: 'postcode-compare',
      type: 'step',
      next: 'result'}).a(
      h(".progress",
        h(".progress-inner",{style: {width: ((progress_current/progress_total)*100)+"%"}})
      )
    )
  }
}


class Dashboard {

  constructor(params) {
    this.dashboard = model.dashboards[params.dashboard] || { title: "Goodness me, you're early! 😳", subtitle: "This feature is coming soon...! 👻", tasks: []};
  }

  onload() {
    $('div.body').removeClass('backColor');
   }

  render() {

    var tasksDOM = [h("p.task-category", "🔥Popular")];

    if (!this.dashboard.tasks.length) {
      tasksDOM.push(h("p", "No tasks to display"))
    }

    this.dashboard.tasks.forEach(function(name) {
      var task = model.tasks[name];
      // igor: now tasks become hidden/shown basing
      // on tasks conditions and model values
      var conditionsMet = true;
      if(task.conditions){
        conditionsMet = false;
        task.conditions.forEach(function(path){
          if(helpers.getModel(path)){
            conditionsMet = true;
          }
        })
      }
      const taskProps = {
        "class":
          "task"+
          (conditionsMet?" conditionsMet":"")+
          (task.subtype?" "+task.subtype:"")
        ,
        "style":{"background-color": task.color}
      };
      const taskContent = [
        h('i.fa.fa-'+task.icon,{attributes: {"aria-hidden":true}}),
        h('h5', task.label)
      ]
      if(task.goto){
        tasksDOM.push(
          routes[task.goto.type](
            { name: task.goto.name, task: name, next: task.goto.next }
          ).a(
            taskProps,
            taskContent
          )
        );
      } else {
        taskProps.onclick = function(e){
          helpers.updateData(task.dataUpdates);
        };
        tasksDOM.push(
          h( "a",
            taskProps,
            taskContent
          )
        );
      }

    });

    return h("section.dashboard",
      h("h1", this.dashboard.title),
      h("h2", this.dashboard.subtitle),
      h("section.tasks", tasksDOM)
    )
  }
}

class Step {
  constructor(params) {
    const self = this;
    this.step = model.steps[params.name];
    this.error = model.user.error;
    this.params = params;

    if (params.task && model.tasks[params.task].dataUpdates)
      helpers.updateData(model.tasks[params.task].dataUpdates);

    const data = {
      cardGroups: []
    };

    switch (params.name) {

      case 'postcode':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode',
          name: 'Please enter your postcode:',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'vote-worth':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'vote-worth',
          name: 'Want to see how much your vote is worth?',
          description: 'Why do we need this? We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'postcode-compare':
        model.landedOnPostcode = 1; // todo: temporary, refactor
        data.cardGroups.push([{
          type: 'postcode-compare',
          name: 'Student? Unsure where to vote from?',
          subtitle: 'Not all parties stand a chance in each constituency. Compare your two postcodes to see where your vote counts most.',
          subheading: 'Why do we need this?',
          description: 'We need your postcode to show data relating to your constituency 👌'
        }])
        break;

      case 'result':
        model.landedOnResult = 1; // todo: temporary, refactor
        model.user.results[model.user.results.length-1].forEach(function(cards){
          data.cardGroups.push(cards);
        })
        break;

      case 'story':
        data.cardGroups.push(partyStories)
        break;

      case 'question':
        var quizFlow = [];
        model.user.quizFlow.forEach(function(quiz){
          quizFlow = quizFlow.concat(quiz);
        })
        const questionName = params.nextQuestion?params.nextQuestion:quizFlow[0];
        model.question = questionName;
        const question = model.questions[questionName];
        var nextQuestion;
        if(quizFlow.indexOf(questionName)<quizFlow.length-1){
          nextQuestion = quizFlow[quizFlow.indexOf(questionName)+1];
        } else {
          nextQuestion = null;
        }
        var finalStep;
        if(model.tasks[params.task].goto.final){
          finalStep = model.tasks[params.task].goto.final;
        } else {
          finalStep = params.final;
        }
        data.cardGroups.push([{
          name: question.issue.description + " - Question " + (question.debate.index+1),
          description: question.question,
          tasks: question.tasks,
          nextQuestion: nextQuestion,
          final: finalStep,
          issueKey: question.issue.key,
          debateKey: question.debate.key
        }])
        break;

      default:
        data.cardGroups.push([{
          name: "Goodness me, you're early! 😳",
          description: "This feature is coming soon...! 👻"
        }])

    }
    this.cardGroups = data.cardGroups.map(function(cards){
      cards.forEach(function(card, i) {
        if(!cards[i].nextStep){
          cards[i].nextStep = params.next;
        }
        cards[i].type = cards[i].type || params.name;
      });
      if (cards.constructor !== Array || cards.length == 1) {
        return ([new Card(cards[0])]);
      } else {
        return (new CardGroup({cards:cards,nextStep:params.next}));
      }
    })

    this.headers = [];
    if(this.step&&this.step.label){
      this.headers.push(
        h("h1",this.step.label)
      );
    }
    if(this.step&&this.step.sublabel){
      this.headers.push(
        h("p",this.step.sublabel)
      );
    }


  }

  onload() {
    const self = this;
    // todo: this might not be 100% stable, we should consider moving it
    setTimeout(function(){
      designers.onStepLoad();
      designers.adaptLayout();
    })
    designers.uniqueStepLayout(self.step);
  }

  render() {
    const self = this;
    return h("section.step",
      (self.error?h('p.error', self.error):null),
      h("div.cards",self.headers,self.cardGroups)
    )
  }
}

class CardGroup {

  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    const cards = self.data.cards.map(function(card){
      return (new Card(card));
    })

    return h('.card-carousel.layer',
      h('div',
        h("div.slick-container",{role: "listbox"},cards)
      )
    )
  }

}

class Card {
  constructor(data) {
    this.cardContent = new CardContent(data);
    this.data = data;
  }

  render() {
    // todo: something is not right here...
    delete CardTemplates.card.content[0].content[1].template;
    CardTemplates.card.content[0].content[1].content = this.cardContent;
    return helpers.assembleCards(this.data, CardTemplates.card);
  }
}

class CardContent {

  constructor(data) {
    this.data = data;
  }

  render() {
    const self = this;
    const data = self.data;

    switch (data.type) {

      case 'postcode':
        data.isWaiting = model.user.isWaiting === "postcode-input";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.user.isWaiting = "postcode-input";
          self.refresh();
          getResults().then(function(){
            delete model.user.isWaiting;
            routes.step({ name: data.nextStep, type: data.type }).push();
          });
          return false;
        }
        return helpers.assembleCards(data, 'postcodeInput');

      case 'vote-worth':
        data.isWaiting = model.user.isWaiting === "vote-worth";
        data.postcodeBinding = [model.user, 'postcode'];
        if(model.user.resultsOptions.length){
          const latestResults = model.user.resultsOptions[model.user.resultsOptions.length-1];
          data.constituencyResults = dataProcessor.processConstituencySeats(latestResults);
        }
        data.postcodeSubmit = function(e) {
          e.stopPropagation();
          model.user.isWaiting = "vote-worth";
          self.refresh();
          api.getPostcodeOptions(model.user.postcode).then(function(results){
            model.user.isWaiting = false;
            if (results.error) {
              helpers.throwError("Sorry, we didn't recognise that postcode!")
            } else {
              model.user.resultsOptions.push(results);
            }
            self.refresh();
          });
          return false;
        }
        return helpers.assembleCards(data, 'voteWorth');

      case 'postcode-compare':
        data.isWaiting = model.user.isWaiting === "postcode-compare";
        data.postcodeBinding = [model.user, 'postcode'];
        data.postcodeUniBinding = [model.user, 'postcode_uni'];
        if(model.user.resultsCompare.length){
          const latestResults = model.user.resultsCompare[model.user.resultsCompare.length-1];
          data.constituencyResults = dataProcessor.processConstituencySeats(latestResults);
        }
        data.onLearnMore = function(e){
          e.stopPropagation();
          routes.root().push();
        }
        data.postcodeSubmit = function(e){
          e.stopPropagation();
          model.user.isWaiting = "postcode-compare";
          api.comparePostcodes(model.user.postcode, model.user.postcode_uni).then(function(results){
            delete model.user.isWaiting;
            var shareButtonCard = [
              {
                name: "Spread the #GE2017 ❤️",
                type: "share",
                button1: '<i class="fa fa-facebook"></i> Share on Facebook',
                buttonClass1: "btn-facebook",
                buttonHref1: 'https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button',
                target1: "_blank",
                button2: '<i class="fa fa-twitter"></i> Share on Twitter',
                buttonClass2: "btn-twitter",
                buttonHref2: 'https://twitter.com/intent/tweet?text='+'I know how to use my %23GE2017 vote' + (model.user.constituency ? ' in %23' + model.user.constituency.name.replace(/\s/g, '') : '') + '. How are you using your vote? ge2017.com',
                target2: "_blank"
              }
            ];
            if (results.error) {
              helpers.throwError("Sorry, we didn't recognise that postcode!")
            } else {
              model.user.resultsCompare.push(results);
            }
            self.refresh();
          });
          return false;
        }
        return helpers.assembleCards(data, 'postcodeCompare');

      case 'result': // todo: refactor
        const description = helpers.markdownToHtml(data.description);
        return h('div.content.text-left',
          h('img', {'src': data.image, 'class': 'party-logo'}),
          h('h2', data.name),
          h('div.body-content',
            h.rawHtml('p', description)
          ),
          (data.footer?
            h('div.footer',
              data.footer.map(function(elem){
                switch (elem) {
                  case "ShareButtons":
                    return (new ShareButtons())
                    break;
                  case "BackToDashboard":
                    return (new BackToDashboard())
                    break;
                  default:
                    return undefined;
                }
              })
            )
            :
            undefined
          )
        )
        break;

      case 'story':
        data.name = data.header;
        data.description = data.content;
        return helpers.assembleCards(data, 'Organization');

      case 'question':
        data.answers = data.tasks.map(function(name) {
          const task = model.tasks[name];
          return {
            "class": "task" + (task.subtype?" "+task.subtype:""),
            label: task.label,
            onclick: function(){
              helpers.updateData([{data: ("user.opinions.issues."+data.issueKey+".debates."+data.debateKey+".opinion"), value: task.goto.opinion}]);
              routes[(data.nextQuestion&&task.goto.name==="question"?"step":task.goto.type)]({
                name: data.nextQuestion?task.goto.name:(task.goto.name!=="question"?task.goto.name:data.final),
                task: name,
                nextQuestion: data.nextQuestion,
                final: data.final,
                next: data.nextStep?data.nextStep:task.goto.next
              }).push();
            }
          }
        });
        return helpers.assembleCards(data, 'question');

      default:
        console.log('Defaulting');
        return helpers.assembleCards(data, data.type);

    }

  }

}

// todo: this will not be needed soon
class ShareButtons {
  render() {
    const data = {
      name: "Spread the #GE2017 ❤️",
      facebookShareHref: "https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button",
      twitterShareHref: "https://twitter.com/intent/tweet?text="+"I know how to use my %23GE2017 vote" + (model.user.constituency ? " in %23" + model.user.constituency.name.replace(/\s/g, '') : "") + ". How are you using your vote? ge2017.com",
    };
    return helpers.assembleCards(data, 'shareButtons');
  }
}


class BackToDashboard {
  render() {
    return h("div.share-buttons",
      h("p","Go back to the dashboard to try again"),
      routes.root().a({"class":"discard-card-style"},
        h("button.btn.btn-primary","Back to Dashboard")
      )
    );
  }
}

// todo: should this be in APIService?
function getResults(){
  return new Promise(function(resolve,reject){
    api.getResults(model.user.postcode, model.user)
      .then(function(results) {
        helpers.updateObject(model.user, results.data.user);
        var yourParty = "",
            yourArea = "",
            yourFooter = "ShareButtons",
            extraCards;
        if (!results.parties.length) {
          results.parties[0] = {
            name: "Hold up!",
            description: "Looks like there isn’t a match for what you’re looking for as no party is offering to do what you want."
          }
          yourFooter = "BackToDashboard";
          shareButtonCard = [];
          extraCards = [];
        } else {
          results.parties[0].matches.plus.forEach(function(match) {
            yourParty += '<i class="fa fa-check" aria-hidden="true"></i> '
            + match.description + '<br>';
          });
          results.parties[0].chances.plus.forEach(function(chance) {
            yourArea += '<i class="fa fa-check" aria-hidden="true"></i> '
            + chance.description + '<br>';
          });
          shareButtonCard = [
            {
              name: "Spread the #GE2017 ❤️",
              type: "share",
              button1: '<i class="fa fa-facebook"></i> Share on Facebook',
              buttonClass1: "btn-facebook",
              buttonHref1: 'https://www.facebook.com/sharer/sharer.php?app_id=&kid_directed_site=0&u=http%3A%2F%2Fuk-election-2017.herokuapp.com%2F&display=popup&ref=plugin&src=share_button',
              target1: "_blank",
              button2: '<i class="fa fa-twitter"></i> Share on Twitter',
              buttonClass2: "btn-twitter",
              buttonHref2: 'https://twitter.com/intent/tweet?text='+'I know how to use my %23GE2017 vote' + (model.user.constituency ? ' in %23' + model.user.constituency.name.replace(/\s/g, '') : '') + '. How are you using your vote? ge2017.com',
              target2: "_blank"
            }
          ];
          extraCards = [
            {
              name: "You and your matched party",
              description: yourParty
            },
            {
              name: "You and your area",
              description: yourArea
            }
          ];
        }
        model.user.results.push([
          [
            {
              image: results.parties[0] && results.parties[0].image && ("/img/party-thumbnails/" + results.parties[0].image) || '/img/party-logos/party.jpg',
              name: results.parties[0] && results.parties[0].name,
              description: results.parties[0] && results.parties[0].description || "We don't have a description for this party yet!",
              footer: [
                yourFooter
              ],
              type: "Organization" // Temporary
            }
          ],
          shareButtonCard,
          extraCards
        ]);
        resolve();
      }
    )
  })
}

const templatesUrl = '//explaain-api.herokuapp.com/templates';
helpers.loadTemplates(templatesUrl).then(function(templates){
  for(var key in templates){
    CardTemplates[key] = templates[key];
  };
  if(location.hostname==="localhost" || location.hostname.split('.')[1]==="ngrok"){
    require("../development/templates.js")(CardTemplates);
    require("../development/model.js")(model);
  }
  // todo: move this to development? Is this needed for production?
  require("../development/generatePartyStances.js")(model,partyStances)();
  hyperdom.append(document.body, new App());
});

designers.onWindowResize();

},{"../development/generatePartyStances.js":1,"../development/model.js":2,"../development/templates.js":3,"../includes/dataprocessor":4,"../includes/designers":5,"../includes/helpers":6,"../models/model":7,"../services/APIService":72,"httpism":12,"hyperdom":26,"hyperdom-router":20,"hyperdom/windowEvents":42}]},{},[73]);
