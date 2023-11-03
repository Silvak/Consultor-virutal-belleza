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
import { createProduct } from '@/services/product.services';
import { useState } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import SpecialistForm from './SpecialistForm';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';
import { uploadUserImage } from '@/services/user.services';

const registerSchema = z.object({
	username: z.string().min(2, 'Username must contain at least 8 characters'),
	email: z.string().email(),
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
	image: z.any(),
});

function EditSpecialistDialog({ specialist }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: specialist.displayName,
			email: specialist.email,
			age: specialist.age,
			gender: specialist.gender,
			skinType: specialist.skinType,
		},
	});

	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('specialists');
		},
	});

	function onSubmit(specialistData) {
		mutate(
			{ ...specialistData, image: undefined },
			{
				onSuccess: async () => {
					try {
						if (specialistData?.image) {
							const formData = new FormData();
							formData.append(
								'image',
								specialistData.image,
								specialistData.image.name
							);
							await uploadUserImage(specialist._id, formData);
						}
						setIsOpen(false);
						toast({
							title: 'El especialista ha sido editado correctamente',
						});
						form.reset();
					} catch (error) {
						toast({
							title: 'Error editando la imagen del especialista',
							variant: 'destructive',
						});
						console.log(error);
					}
				},
				onError: (error) => {
					toast({
						title: 'Ha ocurrido un error al editar el especialista',
						status: 'error',
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
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Pencil className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent className="bg-gray-100">
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Editar Especialista
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<UploadImageOnModal
							form={form}
							currentImage={
								specialist.img != 'no-posee-imagen'
									? getImgSrc('user', specialist.img)
									: undefined
							}
						/>

						<SpecialistForm form={form} />

						<Button
							type="submit"
							className="w-full bg-[#7E8EFF] hover:bg-[#7E8EFF]"
							disabled={status == 'pending'}
						>
							{status == 'pending' ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Espera por favor
								</>
							) : (
								'Editar'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default EditSpecialistDialog;
