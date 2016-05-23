module.exports = (services) => {
  var defaultRoutes = require('./default-routes');
  var userRoutes = require('./user-routes')(services.users);

  return {
    default: defaultRoutes,
    users: userRoutes
  };
}
