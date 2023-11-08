'use client';

import React from 'react';
import Image from 'next/image';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/navigation';

/**
 * The CategoryCard component is a React component that displays a card with an image and a header for
 * a specific category.
 * @returns a JSX element that represents a CategoryCard component. The component includes a Card
 * component from a UI library, an Image component, and a CardHeader component. The Card component has
 * various CSS classes applied to it for styling, and it contains the Image component and the
 * CardHeader component. The Image component displays an image with a source URL and alternative text.
 * The CardHeader component displays a
 */
export default function CategoryCard({ Category }) {
	const router = useRouter();
	return (
		<Card
			className="flex flex-col justify-center items-center gap-2 shadow-lg cursor-pointer hover:border-[#7E8EFF] lg:w-[132px] h-[132px] p-6"
			onClick={() => router.push(`/products/category/${Category._id}`)}
		>
			<div className="">
				<Image
					src={'/assets/vECTOR.PNG' || '/assets/palceholder.png'}
					alt="Picture of the product"
					className="rounded-md  object-cover"
					width={48}
					height={48}
				/>
			</div>

			<CardHeader className="flex flex-row  justify-center py-0">
				<h3 className="font-semibold text-center">{Category.title}</h3>
			</CardHeader>
		</Card>
	);
}
