/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

    email: {
      type: 'string',
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirmPassword: {
      type: 'string',
      required: true
    },
    facebook: 'string',
    twitter: 'string',
    google: 'string',
    github: 'string',
    linkedin: 'string',
    tokens: 'array',

    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    email:{
      type: 'email',
      required: true
    },
    /*
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    */
    activated: {
      type: 'boolean',
      defaultsTo: false
    },
    activationToken: {
      type: 'string'
    },

    toJSON: function() {
      // this gives you an object with the current values
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmPassword;

      delete obj.activationToken;
      delete obj.activated;
      // return the new object without password
      return obj;
    },

	},
  
  beforeCreate: function(user, cb) {

    if (!user.password || user.password != user.confirmPassword) {
      console.log('comparison fail');
    } else {

      crypto.generate({saltComplexity: 10}, user.password, function(err, hash){
        if(err){
          return cb(err);
        }else{
          user.password = hash;
          user.activated = false; //make sure nobody is creating a user with activate set to true, this is probably just for paranoia sake
          user.activationToken = crypto.token(new Date().getTime()+user.email);
          return cb(null, user);
        }
      });
    }
  }

};
