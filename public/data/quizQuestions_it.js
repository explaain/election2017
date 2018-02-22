module.exports = {
  getData: function () {
    return quizQuestions;
  }
};

var quizQuestions = [
  {
     question: "Tutti i cittadini hanno diritto ad un reddito di cittadinanza",
     issue: "Welfare",
     randomiseGroup: 0,
     debate: "welfare-1",
     answers: {
       yes: [
         {
           label: "è una priorità assoluta",
           opinion: "1"
          },
         {
           label: "ma solo se in una situazione di disoccupazione temporale",
           opinion: "0.6"
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
     question: "Bisogna introdurre un'aliquota IRPEF unica (23%) per tutti i livelli di reddito",
     issue: "Tasse",
     randomiseGroup: 0,
     debate: "tasse-1",
     answers: {
       yes: [
         {
           label: "anche per IRES e IRAP (imposte su aziende)",
           opinion: "1"
          },
         {
           label: "e esenzione dalle tasse per redditi bassi",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "però bisogna ridurre tutte le aliquote e introdurre esenzione dalle tasse per redditi bassi",
           opinion: "0.4"
          },
         {
           label: "però bisogna ridurre le aliquote principalmente per redditi bassi",
           opinion: "0"
          }
        ]
      }
   }
   ,
  {
     question: "E' necessario bloccare lo sbarco di migranti nel nostro paese",
     issue: "Immigrazione",
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
     issue: "Immigrazione",
     randomiseGroup: 0,
     debate: "immigrazione-2",
     answers: {
       yes: [
         {
           label: "ma solo se ha completato un ciclo di studi in Italia",
           opinion: "0.8"
          },
         {
           label: "anche chi non è nato in Italia ma ci è arrivato da piccolo e ha compiuto un ciclo di studi in Italia",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "la cittadinanza non può essere regalata",
           opinion: "0"
          },
         {
           label: "ma può diventarlo, se maggiorenne e dopo aver compiuto studi in Italia",
           opinion: "0.2"
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
           label: "ma l'Italia deve contare di più in Europa, svolgendo un ruolo più incisivo in quello che si decide nelle istituzioni europee",
           opinion: "0.4"
          }
        ]
      }
   }
   ,
  {
     question: "Bisogna prevedere la possibilità di andare in pensione prima dei 67 anni",
     issue: "Welfare",
     randomiseGroup: 0,
     debate: "welfare-2",
     answers: {
       yes: [
         {
           label: "in base al carico di gravosità del lavoro svolto",
           opinion: "0.8"
          },
         {
           label: "in base al numero di anni di contributi versati",
           opinion: "1"
          }
        ],
      no: [
         {
           label: "la priorità è ridurre il sussidio fiscale implicito nelle pensioni retributive più alte",
           opinion: "0"
          },
         {
           label: "ma bisogna introdurre pensioni contributive di garanzia per i giovani precari",
           opinion: "0.2"
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
     question: "Le aziende devono essere flessibili nell'assumere e licenziare i dipendenti",
     issue: "Lavoro",
     randomiseGroup: 0,
     debate: "lavoro-1",
     answers: {
       yes: [
         {
           label: "e bisogna anche il ridurre il costo del lavoro per stimolare le assunzioni",
           opinion: "1"
          },
         {
           label: "ma bisogna realizzare un mercato del lavoro Europeo, inclusivo di sussidi comunitari",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "la priorità è la protezione del lavoro a tempo indeterminato a piene tutele, con il ripristino dell'Articolo 18",
           opinion: "0"
          },
         {
           label: "ma bisogna prevedere incentivi per le aziende ad assumere a tempo indeterminato ",
           opinion: "0.2"
          }
        ]
      }
   }
   ,
  {
     question: "Le imposte indirette e sui patrimoni vanno diminuite per tutti",
     issue: "Tasse",
     randomiseGroup: 0,
     debate: "tasse-2",
     answers: {
       yes: [
         {
           label: "bisogna eliminare imposte su donazioni, successioni, prima casa e risparmi",
           opinion: "1"
          },
         {
           label: "ma bisogna prima focalizzare gli sforzi sulla lotta all'evasione prima di ridurre le imposte",
           opinion: "0.6"
          }
        ],
      no: [
         {
           label: "vanno aumentate per rendere il sistema fiscale più equo",
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
     question: "La riforma della Buona Scuola va abolita",
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
     question: "La lotta contro i rischi del cambiamento climatico è una priorità",
     issue: "Ambiente",
     randomiseGroup: 0,
     debate: "ambiente-1",
     answers: {
       yes: [
         {
           label: "anche tramite l'introduzione di una carbon tax e di politiche di riciclo rifiuti",
           opinion: "1"
          },
         {
           label: "mantenendo gli impegni presi negli Accordi di Parigi",
           opinion: "0.8"
          }
        ],
      no: [
         {
           label: "ma bisogna dedicare risorse all'efficientamento energetico e allo sviluppo di energie rinnovabili",
           opinion: "0.2"
          },
         {
           label: "l'importante è l'indipendenza da altri paesi per soddisfare il fabbisogno energetico",
           opinion: "0"
          }
        ]
      }
   }
 ];
