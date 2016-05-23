import Ember from 'ember';

export default Ember.Component.extend({
  registration: Ember.inject.service(),

  actions: {
    onSubmit(){
      this.get('registration').withEmailAndPassword(
        this.get('email'),
        this.get('password'))
      .then(
        this.get('onSubmitSuccess'),
        (err) => {
          this.set('errors', err);
        });
    }
  }
});
