import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useState } from 'react';
import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';
import RecommendProduct from './RecommendProduct';
import SkinCareHistory from './SkinCareHistory';
import { useSession } from 'next-auth/react';

function UserDialog({ user }) {
	const { data: session, status } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger asChild>
				<p className="text-lg font-semibold text-slate-900 dark:text-slate-200 cursor-pointer">
					{user.displayName}
				</p>
			</DialogTrigger>

			<DialogContent>
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
						<p className="text-lg font-semibold text-slate-900 dark:text-slate-200">
							{user.displayName}
						</p>
						<p className="text-md font-medium text-slate-800 dark:text-slate-200">
							{user.gender == 'F' ? 'Female' : 'Male'}
						</p>
						<p className="text-sm text-slate-700 dark:text-slate-200">
							{user.skinType} skin
						</p>
					</div>
				</div>

				<SkinCareHistory skinCareHistory={user.skinCare} />

				{status === 'authenticated' &&
					session.user.user.rol == 'ESPEC_ROLE' && (
						<RecommendProduct userId={user._id} />
					)}
			</DialogContent>
		</Dialog>
	);
}

export default UserDialog;
