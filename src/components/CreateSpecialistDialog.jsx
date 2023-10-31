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
import UploadImageOnModal from './UploadImageOnModal';
import SpecialistForm from './SpecialistForm';

const registerSchema = z
	.object({
		username: z.string().min(2, 'Username must contain at least 8 characters'),
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

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('specialists');
		},
	});

	function onSubmit(productData) {
		mutate(
			{ productData },
			{
				onSuccess: async (data) => {
					const formData = new FormData();
					formData.append('image', productData.image, productData.image.name);
					await uploadProductImage(data.data._id, formData);
					form.reset();
					setIsOpen(false);
					form.reset();
				},
				onError: (error) => {
					console.log(error);
				},
			}
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger asChild>
				<Button className="bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl">
					Add Specialist
				</Button>
			</DialogTrigger>
			<DialogContent className="h-fit">
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Add Specialist
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<UploadImageOnModal form={form} />

						<SpecialistForm form={form} />

						<Button
							type="submit"
							className="w-full bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl"
						>
							Add
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default CreateSpecialistDialog;
