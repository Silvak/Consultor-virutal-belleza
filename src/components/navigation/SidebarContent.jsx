'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

/**
 * The `SidebarContent` function is a React component that renders the content of a sidebar, including
 * user information, navigation links, and a logout button.
 * @returns The function `SidebarContent` is returning a JSX element. It is a `div` element with
 * multiple child elements inside. The structure of the returned JSX is as follows:
 */
export default function SidebarContent({ routes }) {
	const { data: session } = useSession();

	console.log('session', session);
	return (
		<div className="relative h-full w-full">
			{/* User*/}
			<div className="flex items-center w-full gap-4 border-b border-gray-200  px-8 py-7">
				<Avatar className="w-24 h-24 rounded-sm">
					<AvatarImage src="https://github.com/shadcn.png" />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="mb-3">
					<h3 className="text-lg font-semibold mt-2">Nombre Usuario</h3>
					<p className="text-sm">user@gmail.com</p>
				</div>
			</div>

			{/* Navigation  */}
			<ul className="flex flex-col gap-2 px-6 py-8 ">
				<h4 className="font-semibold px-2">Menú</h4>
				{routes.map(({ label, route }) => (
					<li
						id={route}
						key={route}
						className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
					>
						<Link href={route}>{label}</Link>
					</li>
				))}
			</ul>

			{/* Logout */}
			<div className="absolute bottom-0  w-full flex justify-left items-center border-t border-gray-200 px-8 py-4">
				<Button variant="outline" onClick={() => signOut()}>
					Logout
				</Button>
			</div>
		</div>
	);
}
