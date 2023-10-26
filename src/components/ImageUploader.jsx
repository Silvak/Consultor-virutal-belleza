'use client';

import React, { useRef, useState } from 'react';
import Modal from '@/components/Modal';
import { useSession } from 'next-auth/react';
import { uploadUserImage } from '@/services/user.services';

function ImageUploader({ onImageSelect }) {
	const fileInputRef = useRef(null);
	const [uploading, setUploading] = useState(false);
	const [previewImage, setPreviewImage] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const { data: session, status } = useSession();

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const sendImageToBackend = async (file) => {
		setUploading(true);

		// Crear un objeto FormData para enviar la imagen al backend
		const formData = new FormData();
		formData.append('image', file); // 'image' es el nombre del campo que espera el backend

		try {
			const response = await uploadUserImage(session.user.id)(formData);
			console.log(response.data); // respuesta del backend
		} catch (error) {
			console.error(
				'Hubo un error al subir la imagen:',
				error.response ? error.response.data : error.message
			);
		} finally {
			setUploading(false);
		}
	};

	const handleImageChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setPreviewImage(imageUrl);

			// Envia la imagen al backend
			sendImageToBackend(file);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-[70vh]">
			<input
				type="file"
				accept="image/*"
				className="hidden"
				ref={fileInputRef}
				onChange={handleImageChange}
			/>
			<div
				className="flex-grow relative w-96  border rounded mb-4 bg-gray-100 shadow-md"
				style={{
					backgroundImage: `url(${previewImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			>
				{!previewImage && (
					<div className="absolute inset-0 flex items-center justify-center text-gray-500">
						No se ha seleccionado una imagen...
					</div>
				)}
			</div>
			<button
				onClick={handleButtonClick}
				className="px-4 py-2 w-[384px] bg-white text-custom-blue rounded-md shadow-md"
				disabled={uploading}
			>
				{uploading ? 'Cargando...' : 'Cargar Foto'}
			</button>
			{/* Prueba del modal.
      <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 w-[384px] bg-white text-custom-blue rounded-md shadow-md mt-5"
        >
          Mostrar detalles del producto
        </button>
        <div>
        {/* <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-xl font-bold mb-2">Titulo</h2>
          <p className="text-gray-600">Calificacion...</p>
          
      </Modal>  
      </div> */}
		</div>
	);
}

export default ImageUploader;
