import Auth from './auth';
import Users from './users';

module.exports = (config) => {
  Auth(config);
  Users(config);
}
