import React, { useEffect, useRef, useState, type JSX } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { navItems, sectionNavItems } from "../constants/navItems";

/** Hook: detecta dirección del scroll y si ya se scrolleó */
function useScrollDirection(threshold = 6) {
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const delta = y - lastY.current;
          if (Math.abs(delta) > threshold) {
            setDirection(delta > 0 ? "down" : "up");
            lastY.current = y;
          }
          setScrolled(y > 2);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    lastY.current = window.scrollY || 0;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled };
}

function scrollToSection(id: string) {
  const targetElement = document.getElementById(id);
  if (!targetElement) return;

  const headerEl = document.querySelector(".baekho-header");
  const headerH = headerEl instanceof HTMLElement ? headerEl.offsetHeight : 72;
  const offsetTop = targetElement.offsetTop - (headerH + 8);
  window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
}

function HeaderNav(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("inicio");
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (location.pathname === "/logros") {
      setActive("logros");
      return undefined;
    }
    if (location.pathname === "/deportistas") {
      setActive("deportistas");
      return undefined;
    }
    if (isHome) {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionNavItems.some((item) => item.id === hash)) {
        setActive(hash);
        const tid = window.setTimeout(() => scrollToSection(hash), 100);
        return () => window.clearTimeout(tid);
      }
      setActive("inicio");
    }
    return undefined;
  }, [location.pathname, location.hash, isHome]);

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const pairs = sectionNavItems.map((item) => ({
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
  }, [isHome]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string,
    isRoute?: boolean
  ) => {
    e.preventDefault();

    if (isRoute) {
      navigate(href);
      setActive(id);
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    if (isHome) {
      scrollToSection(id);
      window.history.replaceState(null, "", `#${id}`);
    } else {
      navigate(`/#${id}`);
    }

    setActive(id);
  };

  return (
    <nav className="baekho-header__nav" aria-label="Navegación principal">
      {navItems.map((item, index) => {
        const isActive = active === item.id;

        return (
          <React.Fragment key={item.id}>
            {index > 0 ? <span className="baekho-header__sep" aria-hidden="true" /> : null}
            <a
              href={item.href}
              onClick={(e) => handleNavClick(e, item.id, item.href, item.isRoute)}
              className={`baekho-header__link${isActive ? " is-active" : ""}`}
            >
              <span className="baekho-header__link-label">{item.label}</span>
            </a>
          </React.Fragment>
        );
      })}
    </nav>
  );
}

function Header(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { direction, scrolled } = useScrollDirection(6);

  return (
    <header
      className={[
        "baekho-header",
        "sticky top-0 z-50 w-full",
        "transition-transform duration-300 will-change-transform",
        scrolled ? "baekho-header--scrolled" : "",
        direction === "down" ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
    >
      <div className="baekho-header__shell">
        <div className="baekho-header__texture baekho-header__texture--left" aria-hidden="true" />

        <div className="baekho-header__row">
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

          <HeaderNav />

          <div className="baekho-header__mobile-btn">
            <button
              type="button"
              className="text-white focus:outline-none"
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
        </div>

        {/* Línea roja bajo TODO el header negro (desde el corte del diseño hacia la derecha) */}
        <div className="baekho-header__glow-line" aria-hidden="true" />
      </div>

      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} navItems={navItems} id="mobile-menu" />
    </header>
  );
}

export default Header;
