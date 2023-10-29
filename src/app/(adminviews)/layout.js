import Navbar from '@/components/navigation/Navbar';

export default function RootLayout({ children }) {
	return (
		<>
			{/* Nav user */}
			<Navbar />
			{/* Page Content */}
			<div className="flex justify-center w-full  mt-[56px]">
				<article className="max-w-[1200px] w-full border-x border-gray-100 overflow-hidden">
					{children}
				</article>
			</div>
		</>
	);
}
