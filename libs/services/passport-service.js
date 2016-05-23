var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var LocalStrategy = require('passport-local').Strategy;

var libs = process.cwd() + '/libs/';
var config = require(libs + 'config');

var User = require(libs + 'models/user-model');
var AccessToken = require(libs + 'model/accessToken');

module.exports = (User, AccessToken) => {
	passport.use(new LocalStrategy(User.authenticate()));

	passport.use(new BearerStrategy((accessToken, done) => {
			AccessToken.findOne({ token: accessToken }, (err, token) => {
				if (err) {
					return done(err);
				}

				if (!token) {
					return done(null, false);
				}

				// Token out of date?
				if (Math.round((Date.now() - token.created) / 1000) > config.get('security:tokenLife')) {
					AccessToken.remove({ token: accessToken }, (err) => {
						if (err) return done(err);
					});

					return done(null, false, { message: 'Token expired' });
				}

				User.findById(token.userId, (err, user) => {
					if (err) {
						return done(err);
					}

					if (!user) {
						return done(null, false, {
							message: 'Unknown user'
						});
					}

					done(null, user, { scope: '*' });
				});

			});
		}
	));
}
