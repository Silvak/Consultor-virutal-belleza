'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { signUp } from '@/services/user.services';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from './ui/select';
import { useRouter } from 'next/navigation';
import { Checkbox } from './ui/checkbox';

const registerSchema = z
	.object({
		displayName: z
			.string()
			.min(2, 'displayName must contain at least 8 characters'),
		email: z.string().email(),
		password: z
			.string()
			.min(8, 'Password must contain at least 8 characters')
			.max(32),
		passwordConfirm: z.string(),
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
		termsAndConditions: z.boolean(),
	})
	.refine((data) => data.password === data.passwordConfirm, {
		path: ['passwordConfirm'],
		message: 'Passwords must match',
	})
	.refine((data) => data.termsAndConditions === true, {
		path: ['termsAndConditions'],
		message: 'You need to accept terms and conditions',
	});

export default function RegisterForm() {
	const form = useForm({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			displayName: '',
			email: '',
			password: '',
			passwordConfirm: '',
			termsAndConditions: false,
			gender: 'F',
		},
	});

	const { mutate } = useMutation({
		mutationFn: signUp,
	});

	const router = useRouter();

	function onSubmit(userData) {
		console.log(userData);
		mutate(
			{
				...userData,
				passwordConfirm: undefined,
				termsAndConditions: undefined,
				rol: 'USER_ROLE',
			},
			{
				onSuccess: () => {
					// handle success
					router.push('/onboarding');
				},
				onError: (e) => {
					//handle error
					console.log(e);
				},
			}
		);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 w-4/5 flex flex-col justify-center"
			>
				<div className="flex gap-8">
					<div className="space-y-4 flex flex-col w-1/2">
						<FormField
							control={form.control}
							name="displayName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder="Mary25"
											type="text"
											className="bg-gray-200 rounded-xl h-fit p-2 focus-visible:ring-1"
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="email.@example.com"
											type="email"
											className="bg-gray-200 rounded-xl h-fit p-2 focus-visible:ring-1"
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
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="bg-gray-200 rounded-xl h-fit p-2 focus-visible:ring-1"
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
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											className="bg-gray-200 rounded-xl h-fit p-2 focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="space-y-4 flex flex-col w-1/2">
						<FormField
							control={form.control}
							name="age"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Age</FormLabel>
									<FormControl>
										<Input
											type="number"
											className="bg-gray-200 rounded-xl h-fit p-2 focus-visible:ring-1"
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
											<SelectTrigger className="border-none focus:ring-1 bg-gray-200">
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
						<div>
							<FormField
								control={form.control}
								name="termsAndConditions"
								render={({ field }) => (
									<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
										<FormControl>
											<Checkbox
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Accept terms and conditions</FormLabel>
										</div>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full bg-[#7E8EFF] hover:bg-[#7E8EFF] rounded-xl"
				>
					Sign Up
				</Button>
			</form>
		</Form>
	);
}
