/**
 * UserController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 var async = require('async');
 var crypto = require('crypto');
 var passport = require('passport');
 var Puid = require('puid');
 var secrets = require('../../config/secrets');

module.exports = {

  index: function(req, res){
    res.view({
      user : req.user
    });
  },
  postSignup: function(req, res){
    var params = req.params.all();
    puid = new Puid(true);

    User.create({
      username: params.email,
      email: params.email,
      password: params.password,
      confirmPassword: params.confirmPassword
    }).done(function userCreated(err, user){

      if (err) {
        console.log(err);
        res.json({ Error: '500' });
      } else {
        nodemailer.send({
          from:       'jordan@cauley.co',
          to:         user.email,
          replyTo:    secrets.mail.from,
          subject:    'New Account Acivation Required',
          html:       '<h3>Thanks for signing up</h3><p><a href="http://localhost:1337/user/' + user.id + '/activate/' + user.activationToken + '">Please Activate Your Account</a></p>'
        }, function(err, response){
          sails.log.debug('nodemailer sent', err, response);
        });
        res.redirect('/');
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
        sails.log.debug(err);
        res.send(500, err);
      // Updated users successfully!
      } else {
        sails.log.debug("User activated:", user);
        res.redirect('/');
      }
    });
  },

  resetPass: function(req, res){

    puid = new Puid(true);
    var email = req.param('email'),
        newPass = puid.generate();

    User.findOneByEmail(email, function( err, user ){
      crypto.generate({saltComplexity: 10}, newPass, function(err, hash){
        if(err){
          return cb(err);
        }else{
          nodemailer.send({
            from:       'jordan@cauley.co',
            to:         user.email,
            replyTo:    secrets.mail.from,
            subject:    'Your Password Reset',
            html:       'Your new password for peices.co ' + newPass
          }, function(err, response){
            sails.log.debug('nodemailer sent', err, response);
          });
          newPass = hash;
          User.update(
            {password: user.password},
            {password: newPass}
          ).exec(function updateCB(err,updated){
            console.log('Updated user to have pass ' + newPass);
          });
        }
      });
    });
  },

  updateUser: function(req, res, next){

    var params = req.params.all();
    crypto.generate({saltComplexity: 10}, params.password, function(err, hash){
      if (err) console.log(err);

      params.password = hash;
      newPass = params.password;
      console.log('hashed pass: '+ params.password);
      // console.log(hash);
      User.findOne(req.user, function(err, user){
        User.update(user.id, params).exec(function updateCB(err, updated){
          console.log('Updated user to have pass');
          res.redirect('/user/profile');
        });
      });
    });
  },

  updatePass: function(req, res, next){
    var params = req.params.all();
    if (!params.password || params.password != params.confirmPassword) {
      console.log('comparison fail');
    } else {
      crypto.generate({saltComplexity: 10}, params.password, function(err, hash){
        if(err){
          return cb(err);
        } else {
          params.password = hash;
          newPass = params.password;

          User.findOne(req.user, function(err, user){
            User.update(
              {password: user.password},
              {password: params.password}
            ).exec(function updateCB(err, updated){
              console.log('Updated user to have pass');
              res.redirect('/user/profile');
            });
          });
        }
      });
    }
  },

};
