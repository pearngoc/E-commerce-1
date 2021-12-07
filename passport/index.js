
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userService = require('../component/authentication/userService')
passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.findByUserName(username);
    if(!user){
        return done(null, false, {message: 'Incorrect username'})
    }
    if(!userService.validPassword(password, user)){
        return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(async function(username, done) {
    const user = await userService.findByUserName(username)
    done(null, user);
    
  });

module.exports = passport;