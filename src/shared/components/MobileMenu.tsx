import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import type { NavItem } from "../constants/navItems";
import { sectionNavItems } from "../constants/navItems";

interface MobileMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
  id: string;
}

function scrollToSection(sectionId: string) {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return;

  const headerEl = document.querySelector(".baekho-header");
  const headerH = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 72;
  const offsetTop = targetElement.offsetTop - (headerH + 8);
  window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, setOpen, navItems, id }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("inicio");
  const [mounted, setMounted] = useState(false);
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (location.pathname === "/logros") {
      setActive("logros");
      return;
    }
    if (location.pathname === "/deportistas") {
      setActive("deportistas");
      return;
    }
    if (isHome) {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionNavItems.some((item) => item.id === hash)) {
        setActive(hash);
      } else {
        setActive("inicio");
      }
    }
  }, [location.pathname, location.hash, isHome]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    e.preventDefault();

    if (item.isRoute) {
      navigate(item.href);
      setActive(item.id);
      setOpen(false);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    if (isHome) {
      scrollToSection(item.id);
      window.history.replaceState(null, "", `#${item.id}`);
    } else {
      navigate(`/#${item.id}`);
    }

    setActive(item.id);
    setOpen(false);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`baekho-mobile-menu-overlay ${open ? "is-open" : ""}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby="mobile-menu-label"
      aria-hidden={!open}
    >
      <aside
        className={`baekho-mobile-menu ${open ? "is-open" : ""}`}
        id={id}
      >
        <div className="baekho-mobile-menu__texture" aria-hidden="true" />

        <button
          type="button"
          className="baekho-mobile-menu__close"
          onClick={() => setOpen(false)}
          aria-label="Cerrar menú de navegación"
        >
          &times;
        </button>

        <nav className="baekho-mobile-menu__nav" aria-label="Menú móvil">
          <span id="mobile-menu-label" className="sr-only">
            Menú de navegación
          </span>
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`baekho-mobile-menu__link${isActive ? " is-active" : ""}`}
              >
                <span className="baekho-mobile-menu__link-label">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </div>,
    document.body
  );
};

export default MobileMenu;
