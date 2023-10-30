import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div className="flex mt-5 w-full m-auto">
      {/* Columna izquierda */}
      <div className="w-1/2 h-screen bg-gray-700 pr-4 rounded-e-md">
        <div className="flex-1 bg-white w-full px-20 h-screen flex flex-col justify-start items-center">
          <img
            src="/assets/login-image.png" // Corregido aquí
            alt="Imagen login"
            className="flex w-[300px] h-[400px]"
          />
          <h1 className="text-4xl font-bold mb-2">
            Descubre tu consultor de belleza perfecto
          </h1>
          <p className="text-lg">
            Explora y conecta con tu consultor de belleza ideal. Nuestra
            aplicación está diseñada para presentarte expertos en belleza que
            entienden tus necesidades específicas. Descubre recomendaciones
            personalizadas para cuidado de la piel, consejos de belleza y
            tendencias actuales.
          </p>
        </div>
      </div>

      {/* Columna derecha */}
      <div className="flex-1 mt-40 mx-20">
        <h1 className="font-bold text-3xl mb-6">Iniciar sesión</h1>
        <LoginForm />
        <div className="flex justify-center mt-4">
          <span>No tienes una cuenta? </span>
          <Link href="/register" legacyBehavior>
            <a className="text-blue-500 hover:underline">Crear cuenta</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
