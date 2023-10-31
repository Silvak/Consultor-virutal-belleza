'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getImgSrc } from '@/lib/utils';
import { User } from 'lucide-react';

/**
 * The UserInfo component is a React component that displays user information, including their image,
 * display name, email, gender, age, and skin type.
 * @returns The function `UserInfo` returns a JSX element, which is a div containing an Image component
 * and two divs. The first div contains the user's profile image, displayed using the Image component.
 * The second div contains two nested divs. The first nested div displays the user's display name, and
 * the second nested div displays the user's email, gender, age, and skin type.
 */
export default function UserInfo() {
	const [user, setUser] = useState(null);
	const { data: session, status } = useSession();

	useEffect(() => {
		if (session) {
			setUser(session.user.user);
		}
	}, [session]);

	if (status === 'loading') return null;

	return (
		<div className="flex flex-col lg:flex-row gap-8 lg-p-0">
			{user?.img == 'no-posee-imagen' ? (
				<div className="bg-gray-200 rounded-md shadow-lg h-[250px] w-full lg:min-w-[250px] lg:max-w-[250px] flex justify-center items-center">
					<User className="h-14 w-14" />
				</div>
			) : (
				<Image
					alt={user?.displayName}
					src={getImgSrc('user', user?.img)}
					className="bg-gray-200 rounded-md shadow-lg h-[250px] w-full lg:min-w-[250px] lg:max-w-[250px] object-cover"
					width={300}
					height={300}
				/>
			)}

			<div className="flex flex-col w-full gap-8">
				<div className="bg-white dark:bg-[#020817] w-full shadow-lg py-4 px-6 rounded-md">
					<p className="text-xl font-semibold">{user?.displayName}</p>
				</div>
				<div className="flex flex-col justify-center items-start gap-1 bg-white dark:bg-[#020817] w-full h-full shadow-lg py-4 px-6 rounded-md">
					<p>Email: {user?.email}</p>
					<p>Genero: {user?.gender}</p>
					<p>Edad: {user?.age}</p>
					<p>Tipo de piel: {user?.skinType}</p>
				</div>
			</div>
		</div>
	);
}
