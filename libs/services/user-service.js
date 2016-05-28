var libs = process.cwd() + '/libs/';
var log = require('./../log')(module);
var _ = require('lodash');

module.exports = function(User) {
  var projection = 'username _id';

  return {
    createWithPassword(username, password) {
      return new Promise((resolve, reject) => {
        User.register({ username: username }, password, (error, user) => {
          if (error) {
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
          if (err) {
            return reject(err);
          } else {
            return resolve(user);
          }
        });
      });
    },

    getByAuthToken(token) {
      return new Promise((resolve, reject) => {
        User.findByAuthToken(token, (err, user) => {
          if (err) {
            return reject(err);
          }
          else {
            return resolve(user);
          }
        });
      })
    },

    verify(token) {
      return new Promise((resolve, reject) => {
        User.verifyEmail(token, (err, user) => {
          if (err) {
            return reject(err);
          }
          else {
            return resolve(user);
          }
        });
      });
    },

    login(username, password) {
      return new Promise((resolve, reject) => {
        User.authenticate()(username, password, (err, user, msg) => {
          if (err) {
            return reject(err);
          }
          if (msg) {
            console.log(msg);
          }
          return resolve(user);
        });
      });
    }

  }
}
