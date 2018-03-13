  var express = require('express');
  var pool = require('./../pool');
  var jwt = require('jsonwebtoken');
  var router = express.Router();


  router.post('/', (req, res) => {

      var reqUserOrEmail= req.body.useroremail;
      var reqPassword = req.body.password;
      checkUser(reqUserOrEmail,reqPassword, req,res );

  });

  function checkUser(reqUserOrEmail,reqPassword, req,res) {
      debugger
        pool.getConnection(function(err, connection){
            connection.query(" select * from user where ( username ='" + reqUserOrEmail+"' or email = '"+reqUserOrEmail+"' ) and password = '"+ reqPassword+"';",  function(err, rows){
                connection.release();
                  if(rows!=undefined && rows.length>0){
                    var data = {
                      userId : rows[0].userid
                    };

                    var token = jwt.sign(data, req.app.get('superSecret'), {
        							 expiresIn : 60*60
        						});
                    res.status(200).send({ success: true, message: '',  token: token,username :rows[0].username, userid : rows[0].userid });
                  }else{
                    res.status(401).send({ success: false, message: 'The email and password you entered did not match our records. Please double-check and try again.' });
                  }
                });
        });

  }
  module.exports = router;
