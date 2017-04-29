var partyStances = {
	opinions: {
		issues: {
		  "brexit": {
		    description: "Brexit",
				debates: {
			    "brexit-1": {
				    question: "The UK should leave the single market, ending free movement of people, goods and services. [Learn more](http://api.explaain.com/Detail/57c9d7a25b3c7111005578c2)",
				    description: "the single market and free movement of people.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 0.7,
							},
					    "lib-dem": {
								opinion: 0,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							}
						}
					},
			    "brexit-2": {
				    question: "There should be a second referendum on EU membership once the UK knows what the deal is. [Learn more](http://api.explaain.com/Detail/5902eae2e04b710011c7af53)",
				    description: "whether to have a second EU referendum or not.",
						parties: {
					    "conservative": {
								opinion: 0,
							},
					    "labour": {
								opinion: 0,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0,
							},
					    "plaid-cymru": {
								opinion: 1,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					},
			    "brexit-3": {
				    question: "Looking after citizens from other EU countries living in the UK (and vice versa) should be a priority [Learn more](http://api.explaain.com/Detail/59031d9be04b710011c7af5c)",
				    description: "citizen rights for EU and UK nationals.",
						parties: {
					    "conservative": {
								opinion: 0.5,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0,
							},
					    "plaid-cymru": {
								opinion: 1,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					}
				}
		  },
		  "security": {
		    description: "Security",
				debates: {
			    "security-1": {
				    question: "There should be a ban on travel to and from countries known to be involved in terrorism. [Learn more](http://api.explaain.com/Detail/59031d9be04b710011c7af5c)",
				    description: "ways of combating terrorism.",
						parties: {
					    "conservative": {
								opinion: 0.7,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 0.3,
							},
					    "ukip": {
								opinion: 1,
							},
					    "green": {
								opinion: 0.3,
							}
						}
					},
			    "security-2": {
				    question: "The security services should be able to access all digital communications to fight terrorism. [Learn more](http://api.explaain.com/Detail/59031d9be04b710011c7af5c)",
				    description: "ways of combating terrorism.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 0.3,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.4,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0.2
							},
						}
					},
			    "security-3": {
				    question: "All police should be armed. [Learn more](http://api.explaain.com/Detail/59031d9be04b710011c7af5c)",
				    description: "whether police should be armed or not.",
						parties: {
					    "conservative": {
								opinion: 0.4,
							},
					    "labour": {
								opinion: 0.4,
							},
					    "lib-dem": {
								opinion: 0.2,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.3,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0.2
							},
						}
					}
				}
		  },
		  "nhs": {
		    description: "NHS",
				debates: {
			    "nhs-1": {
				    question: "The NHS should be owned and run exclusively by the UK government. [Learn more](http://api.explaain.com/Detail/5904afd71c882300111f9d75)",
				    description: "whether the NHS should be completely run by the government or not.",
						parties: {
					    "conservative": {
								opinion: 0,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0,
							},
					    "plaid-cymru": {
								opinion: 0.4,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					},
			    "nhs-2": {
				    question: "The UK should spend more on funding the NHS rather than paying off its debt. [Learn more](http://api.explaain.com/Detail/5904b0f01c882300111f9d77)",
				    description: "how the UK prioritises it's expenditure on healthcare.",
						parties: {
					    "conservative": {
								opinion: 0.5,
							},
					    "labour": {
								opinion: 0.8,
							},
					    "lib-dem": {
								opinion: 0.3,
							},
					    "ukip": {
								opinion: 0.5,
							},
					    "plaid-cymru": {
								opinion: 0.4,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					},
			    "nhs-3": {
				    question: "The UK should train additional staff for the NHS rather than rely on immigration. [Learn more](http://api.explaain.com/Detail/59032798e04b710011c7af5d)",
				    description: "immigrant staff levels in the NHS.",
						parties: {
					    "conservative": {
								opinion: 0.7,
							},
					    "labour": {
								opinion: 0.4,
							},
					    "lib-dem": {
								opinion: 0.3,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.5,
							},
					    "green": {
								opinion: 0.1,
							},
					    "snp": {
								opinion: 0.2
							},
						}
					}
				}
		  },
		  "immigration": {
		    description: "Immigration",
				debates: {
			    "immigration-1": {
				    question: "Cutting the levels of immigration to the UK should be a priority. [Learn more](http://api.explaain.com/Detail/58fb7f0ea22aa10011cfd270)",
				    description: "immigration levels and the UK.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 0,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					},
			    "immigration-2": {
				    question: "All immigrants should enter the UK with a visa. [Learn more](http://api.explaain.com/Detail/59032af8e04b710011c7af5e)",
				    description: "immigrants needing a visa or not.",
						parties: {
					    "conservative": {
								opinion: 0.8,
							},
					    "labour": {
								opinion: 0.6,
							},
					    "lib-dem": {
								opinion: 0.2,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.4,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					},
			    "immigration-3": {
				    question: "Immigrants should have to deposit a sum of money when arriving to cover cost of public services. [Learn more](http://api.explaain.com/Detail/59032ca3e04b710011c7af61)",
				    description: "whether immigrants need to pay an entry deposit or not.",
						parties: {
					    "conservative": {
								opinion: 0.6,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 0.3,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.2,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					}
				}
		  },
		  "education": {
		    description: "Education",
				debates: {
			    "education-1": {
				    question: "The UK should open additional grammar schools. [Learn more](http://api.explaain.com/Detail/5902e349e04b710011c7af4a)",
				    description: "whether additional grammar schools should be opened.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 0,
							},
					    "lib-dem": {
								opinion: 0,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					},
			    "education-2": {
				    question: "Any group should be able to open a school, as long as certain criteria are met. [Learn more](http://api.explaain.com/Detail/59032e06e04b710011c7af62)",
				    description: "creating free schools that can be run by any group.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 0,
							},
					    "lib-dem": {
								opinion: 0.5,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0.4,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0.2
							},
						}
					},
			    "education-3": {
				    question: "Tuition fees should be scrapped. [Learn more](http://api.explaain.com/Detail/5902f54fe04b710011c7af58)",
				    description: "tuition fees and who needs to pay them.",
						parties: {
					    "conservative": {
								opinion: 0,
							},
					    "labour": {
								opinion: 0.5,
							},
					    "lib-dem": {
								opinion: 0.5,
							},
					    "ukip": {
								opinion: 0,
							},
					    "plaid-cymru": {
								opinion: 1,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					}
				}
		  },
		  "environment": {
		    description: "Environment",
				debates: {
			    "environment-1": {
				    question: "There should be a ban on fossil fuels being used to generate power. [Learn more](http://api.explaain.com/Detail/59032eeee04b710011c7af64)",
				    description: "fossil fuels and how the UK generates it's energy.",
						parties: {
					    "conservative": {
								opinion: 0.5,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0.5,
							},
					    "plaid-cymru": {
								opinion: 1,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					},
			    "environment-2": {
				    question: "'Action on climate change is urgently and vitally important.' (http://api.explaain.com/Detail/59031d9be04b710011c7af5c)",
				    description: "climate change and whether it's a priority or not.",
						parties: {
					    "conservative": {
								opinion: 0.7,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0.5,
							},
					    "plaid-cymru": {
								opinion: 0.8,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					},
			    "environment-3": {
				    question: "'There should be an additional tax placed on cars over a certain age. [Learn more](http://api.explaain.com/Detail/590330bae04b710011c7af67)",
				    description: "placing additional taxes on diesel cars to combat climate change.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0.5,
							},
					    "plaid-cymru": {
								opinion: 0.5,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							},
						}
					}
				}
		  },
		  "division": {
		    description: "Division",
				debates: {
			    "division-1": {
				    question: "Full face coverings, including religious clothing, should be banned in public. [Learn more](http://api.explaain.com/Detail/5903310ce04b710011c7af68)",
				    description: "full face coverings.",
						parties: {
					    "conservative": {
								opinion: 0.5,
							},
					    "labour": {
								opinion: 0,
							},
					    "lib-dem": {
								opinion: 0,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					},
			    "division-2": {
				    question: "'The UK should continue to fund and deploy it's nuclear weapon, Trident. [Learn more](http://api.explaain.com/Detail/59033388e04b710011c7af6c)",
				    description: "trident and the UKs nuclear deterrent.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 1,
							},
					    "plaid-cymru": {
								opinion: 0,
							},
					    "green": {
								opinion: 0,
							},
					    "snp": {
								opinion: 0
							},
						}
					},
			    "division-3": {
				    question: "'Same sex marriage should be legal. [Learn more](http://api.explaain.com/Detail/59033407e04b710011c7af6f)",
				    description: "whether same sex marriage should be legal or not.",
						parties: {
					    "conservative": {
								opinion: 1,
							},
					    "labour": {
								opinion: 1,
							},
					    "lib-dem": {
								opinion: 1,
							},
					    "ukip": {
								opinion: 0.5,
							},
					    "plaid-cymru": {
								opinion: 1,
							},
					    "green": {
								opinion: 1,
							},
					    "snp": {
								opinion: 1
							}
						}
					}
				}
		  }
		}
	}
}
