import Header from '../shared/components/Header.jsx';
import Inicio from '../sections/Inicio/Inicio.jsx';
import Historia from '../sections/Historia/Historia.jsx';
import Galeria from '../sections/Galeria/Galeria.jsx';
import Logros from '../sections/Logros/Logros.jsx';
import Filosofia from '../sections/Filosofia/Filosofia.jsx';
import Contacto from '../sections/Contacto/Contacto.jsx';
import Footer from '../shared/components/Footer.jsx';

function Landing() {
  return (
    <div>
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