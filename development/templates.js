module.exports = function(CardTemplates){
  CardTemplates.card = [
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
  ];
  CardTemplates["Person"] = [
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
  CardTemplates.postcodeCompare = [
    {
      "dom": "h2",
      "content": {
        "var": "name",
        "default": "Please enter your postcode"
      }
    },
    {
      "dom": "div.body-content",
      "content": [
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
              "content": "Compare"
            }
          ]
        },
        {
          "dom": "div",
          //"condition": "isWaiting",
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
        }
      ]
    },
    {
      "dom": "div",
      "template": "footer"
    }
  ]

  CardTemplates.footer = [
    {
      "dom": ".footer",
      "content": [
        {
          "dom": "div"/*,
          "template": {
            "var": "footerContentTemplate"
          }*/
        }
      ]
    }
  ]

  CardTemplates.loading = [
    {
      "dom": 'div', // this is temporary
      "content": "Loading"
    },
    {
      "dom": 'img.loading',
      "attr": {
        'src': '/img/loading.gif'
      }
    }
  ]

  CardTemplates.voteNow = [
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
  ]

  CardTemplates.constituencyResults = [
    {
      "dom": ".seats",
      "content": [
        {
          "dom": "div",
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
  ]

  CardTemplates.constituency = [
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
  ]

  // Usage:
  // return h('div', getCardDom({type: "people", people: [{type: "person", name: "Sarah", age: "26"},{type: "person", name: "Chris", age: "34"}]}, CardTemplates['loopExample']));
  CardTemplates.loopExample = [
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
  ]
}
