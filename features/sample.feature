#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

Feature: Sample

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

    # Scenario: When the Patient contact with Provider 
    # When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #     """
    #     [
    #         {
    #         "$class": "mtbc.med.net.transaction.Contact",
    #         "visit": {
    #         "$class": "mtbc.med.net.Visit",
    #         "visitId": "V001",
    #         "patient": {
    #         "$class": "mtbc.med.net.Patient",
    #         "patientId": "PAI001",
    #         "medsHash": [],
    #         "dateTime": "2018-07-02T06:57:41.448Z"
    #         },
    #         "provider": {
    #         "$class": "mtbc.med.net.Provider",
    #         "providerId": "PRI001"
    #         }
    #         },
    #         "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
    #         "timestamp": "2018-07-02T06:58:09.432Z"
    #         }
    #     ]
    #     """
    
    # Then I should have the following participants
    # """
    # [
    # {"$class":"mtbc.med.net.Patient", "patientId":"PAI001","medsHash":[],"dateTime":"7/2/2018"},
    # {"$class":"mtbc.med.net.Provider", "providerId":"PRI001"}
    # ]
    # """
    #  Scenario: When the Patient contact with Provider and Patient does not already exist
    # When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #     """
    #     [
    #         {
    #         "$class": "mtbc.med.net.transaction.Contact",
    #         "visit": {
    #         "$class": "mtbc.med.net.Visit",
    #         "visitId": "V001",
    #         "patient": {
    #         "$class": "mtbc.med.net.Patient",
    #         "patientId": "PAI002",
    #         "medsHash": [],
    #         "dateTime": "2018-07-02T06:57:41.448Z"
    #         },
    #         "provider": {
    #         "$class": "mtbc.med.net.Provider",
    #         "providerId": "PRI001"
    #         }
    #         },
    #         "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
    #         "timestamp": "2018-07-02T06:58:09.432Z"
    #         }
    #     ]
    #     """
    
    # Then I should have the following participants
    # """
    # [
    # {"$class":"mtbc.med.net.Patient", "patientId":"PAI002","medsHash":[],"dateTime":"2018-07-02T06:57:41.448Z"}
    # ]
    # """
    #  Scenario: When the Patient contact with Provider and Provider does not exist
    # When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #     """
    #     [
    #         {
    #         "$class": "mtbc.med.net.transaction.Contact",
    #         "visit": {
    #         "$class": "mtbc.med.net.Visit",
    #         "visitId": "V001",
    #         "patient": {
    #         "$class": "mtbc.med.net.Patient",
    #         "patientId": "PAI001",
    #         "medsHash": [],
    #         "dateTime": "2018-07-02T06:57:41.448Z"
    #         },
    #         "provider": {
    #         "$class": "mtbc.med.net.Provider",
    #         "providerId": "PRI002"
    #         }
    #         },
    #         "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
    #         "timestamp": "2018-07-02T06:58:09.432Z"
    #         }
    #     ]
    #     """
    
    # Then I should have the following participants
    # """
    # [
    #  {"$class":"mtbc.med.net.Provider", "providerId":"PRI002"}
    # ]
    # """



    # Scenario: When we provider enter invalid provider ID
    # When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #     """
    #     [
    #         {
    #         "$class": "mtbc.med.net.transaction.Contact",
    #         "visit": {
    #         "$class": "mtbc.med.net.Visit",
    #         "visitId": "V001",
    #         "patient": {
    #         "$class": "mtbc.med.net.Patient",
    #         "patientId": "PAI001",
    #         "medsHash": [
    #         {
    #         "$class": "mtbc.med.net.MedsHash",
    #         "Id": "6027",
    #         "primarykey": "3",
	# 		"dateTime": "2018-07-02T06:57:41.448Z",
    #         "medsHash": "Esse commodo ad sint quis.",
    #         "visit": "resource:mtbc.med.net.Visit#2402"
    #         }
    #         ],
    #         "dateTime": "2018-07-02T06:57:41.448Z"
    #         },
    #         "provider": {
    #         "$class": "mtbc.med.net.Provider",
    #         "providerId": "?"
    #         }
    #         },
    #         "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
    #         "timestamp": "2018-07-02T06:58:09.432Z"
    #         }
    #     ]
    #     """
    #     Scenario: When we provider enter invalid patient ID
    #     When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #         """
    #         [
    #            {
	# 			"$class": "mtbc.med.net.transaction.Contact",
	# 			"visit": {
	# 			"$class": "mtbc.med.net.Visit",
	# 			"visitId": "V001",
	# 			"patient": {
	# 			"$class": "mtbc.med.net.Patient",
	# 			"patientId": "?",
	# 			"medsHash": [],
	# 			"dateTime": "2018-07-02T06:57:41.448Z"
	# 			},
	# 			"provider": {
	# 			"$class": "mtbc.med.net.Provider",
	# 			"providerId": "PRI001"
	# 			}
	# 			},
	# 			"transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
	# 			"timestamp": "2018-07-02T06:58:09.432Z"
	# 			}   
    #         ]
    #         """
    
    # Then I should have received the following event of type mtbc.med.net.transaction.InvalidPatientId
    #  """
    #     [
    #     {
    #     "$class": "mtbc.med.net.transaction.InvalidPatientId",
    #     "msg": "please enter valid patientId",
    #     "eventId": "0383addb-edd1-497b-a745-39638d477827#0",
    #     "timestamp": "2018-07-03T06:37:38.255Z"
    #     }
    #     ]
    # """
    # Scenario: Testing when no ppr already exist
    # When I submit the following transaction of type mtbc.med.net.transaction.Contact
    #     """
    #     [
    #         {
    #         "$class": "mtbc.med.net.transaction.Contact",
    #         "visit": {
    #         "$class": "mtbc.med.net.Visit",
    #         "visitId": "V001",
    #         "patient": {
    #         "$class": "mtbc.med.net.Patient",
    #         "patientId": "PAI001",
    #         "medsHash": [],
    #         "dateTime": "2018-07-02T06:57:41.448Z"
    #         },
    #         "provider": {
    #         "$class": "mtbc.med.net.Provider",
    #         "providerId": "PRI001"
    #         }
    #         },
    #         "transactionId": "bf6567bd-a4a9-49ab-b619-52a967c063dd",
	# 		 "timestamp": "2018-07-02T06:58:09.432Z"
    #         }
    #     ]
    #     """
   
    
    # Then I should not have the following participants
    # """
    # [
    #    {
    #     "$class": "mtbc.med.net.Patient_Provider_Relation",
    #     "pprId": "1",
    #     "patient": "resource:mtbc.med.net.Patient#001",
    #     "provider": "resource:mtbc.med.net.Provider#001",
    #     "permission": "READ_WRITE"
    #     }
    # ]
    # """

    Scenario: Testing when ppr already exist
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
            }
		
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
        "$class": "mtbc.med.net.Patient_Provider_Relation",
        "pprId": "1",
        "patient": "resource:mtbc.med.net.Patient#001",
        "provider": "resource:mtbc.med.net.Provider#001",
        "permission": "READ_WRITE"
        }
    ]
    """

    
Scenario: Testing when new allergy added to patient when not already exist
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
			"patientAllergy": {
			  "$class": "mtbc.med.net.patientAllergy.PatientAllergy",
			  "patientId": "7712",
			  "patientAllergyHash": [
				{
				  "$class": "mtbc.med.net.patientAllergy.PatientAllergyHash",
				  "id": "5151",
				  "patientAllergyId": "AL001.",
				  "patientReactionId": "R001",
				  "patientAllergyHash": "0x001"
				}
			  ]
            }
			
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
        "$class": "mtbc.med.net.patientAllergy.PatientAllergy",
        "patientId": "7712",
        "patientAllergyHash": [
        {
            "$class": "mtbc.med.net.patientAllergy.PatientAllergyHash",
            "id": "5151",
            "patientAllergyId": "AL001.",
            "patientReactionId": "R001",
            "patientAllergyHash": "0x001"
        }
        ]
        }
    ]
    """


