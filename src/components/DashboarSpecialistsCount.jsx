import { Star } from 'lucide-react';

function DashboardSpecialistsCount({ count }) {
	return (
		<div className="p-8 shadow-md rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Star className="h-8 w-8" />
			<p className=" font-medium">Specialists</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardSpecialistsCount;
