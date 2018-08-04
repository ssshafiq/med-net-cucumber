Feature: PatientPMHDiagnosis

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
     Scenario: When the Provider add Patient Past Medical History
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
                    "visitId": "0166",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "8676",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2452",
                        "primarykey": "Tempor in dolore.",
                        "medsHash": "Occaecat esse et pariatur magna.",
                        "visit": "resource:mtbc.med.net.Visit#7421"
                        }
                    ],
                    "dateTime": "2018-07-30T09:26:30.645Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0327"
                    },
                    "patientPMH_DiagnosisList":
                    [
                    {
                    "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
                    "patientPMHDiagnosisId": "001",
                    "patientPMH_DiagnosisHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#8676" 
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
                    "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
                    "patientPMHDiagnosisId": "001",
                    "patientPMH_DiagnosisHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#8676" 
            }
        ]
        """


        Scenario: When provider update patient family history structure alrady exist mutiple tranactions
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
                    "visitId": "0166",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "8676",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2452",
                        "primarykey": "Tempor in dolore.",
                        "medsHash": "Dolore.",
                        "visit": "resource:mtbc.med.net.Visit#7421"
                        }
                    ],
                    "dateTime": "2018-07-30T09:26:30.645Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0327"
                    },
                     "patientPMH_DiagnosisList":
                    [
                    {
                    "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
                    "patientPMHDiagnosisId": "001",
                    "patientPMH_DiagnosisHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#8676" 
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
                    "visitId": "0166",
                    "patient": {
                    "$class": "mtbc.med.net.Patient",
                    "patientId": "8676",
                    "medsHash": [
                        {
                        "$class": "mtbc.med.net.MedsHash",
                        "Id": "2452",
                        "primarykey": "Tempor in dolore.",
                        "medsHash": "Dolore.",
                        "visit": "resource:mtbc.med.net.Visit#7421"
                        }
                    ],
                    "dateTime": "2018-07-30T09:26:30.645Z"
                    },
                    "provider": {
                    "$class": "mtbc.med.net.Provider",
                    "providerId": "0327"
                    },
                    "patientPMH_DiagnosisList":
                    [
                    {
                    "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
                    "patientPMHDiagnosisId": "001",
                    "patientPMH_DiagnosisHash": "CHANGED",
                    "patient": "resource:mtbc.med.net.Patient#8676" 
                    },
                    {
                    "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
                    "patientPMHDiagnosisId": "002",
                    "patientPMH_DiagnosisHash": "HASH",
                    "patient": "resource:mtbc.med.net.Patient#8676" 
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
            "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
            "patientPMHDiagnosisId": "001",
            "patientPMH_DiagnosisHash": "CHANGED",
            "patient": "resource:mtbc.med.net.Patient#8676" 
            },
            {
            "$class": "mtbc.med.net.patientPMH.PatientPMH_Diagnosis",
            "patientPMHDiagnosisId": "002",
            "patientPMH_DiagnosisHash": "HASH",
            "patient": "resource:mtbc.med.net.Patient#8676" 
            }
        ]
        """