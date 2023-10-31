'use client';

import DashboardProductsSection from '@/components/DashboardProductsSection';
import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import DashboardUsersSection from '@/components/DashboardUsersSection';
import { getUser } from '@/services/user.services';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export default function Page() {
	const { data: session, status } = useSession();
	const { data: userData, status: userStatus } = useQuery({
		queryKey: ['user'],
		queryFn: () => getUser(session.user.user._id),
		enabled: status == 'authenticated',
		select: (data) => data?.data,
	});
	return (
		<div>
			{status == 'authenticated' && userData && (
				<DashboardSpecialistCard specialist={userData} variant="main" />
			)}

			<DashboardProductsSection />

			<DashboardUsersSection />
		</div>
	);
}
