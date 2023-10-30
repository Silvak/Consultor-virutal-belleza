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
import { AiOutlineHeart, AiOutlineStar } from 'react-icons/ai';
import { getImgSrc } from '@/lib/utils';

export default function ProductCard({ product }) {
	return (
		<Card className="shadow-lg cursor-pointer hover:border-[#7E8EFF]">
			<div className="px-6 pt-6 w-full">
				<Image
					src={getImgSrc('product', product.img) || '/assets/productTest.webp'}
					alt={product.name}
					className="rounded-md max-w-full h-[200px] object-cover object-center"
					width={500}
					height={500}
				/>
			</div>

			<CardHeader className="flex flex-row justify-between">
				<div className="flex flex-col gap-1">
					<CardTitle>{product.name}</CardTitle>
					<p>{product.brand}</p>
					<div className="flex gap-1 mt-1">
						{[...Array(5)].map((_, index) => (
							<AiOutlineStar key={index} className="text-xl md:text-[24px]" />
						))}
					</div>
				</div>
				<div className="">
					<AiOutlineHeart className="text-[24px]" />
				</div>
			</CardHeader>
			<CardContent>
				<CardDescription className="text-xs text-gray-400">
					{product.description}
				</CardDescription>
			</CardContent>
			{/* <CardFooter className=""></CardFooter> */}
		</Card>
	);
}
