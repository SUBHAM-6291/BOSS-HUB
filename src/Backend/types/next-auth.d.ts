import { Session as DefaultSession, User as DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      username: string;
    };
  }

  interface User extends DefaultUser {
    username: string;
  }
}