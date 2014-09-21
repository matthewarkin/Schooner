module.exports = {

  errors: function(message, cb){
    console.log(message);

    if(message.username){
      var errorMessage = 'Username Error';
    }

    if(message.email){
      var errorMessage = 'Email Error';
    }

    if(message.password){
      var errorMessage = 'Password Error';
    }
    var response = '<div class="alert alert-danger">' + errorMessage + '</div>';
    
    return cb(null, response);
  }
}
