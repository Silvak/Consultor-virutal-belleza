'use client';

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
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '@/services/user.services';
import { useState } from 'react';

function DeleteUserDialog({ id }) {
	const [open, setOpen] = useState(false);
	const { mutate } = useMutation({
		mutationFn: deleteUser(id),
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
		<AlertDialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
			<AlertDialogTrigger asChild>
				<Button className="bg-transparent text-black hover:bg-slate-300">
					<Trash className=" h-5 w-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you sure you want to delete this user?
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

export default DeleteUserDialog;
