'use client';
import { useState } from 'react';
import SidebarContent from './SidebarContent';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Sidebar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			{/* show/hide button*/}
			<Avatar onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
				<AvatarImage src="https://github.com/shadcn.png" />
				<AvatarFallback>CN</AvatarFallback>
			</Avatar>

			{isOpen && (
				// blurred background element  bg-opacity-50
				<div className="absolute top-0 left-0 inset-0 bg-gray backdrop-blur-sm z- transition-opacity duration-300"></div>
			)}

			{/* Content */}
			<div
				className={`fixed top-0 right-0 w-[400px] h-screen flex flex-col bg-white border-l border-gray-300 transform transition-transform duration-300 z-20 ${
					isOpen ? 'translate-x-0' : 'translate-x-[100%]'
				}`}
			>
				{/* Close Button */}
				<div className="flex w-full h-[56px] justify-end items-center border-b border-gray-200 px-8">
					<button
						onClick={() => setIsOpen(false)}
						className="absolute flex items-center justify-center h-[40px] w-[40px] p-2 rounded-full"
					>
						X
					</button>
				</div>
				<SidebarContent />
			</div>
		</div>
	);
}
