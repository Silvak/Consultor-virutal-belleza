import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white py-20 px-10 rounded-lg w-4/5 max-w-xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-white text-black font-bold rounded-md p-2 px-3"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
