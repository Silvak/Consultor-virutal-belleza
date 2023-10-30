import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.services';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';
import RecommendProductCard from './RecommendProductCard';
import { getImgSrc } from '@/lib/utils';

function UserDialog({ user }) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [selectedProducts, setSelectedProducts] = useState([]);
	const { data: productsData, status: productsStatus } = useQuery({
		queryKey: ['products', { limit: 3 }],
		queryFn: () =>
			getProducts({
				limit: 3,
			}),
	});

	// const debouncedSearch = useDebounce(search, 500);

	const swiperRef = useRef();

	function toggleSelected(id) {
		setSelectedProducts((prev) => {
			if (prev.includes(id)) {
				return prev.filter((p) => p !== id);
			} else {
				return [...prev, id];
			}
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger asChild>
				<p className="text-lg font-semibold text-slate-900 dark:text-slate-200 cursor-pointer">
					{user.displayName}
				</p>
			</DialogTrigger>

			<DialogContent>
				<div className="flex gap-2">
					{user.img != 'no-posee-imagen' ? (
						<img
							alt={user.displayName}
							src={getImgSrc('user', user.img)}
							className="w-28 h-28 rounded-md object-center object-contain"
						/>
					) : (
						<div className="w-28 h-28 bg-gray-500 rounded-md"></div>
					)}
					<div className="space-y-1">
						<p className="text-lg font-semibold text-slate-900 dark:text-slate-200">
							{user.displayName}
						</p>
						<p className="text-md font-medium text-slate-800 dark:text-slate-200">
							{user.gender == 'F' ? 'Female' : 'Male'}
						</p>
						<p className="text-sm text-slate-700 dark:text-slate-200">
							{user.skinType} skin
						</p>
					</div>
				</div>
				{productsStatus == 'success' && (
					<div className="space-y-4 mt-4">
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
								{productsData?.products?.map((product) => (
									<SwiperSlide key={product._id}>
										<div className="w-full h-24 bg-gray-500 rounded-md"></div>
									</SwiperSlide>
								))}
							</Swiper>
							<button onClick={() => swiperRef.current?.slideNext()}>
								<ChevronRight />
							</button>
						</div>
					</div>
				)}

				<div className="w-full space-y-4 mt-4">
					<h1 className=" font-semibold">Recommendations</h1>
					<div className="flex items-center gap-4 ">
						<div className="flex items-center gap-2 w-full">
							<Input
								type="text"
								id="search"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								className="border-none focus-visible:ring-1 h-fit p-1"
							/>
							<Label htmlFor="search">
								<Search className="text-gray-400" />
							</Label>
						</div>

						<Button
							className="px-4 py-2 h-fit rounded-xl bg-[#00A7D7] hover:bg-[#00A7D7]"
							disabled={selectedProducts.length < 1}
						>
							Enviar
						</Button>
					</div>
					<div>
						{productsData?.products?.map((product) => (
							<RecommendProductCard
								key={product._id}
								product={product}
								onClick={toggleSelected}
								selected={selectedProducts.includes(product._id)}
							/>
						))}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default UserDialog;
