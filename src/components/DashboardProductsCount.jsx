import { getProducts } from '@/services/product.services';
import { useQuery } from '@tanstack/react-query';
import { Package } from 'lucide-react';
import CountSkeleton from './CountSkeleton';

function DashboardProductsCount() {
	const { data, status } = useQuery({
		queryKey: ['products', 1],
		queryFn: () => getProducts({ limit: 1 }),
	});

	return status == 'pending' ? (
		<CountSkeleton />
	) : (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Package className="h-8 w-8 text-[#7E8EFF]" />
			<p className=" font-medium">Productos</p>
			<p>{data.paginating.total}</p>
		</div>
	);
}

export default DashboardProductsCount;
