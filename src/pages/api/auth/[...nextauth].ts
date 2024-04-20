import Config from "@/utils/config";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: Config.googleClientId,
      clientSecret: Config.googleClientSecret,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
