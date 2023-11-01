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
import { editProduct } from '@/services/product.services';
import { useState } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import Image from 'next/image';
import ProductForm from './ProductForm';
import { useToast } from './ui/use-toast';

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
	const { toast } = useToast();

	const queryClient = useQueryClient();

	const { mutate, status } = useMutation({
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
				toast({ title: 'Product edited successfully' });
				form.reset();
			},
			onError: (error) => {
				toast({ title: 'Error editing product', variant: 'destructive' });
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
				<Button className="bg-transparent text-black hover:bg-slate-300 dark:text-slate-200">
					<Pencil className="h-5 w-5" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h2 className="text-[1.563rem] w-full text-center font-semibold">
						Editar Producto
					</h2>
				</DialogHeader>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2 justify-center"
					>
						<div className="flex flex-col items-center justify-center h-fit">
							<Image
								src={getImgSrc('product', product.img)}
								width={160}
								height={128}
								className="w-40 h-32 rounded-lg mb-4 bg-gray-100 shadow-lg border"
								alt={product.name}
							/>
						</div>

						<ProductForm form={form} />

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
								'Editar'
							)}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProductDialog;
