/**
 * ProjectController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
 var fs = require('fs'),
     mime = require('mime');

module.exports = {

  new: function(req, res){

  },

  index: function(req, res){

    console.log(req.user.id);

    User.findOneById(req.user.id).exec(function( err, user){
      console.log(user.id + ', ' + user.username );

      Projects.find(user.id).populate('files').exec(function( err, userprojects ){
        if (err){
          console.log(err);
        } else {
          console.log('Success!');
        }

        res.view({
          data : {
            user: user,
            projects: userprojects
          }
        });
      });
    });
  },

  create: function(req, res, next){

    var params = req.params.all();
    var file = req.files.file;

    Projects.create({

      user: file.userid,
      project: params.projectname,
      description: params.description,
      files: file.id

    }).done(function projectCreated(err, project){
      console.log('projectid: ' + project.id)
      filemanager.upload({

        userid: params.userid,
        file: file,
        stream: fs.createReadStream(file.path),
        mimetype: mime.lookup(file.name),
        project: project.id,
        cover: true

      });
    res.redirect('/projects/' + project.id);
    });


  }

};
