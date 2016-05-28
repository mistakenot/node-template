var faker = require('faker');
var request = require('./../client');

var ok = (code, next) => {
  return (error, response, body) => {
    expect(error).toEqual(null);
    expect(response.statusCode).toEqual(code);
    next(JSON.parse(body));
  }
}

describe('User API', () => {
  var id, token, user = {
    username: faker.internet.email(),
    password: faker.internet.password()
  };

  it('creates a new user with POST', done => {
    request.post({url: '/users/', body: JSON.stringify(user)},
      ok(200, body => {
        expect(body.username).toEqual(user.username);
        expect(body.id).toBeDefined();
        id = body.id;
        token = body.authToken;
        done(body);
      })
    )
  });

  it('verifies a new user with GET', done => {
    var url = '/users/verify/' + token;
    request.get({url: url},
      ok(200, body => {
        expect(body.username).toEqual(user.username);
        done();
      })
    )
  })

  it('retrieves an existing user with GET', done => {
    request.get({url: '/users/' + id},
      ok(200, body => {
        expect(body.username).toEqual(user.username);
        expect(body.id).toEqual(id);
        done();
      })
    )
  });
});
