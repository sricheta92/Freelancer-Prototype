  var express = require('express');
  var pool = require('./../pool');
  var multer = require('multer');
  var router = express.Router();
  var fs = require('fs-extra')

  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + "."+ file.originalname)
    }
  })

  var upload = multer({ storage: storage }).single('file');

  router.post('/uploadFiles', function (req, res) {
    upload(req, res, function (err) {
      if (err) {
        return res.status(501).send({error:err});
      }
      res.json({originalname :req.file.originalname, uploadname :req.file.filename});
    })
  })

  router.post("/postprojects",function(req,res){

    var project_name = req.body.project_name;
    var description = req.body.description;
    var budget_range = req.body.budget_range;
    var project_pay_type = req.body.project_pay_type;
    pool.getConnection(function(err, connection){
     connection.query("insert into project (`project_name`,`description`,`budget_range`,`project_pay_type`,`create_ts`)  VALUES ("+
       "'"+project_name+
       "', '"+description+
       "', '"+budget_range+
       "', '"+project_pay_type+
       "', CURDATE());",  function(err,results, fields){
       connection.release();//release the connection
           if(err) {
               res.status(500);
             throw err;
             return;

         }else{
             res.status(200).send({success: true,message :"New project posted " ,projectid:results.insertId});
         }
      });

    });

  });


  router.get("/mapRecommendedProjects/:userId" ,function(req,res){
      pool.getConnection(function(err, connection){
        console.log("select * from project where project_id in ( select distinct(project_id) FROM project_skill ps join skill_user su where ps.skill_id = su.skillid and su.userid = "+ req.params.userId+")");
        connection.query("select * from project where project_id in ( select distinct(project_id) FROM project_skill ps join skill_user su where ps.skill_id = su.skillid and su.userid = "+ req.params.userId+")",  function(err, rows){
          if(err){
            throw err;
              res.status(500).send({status:false});
          }else{
              res.status(200).send({status: true, recommendedProjects : rows });
          }
        });
      });
  });

  router.post("/mapFilesToProject",function(req,res){

    var projectid = req.body.projectid;
    var filepath = req.body.filepath;
    pool.getConnection(function(err, connection){
    connection.query("insert into project_document (`project_id`,`document_path`)  VALUES ("+
      "'"+projectid+
      "', '"+filepath+
      "');",  function(err,results, fields){
      connection.release();//release the connection
          if(err) {
            res.status(500).send({success:false});
            throw err;
            return;

        }else{
            res.status(200).send({success: true,message :"Files added to the project "});
        }
     });

  });
  });


  router.post("/mapSkillToProject",function(req,res){

    var projectid = req.body.projectid;
    var skills = req.body.skills;
    pool.getConnection(function(err, connection){
    skills.map((skill,index) => {
        connection.query("insert into project_skill (`project_id`,`skill_id`)  VALUES ("+
          "'"+projectid+
          "', '"+skill.skill_id+
          "');",  function(err,results, fields){
           if(index === skills.length-1){
              if(err) {
                  res.status(500).send({success:false});
                  throw err;
                  return;
              }else{
                  res.status(200).send({success: true,message :"Skills added to the project "});
              }
          }
         });
    });

  });
  });

  router.post("/mapProjectToUser",function(req,res){

      var projectid = req.body.projectid;
      var userid = req.body.userid;
      var role = req.body.role;

      pool.getConnection(function(err, connection){

          connection.query("insert into project_user (`project_id`,`user_id`,`Role`)  VALUES ("+
            "'"+projectid+
            "', '"+userid+
            "', '"+role+
            "');",  function(err,results, fields){

                if(err) {
                    res.status(500).send({success:false});
                    throw err;
                    return;
                }else{
                    res.status(200).send({success: true,message :"Users added to the project "});
                }

           });


    });
  });

  module.exports = router;
