import React, { useState } from "react";
import ImageUploader from "@/componets/ImageUploader";

function UploadPage() {
  const [image, setImage] = useState(null);


  const handleImageSelect = (file) => {
    setImage(URL.createObjectURL(file));
  };

  return (
    <div className="p-8">
      <ImageUploader onImageSelect={handleImageSelect} />

      {image && (
        <div className="mt-4">
          <image src={image} alt="Seleccionado" className="w-full max-h-64" />
        </div>
      )}
    </div>
  );
}

export default UploadPage;
