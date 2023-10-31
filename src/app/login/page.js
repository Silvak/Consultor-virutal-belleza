import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex flex-col lg:flex-row w-full m-auto">
      {/* first column */}
      <div className="hidden lg:flex w-full lg:w-1/2 h-screen bg-gray-700 pr-4 rounded-md mb-10 lg:mb-0">
        <div className="flex-1 bg-white w-full p-6 lg:px-20 h-screen flex flex-col justify-center items-center">
          <img
            src="/assets/login-image.png"
            alt="Imagen login"
            className="flex w-2/3 sm:w-1/2 lg:w-[300px] h-auto my-4"
          />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
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
      <div className="flex-1 p-6 lg:mx-20 mt-10 lg:mt-40">
        <h1 className="font-bold text-2xl sm:text-3xl mb-6">Iniciar sesión</h1>
        <LoginForm />
        <div className="flex justify-center mt-4">
          <span className="mr-1">No tienes una cuenta? </span>
          <Link href="/register" className="text-blue-500 hover:underline">
            Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
}
