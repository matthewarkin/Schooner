var nodemailer = require('nodemailer');

module.exports = {

  send: function(email, cb){
    console.log('passed to send');

    var transporter = nodemailer.createTransport({
      service: secrets.mail.service,
      auth: {
          user: secrets.mail.user,
          pass: secrets.mail.pass
      }
    });

    transporter.sendMail(email, function(err, response){
      if(err){
        console.log(err);
      }else{
        console.log('Message sent: ' + response.response);
      }
      if(err) return cb(err);
      return cb(null, response);
    });
  }
}
