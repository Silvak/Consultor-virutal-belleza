'use client';
import Link from 'next/link';
import skin from '../../../public/assets/skin.jpeg';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
	const router = useRouter();

	return (
		<div className="min-h-screen flex">
			<div className="flex-1 bg-white">
				<div className="p-24">
					<h2 className="text-[#023A4B] font-inter font-semibold text-[31.25px] mb-4">
						Consultor virtual de belleza
					</h2>
					<h3 className="text-[#7E8EFF] font-inter font-extrabold text-[48.83px] my-4">
						¡Descúbrete!
					</h3>
					<p className="text-[#023A4B] font-inter font-medium text-[25px] mb-5">
						Bienvenido a Consultor virtual de belleza, tu asistente
						personalizado para todas tus necesidades de belleza y cuidado de la
						piel. Entendemos que cada persona es única y que no hay una solución
						única para todos cuando se trata de belleza y cuidado personal.
					</p>
					<Link href="/home">
						<button
							className="bg-white animate-pulsate text-custom-blue px-10 py-4 rounded-lg font-bold text-lg cursor-pointer shadow-custom-blue"
							onClick={() => router.push('/login')}
						>
							Empezar
						</button>
					</Link>
				</div>
			</div>
			<div
				className="flex-1 bg-cover bg-center opacity-4"
				style={{ backgroundImage: `url(/assets/skin.jpeg)` }}
			></div>
		</div>
	);
}
