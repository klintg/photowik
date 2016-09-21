import Config from './config.js';

let Q = require('q');
let knox = require('knox');

let ImageUploader = function(options) {
  let deferred =  Q.defer();
  var buf = new Buffer(options.data_uri.replace(/^data:image\/\w+;base64,/, ""),'base64')

  var knoxClient = knox.createClient({
    key: Config.key,
    secret: Config.secretaws,
    bucket: 'klint-imgs'
  });

  //put to a path in out bucket, and make readable by the publicPath
  var req = knoxClient.put('/images/' + options.filename, {
    'Content-Length': buf.length,
    'Content-Type': options.filetype,
    'x-amz-acl': 'public-read'
  });

  req.on('response', function(res) {
    if ( res.statusCode === 200) {
      deferred.resolve(req.url);
    } else {
      deferred.reject({error: 'true'});
    }
  });

  req.end(buf);
  return deferred.promise;
}

module.exports = ImageUploader
