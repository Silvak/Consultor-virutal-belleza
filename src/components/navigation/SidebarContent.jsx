'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SidebarContent() {
	return (
		<div className="w-full px-8 py-4">
			<h2 className="text-xl mb-4 mt-4">Menú</h2>
			<ul>
				<li className="mb-2">Item 1</li>
				<li className="mb-2">Item 2</li>
				<li className="mb-2">Item 3</li>
			</ul>
		</div>
	);
}
