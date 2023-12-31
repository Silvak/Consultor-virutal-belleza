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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/services/user.services';
import { useState } from 'react';

function DeleteUserDialog({ id }) {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();
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
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Trash className=" h-5 w-5" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Estas seguro de que deseas eliminar este usuario?
					</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className="rounded-xl">Cancelar</AlertDialogCancel>
					<AlertDialogAction
						className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-4 py-2"
						onClick={handleDelete}
					>
						Eliminar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default DeleteUserDialog;
