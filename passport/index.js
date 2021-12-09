
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const userService = require('../component/authentication/userService')
passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.findByUserName(username);
    if(!user){
        return done(null, false, {message: 'Incorrect username'})
    }
    const isValid = await userService.validPassword(password, user)
    if(!isValid){
        return done(null, false, {message: 'Incorrect password'})
    }
    return done(null, user);
  }
));

passport.serializeUser(function(user, done) {
    done(null, {id:user._id, username: user.username, email: user.email,phone: user.phoneNumber, address:user.address});
});
  
passport.deserializeUser(async function(user, done) {
  done(null, user);
});

module.exports = passport;