'use client';

import { getImgSrc } from '@/lib/utils';
import DeleteProductDialog from './DeleteProductDialog';
import EditProductDialog from './EditProductDialog';
import { Card } from './ui/card';
import { AiOutlineStar } from 'react-icons/ai';

function DashboardProductCard({ product }) {
	return (
		<Card className="flex gap-2 justify-between p-2 w-full m-auto my-4 shadow-lg">
			<div className="flex gap-2">
				{product.img != 'no-posee-imagen' ? (
					<img
						alt={product.name}
						src={getImgSrc('product', product.img)}
						className="w-28 h-28 rounded-md object-center object-contain"
					/>
				) : (
					<div className="w-28 h-20 bg-gray-500 rounded-md"></div>
				)}

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
						{product.skinTypeProduct} skin
					</p>
				</div>
			</div>
			<div className="flex flex-col justify-between align-bottom ">
				<div className="flex justify-end">
					<EditProductDialog product={product} />
					<DeleteProductDialog id={product._id} />
				</div>

				<div className="flex gap-1 mt-1 pr-2">
					{[...Array(5)].map((_, index) => (
						<AiOutlineStar key={index} className="text-xl md:text-[24px]" />
					))}
				</div>
			</div>
		</Card>
	);
}

export default DashboardProductCard;
