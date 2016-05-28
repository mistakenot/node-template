var oauth2orize = require('oauth2orize');
var passport = require('passport');
var crypto = require('crypto');

var libs = process.cwd() + '/libs/';

var config = require(libs + 'config');
var log = require(libs + 'log')(module);

module.exports = (UserService, AccessToken, RefreshToken) => {
	var server = oauth2orize.createServer();

	var exchangeWithPassword = (username, password) => {
		return new Promise((resolve, reject) => {
			UserService
				.login(username, password)
				.then(user => {
					if (!user) return reject('User not found: ' + username);

					var tokenData = {
						userId: user.id,
						clientId: 'local'
						token: crypto.randomBytes(32).toString('hex'),
					};

					var accessToken = AccessToken.create(
						tokenData,
						(error, token) => {
							if (error) return reject(error);
							else return resolve(token);
						}
					);
				}
			);
		})
	}

	server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
		exchangeForPassword(username, password)
			.then(token => {
				done(token, true);
			})
			.catch(err => {
				done(err, false);
			})
	});

	return {
		exchangeWithPassword: exchangeWithPassword,
		token: [
			passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
			aserver.token(),
			aserver.errorHandler()
		]
	};

}
