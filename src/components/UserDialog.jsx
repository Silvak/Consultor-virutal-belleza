import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.services';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import DashboardProductCard from './DashboardProductCard';
import { Card } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function UserDialog({ user }) {
	const [isOpen, setIsOpen] = useState(false);
	const { data: productsData, status: productsStatus } = useQuery({
		queryKey: ['products', { limit: 10 }],
		queryFn: () =>
			getProducts({
				limit: 10,
			}),
	});

	const swiperRef = useRef();

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger asChild>
				<p className="text-lg font-semibold text-slate-900 cursor-pointer">
					{user.displayName}
				</p>
			</DialogTrigger>

			<DialogContent>
				<div className="flex gap-2">
					<div className="w-28 h-full bg-gray-500 rounded-md"></div>
					<div className="space-y-1">
						<p className="text-lg font-semibold text-slate-900">
							{user.displayName}
						</p>
						<p className="text-md font-medium text-slate-800">{user.email}</p>
						<p className="text-sm text-slate-700">{user.skinType}</p>
					</div>
				</div>
				{productsStatus == 'success' && (
					<div>
						<h1>Skin Care History</h1>

						<div className="flex items-center gap-2">
							<button onClick={() => swiperRef.current?.slidePrev()}>
								<ChevronLeft />
							</button>
							<Swiper
								onBeforeInit={(swiper) => {
									swiperRef.current = swiper;
								}}
								spaceBetween={10}
								slidesPerView={2}
								modules={[Navigation]}
								className="mySwiper w-[400px] flex gap-2"
							>
								{productsData?.products?.map((product) => (
									<SwiperSlide key={product._id}>
										<Card className="flex  flex-col gap-2 justify-between p-2 w-5/6 m-auto my-4">
											<div className="w-full h-20 bg-gray-500 rounded-md"></div>
											<div className="space-y-1">
												<p className="text-lg font-semibold text-slate-900">
													{product.name}
												</p>
												<p className="text-md font-medium text-slate-800">
													{product.brand}
												</p>
												<p className="text-sm text-slate-700">
													{product.description}
												</p>
												<p className="text-sm text-slate-700">
													{product.ingredients}
												</p>
											</div>
										</Card>
									</SwiperSlide>
								))}
							</Swiper>
							<button onClick={() => swiperRef.current?.slideNext()}>
								<ChevronRight />
							</button>
						</div>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}

export default UserDialog;
