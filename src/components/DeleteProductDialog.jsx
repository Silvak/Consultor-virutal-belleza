'use client';

import { useState } from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';
import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import { deleteProduct } from '@/services/product.services';
import { useMutation } from '@tanstack/react-query';

function DeleteProductDialog({ id }) {
	const [isOpen, setIsOpen] = useState(false);
	const { mutate } = useMutation({
		mutationFn: deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});

	function handleDelete() {
		mutate(undefined, {
			onSuccess: () => {},
			onError: (error) => {
				console.log(error);
			},
		});
	}

	return (
		<AlertDialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<AlertDialogTrigger asChild>
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Trash className=" h-5 w-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this product?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-sm px-4 py-2"
						onClick={handleDelete}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteProductDialog;
