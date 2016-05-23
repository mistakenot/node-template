var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/test_auth', passport.authenticate('bearer', { session: false }), function (req, res) {
    res.json({
    	msg: 'API is running'
    });
});

router.get('/', (req, res) => {
  // Replace with rendered home page
  res.json({
    now: new Date().toJSON(),
    msg: 'OK'
  });
});

module.exports = router;
