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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, uploadProductImage } from '@/services/product.services';
import { useState } from 'react';
import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { getCategories } from '@/services/category.services';
import { Image } from 'lucide-react';
import UploadImageOnModal from './UploadImageOnModal';

const createProductSchema = z
	.object({
		name: z.string().min(2, 'Name must contain at least 2 characters'),
		description: z
			.string()
			.min(2, 'Description must contain at least 2 characters'),
		brand: z.string().min(2, 'Brand must contain at least 2 characters'),
		category: z.string().min(2, 'Category must contain at least 2 characters'),
		skinTypeProduct: z.enum(['combined', 'oily', 'dry', 'balanced'], {
			required_error: 'You need to select a skin type',
		}),
		image: z.any(),
	})
	.refine((data) => !!data.image, {
		path: ['image'],
		message: 'You need to provide an image',
	});

function CreateProductDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(createProductSchema),
		defaultValues: {
			name: '',
			description: '',
			brand: '',
		},
	});

	const { data: categoriesData, status: categoriesStatus } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		select: (data) => data?.data,
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});

	function onSubmit(productData) {
		mutate(
			{
				name: productData.name,
				description: productData.description,
				brand: productData.brand,
				category: productData.category,
				skinTypeProduct: productData.skinTypeProduct,
			},
			{
				onSuccess: async (data) => {
					try {
						const formData = new FormData();
						formData.append('image', productData.image, productData.image.name);
						await uploadProductImage(data.data._id, formData);
						form.reset();
						setIsOpen(false);
					} catch (e) {
						console.log(e);
					}
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
					Add Product
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Add Product
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<UploadImageOnModal form={form} />

						<FormField
							control={form.control}
							name="name"
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
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Description</FormLabel>
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
							name="brand"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Brand</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
											placeholder="Brand"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger className="border-none focus:ring-1">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{categoriesStatus === 'success' &&
												categoriesData?.categories.map((category) => (
													<SelectItem key={category._id} value={category._id}>
														{category.title}
													</SelectItem>
												))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="skinTypeProduct"
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
											<SelectItem value="balanced">Balanced Skin</SelectItem>
											<SelectItem value="oily">Oily Skin</SelectItem>
											<SelectItem value="dry">Dry Skin</SelectItem>
											<SelectItem value="combined">Combined Skin</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

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

export default CreateProductDialog;
