import React, { useMemo, useState } from "react";
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
const FILTRO_TODOS = "Todos";

/** Orden de toggles (las franjas se agrupan, excepto franja negra). */
const BELT_FILTER_ORDER = [
  "Cinturón Blanco",
  "Cinturón Amarillo",
  "Cinturón Verde",
  "Cinturón Azul",
  "Cinturón Rojo",
  "Cinturón Franja Negro",
  "Cinturón Negro",
];

function normalizeCategoria(categoria?: string): string {
  if (!categoria?.trim()) return "";
  return categoria
    .trim()
    .replace(/^inturón/i, "Cinturón")
    .replace(/Negrto/gi, "Negro")
    .replace(/Franga/gi, "Franja")
    .replace(/\s+/g, " ");
}

/**
 * Agrupa franjas con el cinturón anterior (aún no completo),
 * excepto Franja Negro, que sí es categoría aparte.
 */
function cinturonFilterGroup(categoria?: string): string {
  const c = normalizeCategoria(categoria).toLowerCase();
  if (!c) return "Sin cinturón";

  if (c.includes("franja negro") || c.includes("franja negra")) {
    return "Cinturón Franja Negro";
  }
  if (c.includes("franja azul")) return "Cinturón Verde";
  if (c.includes("franja rojo") || c.includes("franja roja")) {
    return "Cinturón Azul";
  }
  if (c.includes("franja verde")) return "Cinturón Amarillo";
  if (c.includes("franja amarillo") || c.includes("franja amarilla")) {
    return "Cinturón Blanco";
  }

  if (c.includes("negro")) return "Cinturón Negro";
  if (c.includes("rojo")) return "Cinturón Rojo";
  if (c.includes("azul")) return "Cinturón Azul";
  if (c.includes("verde")) return "Cinturón Verde";
  if (c.includes("amarillo")) return "Cinturón Amarillo";
  if (c.includes("blanco")) return "Cinturón Blanco";

  return normalizeCategoria(categoria) || "Sin cinturón";
}

function beltSortIndex(filtro: string): number {
  const idx = BELT_FILTER_ORDER.findIndex(
    (b) => b.toLowerCase() === filtro.toLowerCase()
  );
  return idx === -1 ? BELT_FILTER_ORDER.length + 1 : idx;
}

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

        {deportista.detalle ? (
          <div className="mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow flex items-center justify-center gap-2">
            <BootstrapIcon name="award-fill" size="1.5rem" className="text-red-500" />
            <span className="text-gray-100 text-sm text-center">{deportista.detalle}</span>
          </div>
        ) : null}
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
  const [filtro, setFiltro] = useState(FILTRO_TODOS);

  const cinturones = useMemo(() => {
    const set = new Set(
      deportistasData.map((d) => cinturonFilterGroup(d.categoria))
    );
    return Array.from(set).sort(
      (a, b) => beltSortIndex(a) - beltSortIndex(b) || a.localeCompare(b)
    );
  }, []);

  const deportistasFiltrados = useMemo(() => {
    if (filtro === FILTRO_TODOS) return deportistasData;
    return deportistasData.filter(
      (d) => cinturonFilterGroup(d.categoria) === filtro
    );
  }, [filtro]);

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
          <div className="flex flex-col items-center justify-center mb-10 px-4">
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

        <div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          role="group"
          aria-label="Filtrar deportistas por cinturón"
        >
          {[FILTRO_TODOS, ...cinturones].map((cinturon) => {
            const activo = filtro === cinturon;
            return (
              <button
                key={cinturon}
                type="button"
                onClick={() => setFiltro(cinturon)}
                aria-pressed={activo}
                className={`px-3.5 py-2 text-xs sm:text-sm font-bold uppercase tracking-wide border transition-colors duration-200 ${
                  activo
                    ? "bg-red-600 border-red-500 text-white shadow-[0_0_14px_rgba(212,45,45,0.45)]"
                    : "bg-black/40 border-white/20 text-gray-300 hover:border-red-400 hover:text-white"
                }`}
              >
                {cinturon}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {deportistasFiltrados.map((deportista, index) => (
            <ScrollReveal key={deportista.nombre} delay={Math.min(index, 8) * 60}>
              <DeportistaCard deportista={deportista} />
            </ScrollReveal>
          ))}
        </div>

        {deportistasFiltrados.length === 0 ? (
          <p className="text-center text-gray-400 mt-8">
            No hay deportistas con este cinturón.
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default Deportistas;
