/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

	attributes: {

    username: {
      type: 'string',
      unique: true
    },
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
    files: {
      collection: 'files',
      via: 'user'
    },
    projects: {
      collection: 'projects',
      via: 'user'
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
    console.log('hit before create');
    if (!user.password || user.password != user.confirmPassword) {
      console.log('comparison fail');
    } else {
      console.log('pre-crypto generate');
      crypto.generate({saltComplexity: 10}, user.password, function(err, hash){
        if(err){
          return cb(err);
          console.log('failed generation');
        }else{
            console.log('successful generation');
          user.password = hash;
          user.confirmPassword = hash;
          user.activated = false; //make sure nobody is creating a user with activate set to true, this is probably just for paranoia sake
          user.activationToken = crypto.token(new Date().getTime()+user.email);
          return cb(null, user);
        }
      });
    }
  }

};
