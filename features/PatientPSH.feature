Feature: PatientPSH

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
                    "visitId": "3000",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "0460",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "6852",
                        "primarykey": "Aliquip occaecat.",
                        "medsHash": "Excepteur ullamco amet.",
                        "visit": "resource:mtbc.med.net.Visit#6358"
                        }
                    ],
                    "dateTime": "2018-07-31T08:05:35.901Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "8618"
                    },
                    "patientPSH": {
                    "$class": "mtbc.med.net.patientPSH.PatientPSH",
                    "patientId": "0460",
                    "patientPSHhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4676",
                        "patientPSHhash": "Enim irure mollit id enim."
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
                  
                 "$class": "mtbc.med.net.patientPSH.PatientPSH",
                    "patientId": "0460",
                    "patientPSHhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4676",
                        "patientPSHhash": "Enim irure mollit id enim."
                        }
                    ]
            }
        ]
        """
       Scenario: When Patient surgical history alrady exist and updating hash
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
                    "visitId": "3000",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "0460",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "6852",
                        "primarykey": "Aliquip occaecat.",
                        "medsHash": "Excepteur ullamco amet.",
                        "visit": "resource:mtbc.med.net.Visit#6358"
                        }
                    ],
                    "dateTime": "2018-07-31T08:05:35.901Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "8618"
                    },
                    "patientPSH": {
                    "$class": "mtbc.med.net.patientPSH.PatientPSH",
                    "patientId": "0460",
                    "patientPSHhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4676",
                        "patientPSHhash": "!!!!UPDATING HASH!!!"
                        },
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4677",
                        "patientPSHhash": "Enim irure mollit id enim."
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
                  
                 "$class": "mtbc.med.net.patientPSH.PatientPSH",
                    "patientId": "0460",
                    "patientPSHhashs": [
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4676",
                        "patientPSHhash": "!!!!UPDATING HASH!!!"
                        },
                        {
                        "$class": "mtbc.med.net.patientPSH.PatientPSHhash",
                        "patientPSHId": "4677",
                        "patientPSHhash": "Enim irure mollit id enim."
                        }
                    ]
            }
        ]
        """
  