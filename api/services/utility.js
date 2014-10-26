module.exports = {

  expireUserToken: function(uid, token){
    User.findOneById(uid, function(err, user){
      if(err){
        return err;
      } else {
        User.update(user.id, {
          token: ''
        }, function(err, updatedUser){
          console.log(updatedUser);
        });
      }

    })
  }
}
