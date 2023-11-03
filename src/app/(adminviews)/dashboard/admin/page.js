'use client';

import DashboardSpecialistsCount from '@/components/DashboarSpecialistsCount';
import DashboardProductsCount from '@/components/DashboardProductsCount';
import DashboardUsersCount from '@/components/DashboardUsersCount';
import DashboardProductsSection from '@/components/DashboardProductsSection';
import DashboardUsersSection from '@/components/DashboardUsersSection';
import DashboardSpecialistSection from '@/components/DashboardSpecialistSection';

export default function Page() {
	return (
		<div className="w-full">
			<div className="flex gap-4 w-full justify-stretch m-auto mt-4">
				<DashboardUsersCount count={5} />
				<DashboardProductsCount count={5} />
				<DashboardSpecialistsCount count={5} />
			</div>

			<DashboardProductsSection />

			<DashboardSpecialistSection />

			<DashboardUsersSection />
		</div>
	);
}
