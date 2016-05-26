var crypto = require('crypto');
var log = require('./../log')(module);
var passportLocalMongoose = require('passport-local-mongoose-email');
var UserModel;

module.exports = function(mongoose) {

	if (!UserModel) {
		var	Schema = mongoose.Schema;
		var User = new Schema({
			created: {
				type: Date,
				default: Date.now
			}
		});

		User.plugin(passportLocalMongoose, {
			usernameField: 'username'
		});

		UserModel = mongoose.model('User', User);
	}

	return UserModel;
}
