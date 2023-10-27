import DeleteUserDialog from './DeleteUserDialog';
import UserDialog from './UserDialog';
import { Card } from './ui/card';

function DashboardUserCard({ user }) {
	return (
		<Card className="flex shadow-lg gap-2 justify-between p-2 w-full m-auto my-4">
			<div className="flex gap-2">
				<div className="w-28 h-full bg-gray-500 rounded-md"></div>
				<div className="space-y-1">
					<UserDialog user={user} />
					<p className="text-md font-medium text-slate-800 dark:text-slate-200">
						{user.email}
					</p>
					<p className="text-sm text-slate-300">{user.skinType}</p>
				</div>
			</div>
			<div>
				<DeleteUserDialog id={user.id} />
			</div>
		</Card>
	);
}

export default DashboardUserCard;
