'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { getImgSrc } from '@/lib/utils';
import { User } from 'lucide-react';
import { getUser, uploadUserImage } from '@/services/user.services';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';

/**
 * The UserInfo component is a React component that displays user information, including their image,
 * display name, email, gender, age, and skin type.
 * @returns The function `UserInfo` returns a JSX element, which is a div containing an Image component
 * and two divs. The first div contains the user's profile image, displayed using the Image component.
 * The second div contains two nested divs. The first nested div displays the user's display name, and
 * the second nested div displays the user's email, gender, age, and skin type.
 */
export default function UserInfo() {
	const queryClient = useQueryClient();
	const [userImage, setUserImage] = useState(null);
	const { data: session, status } = useSession();
	const { data: userData, status: userStatus } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(session.user.user._id),
		enabled: status == 'authenticated',
		select: (data) => data?.data,
	});
	const { toast } = useToast();

	async function changeImageProfile(userImage) {
		try {
			const formData = new FormData();
			formData.append('image', userImage, userImage.name);
			await uploadUserImage(userData._id, formData);
			queryClient.invalidateQueries(['user']);
			toast({ title: 'Foto de perfil actualizada' });
		} catch (e) {
			console.log(e);
			toast({
				title: 'Error al subir la imagen',
				variant: 'destructive',
			});
		}
	}

	if (status === 'loading' || userStatus == 'pending') return null;

	return (
		<div className="flex flex-col lg:flex-row gap-8 lg-p-0">
			<label htmlFor="userProfileImage" className="cursor-pointer">
				{userData?.img == 'no-posee-imagen' ? (
					<div className="bg-gray-200 rounded-md shadow-lg h-[250px] w-full lg:min-w-[250px] lg:max-w-[250px] flex justify-center items-center">
						<User className="h-14 w-14" />
					</div>
				) : (
					<Image
						alt={userData?.displayName}
						src={getImgSrc('user', userData?.img)}
						className="bg-gray-200 rounded-md shadow-lg h-[250px] w-full lg:min-w-[250px] lg:max-w-[250px] object-cover"
						width={300}
						height={300}
					/>
				)}
			</label>

			<Input
				type="file"
				className="bg-gray-200 hidden"
				onChange={(e) => {
					if (e.target.files) {
						if (e.target.files[0]) {
							setUserImage(e.target.files[0]);
							changeImageProfile(e.target.files[0]);
						} else {
							setUserImage(null);
						}
					}
				}}
				name="userProfileImage"
				value={userImage?.filename}
				id="userProfileImage"
			/>

			<div className="flex flex-col w-full gap-8">
				<div className="bg-white dark:bg-[#020817] w-full shadow-lg py-4 px-6 rounded-md">
					<p className="text-xl font-semibold">{userData?.displayName}</p>
				</div>
				<div className="flex flex-col justify-center items-start gap-1 bg-white dark:bg-[#020817] w-full h-full shadow-lg py-4 px-6 rounded-md">
					<p>Email: {userData?.email}</p>
					<p>Genero: {userData?.gender}</p>
					<p>Edad: {userData?.age}</p>
					<p>Tipo de piel: {userData?.skinType}</p>
				</div>
			</div>
		</div>
	);
}
