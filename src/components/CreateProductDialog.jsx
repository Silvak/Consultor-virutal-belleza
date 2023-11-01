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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createProduct, uploadProductImage } from '@/services/product.services';
import { useState } from 'react';
import UploadImageOnModal from './UploadImageOnModal';
import ProductForm from './ProductForm';
import { useToast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';
import { editCategory, getCategories } from '@/services/category.services';

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
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { data: categoriesData, status: categoriesStatus } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		select: (data) => data?.data,
	});

	const { mutate, status } = useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries('products');
		},
	});

	function onSubmit(productData) {
		console.log('x');
		console.log(
			...categoriesData.categories
				.filter((category) => category._id == productData.category)[0]
				.products.map((product) => product._id)
		);
		mutate(
			{
				name: productData.name,
				description: productData.description,
				brand: productData.brand,
				skinTypeProduct: productData.skinTypeProduct,
				category: productData.category,
			},
			{
				onSuccess: async (data) => {
					try {
						const formData = new FormData();
						formData.append('image', productData.image, productData.image.name);
						await uploadProductImage(data.data._id, formData);
					} catch (e) {
						toast({
							title: 'Error al agregar la imagen del producto',
							variant: 'destructive',
						});
						console.log(e);
					}

					try {
						await editCategory(productData.category, {
							products: [
								...categoriesData.categories
									.filter((category) => category._id == productData.category)[0]
									.products.map((product) => product._id),
								data.data._id,
							],
						});

						form.reset();
						toast({ title: 'Producto agregado' });
						setIsOpen(false);
					} catch (e) {
						toast({
							title: 'Error al agregar producto a la categoría',
							variant: 'destructive',
						});
						console.log(e);
					}
				},
				onError: (error) => {
					toast({
						title: 'Error al agregar el producto',
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
					Agregar Producto
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="mb-2">
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Agregar Producto
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<UploadImageOnModal form={form} />

						<ProductForm form={form} categories={categoriesData?.categories} />

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

export default CreateProductDialog;
