var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
var db = null;
var log = (s) => {};

module.exports.connect = function () {
  return new Promise((resolve, reject) => {
    if (db === null) {
      log("GETTING DB IS NULL");
      mockgoose(mongoose).then(() => {
        mongoose.connect('mongodb://test.com/testdb', (err) => {
          if (err) {
            throw err;
          }
          if (db === null) {
            db = mongoose;
          }
          return resolve(db);
        });
      });
    }
    else {
      log("GETTING DB IS NOT NULL")
      return resolve(db);
    }
  });
};

module.exports.disconnect = function (done) {
  if (db) {
    var temp = db;
    log("DISCONNECTING DB ISNT NULL")
    mockgoose.reset(() => done())

    log("SETTING DB TO NULL");
    db = null;
    log("DELETEING TEMP DB");
    temp.disconnect();
  }
  else {
    log("DISCONNECTING DB IS NULL")
  }
  //mockgoose.reset(() => done());
  //mongoose.disconnect();
  //mongoose = null;
}
