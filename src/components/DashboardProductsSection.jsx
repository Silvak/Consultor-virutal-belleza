import CreateProductDialog from './CreateProductDialog';
import DashboardCardsSkeletons from './DashboardCardSkeletons';
import DashboardProductCard from './DashboardProductCard';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from './Pagination';
import { getProducts } from '@/services/product.services';
import CreateCategoryDialog from './CreateCategoryDialog';

export default function DashboardProductsSection() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(3);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['products', pageNumber, limit],
		queryFn: () =>
			getProducts({
				limit,
				offset: pageNumber,
			}),
	});

	return (
		<section className="my-6">
			<div className="w-full flex justify-between items-center">
				<h1 className="text-2xl font-bold">Productos</h1>

				<div className="flex gap-2">
					<CreateCategoryDialog />
					<CreateProductDialog />{' '}
				</div>
			</div>
			<div>
				{status == 'pending' && <DashboardCardsSkeletons />}
				{status == 'success' && (
					<>
						{data?.products?.map((product) => (
							<DashboardProductCard key={product._id} product={product} />
						))}
						<Pagination
							currentPage={pageNumber}
							siblingCount={2}
							totalPageCount={data?.paginating.totalpages}
							onPageChange={onPageChange}
						/>
					</>
				)}
			</div>
		</section>
	);
}
