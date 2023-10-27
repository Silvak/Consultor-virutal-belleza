'use client';

import DeleteProductDialog from './DeleteProductDialog';
import EditProductDialog from './EditProductDialog';
import { Card } from './ui/card';

function DashboardProductCard({ product }) {
	return (
		<Card className="flex gap-2 justify-between p-2 w-full m-auto my-4 shadow-lg">
			<div className="flex gap-2">
				<div className="w-28 h-full bg-gray-500 rounded-md"></div>
				<div className="space-y-1">
					<p className="text-lg font-semibold text-slate-900 dark:text-slate-200">
						{product.name}
					</p>
					<p className="text-md font-medium text-slate-800 dark:text-slate-200">
						{product.brand}
					</p>
					<p className="text-sm text-slate-700 dark:text-slate-300">
						{product.description}
					</p>
					<p className="text-sm text-slate-700 dark:text-slate-300">
						{product.ingredients}
					</p>
				</div>
			</div>
			<div>
				<EditProductDialog product={product} />
				<DeleteProductDialog id={product._id} />
			</div>
		</Card>
	);
}

export default DashboardProductCard;
