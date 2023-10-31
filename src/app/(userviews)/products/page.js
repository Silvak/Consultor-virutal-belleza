import Carousel from '@/components/Carousel';
import ProductsSection from '@/components/ProductsSection';
import RecommendedProductsSection from '@/components/RecommendedProductsSection';

const data = [
	{
		title: 'Tarjeta 1',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 2',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 3',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 4',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 5',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 6',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
	{
		title: 'Tarjeta 7',
		description: 'Descripción de la tarjeta 1',
		image: '/assets/productTest.webp',
	},
];

export default function Page() {
	return (
		<div className=" max-w-[1200px] w-full m-auto py-16">
			<h1 className="text-2xl font-semibold mt-2">Busca tus productos</h1>
			<ProductsSection />

			<section className="pt-8">
				<h2 className="text-2xl font-semibold pl-4 mb-4">
					Recomendado para ti
				</h2>
				<div className="flex justify-center w-full">
					<Carousel data={data || []} />
				</div>
			</section>

			<RecommendedProductsSection />
		</div>
	);
}
