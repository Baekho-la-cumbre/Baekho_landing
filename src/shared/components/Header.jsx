import React, { useState, useEffect } from 'react';
import MobileMenu from './MobileMenu';

const navItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Historia', id: 'trayectoria' },
  { label: 'Galería', id: 'galeria' },
  { label: 'Logros', id: 'logros' },
  { label: 'Filosofía', id: 'filosofia' },
  { label: 'Contacto', id: 'contacto' },
];

function HeaderNav() {
  const [active, setActive] = useState('inicio');
  const [goldBorder, setGoldBorder] = useState(null);

  // Scrollspy: actualiza el botón activo según la sección visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll al hacer clic
  const handleNavClick = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80; // Ajusta según el alto del header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
    setGoldBorder(id);
    setTimeout(() => {
      setActive(id);
      setGoldBorder(null);
    }, 200);
  };

  return (
    <nav className="hidden md:flex space-x-8">
      {navItems.map((item) => {
        let base =
          "header-nav-btn font-bold text-lg px-6 py-2 rounded-lg transition-all duration-300 relative";
        let isActive = active === item.id;
        let isGold = goldBorder === item.id;
        let btnClass = base;
        if (isGold) btnClass += ' gold';
        else if (isActive) btnClass += ' red active';
        // Fondo rojo claro solo si está activo
        let bg = isActive ? "bg-red-500" : "";
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={
              `${btnClass} ${bg} ` +
              (isActive
                ? 'text-white shadow-lg shadow-red-500/25 scale-105'
                : 'text-white hover:text-yellow-400 hover:bg-red-500/20 hover:scale-105')
            }
          >
            {item.label}
            <span className="border-anim" />
          </a>
        );
      })}
    </nav>
  );
}

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header
      className="relative shadow-sm sticky top-0 z-50 w-full h-20 custom-header"
      style={{
        background: 'radial-gradient(circle, #000 0%, #7a1a1a 60%, #D42D2D 100%)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-between top-0 z-50 w-full h-19 ">
        {/* Logo */}
        <div className="flex items-center h-19">
          <img
            src="/logo.svg"
            alt="Baekho Logo"
            className="header-logo-img h-19 w-32 mr-2 -mt-1"
            style={{ filter: 'drop-shadow(0 0 12px white) drop-shadow(0 0 24px white)' }}
          />
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-800 tracking-wide text-white">BAEKHO </span>
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: '#D42D2D' }}
              >
                ACADEMIA DEPORTIVA
              </span>
            </div>
        </div>

        {/* Navegación */}
        <HeaderNav />
        {/* Menú móvil */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-blue-600 focus:outline-none" onClick={() => setMobileOpen(true)}>
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <MobileMenu open={mobileOpen} setOpen={setMobileOpen} navItems={navItems} />
      </div>
    </header>
  );
}

export default Header; 