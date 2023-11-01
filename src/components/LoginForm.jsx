"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useState } from "react";

// Validation schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

/**
 * The above code is a React component for a login form that handles form submission, displays error
 * messages, and redirects to the home page upon successful login.
 * @returns The `LoginForm` component is returning a form that includes two input fields for email and
 * password, along with a submit button. The form is using the `Form` component from a library called
 * `react-hook-form` to handle form validation and submission. The form also includes some conditional
 * rendering based on the `status` state, which can be "idle" or "pending". If the status is "
 */
function LoginForm() {
  const [status, setStatus] = useState("idle");
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();

  async function onSubmit(credentials) {
    setStatus("pending");
    const responseNextAuth = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    //handle errors
    if (responseNextAuth?.error) {
      console.log(responseNextAuth.error);
      toast({
        title: "Error",
        message: responseNextAuth.error,
        variant: "destructive",
      });
      setStatus("idle");
      return;
    }

    //handle success
    router.push("/home");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="email.@example.com"
                  type="email"
                  className="bg-white dark:bg-blue-200/10"
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
                <Input
                  placeholder="Contraseña"
                  type="password"
                  className="bg-white dark:bg-blue-200/10"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-[#7E8EFF]  w-full rounded-md shadow-lg"
          type="submit"
        >
          {status == "pending" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Espera por favor
            </>
          ) : (
            "Iniciar sesión"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
