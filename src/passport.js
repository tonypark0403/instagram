import passport from "passport";
import JwtStrategy from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secret: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user({
      id: payload.id,
    });
    if (user === null) {
      return done(null, false);
    }
    //exist user
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JwtStrategy(jwtOptions, verifyUser));
