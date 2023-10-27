'use client';

import CreateProductDialog from '@/components/CreateProductDialog';
import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import DashboardSpecialistsCount from '@/components/DashboarSpecialistsCount';
import DashboardProductCard from '@/components/DashboardProductCard';
import DashboardProductsCount from '@/components/DashboardProductsCount';
import DashboardUsersCount from '@/components/DashboardUsersCount';
import React, { useState } from 'react';
import CreateSpecialistDialog from '@/components/CreateSpecialistDialog';
import DashboardUserCard from '@/components/DahsboardUserCard';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/product.services';
import { getUsers } from '@/services/user.services';
import Pagination from '@/components/Pagination';

const specialists = [
	{
		id: 1,
		name: 'specialist 1',
		description: 'specialist 1 description',
		specialty: 'specialty 1',
	},
	{
		id: 2,
		name: 'specialist 2',
		description: 'specialist 2 description',
		specialty: 'specialty 2',
	},
	{
		id: 3,
		name: 'specialist 3',
		description: 'specialist 3 description',
		specialty: 'specialty 3',
	},
];

export default function Page() {
	const [pageNumber, setPageNumber] = useState(1);
	const onPageChange = (page) => setPageNumber(page);
	const limit = 2;
	const offset =
		(pageNumber - 1) * limit > 0 ? (pageNumber - 1) * limit : undefined;

	const { data: productsData, status } = useQuery({
		queryKey: ['products', limit, offset],
		queryFn: () =>
			getProducts({
				limit,
				offset,
			}),
	});

	const { data: usersData, status: usersStatus } = useQuery({
		queryKey: ['users'],
		queryFn: getUsers,
		select: (data) => data?.data,
	});

	return (
		<div className="w-full">
			<div className="flex gap-4 w-full justify-stretch m-auto mt-4">
				<DashboardUsersCount count={5} />
				<DashboardProductsCount count={5} />
				<DashboardSpecialistsCount count={5} />
			</div>
			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Products</h1>
				<CreateProductDialog />
			</div>
			<div>
				{status == 'success' &&
					productsData?.products?.map((product) => (
						<DashboardProductCard key={product._id} product={product} />
					))}

				{status == 'success' && (
					<Pagination
						currentPage={pageNumber}
						siblingCount={2}
						totalPageCount={productsData?.paginating.totalpages}
						onPageChange={onPageChange}
					/>
				)}
			</div>

			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Specialists</h1>
				<CreateSpecialistDialog />
			</div>
			<div>
				{specialists.map((specialist) => (
					<DashboardSpecialistCard
						key={specialist.id}
						specialist={specialist}
					/>
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
