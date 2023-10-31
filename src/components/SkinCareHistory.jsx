import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useRef } from 'react';

function SkinCareHistory({ skinCareHistory }) {
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
						className="mySwiper w-[300px] md:w-[400px] flex gap-2"
					>
						{skinCareHistory?.map((skinCare) => (
							<SwiperSlide key={skinCare._id}>
								<div className="w-full h-24 bg-gray-500 rounded-md"></div>
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
