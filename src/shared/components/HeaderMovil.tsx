import { useState, type JSX } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { navItems } from "../constants/navItems";

function HeaderMovil(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="baekho-header baekho-header--mobile sticky top-0 z-50 w-full">
      <div className="baekho-header__shell">
        <div className="baekho-header__texture baekho-header__texture--left" aria-hidden="true" />

        <div className="baekho-header__row baekho-header__row--mobile">
          <Link to="/" className="baekho-header__brand">
            <img
              src="/logo.png"
              alt="Baekho"
              className="baekho-header__brand-logo"
            />
            <span className="baekho-header__brand-text">
              <span className="baekho-header__brand-name">BAEKHO</span>
              <span className="baekho-header__brand-sub">ACADEMIA DEPORTIVA</span>
            </span>
          </Link>

          <button
            className="baekho-header__burger"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="baekho-header__glow-line" aria-hidden="true" />
      </div>

      <MobileMenu
        open={mobileOpen}
        setOpen={setMobileOpen}
        navItems={navItems}
        id="mobile-menu"
      />
    </header>
  );
}

export default HeaderMovil;
