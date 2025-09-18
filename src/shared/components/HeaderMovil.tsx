import React, { useEffect, useState, JSX } from "react";
import MobileMenu from "./MobileMenu";

type NavItem = { label: string; id: string };

const navItems: NavItem[] = [
  { label: "Inicio", id: "inicio" },
  { label: "Historia", id: "historia" },
  { label: "Galería", id: "galeria" },
  { label: "Logros", id: "logros" },
  { label: "Filosofía", id: "filosofia" },
  { label: "Contacto", id: "contacto" },
];

function HeaderNav(): JSX.Element {
  const [active, setActive] = useState<string>("inicio");
  const [goldBorder, setGoldBorder] = useState<string | null>(null);

  // Activa sección desde hash inicial
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    let tid: number | undefined;

    if (hash && navItems.some((item) => item.id === hash)) {
      setActive(hash);
      tid = window.setTimeout(() => {
        const targetElement = document.getElementById(hash);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }
      }, 100);
    }
    return () => {
      if (tid !== undefined) window.clearTimeout(tid);
    };
  }, []);

  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      const pairs = navItems.map((item) => ({
        item,
        section: document.getElementById(item.id),
      }));
      const scrollPosition = window.scrollY + 150;

      for (let i = pairs.length - 1; i >= 0; i--) {
        const { item, section } = pairs[i]!;
        if (section && section.offsetTop <= scrollPosition) {
          setActive(item.id);
          break;
        }
      }
    };

    const timeoutId = window.setTimeout(() => {
      handleScroll();
      window.addEventListener("scroll", handleScroll);
    }, 1000);

    return () => {
      window.clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scroll al hacer clic
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setGoldBorder(id);
    window.setTimeout(() => {
      setActive(id);
      setGoldBorder(null);
    }, 200);
  };

  return (
    <nav className="hidden lg:flex space-x-8">
      {navItems.map((item) => {
        const base =
          "header-nav-btn font-bold text-lg px-6 py-2 rounded-lg transition-all duration-300 relative";
        const isActive = active === item.id;
        const isGold = goldBorder === item.id;
        let btnClass = base;
        if (isGold) btnClass += " gold";
        else if (isActive) btnClass += " red active";
        const bg = isActive ? "bg-red-500" : "";

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className={
              `${btnClass} ${bg} ` +
              (isActive
                ? "text-white shadow-lg shadow-red-500/25 scale-105"
                : "text-white hover:text-yellow-400 hover:bg-red-500/20 hover:scale-105")
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

function HeaderMovil(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className="relative shadow-sm sticky top-0 z-50 w-full h-20 custom-header"
      style={{
        background: "radial-gradient(circle, #000 0%, #7a1a1a 60%, #D42D2D 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-3 flex items-center justify-between h-20 header-gap-xl header-wide-xl">
        {/* Logo */}
        <div className="flex items-center h-full">
          <img
            src="/logo.png"
            alt="Baekho Logo"
            className="header-logo-img h-10 w-32 mr-2 -mt-1
              sm:h-10 sm:w-32 sm:mr-2
              xs:h-8 xs:w-24 xs:mr-1 xs:-mt-0.5
              max-w-[110px] object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-wide text-white xs:text-xl">
              BAEKHO
            </span>
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: "#D42D2D" }}
            >
              ACADEMIA DEPORTIVA
            </span>
          </div>
        </div>

        {/* Nav desktop (no se usa en móvil, pero lo dejo para consistencia) */}
        <HeaderNav />

        {/* Botón menú móvil */}
        <div className="lg:hidden">
          <button
            className="text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Menú móvil */}
        <MobileMenu
          open={mobileOpen}
          setOpen={setMobileOpen}
          navItems={navItems}
          id="mobile-menu"
        />
      </div>
    </header>
  );
}

export default HeaderMovil;
