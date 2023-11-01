import React from 'react';
import {
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
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ScrollArea } from './ui/scroll-area';

function SpecialistForm({ form, variant }) {
	return (
		<ScrollArea className="h-[400px] w-full rounded-md">
			<div className="space-y-4 p-1 pr-4">
				<FormField
					control={form.control}
					name="displayName"
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
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="font-semibold">Corre electrónico</FormLabel>
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

				{variant === 'create' && (
					<>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-semibold">Contraseña</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
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
										Confirmar contraseña
									</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="border-none focus-visible:ring-1 rounded-xl h-fit p-2"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</>
				)}

				<FormField
					control={form.control}
					name="age"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Edad</FormLabel>
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
							<FormLabel>Tipo de piel</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger className="border-none focus:ring-1">
										<SelectValue placeholder="Selecciona un tipo de piel" />
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
										<FormLabel className="font-normal">Female</FormLabel>
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
	);
}

export default SpecialistForm;
