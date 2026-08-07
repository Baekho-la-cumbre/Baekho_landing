import React from "react";
import BootstrapIcon from "../../shared/components/BootstrapIcon";
import {
  deportistasData,
  type DeportistaItem,
} from "../../shared/assets/DataDeportistas";

type ScrollRevealProps = React.PropsWithChildren<{ delay?: number }>;

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(40px)",
        transition: `opacity 0.7s ${delay}ms, transform 0.7s ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const BORDER_RED = "#ef4444";
const SHADOW_RED = "0 0 16px 0 #ef444455";

const DeportistaCard: React.FC<{ deportista: DeportistaItem }> = ({
  deportista,
}) => {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const nameParts = deportista.nombre.split(" ");
  const firstLine = nameParts.slice(0, 2).join(" ");
  const secondLine = nameParts.slice(2).join(" ");

  return (
    <div
      className={`bg-gradient-to-br from-black/80 to-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center border-4 min-h-[320px] relative overflow-hidden h-full cursor-pointer transition-transform duration-700 ${
        isFlipped ? "rotate-y-180" : "rotate-y-0"
      }`}
      style={{
        borderColor: BORDER_RED,
        boxShadow: SHADOW_RED,
        transformStyle: "preserve-3d",
      }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <img
        src={deportista.fondo || "/fondocard.png"}
        alt="Fondo decorativo"
        className={`absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none select-none transition-opacity duration-700 ${
          isFlipped ? "opacity-0" : "opacity-20"
        }`}
        style={{ zIndex: 0 }}
      />

      <div
        className={`relative z-10 flex flex-col w-full h-full transition-opacity duration-700 ${
          isFlipped ? "opacity-0" : "opacity-100"
        }`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ border: `3px solid ${BORDER_RED}` }}
          >
            <img
              src={deportista.foto || "/deportista1.jpg"}
              alt={deportista.nombre}
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex-1 ml-3 text-right">
            <h4 className="text-white font-extrabold text-lg md:text-xl mb-1 tracking-wide">
              {firstLine}
              {secondLine ? (
                <>
                  <br />
                  {secondLine}
                </>
              ) : null}
            </h4>
            {deportista.categoria ? (
              <p className="text-gray-300 text-sm italic">{deportista.categoria}</p>
            ) : null}
          </div>
        </div>

        <div className="flex-1" />

        <div className="mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow flex items-center justify-center gap-2">
          <BootstrapIcon name="award-fill" size="1.5rem" className="text-red-500" />
          <span className="text-gray-100 text-sm text-center">{deportista.detalle}</span>
        </div>
      </div>

      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
          isFlipped ? "opacity-100" : "opacity-0"
        }`}
        style={{ backfaceVisibility: "hidden" }}
      >
        <img
          src={deportista.fondo || "/fondocard.png"}
          alt={`Fondo de ${deportista.nombre}`}
          className="w-full h-full object-cover rounded-2xl"
          style={{ transform: "rotateY(180deg)" }}
        />
      </div>
    </div>
  );
};

const Deportistas: React.FC = () => {
  return (
    <section
      id="deportistas"
      className="py-20 px-4 min-h-[100vh] relative"
      style={{
        background: "radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)",
      }}
    >
      <style>{`
        .rotate-y-0 { transform: rotateY(0deg); }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 text-center flex flex-wrap justify-center items-center gap-2 sm:gap-3">
              NUESTROS{" "}
              <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">
                DEPORTISTAS
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl text-center">
              Talento, disciplina y compromiso que representan a la Academia Baekho
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {deportistasData.map((deportista, index) => (
            <ScrollReveal key={deportista.nombre} delay={index * 80}>
              <DeportistaCard deportista={deportista} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Deportistas;
