module.exports = {
  getData: function () {
    return quizQuestions;
  }
};

var quizQuestions = [
  {
     question: "Tutti i cittadini hanno diritto ad un reddito di cittadinanza",
     issue: "welfare",
     randomiseGroup: 0,
     debate: "welfare-1",
     answers: {
       yes: [
         {
           label: "è una priorità assoluta",
           opinion: "1"
          },
         {
           label: "con obbligo di servizio civile per i recipienti",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "solo per chi e' in condizioni di poverta ",
           opinion: "0.4"
          },
         {
           label: "però bisogna introdurre sostegni ai salari come il salario minimo",
           opinion: "0.2"
          }
        ]
      }
   }
   ,
  {
     question: "Bisogna ridurre le tasse per tutti i livelli di reddito",
     issue: "tasse",
     randomiseGroup: 0,
     debate: "tasse-1",
     answers: {
       yes: [
         {
           label: "anche per le aziende",
           opinion: "1"
          },
         {
           label: "con l'introduzione di un'aliquota unica e esenzione dalle tasse per redditi bassi",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "solo per i redditi piu bassi e aumentare le tasse per i redditi piu alti",
           opinion: "0"
          },
         {
           label: "solo per i redditi piu bassi e anche per le imprese",
           opinion: "0"
          }
        ]
      }
   }
   ,
  {
     question: "E' necessario bloccare lo sbarco di migranti nel nostro paese",
     issue: "immigrazione",
     randomiseGroup: 0,
     debate: "immigrazione-1",
     answers: {
       yes: [
         {
           label: "e bisogna espellere tutti gli immigrati clandestini",
           opinion: "1"
          },
         {
           label: "ma dobbiamo anche aiutare i paesi d'origine a gestire le crisi di migranti",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "ma è necessario gestire il problema a livello Europeo",
           opinion: "0.2"
          },
         {
           label: "bisogna attuare politiche sociale e economiche per favorire l'integrazione degli immigrati",
           opinion: "0.4"
          }
        ]
      }
   }
   ,
  {
     question: "È cittadino italiano anche chi è nato in Italia da genitori stranieri",
     issue: "immigrazione",
     randomiseGroup: 0,
     debate: "immigrazione-2",
     answers: {
       yes: [
         {
           label: "ma solo se ha completato un ciclo di studi in Italia",
           opinion: "0.8"
          },
         {
           label: "anche chi non è nato inItalia ma ci è arrivato da piccolo e ha compiuto un ciclo di studi in Italia",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "la cittadinanza non può essere regalata",
           opinion: "0"
          },
         {
           label: "\"ma può diventarlo",
           opinion: "1"
          }
        ]
      }
   }
   ,
  {
     question: "L'Europa deve evolvere verso un'Unione fiscale e sociale",
     issue: "EU",
     randomiseGroup: 0,
     debate: "eu-1",
     answers: {
       yes: [
         {
           label: "con l'obiettivo di fondare gli Stati Uniti d'Europa",
           opinion: "1"
          },
         {
           label: "però dobbiamo porre fine alle politiche di austerity che bloccano la crescita",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "la nostra Costituzione deve prevalere sul diritto comunitario",
           opinion: "0"
          },
         {
           label: "peroò dobbiamo collaborare in più ambiti con l'Unione Europea",
           opinion: "0.4"
          }
        ]
      }
   }
   ,
  {
     question: "L'età pensionabile deve essere ridotta",
     issue: "Welfare",
     randomiseGroup: 0,
     debate: "welfare-2",
     answers: {
       yes: [
         {
           label: "tramite le pensioni anticipate per chi ha lavorato per tanti anni",
           opinion: "1"
          },
         {
           label: "per tutti i cittadini",
           opinion: "0.6"
          }
        ],
      no: [
         {
           label: "bisogna invece ridurre il peso delle vecchie pensioni retributive su quelle contributive",
           opinion: "0"
          },
         {
           label: "\"però bisogna garantire delle pensioni minime",
           opinion: "1"
          }
        ]
      }
   }
   ,
  {
     question: "La sanità pubblica necessita di più investimenti statali",
     issue: "Salute",
     randomiseGroup: 0,
     debate: "salute-1",
     answers: {
       yes: [
         {
           label: "e allo stesso tempo aumentarne l'efficienza tramite digitalizzazione del sistema",
           opinion: "1"
          },
         {
           label: "e superare il sistema dei ticket che costano più delle prestazioni",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "è necessario favorire la competizione con il settore privato a parità di standard di prestazioni tramite incentivi statali",
           opinion: "0"
          },
         {
           label: "però bisogna concentrare i fondi sulla cura di cronicità e disabilità",
           opinion: "0.4"
          }
        ]
      }
   }
   ,
  {
     question: "L'Italia deve ridurre le spese militari e iniziare una politica di disarmo",
     issue: "Sicurezza",
     randomiseGroup: 0,
     debate: "sicurezza-1",
     answers: {
       yes: [
         {
           label: "e ritirare le truppe impegnate in missioni all'estero",
           opinion: "1"
          },
         {
           label: "ma in favore dell'introduzione delle Forze Armate dell'Unione Europea",
           opinion: "0.6"
          }
        ],
      no: [
         {
           label: "bisogna investire di piu nelle Forze Armate e impiegarle per la sicurezza delle citta",
           opinion: "0"
          },
         {
           label: "peró bisogna investire in Polizia e Carabinieri per garantire sicurezza ai cittadini",
           opinion: "0.4"
          }
        ]
      }
   }
   ,
  {
     question: "L'Articolo 18 va ripristinato per la tutela del lavoro e per incentivare le assunzioni a tempo indeterminato",
     issue: "Lavoro",
     randomiseGroup: 0,
     debate: "lavoro-1",
     answers: {
       yes: [
         {
           label: "perchè l'Italia è una Repubblica fondata sul lavoro",
           opinion: "1"
          },
         {
           label: "ma deve essere affiancato da un contratto a tutele crescenti",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "l'obiettivo del governo deve essere la piena occupazione senza distinzione sulla forma dell'impiego",
           opinion: "0"
          },
         {
           label: "ma servono più incentivi ad assumere a tempo indeterminato per diminuire il numero di precari",
           opinion: "0.2"
          }
        ]
      }
   }
   ,
  {
     question: "Le imposte indirette (IVA) e su patrimoni vanno diminuite",
     issue: "Tasse",
     randomiseGroup: 0,
     debate: "tasse-2",
     answers: {
       yes: [
         {
           label: "bisogna anche eliminare imposte su donazioni, successioni, prima casa e risparmi",
           opinion: "1"
          },
         {
           label: "vanno aumentate per rendere il sistema fiscale più equo",
           opinion: "0.6"
          }
        ],
      no: [
         {
           label: "ma bisogna prima focalizzare gli sforzi sulla lotta all'evasione prima di ridurre le imposte",
           opinion: "0"
          },
         {
           label: "ma bisogna sostituire le imposte uniche con valori crescenti in base all'ammontare della transazione",
           opinion: "0.2"
          }
        ]
      }
   }
   ,
  {
     question: "La riforma della buona scuola va abolita",
     issue: "Educazione",
     randomiseGroup: 0,
     debate: "educazione-1",
     answers: {
       yes: [
         {
           label: "e introdurre incentivi per favorire la competizione pubblico-privato a parità di standard",
           opinion: "1"
          },
         {
           label: "e stabilizzare il precariato degli insegnanti che ha causato tramite un piano di assunzioni",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "ma vanno aumentati i posti di lavoro a tempo pieno al Sud per ridurre il precariato attuale",
           opinion: "0.2"
          },
         {
           label: "ma è necessario monitorarne l'efficacia e intervenire sulle criticità",
           opinion: "0"
          }
        ]
      }
   }
   ,
  {
     question: "\"Bisogna accellerare la transizione energetica",
     issue: " riducendo l'uso dei combustibili fossili.\"",
     randomiseGroup: 0,
     debate: "ambiente-1",
     answers: {
       yes: [
         {
           label: "e ottenendo il 100% dell'energia da fonti rinnovabili entro il 2025",
           opinion: "1"
          },
         {
           label: "e ottenendo il 100% dell'energia da fonti rinnovabili entro il 2050",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "ma bisogna dedicare risorse all'efficientamento energetico e allo sviluppo di energie rinnovabili",
           opinion: "0"
          },
         {
           label: "l'importante è l'indipendenza da altri paesi per soddisfare il fabbisogno energetico",
           opinion: "1"
          }
        ]
      }
   }
 ];
