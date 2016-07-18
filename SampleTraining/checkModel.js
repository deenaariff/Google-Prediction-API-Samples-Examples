var google = require('googleapis');
var trainedModels = google.prediction('v1.6').trainedmodels;

var dep = require("../dep");
var config = require("../config")
auth = dep.auth;

// Module Exports
module.exports = {
    checkStatus: checkStatus()
}


function check(callback) {

    auth(google, function(err, authClient) {
        if (err) {
            callback({
                err: err
            })
        }
        trainedModels.get({
            auth: authClient, //required
            project: config.sample1.projectID,
            id: config.sample1.requestBody.id
        }, function(err, data) {
            if (err) {
                callback({
                    err: err
                })
            } else {
                callback({
                    data: data
                })
            }
        })
    });
}

function checkStatus(callback) {
    check(function(res) {
        if (res.err) {
            console.log("Check Status Hit ERROR:" + res.err)
        } else {
            console.log(res.data)
        }
    });
}
