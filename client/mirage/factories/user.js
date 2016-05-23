import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  email: (i) => 'email_' + i + '@email.com',
  password: 'password_' + i
});
