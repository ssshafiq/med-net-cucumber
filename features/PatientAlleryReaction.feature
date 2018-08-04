Feature: PatientAllergyReaction

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants
        """
        [
        {"$class":"mtbc.med.net.Patient", "patientId":"PAI001","medsHash":[],"dateTime":"7/2/2018"},
        {"$class":"mtbc.med.net.Provider", "providerId":"PRI001"}
        ]
        """
        And I have added the following asset of type mtbc.med.net.Visit
        """
        [
            {"$class": "mtbc.med.net.Visit","visitId": "V001","patient": {"$class": "mtbc.med.net.Patient","patientId": "PAI001","medsHash": [],"dateTime": "2018-07-02T06:46:59.753Z"},"provider": {"$class": "mtbc.med.net.Provider","providerId": "PRI001"}}
        ]
        """
    
Scenario: Testing when new allergy added to patient when not already exist

    When I submit the following transaction of type mtbc.med.net.transaction.Contact
        """
        [
        {
            "$class": "mtbc.med.net.transaction.Contact",
            "visit": {
            "$class": "mtbc.med.net.Visit",
            "visitId": "V001",
            "patient": {
            "$class": "mtbc.med.net.Patient",
            "patientId": "PAI001",
            "medsHash": [],
            "dateTime": "2018-07-02T06:57:41.448Z"
            },
            "provider": {
            "$class": "mtbc.med.net.Provider",
            "providerId": "PRI001"
            },
			"patientAllergyList":[ 
                {
			      "$class": "mtbc.med.net.patientAllergy.PatientAllergy",
				  "patientAllergyId": "AL001.",
				  "patientAllergyHash": "HASH",
                  "patient": "resource:mtbc.med.net.Patient#PAI001"
				}
            ],
            "patientReactionList":[ 
                {
			      "$class": "mtbc.med.net.patientAllergy.PatientReaction",
				  "patientReactionId": "R001.",
				  "patientReactionHash": "HASH",
                  "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
				}
            ]

            },
            "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
            "timestamp": "2018-07-02T06:58:09.432Z"
        }

        ]
        """

    Then I should have the following asset
    """
    [
      {
        "$class": "mtbc.med.net.patientAllergy.PatientReaction",
        "patientReactionId": "R001.",
        "patientReactionHash": "HASH",
        "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
      }
    ]
    """
    Scenario: Testing when a patient allergy record already exist
        And I have added the following asset of type mtbc.med.net.Patient_Provider_Relation
            """
            [
                {
                "$class": "mtbc.med.net.Patient_Provider_Relation",
                "pprId": "1",
                "patient": "resource:mtbc.med.net.Patient#001",
                "provider": "resource:mtbc.med.net.Provider#001",
                "permission": "READ_WRITE"
                }
            ]
            """
        When I submit the following transaction of type mtbc.med.net.transaction.Contact
            """
            [
            {
                "$class": "mtbc.med.net.transaction.Contact",
                "visit": {
                "$class": "mtbc.med.net.Visit",
                "visitId": "V001",
                "patient": {
                "$class": "mtbc.med.net.Patient",
                "patientId": "PAI001",
                "medsHash": [],
                "dateTime": "2018-07-02T06:57:41.448Z"
                },
                "provider": {
                "$class": "mtbc.med.net.Provider",
                "providerId": "PRI001"
                },
    			"patientAllergyList":[ 
                {
			      "$class": "mtbc.med.net.patientAllergy.PatientAllergy",
				  "patientAllergyId": "AL001.",
				  "patientAllergyHash": "HASH",
                  "patient": "resource:mtbc.med.net.Patient#PAI001"
				}
                ],
                "patientReactionList":[ 
                {
			      "$class": "mtbc.med.net.patientAllergy.PatientReaction",
				  "patientReactionId": "R001.",
				  "patientReactionHash": "HASH",
                  "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
				}
               ]

                },
                "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
                "timestamp": "2018-07-02T06:58:09.432Z"
            }

            ]
            """
        And I submit the following transaction of type mtbc.med.net.transaction.Contact
            """
            [
            {
                "$class": "mtbc.med.net.transaction.Contact",
                "visit": {
                "$class": "mtbc.med.net.Visit",
                "visitId": "V001",
                "patient": {
                "$class": "mtbc.med.net.Patient",
                "patientId": "PAI001",
                "medsHash": [],
                "dateTime": "2018-07-02T06:57:41.448Z"
                },
                "provider": {
                "$class": "mtbc.med.net.Provider",
                "providerId": "PRI001"
                },
    			"patientAllergyList":[ 
                {
			      "$class": "mtbc.med.net.patientAllergy.PatientAllergy",
				  "patientAllergyId": "AL001.",
				  "patientAllergyHash": "HASH",
                  "patient": "resource:mtbc.med.net.Patient#PAI001"
				}
                ],
                "patientReactionList":[ 
                    {
                        "$class": "mtbc.med.net.patientAllergy.PatientReaction",
                        "patientReactionId": "R001.",
                        "patientReactionHash": "HASH",
                        "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
                    },
                    {
                        "$class": "mtbc.med.net.patientAllergy.PatientReaction",
                        "patientReactionId": "R002.",
                        "patientReactionHash": "HASH",
                        "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
                    }
                ]

                },
                "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
                "timestamp": "2018-07-02T06:58:09.432Z"
            }

            ]
            """
        Then I should have the following asset
        """
        [
            {
            "$class": "mtbc.med.net.patientAllergy.PatientReaction",
            "patientReactionId": "R001.",
            "patientReactionHash": "HASH",
            "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
            },
            {
            "$class": "mtbc.med.net.patientAllergy.PatientReaction",
            "patientReactionId": "R002.",
            "patientReactionHash": "HASH",
            "PatientAllergy": "mtbc.med.net.patientAllergy.PatientAllergy#AL001"
            }
        ]
        """