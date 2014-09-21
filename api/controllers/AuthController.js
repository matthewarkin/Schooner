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
  }

  /*
  login: function(req, res){
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        console.log(err);
        return res.redirect('/login'); // will generate a 500 error
      }
    // Generate a JSON response reflecting authentication status
      if (! user) {
        return res.redirect('/login');
      }
      return res.redirect('/user/');
    })(req, res);
  },
  */
}
