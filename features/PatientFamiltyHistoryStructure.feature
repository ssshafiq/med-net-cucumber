Feature: PatientFamiltyHistoryStructure

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
     Scenario: When the Provider add Patient Immunization and Immunization not already exist
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
                        "visitId": "5581",
                        "patient": {
                        "$class": "mtbc.med.net.Patient",
                        "patientId": "6648",
                        "medsHash": [
                            {
                            "$class": "mtbc.med.net.MedsHash",
                            "Id": "1180",
                            "primarykey": "Sit.",
                            "medsHash": "Minim sunt id pariatur.",
                            "visit": "resource:mtbc.med.net.Visit#3562"
                            }
                        ],
                        "dateTime": "2018-07-30T14:16:17.200Z"
                        },
                        "provider": {
                        "$class": "mtbc.med.net.Provider",
                        "providerId": "4633"
                        },
                        "patientFamiltyHistoryStructure": {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "001",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
                        }
                      }
             }

            ]
            """
        Then I should have the following asset
        """
        [
           {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "001",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
             }
        ]
        """

    Scenario: When patient family history structure already exist in blokchian
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
                        "visitId": "5581",
                        "patient": {
                        "$class": "mtbc.med.net.Patient",
                        "patientId": "6648",
                        "medsHash": [
                            {
                            "$class": "mtbc.med.net.MedsHash",
                            "Id": "1180",
                            "primarykey": "Sit.",
                            "medsHash": "Minim sunt id pariatur.",
                            "visit": "resource:mtbc.med.net.Visit#3562"
                            }
                        ],
                        "dateTime": "2018-07-30T14:16:17.200Z"
                        },
                        "provider": {
                        "$class": "mtbc.med.net.Provider",
                        "providerId": "4633"
                        },
                        "patientFamiltyHistoryStructure": {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "001",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
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
                        "visitId": "5581",
                        "patient": {
                        "$class": "mtbc.med.net.Patient",
                        "patientId": "6648",
                        "medsHash": [
                            {
                            "$class": "mtbc.med.net.MedsHash",
                            "Id": "1180",
                            "primarykey": "Sit.",
                            "medsHash": "Minim sunt id pariatur.",
                            "visit": "resource:mtbc.med.net.Visit#3562"
                            }
                        ],
                        "dateTime": "2018-07-30T14:16:17.200Z"
                        },
                        "provider": {
                        "$class": "mtbc.med.net.Provider",
                        "providerId": "4633"
                        },
                        "patientFamiltyHistoryStructure": {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "002",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
                        }
                    }
                    }

            ]
            """
        Then I should have the following asset
        """
        [
                      {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "001",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
                        },
                        {
                        "$class": "mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure",
                         "patientFamiltyHistoryStructureId": "002",
                         "patientFamiltyHistoryStructureHash": "HASH",
                         "patient": "resource:mtbc.med.net.Patient#6648"
                        }
        ]
        """
