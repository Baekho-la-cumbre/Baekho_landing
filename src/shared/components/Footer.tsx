import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <footer className="baekho-footer">
    <div className="baekho-footer__texture" aria-hidden="true" />
    <div className="baekho-footer__glow" aria-hidden="true" />

    <div className="baekho-footer__inner">
      <div className="baekho-footer__brand-col">
        <Link to="/" className="baekho-footer__brand">
          <img
            src="/logo.png"
            alt="Baekho Logo"
            className="baekho-footer__brand-logo"
          />
          <span className="baekho-footer__brand-text">
            <span className="baekho-footer__brand-name">BAEKHO</span>
            <span className="baekho-footer__brand-sub">ACADEMIA DEPORTIVA</span>
          </span>
        </Link>

        <p className="baekho-footer__copy">
          Forjando campeones desde hace más de 15 años. Únete a nuestra familia y
          descubre tu potencial en el arte del Taekwondo.
        </p>

        <div className="baekho-footer__socials">
          <a
            href="https://www.facebook.com/share/1BoxMgww6V/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src="/facebook.png" alt="" />
          </a>
          <a
            href="https://www.tiktok.com/@club_baekho?_t=ZS-8xiu94xikDa&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <img src="/tik-tok.png" alt="" />
          </a>
          <a
            href="https://www.instagram.com/tkd_baekho?igsh=MWgyM2YxaHFodG53MQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="/instagram.png" alt="" />
          </a>
        </div>
      </div>

      <div className="baekho-footer__col">
        <h3 className="baekho-footer__title">Contacto</h3>
        <span className="baekho-footer__text">
          CRA 9AE #29A-56, Floridablanca, Santander
        </span>
        <a href="tel:+573177688456" className="baekho-footer__link">
          +57 317 7688456
        </a>
        <a
          href="mailto:Baekhotaekwondo2016@outlook.com"
          className="baekho-footer__link"
        >
          Baekhotaekwondo2016@outlook.com
        </a>
      </div>

      <div className="baekho-footer__col">
        <h3 className="baekho-footer__title">Enlaces Rápidos</h3>
        <div className="baekho-footer__links">
          <Link to="/#inicio" className="baekho-footer__link">Inicio</Link>
          <Link to="/logros" className="baekho-footer__link">Logros</Link>
          <Link to="/#historia" className="baekho-footer__link">Historia</Link>
          <Link to="/deportistas" className="baekho-footer__link">Deportistas</Link>
          <Link to="/#filosofia" className="baekho-footer__link">Filosofía</Link>
          <Link to="/#galeria" className="baekho-footer__link">Galería</Link>
          <Link to="/#contacto" className="baekho-footer__link">Contacto</Link>
        </div>
      </div>
    </div>

    <div className="baekho-footer__bottom">
      <div className="baekho-footer__bottom-line" aria-hidden="true" />
      <p>© 2025 Academia Deportiva Baekho. Todos los derechos reservados.</p>
    </div>
  </footer>
);

export default Footer;
