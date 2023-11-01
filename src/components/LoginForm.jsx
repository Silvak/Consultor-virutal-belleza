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
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useToast } from './ui/use-toast';
import { useState } from 'react';

// Validation schema
const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

function LoginForm() {
	const [status, setStatus] = useState('idle');
	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const router = useRouter();
	const { toast } = useToast();

	async function onSubmit(credentials) {
		setStatus('pending');
		const responseNextAuth = await signIn('credentials', {
			...credentials,
			redirect: false,
		});

		//handle errors
		if (responseNextAuth?.error) {
			console.log(responseNextAuth.error);
			toast({
				title: 'Error',
				message: responseNextAuth.error,
				variant: 'destructive',
			});
			setStatus('idle');
			return;
		}

		//handle success
		router.push('/home');
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
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
							<FormControl>
								<Input placeholder="Contraseña" type="password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					className="bg-[#7E8EFF] hover:bg-[#7E8EFF] w-full rounded-xl"
					type="submit"
				>
					{status == 'pending' ? (
						<>
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							Espera por favor
						</>
					) : (
						'Iniciar sesión'
					)}
				</Button>
			</form>
		</Form>
	);
}

export default LoginForm;
