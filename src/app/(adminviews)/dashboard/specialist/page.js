'use client';

import DashboardProductsSection from '@/components/DashboardProductsSection';
import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import DashboardUsersSection from '@/components/DashboardUsersSection';
import { useSession } from 'next-auth/react';

export default function Page() {
	const { data: session, status } = useSession();
	return (
		<div>
			{status == 'authenticated' && (
				<DashboardSpecialistCard
					specialist={session.user.user}
					variant="main"
				/>
			)}

			<DashboardProductsSection />

			<DashboardUsersSection />
		</div>
	);
}
