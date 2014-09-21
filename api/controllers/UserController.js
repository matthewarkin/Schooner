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
		console.log('hit create');
		var params = req.params.all();

		console.log(params.email);
		User.findOneByEmail(params.email, function (err, userExists){
			if(userExists){

				req.flash("message", '<div class="alert alert-danger">User Exists - Do you need to Reset your Password?</div>');

				res.cookie("message", {message: "User Exists", type: "error", options: {}});
				res.redirect("/login");
				return;

			} else {

				User.create({
					username: params.email,
					email: params.email,
					password: params.password,
					confirmPassword: params.confirmPassword
				}).exec(function userCreated(err, user){
					if (err) {
						req.flash("message", '<div class="alert alert-danger">Something went wrong</div>');

						res.cookie("message", {message: "Something went wrong", type: "error", options: {}});
						res.redirect("/signup");
						return;
					} else {
						res.ok(user);
						var messageBody = '<h3>Thanks for signing up!</h3><p><a href="' + secrets.base.url + '/user/' + user.id + '/activate/' + user.activationToken + '">Please click here to activate your account</a>.</p>'

						mailer.send(user.email, 'Welcome!', messageBody, function(err, response){
								//sails.log.debug('nodemailer sent', err, response);
						});
					}
				});
			}
		});
	},

	activate: function(req, res){
    var params = req.params.all();

    sails.log.debug('activation action');

    //Activate the user that was requested.
    User.update({
      id: params.id,
      activationToken: params.token
    },{
      activated: true
    }, function(err, user) {
      // Error handling
      if (err) {
        error_reporter(err);
        req.flash("message", '<div class="alert alert-success">Account Activation Failed</div>');

        res.cookie("message", {message: "Plese Check Your Email", type: "error", options: {}});
        res.redirect("/");
      // Updated users successfully!
      } else {
        req.flash("message", '<div class="alert alert-success">Account Activated! You can login now.</div>');

        res.cookie("message", {message: "Account Activated!", type: "error", options: {}});
        res.redirect("/login");
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
				console.log('user deleted');
			});
		}

	}



};
