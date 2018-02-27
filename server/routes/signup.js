    var express = require('express');
    var pool = require('./../pool');
    var router = express.Router();


    router.post('/', (req, res) => {

        var reqEmail = req.body.email;
        var reqUsername = req.body.username;
        var reqPassword = req.body.password;
        checkIfUsernameEmailExists(reqUsername,reqEmail, reqPassword, req, res);
    });

    function addUser(req,res, reqEmail, reqUsername, reqPassword){

           pool.getConnection(function(err, connection){
            connection.query("insert into user (`email`,`username`,`password`)  VALUES ("+
              "'"+reqEmail+
              "', '"+reqUsername+
              "', '"+reqPassword+
              "');",  function(err, rows){
              connection.release();//release the connection
              if(err) {
                  res.status(500);
                throw err;
                return;

            }
        });
          if(err) {
            res.status(500);
            throw err;
            return;
          }
        });
          res.status(200).send('New user created: ' + reqUsername);
    }

    function checkIfUsernameEmailExists(reqUsername,reqEmail, reqPassword, req,res){
      console.log("email");
          pool.getConnection(function(err, connection){
              connection.query("select * from user where email='"+ reqEmail+"'",  function(err, rows){
              connection.release();//release the connection
              if(err) throw err;
              if(rows!=undefined && rows.length>0) {
                  res.status(409).send({ success: false, message: 'This email address is already in use.' });
              }else{
                  connection.query("select * from user where username='"+ reqUsername+"'",  function(err, rows){
                      if(rows!=undefined && rows.length>0) {
                          res.status(409).send({ success: false, message: 'This username already exists, please choose another' });
                      }else{
                        addUser(req,res, reqEmail, reqUsername, reqPassword);
                      }

                  });
              }
        });
      });
    }

    module.exports = router;
