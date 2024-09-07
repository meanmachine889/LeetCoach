// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/", // Specify the sign-in page route
    signOut: "/", // Specify the sign-out page route
    error: "/", // Specify the error page route
    verifyRequest: "/", // (used for check email message)
    newUser: "/home", // Redirect new users to /home after sign-in
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Ensure the user is redirected to /home after sign-in
      return url.startsWith(baseUrl) ? `${baseUrl}/home` : baseUrl;
    },
  },
});
