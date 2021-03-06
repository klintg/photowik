const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')


function tokenForUser(user) {
  const timestamp = new Date().getTime()
  return jwt.encode({ sub: user.id, email:user.email, iat: timestamp }, config.secret);
}

exports.signin = function(req,res, next) {
  //User has email and password auth'd, now we need to give him a token.
  res.send({ token: tokenForUser(req.user)})
}

exports.signup = function(req, res, next) {
  //console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  if(!email || !password) {
    return res.status(422).send({error: 'You must provide email and password' });
  }
  //see if a user wit the give email exists
  User.findOne({email: email}, function (err, existingUser) {
    if (err) { return next(err)}

    //if a user with email does exist, return an error
    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use'})
    }

    //if a user with email does not exist, create and save user record
    const user = new User ({
      email: email,
      password: password
    });
    user.save(function(err) {
      if(err) {return next (err); }

      res.json({ token: tokenForUser(user) });
    });

    // Respond to request indicating the user was created.

  });


}
