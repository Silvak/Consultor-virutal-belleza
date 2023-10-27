import { Package } from 'lucide-react';

function DashboardProductsCount({ count }) {
	return (
		<div className="p-8 shadow-md rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Package className="h-8 w-8" />
			<p className=" font-medium">Products</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardProductsCount;
