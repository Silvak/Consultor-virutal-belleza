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
import { createProduct } from '@/services/product.services';
import { useState } from 'react';
import { Input } from './ui/input';

const registerSchema = z
	.object({
		username: z.string().min(2, 'Username must contain at least 8 characters'),
		email: z.string().email(),
		password: z
			.string()
			.min(8, 'Password must contain at least 8 characters')
			.max(32),
		passwordConfirm: z.string(),
		specialty: z
			.string()
			.min(2, 'Specialty must contain at least 2 characters'),
		description: z
			.string()
			.min(2, 'Description must contain at least 2 characters'),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords must match',
	});

function CreateSpecialistDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			description: '',
			specialty: '',
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
		mutate(productData, {
			onSuccess: () => {
				form.reset();
			},
			onError: (error) => {
				console.log(error);
			},
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={() => setIsOpen((prev) => !prev)}>
			<DialogTrigger asChild>
				<Button className="bg-[#00A7D7] hover:bg-[#00A7D7]">
					Add Specialist
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Add Specialist
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Name</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-none "
											placeholder="Name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											className="border-none "
											placeholder="Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Description</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-none"
											placeholder="Description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="specialty"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Specialty</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-none"
											placeholder="Specialty"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-none "
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="passwordConfirm"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">
										Confirm Password
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-none "
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-[#00A7D7] hover:bg-[#00A7D7]"
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
