var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function(passport) {
  // passport functions
  passport.serializeUser(function(user, callback){
    console.log('serializing user.');
    callback(null, user);
  });

  passport.deserializeUser(function(user, callback){
    console.log('deserialize user.');
    callback(null, user);
  });

  // create strategy -- call callback when done
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://yalelawtech.herokuapp.com/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      console.log('in passport google strategy!', accessToken);
      const user = {
          googleId: profile.id,
          accessToken: accessToken,
          displayName: profile.name,
          email: profile.emails[0]
      };

      return cb(null, user);
    }
  ));
}
