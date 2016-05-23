module.exports = (services) => {
  var indexRoutes = require('./index-routes');
  var userRoutes = require('./user-routes')(services.users);
  var oauthRoutes = require('./oauth-routes')(services.oauth);

  return {
    index: indexRoutes,
    users: userRoutes,
    oauth: oauthRoutes
  };
}
