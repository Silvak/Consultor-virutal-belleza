'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import ProductsCarousel from './ProductsCarrousel';

function RecommendedProductsSection() {
	const { data: session, status } = useSession();

	return (
		status == 'authenticated' &&
		session.user.user.recomendation.length > 0 && (
			<section className="pt-8">
				<h2 className="text-2xl font-semibold pl-4 mb-4">
					Recomendados por especialistas
				</h2>
				<div className="flex justify-center w-full">
					<ProductsCarousel
						data={session.user.user.recomendation[0].products || []}
					/>
				</div>
			</section>
		)
	);
}

export default RecommendedProductsSection;
