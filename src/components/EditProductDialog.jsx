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
import { editProduct, uploadProductImage } from '@/services/product.services';
import { useState } from 'react';
import { Loader2, Pencil } from 'lucide-react';
import { getImgSrc } from '@/lib/utils';
import ProductForm from './ProductForm';
import { useToast } from './ui/use-toast';
import UploadImageOnModal from './UploadImageOnModal';

const editProductSchema = z.object({
	name: z.string().min(2, 'Name must contain at least 2 characters'),
	description: z
		.string()
		.min(2, 'Description must contain at least 2 characters'),
	brand: z.string().min(2, 'Brand must contain at least 2 characters'),
	skinTypeProduct: z.enum(['combined', 'oily', 'dry', 'balanced'], {
		required_error: 'You need to select a skin type',
	}),
	image: z.any(),
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
		mutate(
			{ ...productData, image: undefined },
			{
				onSuccess: async () => {
					try {
						if (productData?.image) {
							const formData = new FormData();
							formData.append(
								'image',
								productData.image,
								productData.image.name
							);
							await uploadProductImage(product._id, formData);
						}
						toast({ title: 'Producto editado' });
						form.reset();
						setIsOpen(false);
					} catch (error) {
						toast({
							title: 'Error editando imagen de producto',
							variant: 'destructive',
						});
						console.log(error);
					}
				},
				onError: (error) => {
					toast({ title: 'Error editando producto', variant: 'destructive' });
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
						<UploadImageOnModal
							form={form}
							currentImage={
								product.img != 'no-posee-imagen'
									? getImgSrc('product', product.img)
									: undefined
							}
						/>

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
