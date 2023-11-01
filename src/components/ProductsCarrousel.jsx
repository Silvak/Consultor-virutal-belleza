'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Button } from './ui/button';
import { getImgSrc } from '@/lib/utils';

/* The code is defining a React functional component called `Carousel`. It takes a prop called `data`,
which is an array of objects representing the items to be displayed in the carousel. */
export default function ProductsCarousel({ data }) {
	const [activeSlide, setActiveSlide] = useState(0);
	const [itemByScreenRes, setItemByScreenRes] = useState(33.33);

	useEffect(() => {
		const slideTimer = setInterval(() => {
			nextSlide();
		}, 5000);

		// Calculate item width by screen resolution
		const calculatedWidth = window.innerWidth < 768 ? 100 : 33.33;
		if (data && data.length < 3) {
			setItemByScreenRes(100);
		} else {
			setItemByScreenRes(calculatedWidth);
		}

		return () => {
			clearInterval(slideTimer);
		};
	}, [activeSlide, data]);

	const nextSlide = () => {
		const newIndex = activeSlide + 1 >= data.length - 2 ? 0 : activeSlide + 1;
		setActiveSlide(newIndex);
	};

	const prevSlide = () => {
		const newIndex = activeSlide - 1 < 0 ? data.length - 3 : activeSlide - 1;
		setActiveSlide(newIndex);
	};

	return (
		<div className="relative w-full h-min overflow-x-hidden">
			<div
				className={`flex transition-transform duration-500 ease-in-out 	`}
				style={{ transform: `translateX(-${activeSlide * itemByScreenRes}%)` }}
			>
				{/* List items */}
				{data.map((product, index) => (
					<div
						className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-[33.33%] h-72 p-2 md:p-4"
						key={index}
					>
						<div className="relative bg-white w-full h-full overflow-hidden rounded-md shadow-lg cursor-pointer border border-gray-300/10  hover:border-[#7E8EFF] select-none">
							<Image
								src={getImgSrc('product', product.img)}
								alt={product.name}
								className="absolute top-0 left-0 w-full object-cover"
								width={500}
								height={400}
							/>

							<div className="absolute top-0 left-0 p-2 md:p-6 h-full w-full flex flex-col justify-end bg-gradient-to-t from-black/60 hover:bg-black/20 text-white">
								<h2 className="text-sm md:text-xl mt-2 md:mt-4 font-semibold">
									{product.name}
								</h2>
								<p className="mt-1 md:mt-2 text-xs md:text-base">
									{product.description}
								</p>
							</div>
						</div>
					</div>
				))}
			</div>

			{/* Navigation buttons */}
			<Button
				className="md:flex absolute top-1/2 left-2 transform -translate-y-1/2 bg-[#7E8EFF] text-white h-[40px] w-[40px] rounded-md shadow-md p-0 text-xl"
				onClick={prevSlide}
			>
				<IoIosArrowBack />
			</Button>
			<Button
				className="md:flex absolute top-1/2 right-2 transform -translate-y-1/2 bg-[#7E8EFF] text-white h-[40px] w-[40px] rounded-md shadow-md p-0 text-xl"
				onClick={nextSlide}
			>
				<IoIosArrowForward />
			</Button>
		</div>
	);
}
