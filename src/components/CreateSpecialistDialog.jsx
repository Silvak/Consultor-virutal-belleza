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
import { Form } from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import UploadImageOnModal from './UploadImageOnModal';
import SpecialistForm from './SpecialistForm';
import { signUp, uploadUserImage } from '@/services/user.services';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

const registerSchema = z
	.object({
		displayName: z
			.string()
			.min(2, 'Username must contain at least 8 characters'),
		email: z.string().email(),
		password: z
			.string()
			.min(8, 'Password must contain at least 8 characters')
			.max(32),
		passwordConfirm: z.string(),
		image: z.any(),
		gender: z.enum(['F', 'M'], {
			required_error: 'You need to select a gender',
		}),
		age: z.coerce
			.number()
			.gt(0, { message: 'Age must be greater than 0' })
			.lt(120, { message: 'Age must be less than 120' })
			.default(0),
		skinType: z.enum(['combined', 'oily', 'dry', 'balanced'], {
			required_error: 'You need to select a skin type',
		}),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords must match',
	})
	.refine((data) => !!data.image, {
		path: ['image'],
		message: 'You need to provide an image',
	});

function CreateSpecialistDialog() {
	const [isOpen, setIsOpen] = useState(false);

	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			password: '',
			passwordConfirm: '',
			email: '',
		},
	});

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: signUp,
		onSuccess: () => {
			queryClient.invalidateQueries('specialists');
		},
	});

	function onSubmit(productData) {
		console.log(productData);
		mutate(
			{
				...productData,
				rol: 'ESPEC_ROLE',
				image: undefined,
				passwordConfirm: undefined,
			},
			{
				onSuccess: async (data) => {
					const formData = new FormData();
					formData.append('image', productData.image, productData.image.name);
					await uploadUserImage(data.data._id, formData);
					toast({ title: 'Especialista agregado' });
					setIsOpen(false);
					form.reset();
				},
				onError: (error) => {
					toast({
						title: 'Error al agregar el especialista',
						variant: 'destructive',
					});
					console.log(error);
				},
			}
		);
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
					Agregar
				</Button>
			</DialogTrigger>
			<DialogContent className="h-fit">
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Especialista
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<UploadImageOnModal form={form} />

						<SpecialistForm form={form} variant="create" />

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

export default CreateSpecialistDialog;
