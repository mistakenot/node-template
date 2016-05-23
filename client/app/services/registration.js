import Ember from 'ember';

export default Ember.Service.extend({
  store: Ember.inject.service(),

  withEmailAndPassword(email, password){
    var user = this.get('store').createRecord('user', {
      email: email,
      password: password
    });
    return user.save();
  }

});
