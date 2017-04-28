var partyStances = {
	opinions: {
      issues: {
        "brexit": {
					description: "Brexit",
          debates: {
            "brexit-level": {
							description: "what sort of Brexit we should have",
              parties: {
                "conservative": {
                  opinion: 1,
									description: "The Conservative Government is negotiating for a hard Brexit.",
                }, "labour": {
                  opinion: 0.7,
                }, "lib-dem": {
                  opinion: 0.5
                }, "ukip": {
                  opinion: 1
                }, "snp": {
                  opinion: 0.2
                }, "green": {
                  opinion: 0.5
                }, "plaid-cymru": {
                  opinion: 0.5
                }
              }
            },
            "mp-vote": {
							description: "whether to give MPs a vote on the Brexit terms",
              parties: {
                "conservative": {
                  opinion: 0
                }, "labour": {
                  opinion: 0.5
                }, "conservative": {
                  opinion: 1
                }, "ukip": {
                  opinion: 0
                }, "snp": {
                  opinion: 1
                }, "green": {
                  opinion: 1
                }, "plaid-cymru": {
                  opinion: 0.5
                }
              }
            }
          }
        },
        "health": {

        }
      }
    }
}
