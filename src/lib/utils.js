import { clsx } from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function getImgSrc(type = 'user', imageName) {
	return `${process.env.NEXT_PUBLIC_BASE_URL}/files/${type}/${imageName}`;
}

export function isExpired(date) {
	return dayjs.unix(date).diff(dayjs()) < 1;
}
