module.exports = {
  getData: function() {
    return partyStances;
  }
};


var partyStances = {
     opinions: {
       issues: {
         "Welfare": {
           description: "Welfare",
           debates: {
             "welfare-1": {
               question: "Tutti i cittadini hanno diritto ad un reddito di cittadinanza",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.4,
                 },
                 "LeU": {
                 opinion: 0.4,
                 },
                 "M5S": {
                 opinion: 1,
                 },
                 "Cdx": {
                 opinion: 0,
                 },
                 "+EU": {
                 opinion: 0.4,
                 }
               }
             },
             "welfare-2": {
               question: "Bisogna prevedere la possibilità di andare in pensione prima dei 67 anni",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.2,
                 },
                 "LeU": {
                 opinion: 0.8,
                 },
                 "M5S": {
                 opinion: 1,
                 },
                 "Cdx": {
                 opinion: 1,
                 },
                 "+EU": {
                 opinion: 0,
                 }
               }
             }
           }
         }
   ,

         "Tasse": {
           description: "Tasse",
           debates: {
             "tasse-2": {
               question: "Le imposte indirette e sui patrimoni vanno diminuite per tutti",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.6,
                 },
                 "LeU": {
                 opinion: 0.2,
                 },
                 "M5S": {
                 opinion: 0.6,
                 },
                 "Cdx": {
                 opinion: 1,
                 },
                 "+EU": {
                 opinion: 0,
                 }
               }
             },
             "tasse-1": {
               question: "Bisogna introdurre un'aliquota IRPEF unica (23%) per tutti i livelli di reddito",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: -1,
                 },
                 "LeU": {
                 opinion: 0,
                 },
                 "M5S": {
                 opinion: 0.4,
                 },
                 "Cdx": {
                 opinion: 1,
                 },
                 "+EU": {
                 opinion: 0,
                 }
               }
             }
           }
         }
   ,
         "Sicurezza": {
           description: "Sicurezza",
           debates: {
             "sicurezza-1": {
               question: "L'Italia deve ridurre le spese militari e iniziare una politica di disarmo",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.4,
                 },
                 "LeU": {
                 opinion: 1,
                 },
                 "M5S": {
                 opinion: 0.4,
                 },
                 "Cdx": {
                 opinion: 0,
                 },
                 "+EU": {
                 opinion: 0.6,
                 }
               }
             }
           }
         }
   ,

         "Salute": {
           description: "Salute",
           debates: {
             "salute-1": {
               question: "La sanita pubblica necessita di piu investimenti statali",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 1,
                 },
                 "LeU": {
                 opinion: 1,
                 },
                 "M5S": {
                 opinion: 1,
                 },
                 "Cdx": {
                 opinion: 0,
                 },
                 "+EU": {
                 opinion: 0.4,
                 }
               }
             }
           }
         }
   ,

         "Lavoro": {
           description: "Lavoro",
           debates: {
             "lavoro-1": {
               question: "Le aziende devono essere flessibili nell'assumere e licenziare i dipendenti",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 1,
                 },
                 "LeU": {
                 opinion: 0,
                 },
                 "M5S": {
                 opinion: 1,
                 },
                 "Cdx": {
                 opinion: -1,
                 },
                 "+EU": {
                 opinion: 0.8,
                 }
               }
             }
           }
         }
   ,

         "Immigrazione": {
           description: "Immigrazione",
           debates: {
             "immigrazione-1": {
               question: "E' necessario bloccare lo sbarco di migranti nel nostro paese",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.2,
                 },
                 "LeU": {
                 opinion: 0.2,
                 },
                 "M5S": {
                 opinion: 0.4,
                 },
                 "Cdx": {
                 opinion: 1,
                 },
                 "+EU": {
                 opinion: 0.2,
                 }
               }
             },
             "immigrazione-2": {
               question: "È cittadino italiano anche chi è nato in Italia da genitori stranieri",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.8,
                 },
                 "LeU": {
                 opinion: 1,
                 },
                 "M5S": {
                 opinion: -1,
                 },
                 "Cdx": {
                 opinion: 0,
                 },
                 "+EU": {
                 opinion: 1,
                 }
               }
             }
           }
         }
   ,

         "Educazione": {
           description: "Educazione",
           debates: {
             "educazione-1": {
               question: "La riforma della Buona Scuola va abolita",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.2,
                 },
                 "LeU": {
                 opinion: 0.8,
                 },
                 "M5S": {
                 opinion: 0.8,
                 },
                 "Cdx": {
                 opinion: 1,
                 },
                 "+EU": {
                 opinion: 0,
                 }
               }
             }
           }
         }
   ,

         "EU": {
           description: "EU",
           debates: {
             "eu-1": {
               question: "L'EU deve evolvere verso un'Unione fiscale e sociale",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.8,
                 },
                 "LeU": {
                 opinion: 0.4,
                 },
                 "M5S": {
                 opinion: -1,
                 },
                 "Cdx": {
                 opinion: 0,
                 },
                 "+EU": {
                 opinion: 1,
                 }
               }
             }
           }
         }
   ,

         "Ambiente": {
           description: "Ambiente",
           debates: {
             "ambiente-1": {
               question: "La lotta contro i rischi del cambiamento climatico è una priorità",
               buttons: { },
               parties: {
                 "PD": {
                 opinion: 0.8,
                 },
                 "LeU": {
                 opinion: 1,
                 },
                 "M5S": {
                 opinion: 1,
                 },
                 "Cdx": {
                 opinion: 0.2,
                 },
                 "+EU": {
                 opinion: 1,
               }
             }
           }
         }
       }
     }
   }
 }
