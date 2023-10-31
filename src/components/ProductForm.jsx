import React from 'react';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';

import { Input } from './ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/services/category.services';

function ProductForm({ form }) {
	const { data: categoriesData, status: categoriesStatus } = useQuery({
		queryKey: ['categories'],
		queryFn: getCategories,
		select: (data) => data?.data,
	});

	return (
		<>
			<FormField
				control={form.control}
				name="name"
				render={({ field }) => (
					<FormItem>
						<FormLabel className="font-semibold">Nombre</FormLabel>
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
						<FormLabel className="font-semibold">Descripción</FormLabel>
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
						<FormLabel className="font-semibold">Marca</FormLabel>
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
						<FormLabel>Categoría</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="border-none focus:ring-1">
									<SelectValue placeholder="Selecciona una categoría" />
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
						<FormLabel>Tipo de piel</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="border-none focus:ring-1">
									<SelectValue placeholder="Selecciona tu tipo de piel" />
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
		</>
	);
}

export default ProductForm;
