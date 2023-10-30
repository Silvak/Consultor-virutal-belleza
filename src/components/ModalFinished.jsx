import React from "react";

export default function ModalFinished({ isVisible, title, children, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[999] backdrop-blur-md">
      <div className="py-20 px-10 rounded-lg w-9/10 h-70vh max-w-3xl bg-white dark:bg-[#020817]">
        {title && <h3 className="mb-4">{title}</h3>}
        {children}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white text-black font-bold rounded-md p-2 px-3"
          >
            X
          </button>
        )}
      </div>
    </div>
  );
}
