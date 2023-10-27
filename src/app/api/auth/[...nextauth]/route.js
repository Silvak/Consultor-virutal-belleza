import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { login } from '@/services/user.services';

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				try {
					const user = await login({
						email: credentials.email,
						password: credentials.password,
					});

					console.log(user.data);

					return user.data;
				} catch (e) {
					console.log(e);
					throw e;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
