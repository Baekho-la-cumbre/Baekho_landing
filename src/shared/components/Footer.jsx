import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#2a0a0a] to-[#181c24] pt-12 pb-4 px-4 border-t-2 border-[#D42D2D]">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* Logo y descripción */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-2xl font-black text-white">B</div>
          <div>
            <span className="block text-lg font-bold text-white leading-tight">BAEKHO</span>
            <span className="block text-xs font-bold text-[#D42D2D]">ACADEMIA DEPORTIVA</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm max-w-xs">
          Forjando campeones desde hace más de 15 años. Únete a nuestra familia y descubre tu potencial en el arte del Taekwondo.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="text-blue-400 hover:text-blue-300 text-2xl"><i className="fab fa-twitter">&#xf099;</i></a>
          <a href="#" className="text-pink-500 hover:text-pink-400 text-2xl"><i className="fab fa-instagram">&#xf16d;</i></a>
        </div>
      </div>
      {/* Enlaces rápidos */}
      <div className="flex flex-col gap-2 md:items-center">
        <span className="text-white font-bold mb-2">Enlaces Rápidos</span>
        <a href="#inicio" className="text-gray-300 hover:text-[#D42D2D] transition">Inicio</a>
        <a href="#logros" className="text-gray-300 hover:text-[#D42D2D] transition">Logros</a>
        <a href="#filosofia" className="text-gray-300 hover:text-[#D42D2D] transition">Filosofía</a>
        <a href="#contacto" className="text-gray-300 hover:text-[#D42D2D] transition">Contacto</a>
      </div>
      {/* Contacto */}
      <div className="flex flex-col gap-2 md:items-end">
        <span className="text-white font-bold mb-2">Contacto</span>
        <span className="text-gray-300 text-sm">Calle Falsa 123</span>
        <span className="text-gray-300 text-sm">+12 345 678 900</span>
        <a href="mailto:info@baekhoacademy.com" className="text-gray-300 text-sm hover:text-[#D42D2D] transition">info@baekhoacademy.com</a>
      </div>
    </div>
    <hr className="my-6 border-[#D42D2D] opacity-40" />
    <div className="text-center text-gray-400 text-xs">
      © 2024 Academia Deportiva Baekho. Todos los derechos reservados.
    </div>
  </footer>
);

export default Footer; 