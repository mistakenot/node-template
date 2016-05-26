var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var db = null;

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    if (db === null) {
      mockgoose(mongoose).then(() => {
        mongoose.connect('mongodb://test.com/testdb', (err) => {
          if (err) {
            throw err;
          }
          db = mongoose;
          return resolve(mongoose);
        });
      });
    }
    else {
      return resolve(mongoose);
    }
  });
};

module.exports.disconnect = function (done) {
  mockgoose.reset(() => done());
  mongoose.disconnect();
  mongoose = null;
}
