import { useState } from "react";
import dynamic from 'next/dynamic';

// Carga dinámica del componente Sidebar sin SSR
const DynamicSidebar = dynamic(() => import('./Sidebar'), { ssr: false });

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="bg-gray-200 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img // Cambiado de 'image' a 'img'
          src="/path/to/your/logo.png"
          alt="Logo"
          className="w-10 h-10 mr-2"
        />
        <h2>Consultor de belleza</h2>
      </div>

      <button onClick={() => setSidebarOpen(true)}>
        <img // Cambiado de 'image' a 'img'
          src="/assets/menu-regular-24.png"
          alt="Menú"
          className="w-6 h-6"
        />
      </button>

      {sidebarOpen && <DynamicSidebar onClose={() => setSidebarOpen(false)} />}
    </header>
  );
}
