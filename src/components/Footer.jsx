import { Link } from 'lucide-react';
import React from 'react';

export default function Footer() {
	return (
		<section className="flex justify-center items-center w-full border-t border-gray-300/60">
			<div className="grid grid-cols-1 lg:grid-cols-4 h-full w-full max-w-[1200px] py-12  lg:gap-x-8 gap-y-12 lg:gap-y-0 px-4 lg:px-0">
				<div className="flex flex-col lg:flex-row justify-center items-start gap-8 col-span-1 lg:col-span-2">
					<h4 className="font-semibold text-2xl whitespace-nowrap">CBV-IA</h4>
					<div className="lg:border-l border-black lg:pl-8 text-sm">
						<h4 className="font-semibold text-lg">About Us</h4>
						<p className="">
							About us Lorem ipsum dolor sit amet consectetur. Eget est diam
							pharetra porttitor malesuada facilisi. Dui lorem eget morbi diam.
							Sit justo vitae venenatis est nunc vel tellus auctor. Odio
							tincidunt tempor hendrerit nunc felis aliquet urna mollis quam.
						</p>
					</div>
				</div>
				<div className="flex flex-col items-venter w-full justify-start text-sm">
					<h4 className="font-semibold text-lg">Quick Links</h4>
					<ul>
						<li>Home</li>
						<li>Services</li>
						<li>Products</li>
						<li>Contact Us</li>
					</ul>
				</div>

				<div className="flex flex-col items-venter w-full justify-start text-sm">
					<h4 className="font-semibold text-lg">Contact</h4>
					<p>email@email.com</p>
					<p>+34 00000212</p>
				</div>

				<div className="flex flex-col lg:flex-row justify-center items-center  w-full col-span-1 lg:col-span-4 mt-8  gap-4 lg:gap-10">
					<p className="font-semibold">2023 Utty. All right reserved</p>
					<ul className="flex gap-4 text-gray-600 text-sm">
						<li className="cursor-pointer">Terminos y condiciones</li>
						<li className="cursor-pointer">Politicas de privacidad</li>
						<li className="cursor-pointer">Seguridad</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
