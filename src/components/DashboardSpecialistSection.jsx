import React, { useState } from 'react';
import CreateSpecialistDialog from './CreateSpecialistDialog';
import DashboardSpecialistCard from './DashboardSpecialistCard';
import { useQuery } from '@tanstack/react-query';
import Pagination from './Pagination';
import DashboardCardsSkeletons from './DashboardCardSkeletons';
import { getUsers } from '@/services/user.services';

function DashboardSpecialistSection() {
	const [pageNumber, setPageNumber] = useState(1);
	const [limit, setLimit] = useState(3);
	const onPageChange = (page) => setPageNumber(page);

	const { data, status } = useQuery({
		queryKey: ['users', pageNumber, limit, 'SPEC_ROLE'],
		queryFn: () =>
			getUsers({
				limit,
				offset: pageNumber,
				term: 'SPEC_ROLE',
			}),
	});
	return (
		<>
			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Especialistas</h1>
				<CreateSpecialistDialog />
			</div>
			<div>
				{status == 'pending' && <DashboardCardsSkeletons />}
				{status == 'success' && (
					<>
						{data?.users.map((specialist) => (
							<DashboardSpecialistCard
								key={specialist.id}
								specialist={specialist}
							/>
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
		</>
	);
}

export default DashboardSpecialistSection;
