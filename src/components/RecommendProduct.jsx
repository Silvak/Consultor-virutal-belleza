import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search } from 'lucide-react';
import { Button } from './ui/button';
import DashboardCardsSkeletons from './DashboardCardSkeletons';
import RecommendProductCard from './RecommendProductCard';
import useDebounce from '@/hooks/useDebounce';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addRecommendation } from '@/services/user.services';
import { getProducts } from '@/services/product.services';
import { useToast } from './ui/use-toast';

function RecommendProduct({ userId }) {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 500);
	const [selectedProducts, setSelectedProducts] = useState([]);
	const { data: productsData, status: productsStatus } = useQuery({
		queryKey: ['products', { limit: 3, term: debouncedSearch }],
		queryFn: () =>
			getProducts({
				limit: 3,
				term: debouncedSearch,
			}),
	});
	const { mutate, status: addRecommendationStatus } = useMutation({
		mutationKeyKey: ['recommendations', { userId, products: selectedProducts }],
		mutationFn: addRecommendation,
	});
	const { toast } = useToast();

	function toggleSelected(id) {
		setSelectedProducts((prev) => {
			if (prev.includes(id)) {
				return prev.filter((p) => p != id);
			} else {
				return [...prev, id];
			}
		});
	}

	function onClick() {
		mutate(
			{ userId, products: selectedProducts },
			{
				onSuccess: () => {
					setSelectedProducts([]);
					toast({
						title: 'Recomendaciones enviadas correctamente',
						status: 'success',
					});
				},
				onError: (error) => {
					toast({
						title: 'Ha ocurrido un error al enviar las recomendaciones',
						status: 'error',
					});
					console.log(error);
				},
			}
		);
	}

	return (
		<section>
			<div className="w-full space-y-4 mt-4">
				<h1 className=" font-semibold">Recomendaciones</h1>
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
						className="px-4 py-2 h-fit rounded-xl bg-[#7E8EFF] hover:bg-[#7E8EFF]"
						disabled={selectedProducts.length < 1}
						onClick={onClick}
					>
						Enviar
					</Button>
				</div>
				<div>
					{productsStatus == 'pending' ? (
						<DashboardCardsSkeletons />
					) : productsData?.products.length > 0 ? (
						productsData?.products?.map((product) => (
							<RecommendProductCard
								key={product._id}
								product={product}
								onClick={toggleSelected}
								selected={selectedProducts.includes(product._id)}
							/>
						))
					) : (
						<p className="text-gray-400 text-center">
							No products found with that name
						</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default RecommendProduct;
