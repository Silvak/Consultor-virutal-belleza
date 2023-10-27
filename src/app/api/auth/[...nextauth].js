import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { login } from '@/services/user.services';

export const authOptions = {
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				console.log(credentials);
				try {
					const user = await login(credentials);

					if (user) {
						// Any object returned will be saved in `user` property of the JWT
						return user;
					} else {
						// An error will be displayed advising the user to check their details.
						return null;
					}
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
};

export default NextAuth(authOptions);
