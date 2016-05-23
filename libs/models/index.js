module.exports = (db) => {
  var userModel = require('./user-model')(db);
  var passwordModel = require('./password-model')(db);
  var accessTokenModel = require('./access-token-model')(db);

  return {
    user: userModel,
    password: passwordModel,
    accessToken: accessTokenModel
  };
}
