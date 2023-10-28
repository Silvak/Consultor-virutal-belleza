'use client';

import DashboardProductsSection from '@/components/DashboardProductsSection';
import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import DashboardUsersSection from '@/components/DashboardUsersSection';

export default function Page() {
	return (
		<div>
			<DashboardSpecialistCard
				specialist={{
					id: 1,
					name: 'specialist 1',
					description: 'specialist 1 description',
					specialty: 'specialty 1',
				}}
				variant="main"
			/>

			<DashboardProductsSection />

			<DashboardUsersSection />
		</div>
	);
}
