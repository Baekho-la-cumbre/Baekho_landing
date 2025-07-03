import React from "react";

// ScrollReveal simple (fade-in)
const ScrollReveal = ({ children, delay = 0 }) => {
  const [visible, setVisible] = React.useState(false);
  const ref = React.useRef();
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

// AnimatedCounter simple
const AnimatedCounter = ({ end, suffix = "", className = "" }) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = Math.ceil(end / (duration / 16));
    const interval = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(interval);
  }, [end]);
  return <span className={className}>{count}{suffix}</span>;
};

// InteractiveCard simple
const InteractiveCard = ({ children, className = "", glowColor }) => (
  <div
    className={
      `transition-shadow duration-300 hover:shadow-lg hover:shadow-${glowColor || "red"}-500/30 ` +
      className
    }
    style={glowColor ? { boxShadow: `0 0 24px 0 ${glowColor}` } : {}}
  >
    {children}
  </div>
);

// Datos de ejemplo
const logrosData = [
  { atleta: "Ana Pérez", año: 2024, competencia: "Campeonato Nacional", medalla: "Oro" },
  { atleta: "Carlos López", año: 2024, competencia: "Open Internacional", medalla: "Plata" },
  { atleta: "María González", año: 2023, competencia: "Copa Panamericana", medalla: "Oro" },
  { atleta: "Diego Marín", año: 2023, competencia: "Torneo Regional", medalla: "Bronce" },
  { atleta: "Sofía Ruiz", año: 2023, competencia: "Campeonato Juvenil", medalla: "Plata" },
  { atleta: "Andrés Castro", año: 2022, competencia: "Copa Nacional", medalla: "Oro" },
];

const atletasDestacados = [
  {
    nombre: "Ana Pérez",
    imagen: null,
    categoria: "Cinturón Negro 2º Dan",
    logros: "Campeona Nacional 2024, 3 medallas de oro."
  },
  {
    nombre: "Carlos López",
    imagen: null,
    categoria: "Cinturón Negro 1º Dan",
    logros: "Subcampeón Internacional 2024, 2 medallas de plata."
  },
];

const getMedallaColor = (medalla) => {
  switch (medalla) {
    case "Oro":
      return "text-yellow-400 border-yellow-400";
    case "Plata":
      return "text-gray-300 border-gray-300";
    case "Bronce":
      return "text-orange-600 border-orange-600";
    default:
      return "text-white border-white";
  }
};

const Logros = () => (
  <section id="logros" className="py-20 px-4 min-h-[100vh] relative" style={{background: 'radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)'}}>
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 text-center">
            NUESTROS <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">LOGROS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl text-center">
            El fruto del esfuerzo, la disciplina y la dedicación de nuestros atletas
          </p>
        </div>
      </ScrollReveal>

      {/* Reconocimientos */}
      <div className="mb-20">
        <ScrollReveal delay={200}>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            RECONOCIMIENTOS <span className="text-orange-500 drop-shadow-[0_0_16px_#FE5900]">RECIENTES</span>
          </h3>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logrosData.map((logro, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <InteractiveCard className="bg-black/80 border border-red-500/30 rounded-lg p-6 hover:border-red-500/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25">
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full border-2 ${getMedallaColor(logro.medalla)} flex items-center justify-center mr-4 animate-pulse`}
                  >
                    <span className="font-bold text-sm">{logro.medalla[0]}</span>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{logro.atleta}</h4>
                    <p className="text-gray-400 text-sm">{logro.año}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{logro.competencia}</p>
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${getMedallaColor(logro.medalla)} bg-opacity-20`}
                  >
                    {logro.medalla}
                  </span>
                </div>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Atletas Destacados */}
      <div>
        <ScrollReveal>
          <h3 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            ATLETAS <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">DESTACADOS</span>
          </h3>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {atletasDestacados.map((atleta, index) => (
            <ScrollReveal key={index} delay={index * 200}>
              <InteractiveCard className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-black/90 border border-red-500/30 rounded-lg p-6 transform group-hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/25">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-red-500 overflow-hidden transform group-hover:rotate-3 transition-transform duration-300 bg-gray-200 flex items-center justify-center">
                      {atleta.imagen ? (
                        <img
                          src={atleta.imagen}
                          alt={atleta.nombre}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-5xl text-gray-400">🧑‍🎓</span>
                      )}
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">{atleta.nombre}</h4>
                    <p className="text-red-400 font-semibold mb-4">{atleta.categoria}</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <h5 className="text-orange-400 font-bold mb-2">Logros Principales:</h5>
                    <p className="text-gray-300 text-sm leading-relaxed">{atleta.logros}</p>
                  </div>
                </div>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <ScrollReveal delay={400}>
        <div className="mt-20 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-12 border border-red-500/20">
          <h3 className="text-3xl font-black text-white mb-8 text-center">
            ESTADÍSTICAS DE <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">EXCELENCIA</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={50} suffix="+" className="text-4xl font-black text-red-500 mb-2" />
              <div className="text-gray-300">Medallas Ganadas</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={15} className="text-4xl font-black text-yellow-500 mb-2" />
              <div className="text-gray-300">Campeones Nacionales</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={8} className="text-4xl font-black text-red-500 mb-2" />
              <div className="text-gray-300">Competencias Internacionales</div>
            </div>
            <div className="transform hover:scale-110 transition-transform duration-300">
              <AnimatedCounter end={100} suffix="%" className="text-4xl font-black text-yellow-500 mb-2" />
              <div className="text-gray-300">Dedicación</div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Logros; 