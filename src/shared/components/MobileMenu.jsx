import React, { useEffect, useState } from 'react';

function MobileMenu({ open, setOpen, navItems, id }) {
  const [active, setActive] = useState('inicio');
  const [goldBorder, setGoldBorder] = useState(null);

  // Scrollspy: actualiza el botón activo según la sección visible
  useEffect(() => {
    if (!open) return;
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
  }, [open, navItems]);

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
      setOpen(false);
    }, 200);
  };

  // Cierra el menú al hacer clic fuera
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'visible' : 'invisible'}`}
      style={{ background: open ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0)' }}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="mobile-menu-label"
      aria-hidden={!open}
    >
      <aside
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-black via-red-900 to-red-700 shadow-lg transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        id={id}
      >
        <button
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú de navegación"
        >
          &times;
        </button>
        <nav className="flex flex-col mt-20 space-y-6 px-8">
          <span id="mobile-menu-label" className="sr-only">Menú de navegación</span>
          {navItems.map((item) => {
            let base =
              "header-nav-btn font-bold text-lg px-6 py-2 rounded-lg transition-all duration-300 relative";
            let isActive = active === item.id;
            let isGold = goldBorder === item.id;
            let btnClass = base;
            if (isGold) btnClass += ' gold';
            else if (isActive) btnClass += ' red active';
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
      </aside>
    </div>
  );
}

export default MobileMenu; 