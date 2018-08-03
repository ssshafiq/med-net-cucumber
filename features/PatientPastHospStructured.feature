Feature: PatientPastHosp

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
     Scenario: When the Provider add Patient Past Hosptilizaiton
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
                    "visitId": "2133",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "8928",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "3466",
                        "primarykey": "Pariatur dolore ipsum labore id.",
                        "medsHash": "Occaecat.",
                        "visit": "resource:mtbc.med.net.Visit#4446"
                        }
                    ],
                    "dateTime": "2018-08-01T06:41:34.148Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "8127"
                    },
                    "patientPastHosp": {
                    "$class": "mtbc.med.net.patientPastHosp.PatientPastHosp",
                    "patientId": "8928",
                    "patientPastHosphashs": [
                        {
                        "$class": "mtbc.med.net.patientPastHosp.PatientPastHosphash",
                        "patientPastHospId": "5189",
                        "patientPastHosphash": "Reprehenderit fugiat sunt deserunt."
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
                "$class": "mtbc.med.net.patientPastHosp.PatientPastHosp",
                    "patientId": "8928",
                    "patientPastHosphashs": [
                        {
                        "$class": "mtbc.med.net.patientPastHosp.PatientPastHosphash",
                        "patientPastHospId": "5189",
                        "patientPastHosphash": "Reprehenderit fugiat sunt deserunt."
                        }
                    ]
            }
        ]
        """
    