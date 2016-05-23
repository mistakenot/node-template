import Auth from './auth';
import Users from './users';

module.exports.apply = (config) => {
  Auth(config);
  Users(config);
}
