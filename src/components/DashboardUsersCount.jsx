import { User } from 'lucide-react';

function DashboardUsersCount({ count }) {
	return (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<User className="h-8 w-8 text-[#7E8EFF]" />
			<p className=" font-medium">Usuarios</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardUsersCount;
