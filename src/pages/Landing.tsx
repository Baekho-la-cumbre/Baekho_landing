import Inicio from "../sections/Inicio/Inicio.js";
import Historia from "../sections/Historia/Historia.jsx";
import Filosofia from "../sections/Filosofia/Filosofia.js";
import Galeria from "../sections/Galeria/Galeria.js";
import Contacto from "../sections/Contacto/Contacto.jsx";
import PageShell from "../shared/components/PageShell";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Landing() {
  return (
    <PageShell>
      <Inicio />
      <Historia />
      <Filosofia />
      <Galeria />
      <Contacto />
    </PageShell>
  );
}

export default Landing;
