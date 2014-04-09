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
    console.log('logging in');
    passport.authenticate('local',
    function(err, user, info){
      if ((err) || (!user)) console.log(err);

      req.logIn(user, function(err){
        if (err) {
          console.log(err);
          res.redirect('/login');
        } else {
          console.log('login success');
          return res.redirect('/user/'); //res.send({ message: 'login successful' });

        }
      });
    })(req, res);
  },

  logout: function (req,res){
    req.logout();
    res.redirect('/out');
  }



};
