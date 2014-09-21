var nodemailer = require('nodemailer');

module.exports = {

  send: function(userEmail, subject, messageBody, cb){
    console.log('passed to send' + userEmail + ' ' + subject + ' ' + messageBody);

    var transporter = nodemailer.createTransport({
      service: secrets.mail.service,
      auth: {
          user: secrets.mail.user,
          pass: secrets.mail.pass
      }
    });

    var email = {
        from:       secrets.mail.fromName + ' <' + secrets.mail.fromEmail + '>',
        to:         userEmail,
        subject:    subject,
        html:       messageBody
      }

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
