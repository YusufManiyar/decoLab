import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY as string,
      clientSecret: process.env.TWITTER_API_SECRET as string,
      version: '2.0'
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      if(session.user) {
        session.user = token.id as any;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
  },
});
