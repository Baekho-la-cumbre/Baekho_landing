import React from "react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#2a0a0a] to-[#181c24] pt-12 pb-4 px-4 border-t-2 border-[#D42D2D]">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
      {/* Logo y descripción */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center h-19">
          <img
            src="/logo.svg"
            alt="Baekho Logo"
            className="header-logo-img h-19 w-32 mr-2 -mt-1"
            style={{ filter: 'drop-shadow(0 0 9px white) drop-shadow(0 0 24px white)' }}
          />
          <div>
            <span className="block text-lg font-bold text-white leading-tight">BAEKHO</span>
            <span className="block text-xs font-bold text-[#D42D2D]">ACADEMIA DEPORTIVA</span>
          </div>
        </div>
        </div>
        <p className="text-gray-300 text-sm max-w-xs">
          Forjando campeones desde hace más de 15 años. Únete a nuestra familia y descubre tu potencial en el arte del Taekwondo.
        </p>
        <div className="flex gap-4 mt-2">
          <a href="https://www.facebook.com/share/1BoxMgww6V/" target="_blank" rel="noopener noreferrer">
            <img src="/facebook.png" alt="Facebook" className="w-6 h-6 inline" />
          </a>
          <a href="https://www.tiktok.com/@club_baekho?_t=ZS-8xiu94xikDa&_r=1" target="_blank" rel="noopener noreferrer">
            <img src="/tik-tok.png" alt="TikTok" className="w-6 h-6 inline" />
          </a>
          <a href="https://www.instagram.com/tkd_baekho?igsh=MWgyM2YxaHFodG53MQ==" target="_blank" rel="noopener noreferrer">
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6 inline" />
          </a>
        </div>
      </div>
      {/* Enlaces rápidos */}
      <div className="flex flex-col gap-2 md:items-left">
        <span className="text-white font-bold mb-2">Enlaces Rápidos</span>
        <a href="#inicio" className="text-gray-300 hover:text-[#D42D2D] transition">Inicio</a>
        <a href="#historia" className="text-gray-300 hover:text-[#D42D2D] transition">Historia</a>
        <a href="#galeria" className="text-gray-300 hover:text-[#D42D2D] transition">Galeria</a>
        <a href="#logros" className="text-gray-300 hover:text-[#D42D2D] transition">Logros</a>
        <a href="#filosofia" className="text-gray-300 hover:text-[#D42D2D] transition">Filosofía</a>
        <a href="#contacto" className="text-gray-300 hover:text-[#D42D2D] transition">Contacto</a>
      </div>
      {/* Contacto */}
      <div className="flex flex-col gap-2 md:items-left">
        <span className="text-white font-bold mb-2">Contacto</span>
        <span className="text-gray-300 text-sm">carrera 9AE 29A-56, Floridablanca, Colombia</span>
        <span className="text-gray-300 text-sm">+57 317 7688456</span>
        <a href="mailto:info@baekhoacademy.com" className="text-gray-300 text-sm hover:text-[#D42D2D] transition">Baekhotaekwondo2016@outlook.com</a>
      </div>
    </div>
    <hr className="my-6 border-[#D42D2D] opacity-40" />
    <div className="text-center text-gray-400 text-xs">
      © 2025 Academia Deportiva Baekho. Todos los derechos reservados.
      </div>
    </footer>
  );

export default Footer; 