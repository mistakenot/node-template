var faker = require('faker');
var log = load.log(module);
var db = require('./../../mock-db');

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

  afterAll(db.disconnect);

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

  it('should verify an existing user', done => {
      User.verifyEmail(createdUser.authToken, (err, user) => {
        expect(err).toBeNull();
        expect(user.username).toEqual(createdUser.username);
        done();
      });
  });

  it('should authenticate a created user', done => {
    User.authenticate()(username, password, (err, user, msg) => {
      expect(err).toBeNull();
      expect(msg).toBeUndefined();
      expect(user.username).toEqual(createdUser.username);
      createdUser = user;
      done();
    });
  });

  it('should retrieve a user by auth token', done => {
    User.findByAuthToken(createdUser.authToken, (err, user) => {
      expect(err).toBeNull();
      expect(user.username).toEqual(createdUser.username);
      done();
    });
  });

});
