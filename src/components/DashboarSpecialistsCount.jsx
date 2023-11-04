import { getUsers } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import CountSkeleton from './CountSkeleton';

function DashboardSpecialistsCount() {
	const { data, status } = useQuery({
		queryKey: ['users', 'ESPEC_ROLE'],
		queryFn: () =>
			getUsers({
				term: 'ESPEC_ROLE',
			}),
	});

	return status == 'pending' ? (
		<CountSkeleton />
	) : (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Star className="h-8 w-8 text-[#7E8EFF]" />
			<p className=" font-medium">Especialistas</p>
			<p>{data.paginating.total}</p>
		</div>
	);
}

export default DashboardSpecialistsCount;
