/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');

module.exports = {

  index: function(req, res){
    res.json({
      user: user
    });
  },

  login: function(req, res){
    passport.authenticate('local',
    function(err, user, info){

      if ((err) || (!user)) {
        console.log(err);
        console.log(user);
        console.log(info);
        req.flash("message", '<div class="alert alert-danger">Your Email Address or Password is Wrong 42</div>');

        res.cookie("message", {message: "Your Email Address or Password is Wrong", type: "error", options: {}});
        res.redirect("/");
        return;
      } else {

        req.logIn(user, function(err){
          if (err) {
            res.send(err);
            console.log(err);
            res.send(500, err);
          } else {
            req.flash("message", '<div class="alert alert-danger">Success</div>');

            res.cookie("message", {message: "Success", type: "error", options: {}});
            res.redirect("/");
            return;
          }

        });

      }

    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.redirect('/out');
  },

  forgot: function(req, res){

    var params = req.params.all();

    User.findOneByEmail(params.email, function(err, theUser){

      if(theUser){

        var newResetToken = crypto.token(new Date().getTime()+theUser.email);
        sails.log.debug(newResetToken);

        User.update(theUser.id, {
          resetToken: newResetToken
        }, function(err, theUpdatedUser){
          console.log(theUpdatedUser);

          req.flash("message", '<div class="alert alert-success">Account reset Sent</div>');

          res.cookie("message", {message: "Password reset sent", type: "error", options: {}});
          res.redirect("/");

        });

      } else {
        sails.log.debug('not a user');
        req.flash("message", '<div class="alert alert-danger">No User Found</div>');

        res.cookie("message", {message: "No User", type: "error", options: {}});
        res.redirect("/");
      }
    })
  },

  reset: function(req, res){
    var params = req.params.all();
    console.log(params);

    User.findOneById(params.id, function(err, theUser){
      console.log(theUser)
      if(theUser){

        if(params.resetToken === theUser.resetToken){

          res.view({
            user : theUser
          });

        } else {

          req.flash("message", '<div class="alert alert-danger">Nope</div>');

          res.cookie("message", {message: "Nope", type: "error", options: {}});
          res.redirect("/");

        }

      } else {

        req.flash("message", '<div class="alert alert-danger">Nope</div>');

        res.cookie("message", {message: "Nope", type: "error", options: {}});
        res.redirect("/");

      }
    })

  },

  newpass: function(req, res){

    var params = req.params.all();

    User.update(params.uid, {
      resetToken: '',
      password: params.password,
      confirmPassword: params.passwordconfirm
    }, function(err, theUser){
      console.log(theUser);
      req.flash("message", '<div class="alert alert-success">Password Updated</div>');

      res.cookie("message", {message: "Yep", type: "success", options: {}});
      res.redirect("/");
    });

  }

}
