import PageShell from "../shared/components/PageShell";
import Deportistas from "../sections/Deportistas/Deportistas";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DeportistasPage() {
  return (
    <PageShell>
      <Deportistas />
    </PageShell>
  );
}

export default DeportistasPage;
