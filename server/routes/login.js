  var express = require('express');
  var pool = require('./../pool');
  var router = express.Router();


  router.post('/', (req, res) => {

      var reqUserOrEmail= req.body.useroremail;
      var reqPassword = req.body.password;
      checkUser(reqUserOrEmail,reqPassword, req,res );

  });

  function checkUser(reqUserOrEmail,reqPassword, req,res) {
        pool.getConnection(function(err, connection){
            connection.query(" select * from user where ( username ='" + reqUserOrEmail+"' or email = '"+reqUserOrEmail+"' ) and password = '"+ reqPassword+"';",  function(err, rows){
                connection.release();
                  if(rows!=undefined && rows.length>0){
                    res.status(200).send({ success: true, message: 'Login success' });
                  }else{
                    res.status(401).send({ success: false, message: 'Authentication failed.' });
                  }
                });
        });

  }
  module.exports = router;
