import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({
  session: Ember.inject.service(),
  authentication: service('authentication'),

  actions: {
    logout() {
      this.get('authentication').endSession();
    }
  }
});
