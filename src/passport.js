import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

console.log(process.env.JWT_SECRET);
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  // callback for jwtstrategy
  try {
    const user = await prisma.user({
      id: payload.id,
    });
    if (!user) {
      //null, undefined ...
      return done(null, false); // or create new account with the email
    }
    //exist user
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

export const authenticateJwt = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();
