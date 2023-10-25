export default function Sidebar({ onClose }) {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white p-4">
      <button onClick={onClose} className="mb-4">
        Cerrar
      </button>
      <ul>
        <li>Ítem 1</li>
        <li>Ítem 2</li>
        <li>Ítem 3</li>
      </ul>
    </div>
  );
}

