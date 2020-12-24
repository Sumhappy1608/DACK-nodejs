var express = require('express');
const app = require('../../app');
var router = express.Router();

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('user/user.hbs', null);
    
});

module.exports = router;