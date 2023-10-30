import Carousel from '@/components/Carousel';
import ProductsSection from '@/components/ProductsSection';

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
		<div className=" max-w-[1200px] w-full m-auto pt-8">
			<h1 className="text-2xl font-bold">Busca tus productos</h1>
			<ProductsSection />

			<section className="py-8">
				<h1 className="text-2xl font-bold">Recomendado para ti</h1>
				<div className="flex justify-center w-full px-0 lg:px-8">
					<Carousel data={data || []} />
				</div>
			</section>

			<section className="py-8">
				<h1 className="text-2xl font-bold">Recomendados por especialistas</h1>
				<div className="flex justify-center w-full px-0 lg:px-8">
					<Carousel data={data || []} />
				</div>
			</section>
		</div>
	);
}
