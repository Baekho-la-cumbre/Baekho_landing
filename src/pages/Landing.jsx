import Header from '../shared/components/Header.jsx';
import Inicio from '../sections/Inicio/Inicio.jsx';
import Historia from '../sections/Historia/Historia.jsx';
import Galeria from '../sections/Galeria/Galeria.jsx';
import Logros from '../sections/Logros/Logros.jsx';

function Landing() {
  return (
    <div>
      <Header />
      <Inicio />
      <Historia />
      <Galeria />
      <Logros />
    </div>
  );
}

export default Landing; 