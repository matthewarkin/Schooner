var secrets = require('../../config/secrets');

var knox = require('knox').createClient({
      key: secrets.aws.key,
      secret: secrets.aws.secret,
      bucket: secrets.aws.bucket
    }),
    fs = require('fs'),
    mime = require('mime'),
    Puid = require('puid');

module.exports = {

upload: function(params, cb) {

  puid = new Puid(true);

  var baseurl = 'http://s3.amazonaws.com/' + secrets.aws.bucket,
      filepath = params.userid + '/' + puid.generate() + '.' + params.file.name,
      fileurl = baseurl + '/' + filepath;
      console.log(fileurl)

  knox.putStream(params.stream, filepath,
    {
      'Content-Type': params.mimetype,
      'Cache-Control': 'max-age=604800',
      'x-amz-acl': 'public-read',
      'Content-Length': params.file.size
    },

    function(err, result) {
      if (err) {
        console.log(err);
        res.json({ Error: '500' });
      } else {
        // console.log(result);
          console.log('in file create, projectid' + params.project );
        Files.create({

          user: params.userid,
          projects: params.project,
          name : params.file.name,
          url: fileurl,
          filepath : filepath,
          projectcover: params.cover
          
        }).done(function fileCreated(err, file){

          if (err) {
            console.log(err);
          }

        });
      }
    }
  );

},

destroy: function(req, res, next) {

  var filepath = req.param('filepath');

  File.findOne(req.param('id'), function foundFile(err, file) {
    knox.deleteFile('/' + filepath, function(err, res){
      if (err) {
        console.log(err);
      } else {
        // console.log(result);

        File.destroy(req.param('id'), function fileDestroyed(err, res, file) {

          if (err) {
            console.log(err);
          }
        });
      }
    });
  });
  res.redirect('/file/');
}

};
