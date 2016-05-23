module.exports = (models) => {
  var userService = require('./user-service')(models.user, models.password);
  var passportService = require('./passport-service')(models.user, models.accessToken);

  return {
    users: userService,
    passport: passportService
  }
}
