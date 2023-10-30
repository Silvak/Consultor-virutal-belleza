'use client';
import Link from 'next/link';
import { DarkMode } from '../ModeToggleTheme';
import HorizontalMenu from './HorizontalMenu';
import SidebarContent from './SidebarContent';
import { signOut, useSession } from 'next-auth/react';

//cn components
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getImgSrc } from '@/lib/utils';
import { User } from 'lucide-react';

//temporal routes
export const routes = [
	{
		label: 'Home',
		route: '/home',
	},
	{
		label: 'Blog',
		route: '/blog',
	},
	{
		label: 'Products',
		route: '/products',
	},
	{
		label: 'Consult',
		route: '/upload',
	},
	{
		label: 'Profile',
		route: '/profile',
	},
];

/**
 * The `Navbar` function returns a JSX element representing a navigation bar component with a logo,
 * desktop menu, sidebar, user information, navigation links, and a logout button.
 * @returns The function `Navbar` returns a JSX element representing the navigation bar component.
 */
export default function Navbar() {
	const { data: session, status } = useSession();
	return (
		<header className="fixed top-0 left-0 w-screen h-[60px] border-b border-gray-300/70 dark:border-gray-200/30 bg-white/70 dark:bg-[#020817]/70 backdrop-blur-md z-50">
			<nav className="flex w-full h-full justify-between items-center px-8">
				{/*Logo */}
				<Link href="/home" className="font-semibold">
					CBV-IA
				</Link>

				{/* Desktop Menu */}
				<HorizontalMenu routes={routes} />

				<div className="flex items-center h-full gap-4">
					{/* DarkMode */}
					<DarkMode />

					{/* Sidebar */}
					<Sheet className="">
						<SheetTrigger>
							<Avatar className="rounded-md">
								{status == 'authenticated' && (
									<AvatarImage src={getImgSrc('user', session.user.user.img)} />
								)}

								<AvatarFallback>
									<User />
								</AvatarFallback>
							</Avatar>
						</SheetTrigger>

						<SheetContent className="w-[400px] sm:w-[540px] p-0">
							<SidebarContent routes={routes} />
						</SheetContent>
					</Sheet>
				</div>
			</nav>
		</header>
	);
}
