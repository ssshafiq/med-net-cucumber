Feature: patientImmunization

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
                    "visitId": "2281",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "3684",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2665",
                        "primarykey": "Tempor commodo deserunt quis ad.",
                        "medsHash": "Incididunt.",
                        "visit": "resource:mtbc.med.net.Visit#3922",
                        "dateTime": "2018-07-26T10:42:13.505Z"
                        }
                    ],
                    "dateTime": "2018-07-26T10:42:11.299Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "1599"
                    },
                    "patientImmunizationlist": [{
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0001",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    }
                    ]
                }
            }

            ]
            """
        Then I should have the following asset
        """
        [
           {
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0001",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
            }
        ]
        """

     Scenario: When the provider add Patient Immunization and Immunization  already exist
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
                    "visitId": "2281",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "3684",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2665",
                        "primarykey": "Tempor commodo deserunt quis ad.",
                        "medsHash": "Incididunt.",
                        "visit": "resource:mtbc.med.net.Visit#3922",
                        "dateTime": "2018-07-26T10:42:13.505Z"
                        }
                    ],
                    "dateTime": "2018-07-26T10:42:11.299Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "1599"
                    },
                     "patientImmunizationlist": [{
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0001",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    }
                ]
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
                    "visitId": "2281",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "3684",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2665",
                        "primarykey": "Tempor commodo deserunt quis ad.",
                        "medsHash": "Incididunt.",
                        "visit": "resource:mtbc.med.net.Visit#3922",
                        "dateTime": "2018-07-26T10:42:13.505Z"
                        }
                    ],
                    "dateTime": "2018-07-26T10:42:11.299Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "1599"
                    },
                    "patientImmunizationlist": [{
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0001",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    },
                    {
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0002",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    }
                ]
                }
                }

            ]
            """
        Then I should have the following asset
        """
        [
                    {
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0001",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    },
                    {
                    "$class": "mtbc.med.net.patientImmunization.PatientImmunization",
                    "patientImmunizationId": "0002",
                    "patientImmunizationHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#3684"
                    }
        ]
        """