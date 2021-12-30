
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy
const User = require('../component/authentication/userModel')
const userService = require('../component/authentication/userService')
require('dotenv').config()


passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.findByUserName(username);
    return done(null, user);
  }
));


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,

  passReqToCallback: true
}, async function(req, accessToken, refreshToken, profile, done){
  console.log(profile);
  try{
      const isExistUser = await User.findOne({
          authGoogleID: profile.id,
          authType: 'google',
      });
  
      if(isExistUser){
          return done(null, isExistUser);    
      }
      const newUser = new User({
          authType: 'google',
          authGoogleID: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName,
          avatar: profile.photos[0].value,
          status: "activated"
      })
  
      await newUser.save()
      return done(null, newUser)
  }catch(error){
      return done(error, false);
  }
 
}
))

passport.serializeUser(function(user, done) {
    done(null, {id:user._id, username: user.username, email: user.email,phone: user.phoneNumber, address:user.address, avatar: user.avatar, cart: user.cart, totalPrice: user.totalPrice, totalItem: user.totalItem});
});
  
passport.deserializeUser(async function(user, done) {
  done(null, user);
});

module.exports = passport;