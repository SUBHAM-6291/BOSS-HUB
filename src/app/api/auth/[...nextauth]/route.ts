import NextAuth, { NextAuthOptions, User as NextAuthUser, Account, Session } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '@/Backend/Models/User.Models';
import connectToDatabase from '@/Backend/lib/Db.connect';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        await connectToDatabase();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user || !user.password) {
          console.log('User not found or no password:', credentials.email);
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          console.log('Invalid password for:', credentials.email);
          return null;
        }

        return { id: user._id.toString(), email: user.email, name: user.name, username: user.username };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }: { user: NextAuthUser; account: Account | null }) {
      if (!account?.provider || !['github', 'google', 'credentials'].includes(account.provider)) {
        console.log('Unsupported provider:', account?.provider);
        return false;
      }
      try {
        await connectToDatabase();
        const existingUser = await UserModel.findOne({ email: user.email });
        if (!existingUser && account.provider !== 'credentials') {
          const newUserData = {
            email: user.email,
            name: user.name || '',
            username: user.email?.split('@')[0] || `user_${Date.now()}`,
            profilePic: user.image || '',
            password: '',
          };
          await UserModel.create(newUserData);
          console.log('New OAuth user created:', user.email);
        }
        console.log('Sign-in successful:', user.email);
        return true;
      } catch (error) {
        console.error('Sign-in error:', error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (token.email) {
        await connectToDatabase();
        const dbUser = await UserModel.findOne({ email: token.email });
        if (dbUser) {
          session.user = session.user || { id: '', username: '', email: '', name: null, image: null };
          session.user.id = dbUser._id.toString();
          session.user.username = dbUser.username;
          session.user.email = dbUser.email; // Optional: Ensure email is set
          session.user.name = dbUser.name || null; // Optional: Ensure name is set
        }
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };