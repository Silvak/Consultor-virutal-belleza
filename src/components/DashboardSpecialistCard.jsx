import { User } from 'lucide-react';
import DeleteUserDialog from './DeleteUserDialog';
import { Card } from './ui/card';
import EditSpecialistDialog from './EditSpecialistDialog';
import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';

function DashboardSpecialistCard({ specialist, variant = 'secondary' }) {
	return (
		<Card className="flex shadow-lg gap-2 justify-between p-2 w-full m-auto my-4">
			<div className="flex gap-2">
				{specialist.img != 'no-posee-imagen' ? (
					<Image
						alt={specialist.displayName}
						src={getImgSrc('user', specialist.img)}
						className="w-28 h-28 rounded-md object-center object-contain"
						width={112}
						height={112}
					/>
				) : (
					<div className="w-28 h-28 bg-gray-200 rounded-md flex items-center justify-center">
						<User className="h-14 w-14" />
					</div>
				)}
				<div className="space-y-1">
					<p className="text-lg font-semibold text-slate-900 dark:text-slate-200">
						{specialist.displayName}
					</p>
					<p className="text-md font-medium text-slate-800 dark:text-slate-200">
						{specialist.email}
					</p>
				</div>
			</div>
			<div>
				<EditSpecialistDialog specialist={specialist} />
				{variant == 'secondary' && <DeleteUserDialog id={specialist.id} />}
			</div>
		</Card>
	);
}

export default DashboardSpecialistCard;
