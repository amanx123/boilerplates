import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import { db } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        return done(null, false, { message: "Incorrect email." });
      }
      const isMatch = await bcrypt.compare(user.password, password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async ({ token, tokenSecret, profile, done }: any) => {
      let user = await db
        .select()
        .from(users)
        .where(eq(users.googleId, profile.id));
      if (!user) {
        user = await db
          .insert(users)
          .values({
            googleId: profile.id,
            email: profile.emails[0].value,
            password: "",
            name: profile.displayName,
            username: profile.username,
          })
          .returning();
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: any, done) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  done(null, user);
});
