/**
 * AccountController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
  var passport = require('passport');

module.exports = {

  index: function(req, res){
    res.view();
  },

  login: function(req, res){
    passport.authenticate('local',
    function(err, user, info){
      if ((err) || (!user)) console.log(err);

      req.logIn(user, function(err){
        if (err) {
          res.send(err);
          res.redirect('/login');
        } else {
          return res.redirect('/projects'); //res.send({ message: 'login successful' });
        }

      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.redirect('/out');
  }



};
