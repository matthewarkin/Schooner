/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function(req, res){

		res.view({
      user : req.user
    });

	},

	create: function(req, res){
    var params = req.params.all();
    User.create(params, function(err, user){
      if (err){

				flashIt.errors(err.invalidAttributes, function(err, response){
					req.flash('message', response);
					res.cookie("message", {message: err, type: "error", options: {}});
					res.redirect("/");
					return;
				});

			}else{

        res.ok(user);
				var messageBody = '<h3>Thanks for signing up!</h3><p><a href="' + secrets.base.url + '/user/' + user.id + '/activate/' + user.activationToken + '">Please click here to activate your account</a>.</p>'

				mailer.send(user.email, 'Welcome!', messageBody, function(err, response){
						//sails.log.debug('nodemailer sent', err, response);
				});
      }
    });
  },

	reset: function(req, res){


	},

	update: function(req, res){

		var params = req.params.all();
		var currentUser = req.user;

		if(currentUser.id === params.userId || currentUser.role === 0){

		}

	},

	delete: function(req, res){

		var params = req.params.all();
		var currentUser = req.user;

		if(currentUser.id === params.userId || currentUser.role === 0){
			User.destroy(req.user.id).exec(function deletedCB(err){
				console.log('user deleted')l
			});
		}

	}



};
