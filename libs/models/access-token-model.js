var mongoose = require('mongoose');

module.exports = (mongoose) => {
  var Schema = mongoose.Schema;
	var AccessToken = new Schema({
		userId: {
			type: String,
			required: true
		},

		clientId: {
			type: String,
			required: true
		},

		token: {
			type: String,
			unique: true,
			required: true
		},

		created: {
			type: Date,
			default: Date.now
		}
	});

	return mongoose.model('AccessToken', AccessToken);
}
