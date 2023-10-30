"use client";

import React, { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { uploadUserImage } from "@/services/user.services";
import ModalFinished from "./ModalFinished";
import Image from "next/image";
import Link from "next/link";

function ImageUploader({ onImageSelect }) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { data: session, status } = useSession();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  /**
   * The function `sendImageToBackend` is an asynchronous function that uploads an image file to the
   * backend server and handles success and error cases.
   */
  const sendImageToBackend = async (file) => {
    setUploading(true);
    setShowLoadingModal(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadUserImage(session.user.user._id, formData);
      console.log(response.data);
      setShowLoadingModal(false);
      setShowSuccessModal(true);
      console.log(session.user.user._id);
    } catch (error) {
      console.error(
        "Hubo un error al subir la imagen:",
        error.response ? error.response.data : error.message
      );
      setShowLoadingModal(false);
    } finally {
      setUploading(false);
    }
  };

  /**
   * The `handleImageChange` function takes an event object, retrieves the selected image file, creates a
   * URL for the image, sets the image URL as the preview image, and sends the image file to the backend.
   */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      sendImageToBackend(file);
    }
  };

  return (
    <div className="w-full">
      <ModalFinished isVisible={showLoadingModal}>
        <h1 className="ml-2 px-20 text-2xl pb-3 font-medium">Analizando</h1>
        <div className="border-t-8 ml-20 flex flex-col justify-center items-center border-[#7E8EFF] rounded-full w-36 h-36 animate-spin"></div>
      </ModalFinished>

      <ModalFinished isVisible={showSuccessModal}>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/assets/fluent-emoji.png"
            alt="Emoji Image"
            width={96}
            height={96}
            className="w-24 h-24"
          />

          <h1 className="text-5xl md:text-4xl pb-4 pt-4 text-center font-bold mt-4">
            El análisis ha sido finalizado con éxito!
          </h1>

          <p className="text-center text-xl pt4 pb-4">
            Ya puedes ver las recomendaciones de productos y tips seleccionados
            específicamente para tu tipo de piel. Te dirigete al perfil para
            descubrir cómo realzar aún más tu belleza.
          </p>
          <p className="text-center font-bold pb-8">
            Tus resultados se han añadido a tu perfil.
          </p>
          <Link href="/profile">
            <button className="mt-4 items-center w-full md:w-auto px-4 py-2 bg-[#7E8EFF] text-white text-base rounded">
              Ir al perfil
            </button>
          </Link>
        </div>
      </ModalFinished>

      <div className="flex flex-col md:flex-row pt-5 pb-4 items-center w-full">
        <div className="px-4 md:px-20 pb-10 md:pb-20">
          <h1 className="text-5xl md:text-4xl font-bold mb-4">
            Consultor de belleza
          </h1>
          <p className="text-lg mb-2 w-full">
            Descubre qué tipo de piel tienes y recibe recomendaciones
            personalizadas para realzar tu belleza. ¡Sólo sube una imagen clara
            de tu rostro y deja que nuestro consultor de belleza haga el resto!
          </p>

          <h2 className="text-2xl pt-4 font-semibold mb-2">Requerimientos</h2>
          <ul className="text-base">
            <li>
              1 - Asegúrate de que la imagen sea clara y esté bien iluminada.
            </li>
            <li>
              2 - Tu rostro debe estar limpio, sin maquillaje y con el cabello
              recogido o apartado de la cara.
            </li>
            <li>
              3 - La imagen debe ser frontal, mostrando toda tu cara y evitando
              sombras.
            </li>
            <li>
              4 - El formato de la imagen debe ser JPG, PNG o GIF y no debe
              exceder los 5MB de tamaño.
            </li>
            <li>
              5 - Es importante que la foto sea reciente para obtener resultados
              más precisos.
            </li>
          </ul>
        </div>
        <div className="w-full md:max-w-lg pr-4 md:pr-16">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div
            className="flex-grow relative ml-2 w-full md:w-96 h-56 md:h-[442px] border rounded mb-4 bg-gray-100 shadow-md"
            style={{
              backgroundImage: `url(${previewImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!previewImage && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                No se ha seleccionado una imagen...
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex pb-14 flex-col md:flex-row justify-center items-center">
        <button
          onClick={handleButtonClick}
          className="py-2 mx-2 md:mx-16 w-full bg-[#7E8EFF] text-white rounded-md shadow-md"
          disabled={uploading}
        >
          {uploading ? "Cargando..." : "Sube tu foto"}
        </button>
      </div>
    </div>
  );
}
export default ImageUploader;
