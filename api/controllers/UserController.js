/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create: function(req, res){
    var params = req.params.all();
    User.create(params, function(err, user){
      if (err){
				res.serverError(err);
				console.log(err);
				req.flash("message", '<div class="alert alert-danger">' + err + '</div>');

      	res.cookie("message", {message: err, type: "error", options: {}});
      	res.redirect("/");
      	return;

			}else{

        res.ok(user);

				mailer.send({
					from:       'eMailGrouper Support <' + secrets.mail.fromEmail + '>',
					to:         user.email,
					subject:    'New Account Acivation Required',
					html:       '<h3>Thanks for signing up!</h3><p><a href="' + secrets.base.url + '/user/' + user.id + '/activate/' + user.activationToken + '">Please click here to activate your account</a>.</p>'
				}, function(err, response){
						sails.log.debug('nodemailer sent', err, response);
				});
      }
    });
  },



};
