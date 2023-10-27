import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getProductImgSrc(imageName) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}/files/product/${imageName}`;
}
