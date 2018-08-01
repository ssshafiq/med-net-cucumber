Feature: PatientPSHstructured

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
     Scenario: When the Provider add Patient Past Surgical history
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
                    "visitId": "9094",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1095",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "8256",
                        "primarykey": "Est.",
                        "medsHash": "In ea tempor sit Lorem.",
                        "visit": "resource:mtbc.med.net.Visit#1835"
                        }
                    ],
                    "dateTime": "2018-07-31T12:59:46.079Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0619"
                    },
                    "patientPSHStructued": {
                    "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructued",
                    "patientId": "1095",
                    "patientPSHStructuredhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2452",
                        "patientPSHStructuredhash": "Sint esse non."
                        }
                    ]
                    }
                }
                }
            ]
            """
        Then I should have the following asset
        """
        [
           {
                 "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructued",
                    "patientId": "1095",
                    "patientPSHStructuredhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2452",
                        "patientPSHStructuredhash": "Sint esse non."
                        }
                    ]
            }
        ]
        """
     Scenario: When the Provider add Patient Past Surgical history and PSH alrady exist and updating prvious hash
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
                    "visitId": "9094",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1095",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "8256",
                        "primarykey": "Est.",
                        "medsHash": "In ea tempor sit Lorem.",
                        "visit": "resource:mtbc.med.net.Visit#1835"
                        }
                    ],
                    "dateTime": "2018-07-31T12:59:46.079Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0619"
                    },
                    "patientPSHStructued": {
                    "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructued",
                    "patientId": "1095",
                    "patientPSHStructuredhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2452",
                        "patientPSHStructuredhash": "Sint esse non."
                        }
                    ]
                    }
                }
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
                    "visitId": "9094",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1095",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "8256",
                        "primarykey": "Est.",
                        "medsHash": "In ea tempor sit Lorem.",
                        "visit": "resource:mtbc.med.net.Visit#1835"
                        }
                    ],
                    "dateTime": "2018-07-31T12:59:46.079Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0619"
                    },
                    "patientPSHStructued": {
                    "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructued",
                    "patientId": "1095",
                    "patientPSHStructuredhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2452",
                        "patientPSHStructuredhash": "!!!UPDATING HASH!!!"
                        },
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2453",
                        "patientPSHStructuredhash": "Sint esse non."
                        },
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2454",
                        "patientPSHStructuredhash": "Sint esse non."
                        }
                    ]
                    }
                }
                }
            ]
            """
        Then I should have the following asset
        """
        [
           {
                 "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructued",
                    "patientId": "1095",
                    "patientPSHStructuredhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2452",
                        "patientPSHStructuredhash": "!!!UPDATING HASH!!!"
                        },
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2453",
                        "patientPSHStructuredhash": "Sint esse non."
                        },
                        {
                        "$class": "mtbc.med.net.patientPSHStructued.PatientPSHStructuredhash",
                        "patientPSHStructuredId": "2454",
                        "patientPSHStructuredhash": "Sint esse non."
                        }
                    ]
            }
        ]
        """
