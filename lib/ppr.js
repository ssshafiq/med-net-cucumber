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

// ==============================================================
// PATIENT ALLERGIES ASSET REGISTRY START
// ==============================================================
   // check if provider have any update acout patient Allergies 
   var patientAllergyAsset = undefined;
   if ( visit.patientAllergy != undefined)
   {
   // setting patient allegies in accordance with patient ID
   var patientUpdatedAllergies  = await setPatientAllergies(visit.patientAllergy, patientobj);
   // updating Patient Allergy in blockchain
    patientAllergyAsset =  await getAssetRegistry("mtbc.med.net.patientAllergy.PatientAllergy").then(async function (patientAllergyAsset){
     // checking if patient allergy already exist
     var checkpatientAllergy = await query("getPatientAllergies",{Id:patientobj.patientId});
     // if patientAllegy already exist update allergies
     if(checkpatientAllergy.length > 0){
       return patientAllergyAsset.update(patientUpdatedAllergies);
     }
     else{
       
       return patientAllergyAsset.add(patientUpdatedAllergies);
     }

   });// end get participant registery
 }// end check undefined
 

// ==============================================================
// PATIENT ALLERGIES ASSET REGISTRY  END
// ==============================================================

// ==============================================================
// PATIENT IMMUNIZATION ASSET REGISTRY  START
// ==============================================================

