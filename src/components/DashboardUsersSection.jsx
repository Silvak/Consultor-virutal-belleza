import { useState } from 'react';
import DashboardUserCard from './DahsboardUserCard';
import DashboardCardsSkeletons from './DashboardCardSkeletons';
import Pagination from './Pagination';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/services/user.services';

export default function DashboardUsersSection() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(3);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['users', pageNumber, limit],
		queryFn: () =>
			getUsers({
				limit,
				offset: pageNumber,
			}),
	});

	return (
		<section className="my-6">
			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Users</h1>
			</div>
			<div>
				{status == 'pending' && <DashboardCardsSkeletons />}
				{status == 'success' && (
					<>
						{data?.users.map((user) => (
							<DashboardUserCard key={user._id} user={user} />
						))}
						<Pagination
							currentPage={pageNumber}
							siblingCount={2}
							totalPageCount={data?.paginating.totalpages}
							onPageChange={onPageChange}
						/>
					</>
				)}
			</div>
		</section>
	);
}
