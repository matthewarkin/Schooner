/**
 * ProjectController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {

  new: function(req, res){

  },

  index: function(req, res){

    User.findOneById(req.user.id).exec(function( err, user){
      console.log(user.id + ', ' + user.username );

      Project.findByUser(user.id).populate('files').exec(function( err, userprojects ){
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

    Projects.create({
      user: params.userid,
      project: params.project,
      description: params.description,
      file: req.files.file;
    }).done(function projectCreated(err, project){
      console.log('id: ' + project.user);
      filemanager.upload({

      }, function(err, response){
        sails.log.debug('nodemailer sent', err, response);
      });

      filemanager.upload(params);

      if (err) {
        console.log(err);
      }

    res.redirect('/project');

    });


  }

};
