import { getUsers } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { User } from 'lucide-react';
import CountSkeleton from './CountSkeleton';

function DashboardUsersCount() {
	const { data, status } = useQuery({
		queryKey: ['users', 'USER_ROLE'],
		queryFn: () =>
			getUsers({
				term: 'USER_ROLE',
			}),
	});

	return status == 'pending' ? (
		<CountSkeleton />
	) : (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<User className="h-8 w-8 text-[#7E8EFF]" />
			<p className=" font-medium">Usuarios</p>
			<p>{data.paginating.total}</p>
		</div>
	);
}

export default DashboardUsersCount;
