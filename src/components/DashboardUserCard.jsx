import { getImgSrc } from '@/lib/utils';
import DeleteUserDialog from './DeleteUserDialog';
import UserDialog from './UserDialog';
import { Card } from './ui/card';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

function DashboardUserCard({ user }) {
	const { data: session, status } = useSession();
	return (
		<Card className="flex shadow-lg gap-2 justify-between p-2 w-full m-auto my-4">
			<div className="flex gap-2">
				{user.img != 'no-posee-imagen' ? (
					<Image
						alt={user.displayName}
						src={getImgSrc('user', user.img)}
						className="w-28 h-28 rounded-md object-center object-contain"
						width={112}
						height={112}
					/>
				) : (
					<div className="w-28 h-28 bg-gray-500 rounded-md"></div>
				)}
				<div className="space-y-1">
					{status === 'authenticated' &&
					session.user.user.rol == 'ESPEC_ROLE' ? (
						<UserDialog user={user} />
					) : (
						<p className="text-lg font-semibold text-slate-900 dark:text-slate-200">
							{user.displayName}
						</p>
					)}

					<p className="text-md font-medium text-slate-800 dark:text-slate-200">
						{user.email}
					</p>
					<p className="text-sm text-slate-800 dark:text-slate-300">
						{user.skinType}
					</p>
				</div>
			</div>
			{status === 'authenticated' && session.user.user.rol == 'ADMIN_ROLE' && (
				<div>
					<DeleteUserDialog id={user.id} />
				</div>
			)}
		</Card>
	);
}

export default DashboardUserCard;
