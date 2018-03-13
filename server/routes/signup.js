    var express = require('express');
    var pool = require('./../pool');
    var router = express.Router();


    router.post('/', (req, res) => {

        var reqEmail = req.body.email;
        var reqUsername = req.body.username;
        var reqPassword = req.body.password;
        checkIfUsernameEmailExists(reqUsername,reqEmail, reqPassword, req, res);
    });


    router.post('/withDetails', (req, res) => {

        var fname= req.body.fname;
        var lname = req.body.lname;
        var city =req.body.city;
        var phone =req.body.phone;
        var userID=req.body.userID;

        pool.getConnection(function(err, connection){
         connection.query("update user set `firstname` = "+
           "'"+fname+
           "',"+ "`lastname` ="+
           "'"+lname+
             "',"+ "`city` ="+
            "'"+city+
              "',"+ "`phone` ="+
              "'"+phone+
           "' where userid ="+userID+";",  function(err,results, fields){
           connection.release();//release the connection
           if(err) {
               res.status(500);
             throw err;

         }else{
             res.status(200).send({success: true,message :"Added" ,id:userID});
         }
     });

     });


    });

    router.post('/checkEmail', (req, res) => {
        var reqEmail = req.body.email;
        pool.getConnection(function(err, connection){
            connection.query("select * from user where email='"+ reqEmail+"'",  function(err, rows){
            connection.release();//release the connection
            if(err) throw err;
            if(rows!=undefined && rows.length>0) {
                res.status(409).send({ inuse:'email',success: false, message: 'This email address is already in use.' });
            }else{
                res.status(200).send({success: true});
            }
          });
        });
    });

    router.post('/checkUser', (req, res) => {
        var reqUsername = req.body.username;
        pool.getConnection(function(err, connection){
            connection.query("select * from user where username='"+ reqUsername+"'",  function(err, rows){
            connection.release();//release the connection
            if(err) throw err;
            if(rows!=undefined && rows.length>0) {
                res.status(409).send({ inuse:'user',success: false, message: 'This username already exists, please choose another' });
            }else{
                res.status(200).send({success: true});
            }
          });
        });
    });

    function addUser(req,res, reqEmail, reqUsername, reqPassword){

           pool.getConnection(function(err, connection){
            connection.query("insert into user (`email`,`username`,`password`)  VALUES ("+
              "'"+reqEmail+
              "', '"+reqUsername+
              "', '"+reqPassword+
              "');",  function(err,results, fields){
              connection.release();//release the connection
              if(err) {
                  res.status(500);
                throw err;
                return;

            }else{
                res.status(200).send({success: true,message :"New user created " ,id:results.insertId, username: reqUsername});
            }
        });

        });

    }

    function checkIfUsernameEmailExists(reqUsername,reqEmail, reqPassword, req,res){

          pool.getConnection(function(err, connection){
              connection.query("select * from user where email='"+ reqEmail+"'",  function(err, rows){
              connection.release();//release the connection
              if(err) throw err;
              if(rows!=undefined && rows.length>0) {
                  res.status(409).send({ inuse:'email',success: false, message: 'This email address is already in use.' });
              }else{
                  connection.query("select * from user where username='"+ reqUsername+"'",  function(err, rows){
                      if(rows!=undefined && rows.length>0) {
                          res.status(409).send({ inuse:'user',success: false, message: 'This username already exists, please choose another' });
                      }else{
                        addUser(req,res, reqEmail, reqUsername, reqPassword);
                      }

                  });
              }
        });
      });
    }

    module.exports = router;
