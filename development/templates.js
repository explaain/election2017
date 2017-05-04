module.exports = function(CardTemplates){
  CardTemplates.card =
    {
      "dom": "div.card",
      "attr": {
        "data-uri": {
          "var": "@id",
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
              "dom": "div.content",
              "attr": {
                "class": {
                  "var": "@type"
                }
              },
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
    }
  ;
  CardTemplates.Person = [
    {
      "dom": "h2",
      "content": {
        "var": "name"
      }
    },
    {
      "dom": "div.card-image",
      "content": [{
        "dom": "img",
        "attr": {"src": {
          "var": "image"
        }}
      }]
    },
    {
      "dom": "div.body-content",
      "content": {
        "var": "description",
        "markdown": true
      }
    }
  ];
  CardTemplates.postcodeCompare = {
    "dom": "div",
    "content": [
      { "template": "postcodeFormHeader" },
      {
        "dom": "div.body-content",
        "content": [
          {
            "dom": "form.postcode-form",
            "condition": "!isWaiting",
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
                "content": "Compare"
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
            "template": "shareButtons",
            /*"mapping": [
              ["name", "shareHeader"]
            ]*/
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
    "dom": "h2",
    "condition": "!constituencyResults",
    "content": {
      "var": "name",
      "default": "Please enter your postcode"
    }
  }

  CardTemplates.linkToGovUKWebsiteHint = {
    "dom": "p.small",
    "content": "This link will take you to the official gov.uk website"
  }

  CardTemplates.registerButton = {
    "dom": "p",
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
            "content": "Register >"
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
      "content": [
        {
          "dom": "div.bold",
          "content": {
            "var": "constituencyResults.heading"
          }
        },
        {
          "dom": "div",
          "content": {
            "var": "constituencyResults.subheading"
          }
        },
        {
          "dom": ".seat-list",
          "loop": "constituencyResults.constituencies",
          "content": [
            {
              "dom": "span",
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
          "dom": "div.location.small",
          "content": {
            "var": "location"
          },
        },
        {
          "dom": "div.versus.bold.line1em",
          "content": {
            "var": "parties"
          }
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
              "content": "Facebook"
            }
          ]
        },
        {
          "dom": "a.discard-card-style",
          "attr": {
            "target":"_blank",
            "href": "twitterShareHref"
          },
          "content": [
            {
              "dom": "button.btn.btn-twitter",
              "content": "Twitter"
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
