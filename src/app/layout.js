import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/app/providers';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/navigation/Navbar';

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
				<Providers session={session}>
					<Navbar />
					<div className="flex justify-center w-full mt-[56px]">
						<article className="max-w-[1200px] w-full mx-auto px-4 border-x overflow-hidden ">
							{children}
						</article>
					</div>
				</Providers>
			</body>
		</html>
	);
}
