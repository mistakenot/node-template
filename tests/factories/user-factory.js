var faker = require('faker');

module.exports = (mongoose) => {
  var User = load.model('user')(mongoose);

  return {
    createNewUser() {
      var email = faker.internet.email();
      var password = faker.internet.password();

      return new Promise((resolve, reject) => {
        User.register({ username: email }, password, (error, user) => {
          if (error) return reject(error);
          return resolve(user);
        })
      })
      .then(user => {
        return {
          user: user,
          username: email,
          password: password
        }
      });
    }
  }
};
