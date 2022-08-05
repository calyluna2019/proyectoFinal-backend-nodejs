const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new localStrategy(async (username, pass, done) => {
    try {
      // Match email
      let userExists = await User.findOne({ email: username });
      if (!userExists)
        return done(null, false, { message: "Usuario no encontrado" });
      // Match password
      const match = await userExists.matchPassword(
        pass,
        userExists.password
      );
      if (!match)
        return done(null, false, { message: "Contraseña incorrecta" });

      // Return User
      return done(null, userExists);
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});