import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
	title: 'Consultor belleza virtual',
	description: '',
};

export default async function RootLayout({ children }) {
	const session = await getServerSession();
	return (
		<html lang="en">
			<body className={inter.className}>
				{'Navigation'}
				<Providers session={session}>{children}</Providers>
			</body>
		</html>
	);
}
