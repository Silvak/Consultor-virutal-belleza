import { Skeleton } from './ui/skeleton';

function CountSkeleton() {
	return (
		<div className="flex flex-col space-y-4 w-full items-center mx-8 my-4">
			<Skeleton className="h-16 w-16 rounded-full bg-gray-300" />
			<div className="space-y-2 w-full">
				<Skeleton className="h-4 w-full  bg-gray-300" />
				<Skeleton className="h-4 w-4/5  bg-gray-300" />
			</div>
		</div>
	);
}

export default CountSkeleton;
