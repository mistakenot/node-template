import Ember from 'ember';

export default Ember.Service.extend({
  session: Ember.inject.service(),
  isAuthenticated: Ember.computed.oneWay('session.isAuthenticated'),

  withUsernameAndPassword(username, password) {
    return this
      .get('session')
      .authenticate('authenticator:oauth2', username, password)
  },

  withFacebook() {
    return this
      .get('session')
      .authenticate('authenticator:torii', 'facebook');
  },

  endSession() {
    return this
      .get('session')
      .invalidate();
  }
});
