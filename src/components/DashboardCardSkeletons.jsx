const { Skeleton } = require('./ui/skeleton');

function DashboardCardsSkeletons() {
	return (
		<div className="space-y-6 w-4/5 m-auto">
			<div className="flex items-center space-x-4">
				<Skeleton className="h-16 w-16 rounded-full bg-gray-300" />
				<div className="space-y-2 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-4/5  bg-gray-300" />
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<Skeleton className="h-16 w-16 rounded-full bg-gray-300" />
				<div className="space-y-2 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-4/5  bg-gray-300" />
				</div>
			</div>
			<div className="flex items-center space-x-4">
				<Skeleton className="h-16 w-16 rounded-full bg-gray-300" />
				<div className="space-y-2 w-full">
					<Skeleton className="h-5 w-full  bg-gray-300" />
					<Skeleton className="h-5 w-4/5  bg-gray-300" />
				</div>
			</div>
		</div>
	);
}

export default DashboardCardsSkeletons;
