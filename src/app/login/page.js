import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";
import Image from "next/image";

/**
 * The function returns a JSX component that renders a login page with two columns, one for a
 * description and image, and the other for a login form.
 * @returns a JSX element, which represents the structure and content of a web page.
 */
export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen m-auto">
      {/* first column */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen bg-gray-600/90 dark:bg-gray-600/40   pr-5 rounded-lg mb-10 lg:mb-0">
        <div className="flex-col justify-center items-center flex-1 bg-white dark:bg-white/10 w-full lg:px-20 flex  rounded-lg">
          <Image
            src="/assets/login-image.png"
            alt="Imagen login"
            className="flex w-2/3 sm:w-1/2 lg:w-[400px] h-auto my-4"
            width={400}
            height={400}
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
            Descubre tu consultor de belleza perfecto
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base lg:text-lg text-start">
            Explora y conecta con tu consultor de belleza ideal. Nuestra
            aplicación está diseñada para presentarte expertos en belleza que
            entienden tus necesidades específicas. Descubre recomendaciones
            personalizadas para cuidado de la piel, consejos de belleza y
            tendencias actuales.
          </p>
        </div>
      </div>

      {/* second column */}
      <div className="flex justify-center items-center px-8 flex-1 bg-[#E6E6E6] dark:bg-inherit">
        <div className="w-full lg:max-w-[600px]">
          <h1 className="font-semibold text-2xl sm:text-2xl mb-8">
            Iniciar sesión
          </h1>
          <LoginForm />
          <div className="flex justify-center mt-6 text-sm">
            <span className="mr-1 text-gray-500">¿No tienes una cuenta?</span>
            <Link href="/register" className="text-blue-500 hover:underline">
              Crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
