'use client';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/services/user.services';

/**
 * The `SidebarContent` function is a React component that renders the content of a sidebar, including
 * user information, navigation links, and a logout button.
 * @returns The function `SidebarContent` is returning a JSX element. It is a `div` element with
 * multiple child elements inside. The structure of the returned JSX is as follows:
 */
export default function SidebarContent({ routes }) {
	const { data: session, status } = useSession();
	const { data: userData, status: userStatus } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(session.user.user._id),
		enabled: status == 'authenticated',
		select: (data) => data?.data,
	});
	console.log(session);

	return (
		<div className="relative h-full w-full">
			{/* User*/}
			<div className="flex items-center w-full gap-4 border-b border-gray-200  px-8 py-7">
				<Avatar className="rounded-md w-24 h-24">
					{status == 'authenticated' && userData && (
						<AvatarImage src={getImgSrc('user', userData.img)} />
					)}

					<AvatarFallback>
						<User className="h-10 w-10" />
					</AvatarFallback>
				</Avatar>

				<div className="mb-3">
					<h3 className="text-lg font-semibold mt-2">{userData.displayName}</h3>
					<p className="text-sm">{userData.email}</p>
				</div>
			</div>

			{/* Navigation  */}
			<ul className="flex flex-col gap-2 px-6 py-8 ">
				<h4 className="font-semibold px-2">Menú</h4>
				{status === 'authenticated' &&
					routes.map(({ label, route }) => (
						<li
							id={route}
							key={route}
							className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
						>
							<Link href={route}>{label}</Link>
						</li>
					))}
				{status === 'authenticated' &&
					session.user.user.rol === 'ADMIN_ROLE' && (
						<li
							id="/dashboard/admin"
							key="/dashboard/admin"
							className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
						>
							<Link href="/dashboard/admin">Dashboard</Link>
						</li>
					)}
				{status === 'authenticated' &&
					session.user.user.rol === 'ESPEC_ROLE' && (
						<li
							id="/dashboard/specialist"
							key="/dashboard/specialist"
							className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
						>
							<Link href="/dashboard/specialist">Dashboard</Link>
						</li>
					)}

				{status == 'unauthenticated' && (
					<>
						<li
							id="/login"
							key="/login"
							className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
						>
							<Link href="/login">Login</Link>
						</li>
						<li
							id="/register"
							key="/register"
							className="flex items-center  h-[40px] hover:bg-slate-200 rounded-sm px-2 cursor-pointer"
						>
							<Link href="/register">Sign Up</Link>
						</li>
					</>
				)}
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
