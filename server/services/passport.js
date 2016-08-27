const passport = require('passport');
const User = require('../models/user');
const config = require('../config')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local');


//Create local Strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  //verifying the email and password and call done with the user if it is
  //the correct username and password, otherwise call done with false
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false); }

    //comparing passwords -whether the password provided is equal to the user.password
    user.comparePassword(password, function(err, isMatch) {
      if(err) { return done(err) }
      if(!isMatch) {return done(null, false) }

      return done(null, user)
    })
  })
})

//Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  //we want to see if the user id in the payload exists inour database
  //if it does, we call 'done' with that user
  //if it doesnt we call done without the user object(the user is not authenticated.)
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if(user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })

})


//Tell passport to use this Strategy
passport.use(jwtLogin)
passport.use(localLogin)
