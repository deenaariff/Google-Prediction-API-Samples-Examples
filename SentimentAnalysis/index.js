var google = require('googleapis');
var hostedmodels = google.prediction('v1.6').hostedmodels;

auth = require("../dep").auth;


/**
 * @param {string} phrase The phrase for which to predict sentiment,
 * e.g. "good morning".
 * @param {Function} callback Callback function.
 */

function predict (phrase, callback) {
  auth(function (err, authClient) {
    if (err) {
      return callback(err);
    }
    // Predict the sentiment for the provided phrase
    hostedmodels.predict({
      auth: authClient,
      // Project id used for this sample
      project: '414649711441',
      hostedModelName: 'sample.sentiment',
      resource: {
        input: {
          // Predict sentiment of the provided phrase
          csvInstance: phrase.split(/\s/gi)
        }
      }
    }, function (err, prediction) {
      if (err) {
        return callback(err);
      }

      // Received prediction result
      console.log('Sentiment for "' + phrase + '": ' + prediction.outputLabel);
      callback(null, prediction);
    });
  });
}

predict("I feel terrible today", function () {
  // DO NOTHING
});
