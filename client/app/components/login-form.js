import Ember from 'ember';

export default Ember.Component.extend({
  authentication: Ember.inject.service(),

  actions: {
    authenticateWithOAuth2() {
      this.set('errorMessage', null);
      let { identification, password } = this.getProperties('identification', 'password');

      this.get('authentication')
        .withUsernameAndPassword(identification, password)
        .catch((error) => {
          this.set('errorMessage', error.message);
        });
    }
  }
});
