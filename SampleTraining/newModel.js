var google = require('googleapis');
var trainedModels = google.prediction('v1.6').trainedmodels;

var dep = require("../dep");
var config = require("../config")
auth = dep.auth;


// Module Exports
module.exports = {
    newModel: newModel()
}


function insert(callback) {
    auth(google, function(err, authClient) {
        if (err) {
            callback({
                err: err
            })
        }
        trainedModels.insert({

            auth: authClient, //required
            project: config.sample1.projectID,
            resource: config.sample1.requestBody

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

function newModel(callback) {
    insert(function(res) {
        if (res.err) {
            console.log("Insert Model Hit ERROR:" + res.err)
        } else
            console.log(res.data)
    });
};
