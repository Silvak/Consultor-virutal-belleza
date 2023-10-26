import { Edit } from 'lucide-react';
import DeleteUserDialog from './DeleteUserDialog';
import { Card } from './ui/card';
import EditSpecialistDialog from './EditSpecialistDialog';

function DashboardSpecialistCard({ specialist, variant = 'secondary' }) {
	return (
		<Card className="flex gap-2 justify-between p-2 w-full m-auto my-4">
			<div className="flex gap-2">
				<div
					className={`${
						variant == 'secondary' ? 'w-28' : 'w-40 h-32'
					} w-28 h-full bg-gray-500 rounded-md`}
				></div>
				<div className="space-y-1">
					<p className="text-lg font-semibold text-slate-900">
						{specialist.name}
					</p>
					<p className="text-md font-medium text-slate-800">
						{specialist.specialty}
					</p>
					<p className="text-sm text-slate-700">{specialist.description}</p>
				</div>
			</div>
			<div>
				<EditSpecialistDialog specialist={specialist} />
				<DeleteUserDialog id={specialist.id} />
			</div>
		</Card>
	);
}

export default DashboardSpecialistCard;
