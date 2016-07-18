
// Authentication for Google API's
// to use obtain Google API Credentials and store in env variables GOOGLE_APPLICATION_CREDENTIALS
exports.auth = function auth (google, callback) {
  google.auth.getApplicationDefault(function (err, authClient) {
    if (err) {
      return callback(err);
    }
    // The createScopedRequired method returns true when running on GAE or a
    // local developer machine. In that case, the desired scopes must be passed
    // in manually. When the code is  running in GCE or a Managed VM, the scopes
    // are pulled from the GCE metadata server.
    // See https://cloud.google.com/compute/docs/authentication for more
    // information.
    if (authClient.createScopedRequired && authClient.createScopedRequired()) {
      // Scopes can be specified either as an array or as a single,
      // space-delimited string.
      authClient = authClient.createScoped([
        'https://www.googleapis.com/auth/prediction',
        'https://www.googleapis.com/auth/devstorage.read_only'
      ]);
    }
    callback(null, authClient);
  });
}

exports.auth_oauth2 = function oauth2 (google, callback) {

}
