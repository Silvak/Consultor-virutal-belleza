const { Card } = require('./ui/card');

function RecommendProductCard({ product, onClick, selected }) {
	return (
		<Card
			className={`flex gap-2 p-2 w-full m-auto my-4 cursor-pointer ${
				selected ? 'ring-2' : ''
			}`}
			onClick={() => onClick(product._id)}
		>
			<div className="w-24 h-16 bg-gray-500 rounded-md"></div>
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
