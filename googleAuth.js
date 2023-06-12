const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./model/User')
const GOOGLE_CLIENT_ID = "374887770975-6l7307m21cs6m9lt367rljjevnf809qt.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
  function (request, accessToken, refreshToken, profile, done) {
    // console.log(profile)
    User.findOne({ gid: profile.id }, function (err, user) {
      if (user) {
        console.log('Found user:', );
      } else {
        console.log('No user found');
        const userr = User.create({
          gid: profile.id,
          name: profile.displayName,
          email: profile.email,
        })
        console.log('saved data' + userr.name)
      }
      return done(null, profile);
    });
  }));



