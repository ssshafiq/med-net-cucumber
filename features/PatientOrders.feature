Feature: PatientOrders

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
     Scenario: When the Provider add Patient Orders when patient order not already exist
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
                    "visitId": "8672",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1554",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "0483",
                        "primarykey": "Est est.",
                        "medsHash": "Non nostrud.",
                        "visit": "resource:mtbc.med.net.Visit#7681"
                        }
                    ],
                    "dateTime": "2018-08-03T06:50:01.123Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "4711"
                    },
                    "patientOrder": {
                    "$class": "mtbc.med.net.patientOrders.PatientOrder",
                    "patientOrderId": "0060",
                    "patientOrderHash": "Nisi elit ad reprehenderit aliquip.",
                    "patient": "resource:mtbc.med.net.Patient#1554",
                    "provider": "resource:mtbc.med.net.Provider#4711"
                    },
                    "patientOrderTestList": [
                    {
                        "$class": "mtbc.med.net.patientOrders.PatientOrderTest",
                        "patientOrderTestId": "5984",
                        "patientOrderTestHash": "Aliquip amet eiusmod deserunt.",
                        "patientOrder": "resource:mtbc.med.net.patientOrders.PatientOrder#0060"
                    }
                    ],
                    "patientOrderDiagnosisList": [
                    {
                        "$class": "mtbc.med.net.patientOrders.PatientOrderDiagnosis",
                        "patientOrderDiagnosisId": "2982",
                        "patientOrderDiagnosHash": "Id aliqua id.",
                        "patientOrder": "resource:mtbc.med.net.patientOrders.PatientOrder#0060"
                    }
                    ],
                    "patientOrderSpecimenList": [
                    {
                        "$class": "mtbc.med.net.patientOrders.PatientOrderSpecimen",
                        "patientOrderSpecimenId": "5984",
                        "patientOrderSpecimenHash": "Ea enim enim.",
                        "patientOrderTest": "resource:mtbc.med.net.patientOrders.PatientOrderTest#5222"
                    }
                    ],
                    "patientOrderQuestionList": [
                    {
                        "$class": "mtbc.med.net.patientOrders.PatientOrderQuestion",
                        "patientOrderQuestionId": "4184",
                        "patientOrderQuestionHash": "Qui duis.",
                        "patientOrderTest": "resource:mtbc.med.net.patientOrders.PatientOrderTest#5984"
                    }
                    ]
                    },
                    "transactionId": "c088bb11-dd25-4048-950b-e9f6572f9cfd",
                    "timestamp": "2018-08-03T06:50:37.339Z"
                    }
            ]
            """
        Then I should have the following asset
        """
        [
           { 
               
            "$class": "mtbc.med.net.patientOrders.PatientOrder",
            "patientOrderId": "0060",
            "patientOrderHash": "Nisi elit ad reprehenderit aliquip.",
            "patient": "resource:mtbc.med.net.Patient#1554",
            "provider": "resource:mtbc.med.net.Provider#4711"
                    
            }
        ]
        """
        Scenario: TEST UPDATING A EXISTING PATIENT ORDER TEST
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
                    "visitId": "8672",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1554",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "0483",
                        "primarykey": "Est est.",
                        "medsHash": "Non nostrud.",
                        "visit": "resource:mtbc.med.net.Visit#7681"
                        }
                    ],
                    "dateTime": "2018-08-03T06:50:01.123Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "4711"
                    },
                    "patientOrder": {
                    "$class": "mtbc.med.net.patientOrders.PatientOrder",
                    "patientOrderId": "0060",
                    "patientOrderHash": "Nisi elit ad reprehenderit aliquip.",
                    "patient": "resource:mtbc.med.net.Patient#1554",
                    "provider": "resource:mtbc.med.net.Provider#4711"
                    }
                    },
                    "transactionId": "c088bb11-dd25-4048-950b-e9f6572f9cfd",
                    "timestamp": "2018-08-03T06:50:37.339Z"
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
                    "visitId": "8672",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "1554",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "0483",
                        "primarykey": "Est est.",
                        "medsHash": "Non nostrud.",
                        "visit": "resource:mtbc.med.net.Visit#7681"
                        }
                    ],
                    "dateTime": "2018-08-03T06:50:01.123Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "4711"
                    },
                    "patientOrder": {
                    "$class": "mtbc.med.net.patientOrders.PatientOrder",
                    "patientOrderId": "0060",
                    "patientOrderHash": "!!!UPDATING PATIENT ORDER HASH!!!",
                    "patient": "resource:mtbc.med.net.Patient#1554",
                    "provider": "resource:mtbc.med.net.Provider#4711"
                    }
                    },
                    "transactionId": "c088bb11-dd25-4048-950b-e9f6572f9cfd",
                    "timestamp": "2018-08-03T06:50:37.339Z"
                    }
            ]
            """
        Then I should have the following asset
        """
        [
           { 
               
            "$class": "mtbc.med.net.patientOrders.PatientOrder",
            "patientOrderId": "0060",
            "patientOrderHash": "!!!UPDATING PATIENT ORDER HASH!!!",
            "patient": "resource:mtbc.med.net.Patient#1554",
            "provider": "resource:mtbc.med.net.Provider#4711"
                    
            }
        ]
        """
