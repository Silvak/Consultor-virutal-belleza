'use client';

import CreateProductDialog from '@/components/CreateProductDialog';
import DashboardUserCard from '@/components/DahsboardUserCard';
import DashboardProductCard from '@/components/DashboardProductCard';
import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import { getProducts } from '@/services/product.services';
import { getUsers } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export default function Page() {
	const { data: productsData, status: productsStatus } = useQuery({
		queryKey: ['products'],
		queryFn: getProducts,
		select: (data) => data?.data,
	});

	const { data: usersData, status: usersStatus } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
		select: (data) => data?.data,
	});

	return (
		<div>
			<DashboardSpecialistCard
				specialist={{
					id: 1,
					name: 'specialist 1',
					description: 'specialist 1 description',
					specialty: 'specialty 1',
				}}
				variant="main"
			/>
			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<CreateProductDialog />
			</div>
			<div>
				{productsStatus == 'success' &&
					productsData?.products?.map((product) => (
						<DashboardProductCard key={product._id} product={product} />
					))}
			</div>

			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Users</h1>
			</div>
			<div>
				{usersStatus == 'success' &&
					usersData?.users.map((user) => (
						<DashboardUserCard key={user._id} user={user} />
					))}
			</div>
		</div>
	);
}
