var faker = require('faker');
var db = require('./../../mock-db');
var log = load.log(module);

describe('User model', () => {
  var User, createdUser;
  var username = faker.internet.email();
  var password = faker.internet.password();

  beforeAll(done => {
    db.connect().then(mongoose => {
      User = load.model('user')(mongoose);
      done();
    })
    .catch(fail);
  });

  it('should register a new user', done => {
    User.register({ username: username }, password, (error, user) => {
      expect(error).toBeNull();
      expect(user.username).toEqual(username);
      createdUser = user;
      done(user);
    });
  });

  it('should find a created user', done => {
    User.findByUsername(username, (error, user) => {
      expect(error).toBeNull();
      expect(user.username).toEqual(createdUser.username);
      done();
    });
  });

});
