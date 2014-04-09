var nodemailer = require('nodemailer');
var secrets = require('../../config/secrets');

module.exports = {

  /**
   * Sends an email to a given recipient
   * @param  {object}   email           an object containing all of the necessary data to email
   * @param  {Function} cb[err, res]    the callback to call once email is sent, or if it fails
   */
  send: function(email, cb){
    console.log('passed to send');
    console.log(secrets.mail.login + ', ' + secrets.mail.password);
    console.log(email.from + ', ' + email.to);

    /** sets up the modemailer smtp transport */
    var transport = nodemailer.createTransport("SMTP", {
      service: "Mandrill",
      auth: {
          user: 'jdcauley',
          pass: '_wRNFj_uFLloxWIJggavGw'
      }
    });

    /** sets up the mail options, from and such like that **/

    /** Actually sends the email */
    transport.sendMail(email, function(err, response){
      if(err) return cb(err);
      return cb(null, response);
    });
  }
}
