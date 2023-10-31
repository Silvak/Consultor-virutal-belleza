import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';
import Image from 'next/image';
import { getImgSrc } from '@/lib/utils';

function SkinCareHistory({ skinCareHistory }) {
	console.log(skinCareHistory);
	const swiperRef = useRef();
	return (
		skinCareHistory.length > 0 && (
			<section className="space-y-4 mt-4">
				<h1 className=" font-semibold">Skin Care History</h1>

				<div className="flex items-center gap-2">
					<button onClick={() => swiperRef.current?.slidePrev()}>
						<ChevronLeft />
					</button>
					<Swiper
						onBeforeInit={(swiper) => {
							swiperRef.current = swiper;
						}}
						spaceBetween={10}
						slidesPerView={3}
						modules={[Navigation]}
						className="mySwiper w-[300px] md:w-[400px]"
					>
						{skinCareHistory?.map((skinCare) => (
							<SwiperSlide key={skinCare._id}>
								<div className="flex flex-col justify-center items-center w-fit h-fit">
									<Image
										alt={skinCare._id}
										src={getImgSrc('skin-care', skinCare.img)}
										className="w-24 h-24 rounded-md object-center object-contain"
										width={96}
										height={96}
									/>
									<p className="text-xs text-slate-700 dark:text-slate-200 mt-1">
										{new Date(skinCare.fecha_envio).toLocaleDateString()}
									</p>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
					<button onClick={() => swiperRef.current?.slideNext()}>
						<ChevronRight />
					</button>
				</div>
			</section>
		)
	);
}

export default SkinCareHistory;
