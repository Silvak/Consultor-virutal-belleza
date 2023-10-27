'use client';

import { usePagination } from '@/hooks/usePagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = (props) => {
	const { totalPageCount, siblingCount = 1, currentPage, onPageChange } = props;

	const paginationRange = usePagination({
		currentPage,
		totalPageCount,
		siblingCount,
	});

	// If there are less than 2 times in pagination range we shall not render the component
	if (currentPage === 0 || paginationRange?.length < 2) {
		return null;
	}

	const onNext = () => {
		if (currentPage < totalPageCount) onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange?.length - 1];

	return (
		<ul className="flex list-none items-center justify-between w-fit gap-4 m-auto">
			{/* Left navigation arrow */}
			<li
				onClick={onPrevious}
				className={`w-fit ${
					currentPage === 1
						? ' hover:bg-transparent hover:cursor-default'
						: 'py-0 px-1 h-8 text-center mx-auto my-1 text-black flex items-center rounded-xl text-xs hover:cursor-pointer hover:bg-slate-500'
				}`}
			>
				<ChevronLeft
					className={currentPage === 1 ? 'text-gray-500' : 'text-black'}
				/>
			</li>
			{paginationRange.map((pageNumber) => {
				// If the pageItem is a DOT, render the DOTS unicode character
				if (pageNumber === '...') {
					return (
						<li
							className="w-fit py-0 px-1 h-8 text-center mx-auto my-1 text-black flex items-center rounded-xl text-xs  bg-transparent"
							key={pageNumber}
						>
							&#8230;
						</li>
					);
				}

				// Render our Page Pills
				return (
					<li
						onClick={() => onPageChange(Number(pageNumber))}
						className={`w-fit p-4 h-8 text-center mx-auto my-1 text-black flex items-center rounded-xl text-xs hover:cursor-pointer  ${
							pageNumber === currentPage ? 'bg-gray-300' : 'hover:bg-slate-500'
						}`}
						key={pageNumber}
					>
						{pageNumber}
					</li>
				);
			})}
			{/*  Right Navigation arrow */}
			<li
				onClick={onNext}
				className={`w-fit ${
					currentPage === lastPage
						? ' hover:bg-transparent hover:cursor-default'
						: 'py-0 px-1 h-8 text-center mx-auto my-1 text-black flex items-center rounded-xl text-xs hover:cursor-pointer hover:bg-slate-500'
				}`}
			>
				<ChevronRight
					className={currentPage === lastPage ? 'text-gray-500' : 'text-black'}
				/>
			</li>
		</ul>
	);
};

export default Pagination;
