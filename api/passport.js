const passport = require('passport');
const User = require('./models/user');
const DiscordStrategy = require('passport-discord').Strategy;

const scopes = ['identify'];
const prompt = 'consent';

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:5000/auth/discord/callback',
      scope: scopes,
      prompt: prompt,
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ userid: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = new User({
        userid: profile.id,
      });
      await user.save();
      done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});
passport.deserializeUser((id, done) => {
  User.findOne({ userid: id }, function (err, user) {
    if (err) return done(err);
    return done(null, user._doc);
  });
});
