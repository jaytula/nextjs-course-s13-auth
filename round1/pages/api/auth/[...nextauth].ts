// https://next-auth.js.org/getting-started/rest-api

import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/options#session
  session: {
    jwt: true,
  },
  providers: [
    // https://next-auth.js.org/providers/credentials
    Providers.Credentials({
      name: "default",
      credentials: {},
      authorize: async (credentials) => {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Could not log you in");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
