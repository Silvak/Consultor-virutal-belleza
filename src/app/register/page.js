import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import React from "react";

/**
 * The code defines a React component for a registration page with a form and a background image.
 * @returns a JSX element. It is a div with two child elements. The first child element is a hidden div
 * with a background image and some styling. The second child element is a div with a form, a
 * paragraph, and a link.
 */
export default function page() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen m-auto ">
      {/* first column */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen bg-gray-700/90 dark:bg-gray-600/40   pr-5 rounded-lg mb-10 lg:mb-0">
        <div
          className="w-full h-screen bg-no-repeat bg-cover bg-right-left rounded-e-md  "
          style={{
            backgroundImage: "url(/assets/register.png)",
          }}
        ></div>
      </div>

      <div className="flex justify-center items-center px-8 py-10 lg:py-0 flex-1 bg-[#E6E6E6] dark:bg-inherit">
        <div className="flex flex-col justify-center w-full lg:max-w-[600px]">
          <h1 className="text-2xl font-semibold mb-8 w-full">Bienvenido</h1>
          <RegisterForm />
          <p className="w-full text-center mt-6 text-sm ">
            <span className="mr-1 text-gray-500">¿Ya tienes una cuenta?</span>
            <Link href="/login" className="text-blue-500 hover:underline ml-4">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
