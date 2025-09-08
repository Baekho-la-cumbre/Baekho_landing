import { useEffect, useState } from "react";
import Header from "../shared/components/Header";
import HeaderMovil from "../shared/components/HeaderMovil";
import Inicio from '../sections/Inicio/Inicio.js';
import Historia from '../sections/Historia/Historia.jsx';
import Galeria from '../sections/Galeria/Galeria.js';
import Logros from '../sections/Logros/Logros.js';
import Filosofia from '../sections/Filosofia/Filosofia.js';
import Contacto from '../sections/Contacto/Contacto.jsx';
import Footer from '../shared/components/Footer.js';
import ScrollPag from '../shared/components/ScrollPag.js';
import WhatsAppButton from '../shared/components/WhatsAppButton.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Landing() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)"); // lg en Tailwind
    const update = () => setIsDesktop(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <div>
      <WhatsAppButton />
      <ScrollPag />
      {isDesktop ? <Header /> : <HeaderMovil />}
      <Inicio />
      <Historia />
      <Galeria />
      <Logros />
      <Filosofia />
      <Contacto />
      <Footer />
    </div>
  );
}

export default Landing; 