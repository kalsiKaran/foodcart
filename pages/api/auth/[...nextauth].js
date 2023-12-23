import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { BASE_URL } from '../../../constants';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone number', type: 'text', placeholder: 'Enter your Phone Number' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/login`, credentials);

          if (response.status === 200) {
            const user = response.data;
            return Promise.resolve(user);
          } else {
            throw new Error(response.data.message || 'Login failed');
          }
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login"
  }
});
