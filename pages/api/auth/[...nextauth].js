import axios from 'axios';

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BASE_URL } from '../../../constants';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phone: { label: 'Phone number', type: 'text', placeholder: 'Enter your Phone Number' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const user = {
          phone: credentials.phone,
          password: credentials.password,
        };

        try {
          const response = await axios.post(`${BASE_URL}/auth/login`, user);

          if (response.status === 200) {
            return { status: 'success', data: response.data };
          } else {
            throw new Error(response.data.message || 'Login failed');
          }
        } catch (error) {
          throw new Error(error.response?.data?.message || 'Login failed');
        }
      },
    }),
  ],
});
