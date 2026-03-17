import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const APPROVED_EMAILS = [
  "founder@tryphantom.dev",
  "vedant@tryphantom.dev", // User's name from filesystem metadata
];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Phantom Ghost Access",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "founder@tryphantom.dev" },
        password: { label: "Security Key", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "founder@tryphantom.dev" && credentials?.password === "haunt-the-void") {
          return { id: "1", name: "Phantom Founder", email: "founder@tryphantom.dev" };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      // Hardened Gate: Only approved founders can access the substrate
      if (APPROVED_EMAILS.includes(user.email)) {
        return true;
      }
      return "/waitlist"; // Redirect unauthorized to waitlist
    },
    async jwt({ token, user }) {
      if (user) token.email = user.email;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.email = token.email as string;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
