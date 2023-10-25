'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

// Validation schema
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

function LoginForm() {
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(credentials) {
		const responseNextAuth = await signIn('credentials', {
			...credentials,
			redirect: false,
		});

		//handle errors
		if (responseNextAuth?.error) {
			//
		}

		//handle success
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
								<Input type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Log In</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
