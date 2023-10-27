import { User } from 'lucide-react';

function DashboardUsersCount({ count }) {
	return (
		<div className="p-8 shadow-md rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<User className="h-8 w-8" />
			<p className=" font-medium">Users</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardUsersCount;
