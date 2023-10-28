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
import DashboardCardsSkeletons from '@/components/DashboardCardSkeletons';

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
	const [productsPageNumber, setProductsPageNumber] = useState(1);
	const [productsLimit, setProductsLimit] = useState(3);
	const onProductsPageChange = (page) => setProductsPageNumber(page);

	const { data: productsData, status } = useQuery({
		queryKey: ['products', productsLimit, productsPageNumber],
		queryFn: () =>
			getProducts({
				limit: productsLimit,
				offset: productsPageNumber,
			}),
	});

	const [usersPageNumber, setUsersPageNumber] = useState(1);
	const [usersLimit, setUsersLimit] = useState(3);
	const onUsersPageChange = (page) => setUsersPageNumber(page);

	const { data: usersData, status: usersStatus } = useQuery({
		queryKey: ['users', usersPageNumber, usersLimit],
		queryFn: () =>
			getUsers({
				limit: usersLimit,
				offset: usersPageNumber,
			}),
	});

	console.log(usersData);

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
				{status == 'pending' && <DashboardCardsSkeletons />}
				{status == 'success' && (
					<>
						{productsData?.products?.map((product) => (
							<DashboardProductCard key={product._id} product={product} />
						))}
						<Pagination
							currentPage={productsPageNumber}
							siblingCount={2}
							totalPageCount={productsData?.paginating.totalpages}
							onPageChange={onProductsPageChange}
						/>
					</>
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
				{usersStatus == 'pending' && <DashboardCardsSkeletons />}
				{usersStatus == 'success' && (
					<>
						{usersData?.users.map((user) => (
							<DashboardUserCard key={user._id} user={user} />
						))}
						<Pagination
							currentPage={usersPageNumber}
							siblingCount={2}
							totalPageCount={usersData?.paginating.totalpages}
							onPageChange={onUsersPageChange}
						/>
					</>
				)}
			</div>
		</div>
	);
}
