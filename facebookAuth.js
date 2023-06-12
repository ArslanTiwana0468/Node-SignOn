const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const CLIENT_ID = "1459627128170361";
const CLIENT_SECRET = "9ef6a33a9295c67c89312bbba3a09409";

passport.use(new FacebookStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/facebook/callback",
},
function(request, accessToken, refreshToken, profile, done) {
  console.log(profile)
  return done(null, profile);
}));

