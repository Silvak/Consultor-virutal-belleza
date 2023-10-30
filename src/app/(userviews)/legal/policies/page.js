import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container px-40 py-10 ">
      <h1 className="text-5xl pb-4 font-extrabold">Políticas de Privacidad</h1>
      <h2 className="text-3xl pb-4 font-bold">1. Introducción:</h2>
      <p className="text-base text-gray-700 leading-relaxed">
        Nos comprometemos a proteger tu privacidad y te explicamos cómo
        recopilamos, usamos, compartimos y protegemos tu información.
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mt-3 mb-2">
          2. Información que recopilamos:
        </h2>
        <ul className="text-base text-gray-700 space-y-2 pl-5 list-disc">
          <li>
            Información proporcionada directamente por el usuario: Esto incluye
            nombre, dirección de correo electrónico, fotografías, tipo de piel,
            y cualquier otra información que nos proporcionas al usar nuestra
            aplicación.
          </li>
          <li>
            Información técnica: Recopilamos información sobre el dispositivo
            que usas para acceder a nuestra aplicación, tu dirección IP, y cómo
            interactúas con nuestra aplicación.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mt-3 mb-2">
          3. Uso de la información:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Usamos la información recopilada para:
        </p>
        <ul className="text-base text-gray-700 space-y-2 pl-5 list-disc">
          <li>Personalizar y mejorar tu experiencia en la aplicación.</li>
          <li>Responder a tus consultas y solicitudes.</li>
          <li>
            Enviar comunicaciones relacionadas, como actualizaciones o anuncios.
          </li>
          <li>Analizar y mejorar la calidad de nuestra aplicación.</li>
          <li>Detectar, prevenir y solucionar problemas técnicos.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mt-3 mb-2">
          4. Base legal para el procesamiento de datos:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Procesamos tu información basándonos en el consentimiento que nos
          proporcionas al aceptar estas políticas.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          5. Compartir información con terceros:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          No compartimos tu información personal con terceros excepto:
        </p>
        <ul className="text-base text-gray-700 space-y-2 pl-5 list-disc">
          <li>Cuando es necesario para el funcionamiento de la aplicación.</li>
          <li>Para cumplir con una obligación legal.</li>
          <li>Para proteger tus intereses vitales o los de otra persona.</li>
          <li>Para realizar una tarea en interés público.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          6. Almacenamiento y seguridad de la información:
        </h2>
        <ul className="text-base text-gray-700 space-y-2 pl-5 list-disc">
          <li>
            <strong className="font-semibold">Almacenamiento:</strong> Tu
            información se almacena en servidores seguros ubicados en [país o
            región].
          </li>
          <li>
            <strong className="font-semibold">Seguridad:</strong> Implementamos
            medidas de seguridad para proteger tu información, incluido el
            cifrado de datos y el acceso protegido a nuestra aplicación.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          7. Tus derechos:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Tienes derecho a:
        </p>
        <ul className="text-base text-gray-700 space-y-2 pl-5 list-disc">
          <li>Acceder, corregir o eliminar tu información.</li>
          <li>Oponerte a ciertos tipos de procesamiento.</li>
          <li>Retirar tu consentimiento en cualquier momento.</li>
          <li>Presentar una queja ante una autoridad supervisora.</li>
        </ul>
      </div>

      <div className="">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mt-3 mb-2">
          8. Cookies y tecnologías similares:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed mb-2">
          Usamos cookies para mejorar tu experiencia en la aplicación. Puedes
          controlar y/o eliminar las cookies como lo desees.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          9. Cambios a la política de privacidad:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Nos reservamos el derecho de modificar estas políticas. Si lo hacemos,
          te notificaremos y explicaremos los cambios.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          10. Menores de edad:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Nuestra aplicación no está dirigida a menores de [edad específica]. Si
          eres menor de [edad específica], no uses nuestra aplicación sin el
          consentimiento de tus padres o tutores legales.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 leading-tight mb-2 mt-3">
          11. Contacto:
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          Para cualquier pregunta o inquietud relacionada con esta política,
          contáctanos en [correo electrónico o dirección de contacto].
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
