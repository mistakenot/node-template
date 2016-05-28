var db = require('./../../mock-db');

describe('[TESTING] User factory', () => {
  var factory;

  beforeAll(done => {
    db.connect().then(mongoose => {
      factory = require('./../../factories/user-factory')(mongoose);
      done();
    })
    .catch(fail);
  });

  it('can create a new user', done => {
    factory.
      createNewUser()
      .then((data) => {
        expect(data.user).toBeDefined();
        expect(data.username).toBeDefined();
        expect(data.password).toBeDefined();
        done();
      })
      .catch(fail)
  });

})
