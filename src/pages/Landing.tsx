import Header from '../shared/components/Header.js';
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
  return (
    <div>
      <WhatsAppButton />
      <ScrollPag />
      <Header />
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