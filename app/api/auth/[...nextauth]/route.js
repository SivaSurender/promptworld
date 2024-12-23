import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        //   check is user already exists
        const userExists = await User.findOne({ email: profile.email });

        //  if not, create new user and save to db
        if (!userExists) {
          const newUser = new User({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.image,
          });
        }
        return true;
      } catch (err) {
        console.error(err);
        return;
      }
    },
  },
});

export { handler as GET, handler as POST };
