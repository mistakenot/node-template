var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var _ = require('lodash');

module.exports = function(User) {
  var projection = 'username _id';

  return {
    createWithPassword(username, password) {
      return new Promise((resolve, reject) => {
        User.register({ username: username }, password, (error, user) => {
          if (error != null) {
            return reject(error);
          }
          else {
            return resolve(user);
          }
        })
      });
    },

    getByUsername(username) {
      return new Promise((resolve, reject) => {
        User.findByUsername(username, (error, user) => {
          if (error) return reject(error);
          else return resolve(user);
        });
      });
    },

    getById(id, privateFields) {
      return new Promise((resolve, reject) => {
        User.findById(id, projection, (err, user) => {
          if (err != null) {
            reject(err);
          } else {
            resolve(user);
          }
        });
      });
    }

  }
}
