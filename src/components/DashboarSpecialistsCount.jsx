import { Star } from 'lucide-react';

function DashboardSpecialistsCount({ count }) {
	return (
		<div className="p-8 shadow-lg rounded-md flex flex-col items-center justify-center gap-2 w-full">
			<Star className="h-8 w-8 text-[#7E8EFF]" />
			<p className=" font-medium">Especialistas</p>
			<p>{count}</p>
		</div>
	);
}

export default DashboardSpecialistsCount;
