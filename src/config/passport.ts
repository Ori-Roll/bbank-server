import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import type { User } from '@prisma/client';
import { db } from '@src/config/db';
import { prismaDisconnect } from '@src/config/dissconnect';

/* Passport Middleware */

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '', // Client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '', // Client secret
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        //TODO: move this to a service
        const existingUser = await db.user.findFirst({
          where: {
            googleId: profile.id,
          },
        });
        if (!existingUser) {
          const newUserEmail = profile.emails?.[0]?.value;
          const newUserId = profile.id;
          const userDisplayName = profile.displayName;
          if (newUserEmail === undefined) {
            throw new Error('No email found in provider');
          }
          const newUser = await db.user.create({
            data: {
              googleId: newUserId,
              name: userDisplayName,
              email: newUserEmail,
            },
          });
          return done(null, newUser);
        }
        return done(null, existingUser);
      } catch (err) {
        return done(err, undefined); //TODO: Is this correct?
      }
    }
  )
);

/* Store the user information in the session */

passport.serializeUser((user: any, done: any) => {
  //TODO: Fix any arguments
  done(null, user.id);
});

/* How to retrieve the user from the session */

passport.deserializeUser(async (id: string, done: any) => {
  try {
    const user = await db.user.findFirst({
      where: {
        id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
