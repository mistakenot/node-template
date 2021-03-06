var faker = require('faker');
var db = require('./../../mock-db');
var log = load.log(module);

describe('User service', () => {
  var username = faker.internet.email();
  var password = faker.internet.password();
  var service, retrievedUser, User;

  beforeAll(done => {
    db.connect().then(mongoose => {
      User = load.model('user')(mongoose);
      service = load.service('user')(User);
      expect(service).not.toEqual(undefined);
      done();
    })
    .catch(fail);
  });

  afterAll(db.disconnect);

  it('should create a user', done => {
    service
      .createWithPassword(username, password)
      .then(u => {
        expect(u.username).toEqual(username);
        expect(u.id).toBeDefined();
        expect(u.authToken).toBeDefined();
        done();
      })
      .catch(fail);
  });

  it('should get a user by username', done => {
    service
      .getByUsername(username)
      .then(u => {
        expect(u).toBeDefined();
        expect(u.username).toEqual(username);
        retrievedUser = u;
        done();
      })
      .catch(fail);
  });

  it('should get a user by id', done => {
    service
      .getById(retrievedUser._id, false)
      .then(u => {
        expect(u).toBeDefined();
        expect(u.username).toEqual(username);
        done();
      })
      .catch(fail);
  });

  it('should reject an invalid password', done => {
    service
      .createWithPassword(faker.internet.email(), undefined)
      .then(undefined, done)
      .catch(fail);
  });

  it('should verify a created user', done => {
    service
      .verify(retrievedUser.authToken)
      .then(result => {
        expect(result.isAuthenticated).toEqual(true);
        done();
      })
      .catch(fail);
  });

  it('should get a user by auth token', done => {
    service
      .getByAuthToken(retrievedUser.authToken)
      .then(result => {
        expect(result.username).toEqual(retrievedUser.username);
        done();
      })
      .catch(fail);
  })

});
