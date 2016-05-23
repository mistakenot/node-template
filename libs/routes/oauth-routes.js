var express = require('express');

var libs = process.cwd() + '/libs/';

var oauth2 = require(libs + 'auth/oauth2');
var log = require(libs + 'log')(module);
var	router = express.Router();

module.exports = (oauth) => {
  router.post('/token', oauth2.token);
};
