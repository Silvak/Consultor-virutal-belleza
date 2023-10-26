import CreateProductDialog from '@/components/CreateProductDialog';
import DashboardSpecialistsCount from '@/components/DashboarSpecialistsCount';
import DashboardProductCard from '@/components/DashboardProductCard';
import DashboardProductsCount from '@/components/DashboardProductsCount';
import DashboardUsersCount from '@/components/DashboardUsersCount';
import React from 'react';

const products = [];

export default function Page() {
	return (
		<div className="w-full">
			<div className="flex gap-4  w-3/5 justify-stretch m-auto">
				<DashboardUsersCount count={5} />
				<DashboardProductsCount count={5} />
				<DashboardSpecialistsCount count={5} />
			</div>
			<div className="w-3/5  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<CreateProductDialog />
			</div>
			<DashboardProductCard
				product={{
					id: 1,
					name: 'Producto 1',
					description: 'Descripción del producto 1',
					ingredients: 'Ingredientes del producto 1',
					brand: 'Marca 1',
				}}
			/>
			<DashboardProductCard
				product={{
					id: 1,
					name: 'Producto 1',
					description: 'Descripción del producto 1',
					ingredients: 'Ingredientes del producto 1',
					brand: 'Marca 1',
				}}
			/>
			<DashboardProductCard
				product={{
					id: 1,
					name: 'Producto 1',
					description: 'Descripción del producto 1',
					ingredients: 'Ingredientes del producto 1',
					brand: 'Marca 1',
				}}
			/>
		</div>
	);
}