var patientImmunizationAsset = undefined;
if( visit.patientImmunization != undefined)
{
 
 var patientUpdatedImmunization = await setPatientImmunizations(visit.patientImmunization, patientobj);
 //UPDATING PATIENT IMMUNIZATION ASSET IN BLOCKCHAIN
 patientImmunizationAsset =  await getAssetRegistry("mtbc.med.net.patientImmunization.PatientImmunization").then(async function (patientImmunizationAsset){
  // checking if patient allergy already exist
  var checkpatientAllergy = await query("getPatientImmunization",{Id:patientobj.patientId});
  // IF PATIENT IMMUNIZATION ALRADY EXIST THEN UPDATE IMMUNIZATION
  if(checkpatientAllergy.length > 0){
   return patientImmunizationAsset.update(patientUpdatedImmunization);
  }
  else{
  
    return patientImmunizationAsset.add(patientUpdatedImmunization);
  }

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
 
 var patientUpdatedPmh = await setPatientPmh(visit.patientPMH_History, patientobj);
 //UPDATING PATIENT PMH ASSET IN BLOCKCHAIN
 patientPmhAsset =  await getAssetRegistry("mtbc.med.net.patientPMH.PatientPMH_History").then(async function (patientPmhAsset){
  // CHECKING IF PATIENT PMH ALREADY EXIST
  var checkpatientPmh = await query("getPatientPmh",{Id:patientobj.patientId});
  // IF PATIENT PMH ALRADY EXIST THEN UPDATE PATIENT PMH
  if(checkpatientPmh.length > 0){
   return patientPmhAsset.update(patientUpdatedPmh);
  }
  else{
  
    return patientPmhAsset.add(patientUpdatedPmh);
  }

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


   return patientParticipant,providerParticipant,pprAsset,patientAllergyAsset,patientImmunizationAsset,patientPmhAsset,patientFamilyHistoryStructureAsset;
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
// PATIENT ALLERGIES FUNCTION  START
// ==============================================================
// setting allergies for the patient
async function setPatientAllergies(patientAllergy, patient){
 // cheking if optional allergy set by provider
 if(patientAllergy != undefined){
   //getting patient alergy registy
   var patientAllergyRegistry = await  getAssetRegistry('mtbc.med.net.patientAllergy.PatientAllergy');
   //checking if allergy already exist in blockchain before this transation for this patient
   var checkPatientAllergy = await patientAllergyRegistry.exists(patient.patientId);
   if(checkPatientAllergy)
   {
     // itterating all new allergies and checking if any update in already existing allergies
     // getting all previos allergies of this patient
     var patientPriviousAllergyRecord = await query("getPatientAllergies",{Id:patient.patientId});
     //temporay array that hold the latest allergies that are not exist allready
     var newAllergieslist =patientAllergy.patientAllergyHash ;
     //itterating all the privious allegies in the blockchain
     patientPriviousAllergyRecord[0].patientAllergyHash.forEach(allergy => {
       // iterating on new allergies
       patientAllergy.patientAllergyHash.forEach( newAllergy => {
        // matching id of old with the id of new if exist then updating other wise store in newAllergieslist
         if( allergy.patientAllergyId == newAllergy.patientAllergyId && allergy.patientReactionId == newAllergy.patientReactionId )
         {
           // coppying all values to the prious allegies values with any update
             allergy.patientAllergyId = newAllergy.patientAllergyId;
             allergy.patientReactionId = newAllergy.patientReactionId;
           //if allergy not allready exist push in the newAllegies list
           newAllergieslist = newAllergieslist.filter( el => el.patientAllergyId == allergy.patientAllergyId &&  el.patientReactionId !== allergy.patientReactionId || el.patientAllergyId !== allergy.patientAllergyId &&  el.patientReactionId !== allergy.patientReactionId  );
           allergy.patientAllergyHash = newAllergy.patientAllergyHash;
          
         }
       });
     });
     // pushing new allergies to the old records
     newAllergieslist.forEach( _allergy =>{
       
       patientPriviousAllergyRecord[0].patientAllergyHash.push(_allergy);
       
     });
     // returning updated list
     return patientPriviousAllergyRecord[0];

   }else{
     // creating new allergy for this patient
     var factory = getFactory();
     var newPatientAllergy = factory.newResource('mtbc.med.net.patientAllergy', 'PatientAllergy',patient.patientId);
     // assigning allergy hash
  
     newPatientAllergy.patientAllergyHash = patientAllergy.patientAllergyHash;
     return newPatientAllergy;
   }
 }
}
// ==============================================================
// PATIENT ALLERGIES FUNCTION  END
// ==============================================================

// ==============================================================
// PATIENT IMMUNIZATION FUNCTION  START
// ==============================================================
async function setPatientImmunizations(patientImmunization, patient)
{

 //CHECKING IS PATIENT IMMUNIZATION IS NOT ALREADY UNDEFINED
 if( patientImmunization != undefined)
 {
   //GETTING PATIENT IMMUNIZATON REGISTRY
   var patientImmunizationRegistry = await  getAssetRegistry('mtbc.med.net.patientImmunization.PatientImmunization');
   //CHECKING IF IMMUNZATION ALREADY EXIST IN REGISTY
   var checkPatientImmunization = await patientImmunizationRegistry.exists(patient.patientId);
   if( checkPatientImmunization )
   {
    //GETTIING ALL PRVIOUS IMMUNIZAIONS OF THE PATIENT
     var patientPriviousImmunizationRecord = await query("getPatientImmunization",{Id:patient.patientId});
     //TEMPRARY ARRAY THAT HOLD LATEST ADDIONS IN THE IMMUNIZATION BY THE PROVIDER
     var newImmunizationlist = patientImmunization.patientImmunizationHash ;
     //ITERATING ALL THE PREVIOUS IMMUNIZATION OF THE PATIENT
     patientPriviousImmunizationRecord[0].patientImmunizationHash.forEach(immunization => {
       // ITTERATION FOR NEW IMMUNIZATION FOR COMPARRING WITH PRIVIOUS ITTERATIONS
       patientImmunization.patientImmunizationHash.forEach( newImmunization => {
        //MATCHING  IMMUNIZATION OF OLD WITH NEW
         if( immunization.patientImmunizationId == newImmunization.patientImmunizationId )
         {
  
           // COPPYING ALL PREVIOUS VALUS WITH NEW
           immunization.patientImmunizationHash = newImmunization.patientImmunizationHash;
            //IF IMMUNIZATION NOT ALRADY EXIST PUSH IN NEW IMMUNIZAITON LIST
           newImmunizationlist = newImmunizationlist.filter( el => el.patientImmunizationId !== newImmunization.patientImmunizationId  );
         }
       });
     });
   
     // PUSHING NEW IMMUNIZATION TO THE OLD RECORD
     newImmunizationlist.forEach( _immunization =>{
       patientPriviousImmunizationRecord[0].patientImmunizationHash.push(_immunization);
     });
     // RETURNING PRVIOUS IMMUNIZATION
     return patientPriviousImmunizationRecord[0];

      

   }else{
     // CREATING NEW IMMUNIZATION FOR THIS PATIENT
     var factory = getFactory();
     var newPatientImmunization = factory.newResource('mtbc.med.net.patientImmunization', 'PatientImmunization',patient.patientId);
     // ASSINING NEW IMMUNIZAITON HASH 
     newPatientImmunization.patientImmunizationHash = patientImmunization.patientImmunizationHash;
     return newPatientImmunization;
   }

 }
 

}
// ==============================================================
// PATIENT IMMUNIZATION FUNCTION  END
// ==============================================================

// ==============================================================
// PATIENT PMH FUNCTION  START
// ==============================================================

async function setPatientPmh(patientPMH_History, patient)
{

 //CHECKING IS PATIENT PMH IS NOT ALREADY UNDEFINED
 if( patientPMH_History != undefined)
 {
   //GETTING PATIENT PMH REGISTRY
   var patientPmhRegistry = await  getAssetRegistry('mtbc.med.net.patientPMH.PatientPMH_History');
   //CHECKING IF PATIENT PMH ALREADY EXIST IN REGISTY
   var checkPatientPmh = await patientPmhRegistry.exists(patient.patientId);
   if( checkPatientPmh )
   {
    //GETTIING ALL PRVIOUS Pmh OF THE PATIENT
     var patientPriviousPmhRecord = await query("getPatientPmh",{Id:patient.patientId});
     //TEMPRARY ARRAY THAT HOLD LATEST ADDIONS IN THE PMH BY THE PROVIDER
     var newPMHlist = patientPMH_History.patientPMH_DiagnosisHashs ;
     //ITERATING ALL THE PREVIOUS PMH OF THE PATIENT
     patientPriviousPmhRecord[0].patientPMH_DiagnosisHashs.forEach(pmh => {
       // ITTERATION FOR NEW PMH FOR COMPARRING WITH PRIVIOUS ITTERATIONS
       patientPMH_History.patientPMH_DiagnosisHashs.forEach( newPmh => {
        //MATCHING  Pmh OF OLD WITH NEW
         if( pmh.patientPMHDiagnosisId == newPmh.patientPMHDiagnosisId )
         {
  
           // COPPYING ALL PREVIOUS VALUS WITH NEW
           pmh.patientPMH_DiagnosisHash = newPmh.patientPMH_DiagnosisHash;
            //IF PATIENT PMH NOT ALRADY EXIST PUSH IN NEW PATIENT PMH LIST
            newPMHlist = newPMHlist.filter( el => el.patientPMHDiagnosisId !== newPmh.patientPMHDiagnosisId  );
         }
       });
     });
   
     // PUSHING NEW PMH TO THE OLD RECORD
     newPMHlist.forEach( _pmh =>{
      patientPriviousPmhRecord[0].patientPMH_DiagnosisHashs.push(_pmh);
     });
     // RETURNING PRVIOUS PATIENT PMH
     return patientPriviousPmhRecord[0];

      

   }else{
     // CREATING NEW PATIENT PMH FOR THIS PATIENT
     var factory = getFactory();
     var newPatientPmh = factory.newResource('mtbc.med.net.patientPMH', 'PatientPMH_History',patient.patientId);
     // ASSINING NEW PATIENT PMH HASH 
     newPatientPmh.patientPMH_DiagnosisHashs = patientPMH_History.patientPMH_DiagnosisHashs;
     return newPatientPmh;
   }

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