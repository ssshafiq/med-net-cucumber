  /*
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  * http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */

 'use strict';
 /**
  * Write your transction processor functions here
  */
// ==============================================================
// PATIENT CONTACT TRANSACTION START
// ==============================================================
 /**
  * Sample transaction
  * @param {mtbc.med.net.transaction.Contact} contact
  * @transaction
  */

 async function Contact(contact){
   // getpatientbyId();
   var visit = contact.visit;
   var patient = visit.patient;
   var meds = visit.patient.medsHash;

   var provider = visit.provider;

//validating invalid input in provider id
  var splChars = "*|,\":<>[]{}`\';()@&$#%?";
  for (var i = 0; i < splChars.length; i++) {
    if (  provider.providerId.indexOf(splChars.charAt(i)) != -1)
    {
      var NS = "mtbc.med.net.transaction";
      var factory = getFactory();
      var invalidProviderId = factory.newEvent(NS, 'InvalidProvider');
      invalidProviderId.msg = "please enter valid providerId"
      emit(invalidProviderId);
    }
  }
   //validating invalid input in provider id
   var splChars = "*|,\":<>[]{}`\';()@&$#%?";
   for (var i = 0; i < splChars.length; i++) {
     if (  patient.patientId.indexOf(splChars.charAt(i)) != -1)
     {
       var NS = "mtbc.med.net.transaction";
       var factory = getFactory();
       var invalidPatientId = factory.newEvent(NS, 'InvalidPatientId');
       invalidPatientId.msg = "please enter valid patientId"
       emit(invalidPatientId);
     }
   }



   var patientobj = await getpatient(patient);

   var providerobj = await getprovider(provider);
   var pprobj = await getppr(provider,patient);



   var patientmeds = await setpatientmeds(visit,meds,patientobj);



   var patientParticipant =  await getParticipantRegistry("mtbc.med.net.Patient").then(async function (patientParticipants){

     var checkpatexist = await query("selectPatientById",{Id:patientmeds.patientId});

     if(checkpatexist.length > 0){
       return patientParticipants.update(patientmeds);
     }
     else{
       return patientParticipants.add(patientmeds);
     }

   });

   var providerParticipant =  await getParticipantRegistry("mtbc.med.net.Provider").then(async function (providerParticipant){
      var checkprovider = await query("selectProviderById", {Id:provider.providerId});
      if(checkprovider.length > 0 && checkprovider!=null) {
       return;
      }
      else {
       return providerParticipant.add(providerobj);
      }

   });

   var pprAsset =  await getAssetRegistry("mtbc.med.net.Patient_Provider_Relation").then(async function(pprAsset){
     var patientid="resource:mtbc.med.net.Patient#"+patient.patientId;
     var providerid="resource:mtbc.med.net.Provider#"+provider.providerId;
       var chkppr = await query('checkppr', {PatientId:patientid,ProviderId:providerid});
       if(chkppr.length>0 && chkppr!=null){
           return;
       }
       else {
           return pprAsset.add(pprobj);
       }

   });

// ==============================================================
// PATIENT ALLERGIES ASSET REGISTRY START
// ==============================================================
   // check if provider have any update acout patient Allergies 
   var patientAllergyAsset = undefined;
   if ( visit.patientAllergyList != undefined)
   {
     var patientAllergyList = [];
    // updating Patient Allergy in blockchain
    patientAllergyAsset =  await getAssetRegistry("mtbc.med.net.patientAllergy.PatientAllergy").then(async function (patientAllergyAsset){
      for ( k = 0 ; k <visit.patientAllergyList.length ; k++ )
      {
     // checking if patient allergy already exist
     var checkpatientAllergy = await patientAllergyAsset.exists(visit.patientAllergyList[k].patientAllergyId);
     // if patientAllegy already exist update allergies
     if(checkpatientAllergy){
      patientAllergyList.push(  patientAllergyAsset.update(visit.patientAllergyList[k]));
     }
     else{  
      patientAllergyList.push(  patientAllergyAsset.add(visit.patientAllergyList[k]));
     }
    }

    return patientAllergyList;
   });// end get participant registery
  }
  //***************************************************/
  //**************ADDTINT PATIENT ALLERGIES REACRIONS***********/
  //***************************************************/
    // check if provider have any update acout patient Allergies REACTIONS
    var patientAllergyReactionAsset = undefined;
    if ( visit.patientReactionList != undefined)
    {
      var patientReactionList = [];
    // updating Patient Allergy in blockchain
    patientAllergyReactionAsset =  await getAssetRegistry("mtbc.med.net.patientAllergy.PatientReaction").then(async function (patientAllergyReactionAsset){
      for ( k = 0 ; k <visit.patientReactionList.length ; k++ )
      {
      // checking if patient allergy already exist
      var checkpatientAllergyReaction = await patientAllergyReactionAsset.exists(visit.patientReactionList[k].patientReactionId);
      // if patientAllegy already exist update allergies
      if(checkpatientAllergyReaction){
        patientReactionList.push(  patientAllergyReactionAsset.update(visit.patientReactionList[k]));
      }
      else{  
        patientReactionList.push(  patientAllergyReactionAsset.add(visit.patientReactionList[k]));
      }
    }

    return patientReactionList;
    });// end get participant registery

  
   }// end check undefined
 
// ==============================================================
// PATIENT ALLERGIES ASSET REGISTRY  END
// ==============================================================

// ==============================================================
// PATIENT IMMUNIZATION ASSET REGISTRY  START
// ==============================================================

var patientImmunizationAsset = undefined;
if( visit.patientImmunizationlist != undefined)
{
 //UPDATING PATIENT IMMUNIZATION ASSET IN BLOCKCHAIN
 patientImmunizationAsset =  await getAssetRegistry("mtbc.med.net.patientImmunization.PatientImmunization").then(async function (patientImmunizationAsset){
  var patientImmunizationlist  = [];
   for ( j = 0 ; j  <visit.patientImmunizationlist.length ; j++ ){
  // checking if patient allergy already exist
  var checkpatientPatientImmunization= await patientImmunizationAsset.exists(visit.patientImmunizationlist[j].patientImmunizationId);
  // IF PATIENT IMMUNIZATION ALRADY EXIST THEN UPDATE IMMUNIZATION
  if(checkpatientPatientImmunization){
    patientImmunizationlist.push(  patientImmunizationAsset.update(visit.patientImmunizationlist[j]));
  }
  else{
    patientImmunizationlist.push( patientImmunizationAsset.add(visit.patientImmunizationlist[j]));
  }
}
  return patientImmunizationlist;
});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT IMMUNIZATION ASSET REGISTRY  END
// ==============================================================

// ==============================================================
// PATIENT PMH ASSET REGISTRY  START
// ==============================================================

var patientPmhAsset = undefined;
if( visit.patientPMH_History != undefined)
{
 
 //UPDATING PATIENT PMH ASSET IN BLOCKCHAIN
 patientPmhAsset =  await getAssetRegistry("mtbc.med.net.patientPMH.PatientPMH_History").then(async function (patientPmhAsset){
  // CHECKING IF PATIENT PMH ALREADY EXIST
  var checkpatientPmh = await patientPmhAsset.exists(visit.patientPMH_History.patientPMH_HistoryId);
  // IF PATIENT PMH ALRADY EXIST THEN UPDATE PATIENT PMH
  if(checkpatientPmh ){
   return patientPmhAsset.update(visit.patientPMH_History);
  }
  else{
  
    return patientPmhAsset.add(visit.patientPMH_History);
  }

});// END GET ASSET REGISTRY
}//  END CHECK IF 

/******************************************************** */
/**********PATIENT FAMILY HISTORY DIAGNOSIS************* */
/******************************************************* */
var patientPmhDiagnosisAsset = undefined;
if( visit.patientPMH_DiagnosisList != undefined)
{
 
 //UPDATING PATIENT PMH ASSET IN BLOCKCHAIN
 patientPmhDiagnosisAsset =  await getAssetRegistry("mtbc.med.net.patientPMH.PatientPMH_Diagnosis").then(async function (patientPmhDiagnosisAsset){
   var patientPMH_DiagnosisList = [];
   for( i = 0 ; i < visit.patientPMH_DiagnosisList.length ; i++ )
   {
    // CHECKING IF PATIENT PMH ALREADY EXIST
    var checkpatientPmhDiagnosis = await patientPmhDiagnosisAsset.exists(visit.patientPMH_DiagnosisList[i].patientPMHDiagnosisId);
    // IF PATIENT PMH ALRADY EXIST THEN UPDATE PATIENT PMH
    if(checkpatientPmhDiagnosis ){
      patientPMH_DiagnosisList.push( patientPmhDiagnosisAsset.update(visit.patientPMH_DiagnosisList[i]));
    }
    else{

      patientPMH_DiagnosisList.push(  patientPmhDiagnosisAsset.add(visit.patientPMH_DiagnosisList[i]));
    }

   }
  return patientPMH_DiagnosisList
});// END GET ASSET REGISTRY
}//  END CHECK IF 



// ==============================================================
// PATIENT PMH ASSET REGISTRY  END
// ==============================================================

// ==============================================================
// PATIENT FAMILY HISTORY STRUCTURE ASSET REGISTRY  START
// ==============================================================

var patientFamilyHistoryStructureAsset = undefined;
if( visit.patientFamiltyHistoryStructure != undefined)
{
 
 var patientUpdatedFamilyHistoryStructure = await setPatientFamilyHistoryStructure(visit.patientFamiltyHistoryStructure, patientobj);
 //UPDATING PATIENT FAMILY HISTORY STRUCTURE ASSET IN BLOCKCHAIN
 patientFamilyHistoryStructureAsset =  await getAssetRegistry("mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure").then(async function (patientFamilyHistoryStructureAsset){
  // CHECKING IF PATIENT FAMILY HISTORY STRUCTURE ALREADY EXIST
  var checkpatientFamilyHistoryStructure = await query("getPatientFamilyHistoryStructure",{Id:patientobj.patientId});
  // IF PATIENT FAMILY HISTORY STRUCTURE  ALREADY EXIST THEN UPDATE PATIENT FAMILY HISTORY STRCTURE
  if(checkpatientFamilyHistoryStructure.length > 0){
   return patientFamilyHistoryStructureAsset.update(patientUpdatedFamilyHistoryStructure);
  }
  else{
  
    return patientFamilyHistoryStructureAsset.add(patientUpdatedFamilyHistoryStructure);
  }

});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT PATIENT FAMILY HISTORY STRUCTURE ASSET REGISTRY  END
// ==============================================================

// ==============================================================
// PATIENT PSH ASSET START
// ==============================================================

var patientPshAsset = undefined;
if( visit.patientPSH != undefined)
{
 
 //UPDATING PATIENT PAST SURGICAL HISTORY
 patientPshAsset =  await getAssetRegistry("mtbc.med.net.patientPSH.PatientPSH").then(async function (patientPshAsset){
  // CHECKING IF PATIENT PAST SURGICAL HISTORY ALREADY EXIST
  var checkpatientPSH = await patientPshAsset.exists(visit.patientPSH.patientPSHId);
  // IF PATIENT PAST SURGICAL HISTORY  ALREADY EXIST THEN UPDATE PATIENT FAMILY HISTORY STRCTURE
  if(checkpatientPSH ){
   return patientPshAsset.update(visit.patientPSH);
  }
  else{
   
    return patientPshAsset.add(visit.patientPSH);
  }

});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT PATIENT PSH  END
// ==============================================================

// ==============================================================
// PATIENT PSH STRUCTURED ASSET START
// ==============================================================

var patientPshStructuredAsset = undefined;
if( visit.patientPSHStructuedList != undefined)
{
 //UPDATING PATIENT PAST SURGICAL HISTORY STRUCTURED
 patientPshStructuredAsset =  await getAssetRegistry("mtbc.med.net.patientPSHStructued.PatientPSHStructued").then(async function (patientPshStructuredAsset){
   var patientPSHStructuedList = [];
   for ( w = 0 ; w < visit.patientPSHStructuedList.length ; w++)
   {
      // CHECKING IF PATIENT PAST SURGICAL HISTORY STRUCTURED ALREADY EXIST
      var checkpatientPSHStructured = await patientPshStructuredAsset.exists(visit.patientPSHStructuedList[w].patientPSHStructuredId);
      // IF PATIENT PAST SURGICAL HISTORY STRUCTURED ALREADY EXIST THEN UPDATE PATIENT FAMILY HISTORY STRCTURE
      if(checkpatientPSHStructured){
        patientPSHStructuedList.push( patientPshStructuredAsset.update(visit.patientPSHStructuedList[w]));
      }
      else{
        patientPSHStructuedList.push( patientPshStructuredAsset.add(visit.patientPSHStructuedList[w]));
      }
   }
  return patientPSHStructuedList;

});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT PATIENT PSH STRUCTURED END
// ==============================================================


// ==============================================================
// PATIENT PAST HOSPITILIZATION  ASSET START
// ==============================================================

var patientPastHospitilizationAsset = undefined;
if( visit.patientPastHosp != undefined)
{
 
 //UPDATING PATIENT PAST HOSPITILIZAIOTN  
 patientPastHospitilizationAsset =  await getAssetRegistry("mtbc.med.net.patientPastHosp.PatientPastHosp").then(async function (patientPastHospitilizationAsset){
  // CHECKING IF PATIENT PAST HOSPITILIZAITON ALREADY EXIST
  var checkpatientPastHosp= await patientPastHospitilizationAsset.exists(visit.patientPastHosp.patientPastHospId);
  // IF PATIENT PAST HOSPITILIZATION ALREADY EXIST THEN UPDATE PATIENT PAST HOSPITILIZATION
  
  if(checkpatientPastHosp){
   
   return patientPastHospitilizationAsset.update(visit.patientPastHosp);
  }
  else{
    return patientPastHospitilizationAsset.add(visit.patientPastHosp);
  }

});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT PATIENT PAST HOSPITILIZATION  ASSET END
// ==============================================================


// ==============================================================
// PATIENT PAST HOSPITILIZATION STRUCTURED ASSET START
// ==============================================================

var patientPastHospitilizationStructuredAsset = undefined;
if( visit.patientPastHospStructerdList != undefined)
{
 
 //UPDATING PATIENT PAST HOSPITILIZAIOTN  
 patientPastHospitilizationStructuredAsset =  await getAssetRegistry("mtbc.med.net.patientPastHospStructerd.PatientPastHospStructerd").then(async function (patientPastHospitilizationStructuredAsset){
   var patientPastHospStructerdList = [];
   for ( i= 0 ; i < visit.patientPastHospStructerdList.length ; i++  )
   {
     console.log("heloo")
      // CHECKING IF PATIENT PAST HOSPITILIZAITON ALREADY EXIST
      var checkpatientPastHospStructured= await patientPastHospitilizationStructuredAsset.exists(visit.patientPastHospStructerdList[i].patientPastHospStructerdId);
      // IF PATIENT PAST HOSPITILIZATION ALREADY EXIST THEN UPDATE PATIENT PAST HOSPITILIZATION
      
      if(checkpatientPastHospStructured){
      
        patientPastHospStructerdList.push( patientPastHospitilizationStructuredAsset.update(visit.patientPastHospStructerdList[i]));
      }
      else{
        patientPastHospStructerdList.push( patientPastHospitilizationStructuredAsset.add(visit.patientPastHospStructerdList[i]));
      }

   }
 return patientPastHospStructerdList;

});// END GET ASSET REGISTRY
}//  END CHECK IF 
// ==============================================================
// PATIENT PATIENT PAST HOSPITILIZATION STRUCTURED  ASSET END
// ==============================================================




// ==============================================================
// PATIENT ORDERS  ASSET START
// ==============================================================

  //GETTING PATIENT ORDER REGISTRY
  if (visit.patientOrder)
  {
  var patientPatientOrder =  await getAssetRegistry("mtbc.med.net.patientOrders.PatientOrder").then(async function (patientOrderAsset){
  // CHECKING IF PATIENT ORDER ALRADY EXIST IN BLOCKCHAIN
  var checkPatientOrder = await patientOrderAsset.exists(visit.patientOrder.patientOrderId);
  if (checkPatientOrder)
  {// UPDATING ASSET IF EXIST IN BLOCKCHAIN
   return patientOrderAsset.update(visit.patientOrder);
  }else{// ADDING FIRST TIME IN BLOCKCHAIN IF NOT ALRADY EXIST
    return patientOrderAsset.add(visit.patientOrder);
  }
  });// END PATIENT ORDER REGISTRY
  //SET PATIENT ORDER TEST
  }
  //GETTING PATIENT ORDER REGISTRY
  if (visit.patientOrderTestList)
  {//GETTING REGISTRY OF PATIENT ORDER TEST
  var patientPatientOrderTest =  await getAssetRegistry("mtbc.med.net.patientOrders.PatientOrderTest").then(async function (patientOrderTestAsset){
    // STORING ALL PATIENT ORDERS THAT ARE UPDATING
     var patientorderTestlist = [] ;
    for (  i = 0 ; i < visit.patientOrderTestList.length; i++)
    {// CHECKING IF PATIENT ORDER TEST ALREADY EXIST 
      var checkPatientOrderTest = await patientOrderTestAsset.exists(visit.patientOrderTestList[i].patientOrderTestId);
      if (checkPatientOrderTest)
      {// UPDATING ASSET IF ALRADY EXIST AND PUSH IN TEMPORARY ARRARY TO RECORD ALL UPDATING ASSET
        patientorderTestlist.push( patientOrderTestAsset.update(visit.patientOrderTestList[i]));
      }else{// ADDING NEW  ASSET IF ALRADY EXIST AND PUSH IN TEMPORARY ARRARY TO RECORD ALL UPDATING ASSET
        patientorderTestlist.push( patientOrderTestAsset.add(visit.patientOrderTestList[i]));
      }
    }
     return patientorderTestlist;
    });// END PATIENT ORDER REGISTRY
  }

  //GETTING PATIENT ORDER DIAGNOSIS
  if (visit.patientOrderDiagnosisList)
  {//GETTING REGISTRY OF PATIENT ORDER DISAGNOSIS
  var patientPatientOrderDiagnosis =  await getAssetRegistry("mtbc.med.net.patientOrders.PatientOrderDiagnosis").then(async function (patientOrderDiagnosisAsset){
    // ARRAY FOR STORING PATIENT ORDER DIAGNOSIS 
    var patientorderDiagnosislist = [] ;
   for (  i = 0 ; i < visit.patientOrderDiagnosisList.length; i++)
   {// CHECK IF PATIENT ORDER DIAGONOSISI ALRADY EXIST 
     var checkPatientOrderDiagnosis = await patientOrderDiagnosisAsset.exists(visit.patientOrderDiagnosisList[i].patientOrderTestId);
     if (checkPatientOrderDiagnosis)
     {// UPDATING PATIENT ORDER DIAGNOSIS AND PUSING ASSET FOR RECORDING ASSETS
      patientorderDiagnosislist.push( patientOrderDiagnosisAsset.update(visit.patientOrderDiagnosisList[i]));
     }else{ // ADDUBG PATINT ORDER DIAGNOIS AND PUSHING IN TEMPORARY ARRAY FOR RECORDING 
      patientorderDiagnosislist.push( patientOrderDiagnosisAsset.add(visit.patientOrderDiagnosisList[i]));
     }
   }
    return patientorderDiagnosislist;
   });// END PATIENT ORDER DIAGNOSIS
 }

 //GETTING PATIENT ORDER TSET SPECIMEN
 if (visit.patientOrderSpecimenList)
 {//GETTING REGISTRY OF PATIENT TEST SPECIMEN
 var patientPatientTestSpecimen =  await getAssetRegistry("mtbc.med.net.patientOrders.PatientOrderSpecimen").then(async function (patientOrderTestSpecimenAsset){
   // ARRAY FOR STORING PATIENT ORDER TEST SPECIMEN
   var patientorderTestSpecimenList = [] ;
  for (  i = 0 ; i < visit.patientOrderSpecimenList.length; i++)
  {// CHECK IF PATIENT ORDER TEST SPECIMEN ALRADY EXIST 
    var checkPatientTestSpeciment = await patientOrderTestSpecimenAsset.exists(visit.patientOrderSpecimenList[i].patientOrderSpecimenId);
    if (checkPatientTestSpeciment)
    {// UPDATING PATIENT ORDER TEST SPECIMEN AND PUSING ASSET FOR RECORDING ASSETS
      patientorderTestSpecimenList.push( patientOrderTestSpecimenAsset.update(visit.patientOrderSpecimenList[i]));
    }else{ // ADDUBG PATINT ORDER TEST SPECIMEN AND PUSHING IN TEMPORARY ARRAY FOR RECORDING 
      patientorderTestSpecimenList.push( patientOrderTestSpecimenAsset.add(visit.patientOrderSpecimenList[i]));
    }
  }
   return patientorderTestSpecimenList;
  });// END PATIENT ORDER TEST SPECIMEM
}

 //GETTING PATIENT ORDER TSET QUESTIONS
 if (visit.patientOrderQuestionList)
 {//GETTING REGISTRY OF PATIENT TEST SPECIMEN
 var patientPatientTestQuestions =  await getAssetRegistry("mtbc.med.net.patientOrders.PatientOrderQuestion").then(async function (patientOrderTestQuestionsAsset){
   // ARRAY FOR STORING PATIENT ORDER TEST SPECIMEN
   var patientorderTestQuestionsList = [] ;
  for (  i = 0 ; i < visit.patientOrderQuestionList.length; i++)
  {// CHECK IF PATIENT ORDER TEST SPECIMEN ALRADY EXIST 
    var checkPatientTestQuestions = await patientOrderTestQuestionsAsset.exists(visit.patientOrderQuestionList[i].patientOrderQuestionId);
    if (checkPatientTestQuestions)
    {// UPDATING PATIENT ORDER TEST SPECIMEN AND PUSING ASSET FOR RECORDING ASSETS
      patientorderTestQuestionsList.push( patientOrderTestQuestionsAsset.update(visit.patientOrderQuestionList[i]));
    }else{ // ADDUBG PATINT ORDER TEST SPECIMEN AND PUSHING IN TEMPORARY ARRAY FOR RECORDING 
      patientorderTestQuestionsList.push( patientOrderTestQuestionsAsset.add(visit.patientOrderQuestionList[i]));
    }
  }
   return patientorderTestQuestionsList;
  });// END PATIENT ORDER TEST SPECIMEM
}
  
// ==============================================================
// PATIENT ORDERS  ASSET END
// ==============================================================


   return patientParticipant,providerParticipant,pprAsset,patientAllergyAsset,patientImmunizationAsset,
   patientPmhAsset,patientFamilyHistoryStructureAsset,patientPshAsset,patientPshStructuredAsset,
   patientPastHospitilizationAsset,patientPatientOrder,patientPatientOrderTest,patientPatientOrderDiagnosis,
   patientPatientTestSpecimen,patientPatientTestQuestions,patientAllergyReactionAsset,patientPmhDiagnosisAsset,
   patientPastHospitilizationStructuredAsset;
 }
// ==============================================================
// PATIENT CONTACT TRANSACTION END
// ==============================================================

 async function getpatient(patient){
   var patientRegistry = await  getParticipantRegistry('mtbc.med.net.Patient');
   var chkpat = await patientRegistry.exists(patient.patientId);
   if(!chkpat){

     var factory = getFactory();
     var newpatient = factory.newResource('mtbc.med.net', 'Patient',patient.patientId);
     newpatient.dateTime = patient.dateTime;
     newpatient.medsHash = [];
     return newpatient;
   }
   else{
     var prevpatient = await query("selectPatientById",{Id:patient.patientId});

     return prevpatient[0];

   }
 }

 async function getprovider(provider){
   var providerRegistry = await  getParticipantRegistry('mtbc.med.net.Provider');
   var chkprov = await providerRegistry.exists(provider.providerId);
   if(!chkprov){
     var factory = getFactory();
     var newprovider = factory.newResource('mtbc.med.net', 'Provider',provider.providerId);
     return newprovider;

   }
   else{
     var prevprovider = await query("selectProviderById",{Id:provider.providerId});
     return prevprovider;

   }

 }

 async function getppr(provider,patient){
   var pprregistry = await  getAssetRegistry('mtbc.med.net.Patient_Provider_Relation');
   var patientid="resource:mtbc.med.net.Patient#"+patient.patientId;
     var providerid="resource:mtbc.med.net.Provider#"+provider.providerId;
   var chkppr = await query('checkppr', {PatientId:patientid,ProviderId:providerid});
   if(chkppr.length>0 && chkppr!=null){
     return chkppr[0];

   }
   else{
     var count = await query("getPPRCount");
         var factory = getFactory();
         var newppr = factory.newResource('mtbc.med.net', 'Patient_Provider_Relation', (count.length+1).toString());
         newppr.patient = factory.newRelationship('mtbc.med.net', 'Patient',patient.patientId);
         newppr.provider = factory.newRelationship('mtbc.med.net', 'Provider',provider.providerId);
         newppr.permission = 'READ_WRITE';
         return newppr;

   }

 }



 async function setpatientmeds(visit,meds,patientobj){


   var patientRegistry = await  getParticipantRegistry('mtbc.med.net.Patient');

   var chkpat = await patientRegistry.exists(patientobj.patientId);
   if(chkpat)
   {
      var patientrecord = await query("selectPatientById",{Id:patientobj.patientId});
     var medsH = patientrecord[0].medsHash;
     
     var allmeds = meds;

     for ( i = 0 ; i <  meds.length ; i++ )
     {
       for ( j = 0; j <  patientrecord[0].medsHash.length; j++)
       {
         if (medsH[j] != undefined && meds[i] != undefined )
         {
           if(medsH[j].primarykey==meds[i].primarykey){
    
             medsH[j].medsHash = meds[i].medsHash;
             medsH[j].visit = meds[i].visit;
             medsH[j].primarykey = meds[i].primarykey;
             medsH[j].dateTime = meds[i].dateTime;
             //var index = meds[i].indexOf(meds[i]);
             //if (index > -1) {
              // meds.splice(i, 1);
            allmeds = allmeds.filter( el => el.primarykey !== medsH[j].primarykey );


             //}
           }
           
         }
       }
     }

     allmeds.forEach(med=>{
           med.visit = visit;
           
           patientrecord[0].medsHash.push(med);     
     });
     return patientrecord[0];
   }
   else{
     var medarray = [];
     meds.forEach(med => {
       med.visit = visit;
       medarray.push(med);
     });
     patientobj.medsHash = medarray;
     return patientobj;
     }
 }


// ==============================================================
// PATIENT FAMILY HISTORY STRUCTURE FUNCTION  START
// ==============================================================
async function setPatientFamilyHistoryStructure(patientFamilyHistoryStructure, patient)
{
  
 //CHECKING IS PATIENT FAMILY HISTORY STRUCTURE IS NOT ALREADY UNDEFINED
 if( patientFamilyHistoryStructure != undefined)
 {
   //GETTING PATIENT PMH REGISTRY
   var patientFamilyHistoryRegistry = await  getAssetRegistry('mtbc.med.net.patientFamiltyHistoryStructure.PatientFamiltyHistoryStructure');
   //CHECKING IF PATIENT PMH ALREADY EXIST IN REGISTY
   var checkPatientFamilyHistoryStructure = await patientFamilyHistoryRegistry.exists(patient.patientId);
  
   if( checkPatientFamilyHistoryStructure )
   {
  
    //GETTIING ALL PRVIOUS Pmh OF THE PATIENT
     var patientPriviousFamilyHistoryStructure = await query("getPatientFamilyHistoryStructure",{Id:patient.patientId});
     //TEMPRARY ARRAY THAT HOLD LATEST ADDIONS IN THE PMH BY THE PROVIDER
     var newFamilyHistoryStructurelist = patientFamilyHistoryStructure.patientFamilyHistoryStructureHash ;
     
     //ITERATING ALL THE PREVIOUS PMH OF THE PATIENT
 
     patientPriviousFamilyHistoryStructure[0].patientFamilyHistoryStructureHash.forEach(familyhistory => {
       // ITTERATION FOR NEW PMH FOR COMPARRING WITH PRIVIOUS ITTERATIONS
       patientFamilyHistoryStructure.patientFamilyHistoryStructureHash.forEach( newfamilyhistory => {
        //MATCHING  Pmh OF OLD WITH NEW
         if( familyhistory.patientFamiltyHistoryStructureId == newfamilyhistory.patientFamiltyHistoryStructureId )
         {
            
           // COPPYING ALL PREVIOUS VALUS WITH NEW
           familyhistory.patientFamiltyHistoryStructureHash = newfamilyhistory.patientFamiltyHistoryStructureHash;
            //IF PATIENT PMH NOT ALRADY EXIST PUSH IN NEW PATIENT PMH LIST
            newFamilyHistoryStructurelist = newFamilyHistoryStructurelist.filter( el => el.patientFamiltyHistoryStructureId !== newfamilyhistory.patientFamiltyHistoryStructureId  );
         }
       });
     });
   
     // PUSHING NEW PMH TO THE OLD RECORD
     newFamilyHistoryStructurelist.forEach( _familyhistorystructure =>{
      patientPriviousFamilyHistoryStructure[0].patientFamilyHistoryStructureHash.push(_familyhistorystructure);
     });
     // RETURNING PRVIOUS PATIENT PMH
     return patientPriviousFamilyHistoryStructure[0];

      

   }else{
     // CREATING NEW PATIENT PMH FOR THIS PATIENT
     var factory = getFactory();
     var newPatientFamilyHistoryStructure = factory.newResource('mtbc.med.net.patientFamiltyHistoryStructure', 'PatientFamiltyHistoryStructure',patient.patientId);
     // ASSINING NEW PATIENT PMH HASH 
     newPatientFamilyHistoryStructure.patientFamilyHistoryStructureHash = patientFamilyHistoryStructure.patientFamilyHistoryStructureHash;
     return newPatientFamilyHistoryStructure;
   }

 }
 

}
// ==============================================================
// PATIENT FAMILY HISTORY STRUCTURE FUNCTION  END
// ==============================================================


