/**
 * FilesController.js
 *
 * @description ::
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */
  var secrets = require('../../config/secrets');

  var knox = require('knox').createClient({
        key: secrets.aws.key,
        secret: secrets.aws.secret,
        bucket: secrets.aws.bucket
      }),
      fs = require('fs'),
      mime = require('mime'),
      Puid = require('puid');

var receiver = require('../receivers/s3reciever');


module.exports = {

  create: function(req, res) {
    console.log('hit create');

    console.log(req.files.files);
		req.files.files.upload(receiver(), function (err, files) {
			if (err) return res.serverError(err);

			res.json({
				message: files.length + ' file(s) uploaded successfully!',
				files: files
			});

		});

	},

  upload: function(req, res, next) {


    puid = new Puid(true);

		var userid = req.param('userid'),
        username = req.param('username'),
		    file = req.files.file;
		    stream = fs.createReadStream(file.path),
        mimetype = mime.lookup(file.name),
        baseurl = 'http://s3.amazonaws.com/' + secrets.aws.bucket,
        filepath = userid + '/' + puid.generate() + '.' + file.name,
        fileurl = baseurl + '/' + filepath;
        console.log(fileurl)

    knox.putStream(stream, filepath,
      {
        'Content-Type': mimetype,
        'Cache-Control': 'max-age=604800',
        'x-amz-acl': 'public-read',
        'Content-Length': file.size
      },

      function(err, result) {
        if (err) {
          console.log(err);
          res.json({ Error: '500' });
        } else {
          // console.log(result);

          File.create({ user: userid, name : fail.name, url: fileurl, filepath : filepath }).done(function fileCreated(err, file){

            if (err) {
    				  console.log(err);
    				}

            res.redirect('/user/');

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
