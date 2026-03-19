import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const APPROVED_EMAILS = (process.env.PHANTOM_APPROVED_EMAILS || "founder@tryphantom.dev").split(",");

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
        // Hardened Admin Gate
        const adminKey = process.env.PHANTOM_ADMIN_KEY || "haunt-the-void"; // Fallback only for local dev if unset
        if (credentials?.email && APPROVED_EMAILS.includes(credentials.email) && credentials?.password === adminKey) {
          return { id: "1", name: "Phantom Founder", email: credentials.email };
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
      if (user) {
        token.email = user.email;
        token.organization_id = "org-phantom-core"; // Default org for Phase 2 bootstrap
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        (session.user as any).organization_id = token.organization_id;
      }
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
