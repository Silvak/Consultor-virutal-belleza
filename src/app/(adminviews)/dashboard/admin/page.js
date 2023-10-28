'use client';

import DashboardSpecialistCard from '@/components/DashboardSpecialistCard';
import DashboardSpecialistsCount from '@/components/DashboarSpecialistsCount';
import DashboardProductsCount from '@/components/DashboardProductsCount';
import DashboardUsersCount from '@/components/DashboardUsersCount';
import CreateSpecialistDialog from '@/components/CreateSpecialistDialog';
import DashboardProductsSection from '@/components/DashboardProductsSection';
import DashboardUsersSection from '@/components/DashboardUsersSection';

const specialists = [
	{
		id: 1,
		name: 'specialist 1',
		description: 'specialist 1 description',
		specialty: 'specialty 1',
	},
	{
		id: 2,
		name: 'specialist 2',
		description: 'specialist 2 description',
		specialty: 'specialty 2',
	},
	{
		id: 3,
		name: 'specialist 3',
		description: 'specialist 3 description',
		specialty: 'specialty 3',
	},
];

export default function Page() {
	return (
		<div className="w-full">
			<div className="flex gap-4 w-full justify-stretch m-auto mt-4">
				<DashboardUsersCount count={5} />
				<DashboardProductsCount count={5} />
				<DashboardSpecialistsCount count={5} />
			</div>

			<DashboardProductsSection />

			<div className="w-full  m-auto my-6 flex justify-between items-center">
				<h1 className="text-2xl font-bold">Specialists</h1>
				<CreateSpecialistDialog />
			</div>
			<div>
				{specialists.map((specialist) => (
					<DashboardSpecialistCard
						key={specialist.id}
						specialist={specialist}
					/>
				))}
			</div>

			<DashboardUsersSection />
		</div>
	);
}
