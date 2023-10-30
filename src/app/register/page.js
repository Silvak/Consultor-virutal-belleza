import RegisterForm from '@/components/RegisterForm';
import Link from 'next/link';
import React from 'react';

function page() {
	return (
		<div className="flex">
			<div className="w-2/5 h-screen pr-4 bg-gray-700 rounded-e-md">
				<div
					className="w-full h-screen bg-no-repeat bg-cover bg-center rounded-e-md"
					style={{
						backgroundImage: 'url(/assets/register.png)',
					}}
				></div>
			</div>

			<div className="w-3/5 flex flex-col justify-center items-center space-y-4">
				<h1 className="text-2xl font-bold">Welcome</h1>
				<RegisterForm />

				<p>
					Already have an account?{' '}
					<Link href="/login" className="text-[#7E8EFF]">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}

export default page;
