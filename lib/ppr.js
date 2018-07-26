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

    // setting patient allegies in accordance with patient ID
    var patientUpdatedAllergies  = await setPatientAllergies(visit.patientAllergy, patientobj);
    // updating Patient Allergy in blockchain
    var patientAllergyAsset =  await getAssetRegistry("mtbc.med.net.patientAllergy.PatientAllergy").then(async function (patientAllergyAsset){
      // checking if patient allergy already exist
      var checkpatientAllergy = await query("getPatientAllergies",{Id:patientobj.patientId});
      // if patientAllegy already exist update allergies
      if(checkpatientAllergy.length > 0){
        return patientAllergyAsset.update(patientUpdatedAllergies);
      }
      else{
        console.log("adding patient allergy")
        return patientAllergyAsset.add(patientUpdatedAllergies);
      }

    });

//============


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


    return patientParticipant,providerParticipant,pprAsset,patientAllergyAsset;
  }


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
      meds.forEach(med=>{
        patientrecord[0].medsHash.forEach(medsH=>{
          if(medsH.primarykey==med.primarykey){
            medsH.medsHash = med.medsHash;
            medsH.visit = med.visit;
            medsH.primarykey = med.primarykey;
            var index = meds.indexOf(med);
            if (index > -1) {
              meds.splice(index, 1);
            }
          }
        });
      });
      meds.forEach(med=>{
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
      var newAllergieslist = [];
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
              allergy.patientAllergyHash = newAllergy.patientAllergyHash;
          }else{
              //if allergy not allready exist push in the newAllegies list
              newAllergieslist.push(newAllergy);
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
