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
import { ScrollArea } from './ui/scroll-area';
import { Image } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import UploadImageOnModal from './UploadImageOnModal';

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
				<Button className="bg-[#00A7D7] hover:bg-[#00A7D7] rounded-xl">
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

						<ScrollArea className=" h-[400px] w-full rounded-md">
							<div className="space-y-4 p-1 pr-4">
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-semibold">Name</FormLabel>
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

								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="font-semibold">Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
											<FormLabel className="font-semibold">
												Description
											</FormLabel>
											<FormControl>
												<Input
													type="text"
													className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
													className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
													className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
													className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
									name="age"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Age</FormLabel>
											<FormControl>
												<Input
													type="number"
													className="rounded-xl h-fit p-2 focus-visible:ring-1"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="skinType"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Skin type</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="border-none focus:ring-1">
														<SelectValue placeholder="Select a skin type" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="balanced">
														Balanced Skin
													</SelectItem>
													<SelectItem value="oily">Oily Skin</SelectItem>
													<SelectItem value="dry">Dry Skin</SelectItem>
													<SelectItem value="combined">
														Combined Skin
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="gender"
									render={({ field }) => (
										<FormItem className="space-y-3">
											<FormLabel>Gender</FormLabel>
											<FormControl>
												<RadioGroup
													onValueChange={field.onChange}
													defaultValue={field.value}
													className="flex flex-col space-y-2"
												>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="F" />
														</FormControl>
														<FormLabel className="font-normal">
															Female
														</FormLabel>
													</FormItem>
													<FormItem className="flex items-center space-x-3 space-y-0">
														<FormControl>
															<RadioGroupItem value="M" />
														</FormControl>
														<FormLabel className="font-normal">Male</FormLabel>
													</FormItem>
												</RadioGroup>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</ScrollArea>

						<Button
							type="submit"
							className="w-full bg-[#00A7D7] hover:bg-[#00A7D7] rounded-xl"
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
