var express = require('express');
var router = express.Router();


router.post('/signup', (req, res) => {
    var reqUsername = req.body.email;
    var reqUsername = req.body.username;
    var reqPassword = req.body.password;
    var reqPassword = req.body.hireFlag;
    this.checkIfUserNameExists(username);
});

function checkIfUserNameExists(username){

}
module.exports = router;
