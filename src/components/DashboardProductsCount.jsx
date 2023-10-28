import { Package } from 'lucide-react';

function DashboardProductsCount({ count }) {
	return (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Package className="h-8 w-8 text-[#00A7D7]" />
			<p className=" font-medium">Products</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardProductsCount;
