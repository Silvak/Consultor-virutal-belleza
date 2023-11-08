'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from './ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import UploadImageOnModal from './UploadImageOnModal';
import SpecialistForm from './SpecialistForm';
import { signUp, uploadUserImage } from '@/services/user.services';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';
import { createCategory } from '@/services/category.services';
import { Input } from './ui/input';

const registerSchema = z.object({
	title: z.string().min(2, 'Category must contain at least 2 characters'),
});

function CreateCategoryDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			title: '',
		},
	});

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries('categories');
		},
	});

	function onSubmit(categoryData) {
		mutate(categoryData, {
			onSuccess: async (data) => {
				toast({ title: 'Categoría agregada' });
				setIsOpen(false);
				form.reset();
			},
			onError: (error) => {
				toast({
					title: 'Error al agregar el categoría',
					variant: 'destructive',
				});
				console.log(error);
			},
		});
	}

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() =>
				setIsOpen((prev) => (status == 'pending' ? prev : !prev))
			}
		>
			<DialogTrigger asChild>
				<Button className="bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl">
					Agregar Categoría
				</Button>
			</DialogTrigger>
			<DialogContent className="h-fit">
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Categoría
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Nombre</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
											placeholder="Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl"
							disabled={status == 'pending'}
						>
							{status == 'pending' ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Espera por favor
								</>
							) : (
								'Agregar'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateCategoryDialog;
