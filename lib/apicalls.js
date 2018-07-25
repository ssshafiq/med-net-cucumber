function getpatientbyId(patientid){
    var request = require("request");

    request({
      uri: 'http://it-161:9090/api/GateKeeper/GetPatientInformation?patientAccount=000000001234',
      method: "POST",
    }, function(error, response, body) {
     alert(body);
    });

}