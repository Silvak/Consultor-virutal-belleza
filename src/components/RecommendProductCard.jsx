import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';

const { Card } = require('./ui/card');

function RecommendProductCard({ product, onClick, selected }) {
	return (
		<Card
			className={`flex gap-2 p-1 w-full m-auto my-2 cursor-pointer ${
				selected ? 'ring-2' : ''
			}`}
			onClick={() => onClick(product._id)}
		>
			<Image
				alt={product.name}
				src={getImgSrc('product', product.img)}
				className="w-20 h-20 rounded-md object-center object-contain"
				width={80}
				height={80}
			/>

			<div className="space-y-1">
				<p className="text-base font-semibold text-slate-900 dark:text-slate-200">
					{product.name}
				</p>
				<p className="text-sm font-medium text-slate-800 dark:text-slate-200">
					{product.brand}
				</p>
			</div>
		</Card>
	);
}

export default RecommendProductCard;
