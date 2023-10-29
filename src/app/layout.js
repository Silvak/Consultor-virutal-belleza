import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

//themes
import { ThemeProvider } from '@/components/CustomThemeProvider';
import './globals.css';
import Providers from '@/app/providers';
import { getServerSession } from 'next-auth';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
	title: 'Consultor belleza virtual',
	description: '',
};

export default async function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<ThemeProvider
						attribute="class"
						defaultTheme="light"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<Toaster />
					</ThemeProvider>
				</Providers>
			</body>
		</html>
	);
}
