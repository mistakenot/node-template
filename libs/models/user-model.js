var crypto = require('crypto');
var log = require('./../log')(module);
var passportLocalMongoose = require('passport-local-mongoose-email');

module.exports = function(mongoose) {
	var	Schema = mongoose.Schema;
	var User = new Schema({
		created: {
			type: Date,
			default: Date.now
		}
	});

	User.plugin(passportLocalMongoose);

	return mongoose.model('User', User);
}
