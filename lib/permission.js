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
 * @param {mtbc.med.net.transaction.UpdatePermissions} updatepermissions
 * @transaction
 */

async function UpdatePermission(updatepermissions){
    var patientrel = "resource:mtbc.med.net.Patient#"+ updatepermissions.patientId;
    var providerrel = "resource:mtbc.med.net.Provider#"+ updatepermissions.providerId;
    return query('checkppr', {PatientId:patientrel,ProviderId:providerrel})
    .then(async function(results){
    await getAssetRegistry("mtbc.med.net.Patient_Provider_Relation").then(async function(asset){
        results[0].permission = updatepermissions.permissionType;
      return asset.update(results[0]);
    });
    });
     }
 
