module.exports = {
  getData: function () {
    return quiz;
  }
};


/* Sample data for Quiz for 18 May 2017 */
const quiz = {
  questions: {}
};

quiz.questions["it2018"] = {
  all: [
      "welfare-1",
      "tasse-1",
      "immigrazione-1",
      "immigrazione-2",
      "eu-1",
      "welfare-2",
      "salute-1",
      "sicurezza-1",
      "lavoro-1",
      "tasse-2",
      "educazione-1",
      "ambiente-1"
  ]
};
 quiz.questions["ge2017"] = {
   all: [
     "health-1",
     "education-1",
     "housing-1",
     "eu-1",
     "jobs-1",
     "environment-1",
     "tax-1",
     "eu-2",
     "public-services-1",
     "eu-3",
     "tax-2",
     "defence-1",
     "survey-1"
   ]
 };


quiz.questions["38degrees"] = {
  all: [
     "38-tax-1",
     "38-welfare-1",
     "38-welfare-2",
     "38-tax-2",
     "38-environment-1",
     "38-living-costs-2",
     "38-environment-2",
     "38-economy-2",
     "38-education-1",
     "38-environment-3",
     "38-immigration-2",
     "38-eu-2",
     "survey-1"
  ],
  scotland: [
     "38-tax-1",
     "38-welfare-1",
     "38-welfare-2",
     "38-tax-2",
     "38-independence-1",
     "38-living-costs-2",
     "38-environment-2",
     "38-economy-2",
     "38-education-1",
     "38-environment-3",
     "38-immigration-2",
     "38-eu-2",
     "survey-1"
  ],
};
