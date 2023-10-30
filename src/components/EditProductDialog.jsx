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
import { editProduct } from '@/services/product.services';
import { useState } from 'react';
import { Input } from './ui/input';
import { Pencil } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { getImgSrc } from '@/lib/utils';

const editProductSchema = z.object({
	name: z.string().min(2, 'Name must contain at least 2 characters'),
	description: z
		.string()
		.min(2, 'Description must contain at least 2 characters'),
	brand: z.string().min(2, 'Brand must contain at least 2 characters'),
	category: z.string().min(2, 'Category must contain at least 2 characters'),
	skinTypeProduct: z.enum(['combined', 'oily', 'dry', 'balanced'], {
		required_error: 'You need to select a skin type',
	}),
});

function EditProductDialog({ product }) {
	const [isOpen, setIsOpen] = useState(false);
	const form = useForm({
		resolver: zodResolver(editProductSchema),
		defaultValues: {
			name: product.name,
			description: product.description,
			brand: product.brand,
			productSkinType: product.skinTypeProduct,
			category: product.category,
		},
	});

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: editProduct(product._id),
		onSuccess: () => {
			queryClient.invalidateQueries('products');
			setIsOpen(false);
		},
	});

	function onSubmit(productData) {
		console.log(productData);
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
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Pencil className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Edit Product
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<div className="flex flex-col items-center justify-center h-fit">
							<div
								className="flex-grow flex flex-col gap-2 items-center relative w-40 h-32 rounded-lg mb-4 bg-gray-100 shadow-lg border"
								style={{
									backgroundImage: `url(${getImgSrc('product', product.img)})`,
									backgroundSize: 'contain',
									backgroundPosition: 'center',
									backgroundRepeat: 'no-repeat',
								}}
							></div>
						</div>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
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
									<FormLabel>Description</FormLabel>
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
									<FormLabel>Brand</FormLabel>
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
											<SelectItem value="serum">Serum</SelectItem>
											<SelectItem value="cleanser">Cleanser</SelectItem>
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
							className="w-full bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl"
						>
							Edit
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProductDialog;
