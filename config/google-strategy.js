import { Strategy } from "passport-google-oauth20";
import passport from "passport";
import GoogleModel from "../models/GoogleModel";
import { configDotenv } from "dotenv";

const options = {
  clientID: process.env.CLIENTID,
  clientSecret: process.env.CLEINTSECRET,
  callbackURL: "http://localhost:4000/auth/google/redirect",
};

const verifyCallback = async (accessToken, refreshToken, profile, done) => {
  console.log("profile ", profile)
  let findUser;
  try {
    findUser = await GoogleModel.findOne({ googleId: profile.id });
   
    if (!findUser) {
      const newUser = new GoogleModel({
        username: profile.name.givenName,
        googleId: profile.id,
        email: profile.email[0].value,
      });

      const newUserSaved = await newUser.save();
      return done(null, newUserSaved);
    }
    return done(null, findUser);
  } catch (err) {
    return done(err, null);
  }
};

const googleStrategy = new Strategy(options, verifyCallback);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((userid, done) => {
  const user = GoogleModel.findById(userid)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

export default passport.use(googleStrategy);
