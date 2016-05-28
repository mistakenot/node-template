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
  res.json({
    now: new Date().toJSON(),
    msg: 'OK'
  });
});

router.get('/unauthorized', (req, res) => {
  res.json({
    msg: 'Unauthorized'
  });
});

module.exports = router;
