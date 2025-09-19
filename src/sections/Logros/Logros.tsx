import React from "react";
import BootstrapIcon from "../../shared/components/BootstrapIcon";
import {
  logrosData,
  atletasDestacados,
  conmemoracionData,
} from "../../shared/assets/DataLogros";

/** ScrollReveal simple (fade-in) */
type ScrollRevealProps = React.PropsWithChildren<{ delay?: number }>;

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const [visible, setVisible] = React.useState<boolean>(false);
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

/** AnimatedCounter con IntersectionObserver y easing */
interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  suffix = "",
  className = "",
}) => {
  const [count, setCount] = React.useState<number>(0);
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const animationRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let timeoutId: number | undefined;

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (entries[0] && entries[0].isIntersecting) {
        setCount(0);
        let startTime: number | undefined;

        const animate = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);

          if (progress < 1) {
            setCount(Math.floor(easeOutQuart * end));
            animationRef.current = requestAnimationFrame(animate);
          } else {
            setCount(end);
          }
        };

        timeoutId = window.setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, 10);
      } else {
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      }
    };

    observer = new window.IntersectionObserver(handleIntersect, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (observer && ref.current) observer.unobserve(ref.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  );
};


const Logros: React.FC = () => {
  const [showConmemoracion, setShowConmemoracion] = React.useState(false);

  return (
  <section
    id="logros"
    className="py-20 px-4 min-h-[100vh] relative"
    style={{ background: "radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)" }}
  >
    <style>{`
      .rotate-y-0 {
        transform: rotateY(0deg);
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="flex flex-col items-center justify-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 text-center flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            NUESTROS <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">LOGROS</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl text-center">
            El fruto del esfuerzo, la disciplina y la dedicación de nuestros atletas
          </p>
        </div>
      </ScrollReveal>

      {/* Botones de alternancia */}
      <ScrollReveal>
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setShowConmemoracion(false)}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              !showConmemoracion
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Atletas Destacados
          </button>
          <button
            onClick={() => setShowConmemoracion(true)}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              showConmemoracion
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Conmemoración
          </button>
        </div>
      </ScrollReveal>

      {/* Atletas Destacados / Conmemoración */}
      <div>
        <ScrollReveal>
          <h3 className="text-3xl md:text-4xl font-black text-red-500 mb-12 text-center drop-shadow-[0_0_24px_#D42D2D] tracking-widest flex items-center justify-center gap-2">
            {showConmemoracion ? "CONMEMORACIÓN" : "ATLETAS DESTACADOS"}
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
          {(showConmemoracion ? conmemoracionData : atletasDestacados).map((atleta, index) => {
            const [isFlipped, setIsFlipped] = React.useState(false);
            
            return (
            <ScrollReveal key={atleta.nombre} delay={index * 200}>
              <div 
                className={`relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-red-500 bg-gradient-to-br from-red-700/30 via-red-900/10 to-black/0 p-0 transition-transform duration-700 hover:scale-105 hover:shadow-[0_0_64px_0_#D42D2D99] h-[650px] cursor-pointer flex flex-col ${
                  isFlipped ? 'rotate-y-180' : 'rotate-y-0'
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Fondo decorativo */}
                <img
                  src={atleta.fondo || "/fondocard.png"}
                  alt="Fondo decorativo"
                  className={`absolute inset-0 w-full h-full object-cover opacity-20 brightness-125 pointer-events-none select-none z-0 transition-opacity duration-700 ${
                    isFlipped ? 'opacity-0' : 'opacity-30'
                  }`}
                  style={{ zIndex: 0 }}
                />

                {/* Frente de la tarjeta */}
                <div 
                  className={`relative z-10 bg-black/60 rounded-3xl p-10 flex flex-col h-full transition-opacity duration-700 ${
                    isFlipped ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Header con foto y nombre */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Foto en esquina superior izquierda */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 sm:border-6 border-red-500 shadow-lg bg-gradient-to-tr from-red-400 via-red-200 to-red-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {atleta.imagen ? (
                        <img
                          src={atleta.imagen}
                          alt={atleta.nombre}
                          className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                        />
                      ) : (
                        <BootstrapIcon name="person-circle" size="2.5rem" className="text-red-400" />
                      )}
                    </div>

                    {/* Nombre y categoría en esquina superior derecha */}
                    <div className="flex-1 ml-6 text-right">
                      <h4 className="text-sm min-[390px]:text-lg min-[520px]:text-2xl font-black text-red-400 mb-2 tracking-wider drop-shadow-[0_0_16px_#D42D2D] animate-glow leading-tight">
                        {atleta.nombre}
                      </h4>
                      <p className="text-red-200 font-semibold text-lg drop-shadow">{atleta.categoria}</p>
                    </div>
                  </div>

                  {/* Espacio flexible para empujar el contenido hacia abajo */}
                  <div className="flex-1"></div>

                  {/* Contenedor transparente fijado en la parte inferior */}
                  <div className="bg-red-50/10 text-center rounded-xl p-3 sm:p-4 border border-red-200/30 w-full h-50 overflow-y-auto flex flex-col justify-center scrollbar-hide">
                    <h5 className="text-red-400 font-bold mb-2 sm:mb-3 text-sm sm:text-base">Inspirando a nuestra comunidad:</h5>
                    <p className="text-red-100 text-sm sm:text-base leading-relaxed">
                      {atleta.logros} <br />
                      <span className="italic text-xs sm:text-sm text-orange-300">Ejemplo de dedicación y excelencia.</span>
                    </p>
                  </div>
                </div>

                {/* Reverso de la tarjeta - Solo fondo sin overlay */}
                <div 
                  className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${
                    isFlipped ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img
                    src={atleta.fondo || "/fondocard.png"}
                    alt="Fondo del atleta"
                    className="w-full h-full object-cover rounded-3xl"
                    style={{ transform: 'rotateY(180deg)' }}
                  />
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:shadow-[0_0_64px_16px_#D42D2D99] transition-all duration-300" />
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* Reconocimientos */}
      <div className="mb-20">
        <ScrollReveal delay={200}>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-12 text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            RECONOCIMIENTOS <span className="text-orange-500 drop-shadow-[0_0_16px_#FE5900]">RECIENTES</span>
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {logrosData.map((logro, index) => {
            const [isFlipped, setIsFlipped] = React.useState(false);
            
            const borderColor =
              logro.medalla === "Oro"
                ? "#FFD700"
                : logro.medalla === "Plata"
                ? "#C0C0C0"
                : logro.medalla === "Bronce"
                ? "#FF8C00"
                : "#ef4444";

            const shadowColor =
              logro.medalla === "Oro"
                ? "0 0 32px 0 #FFD70055"
                : logro.medalla === "Plata"
                ? "0 0 32px 0 #C0C0C055"
                : logro.medalla === "Bronce"
                ? "0 0 32px 0 #FF8C0055"
                : "0 0 16px 0 #ef444455";

            return (
              <ScrollReveal key={`${logro.atleta}-${logro.año}-${index}`} delay={index * 100}>
                <div 
                  className={`bg-gradient-to-br from-black/80 to-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center border-4 min-h-[320px] relative overflow-hidden h-full cursor-pointer transition-transform duration-700 ${
                    isFlipped ? 'rotate-y-180' : 'rotate-y-0'
                  }`}
                  style={{ borderColor, boxShadow: shadowColor, transformStyle: 'preserve-3d' }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  {/* Fondo */}
                  <img
                    src={logro.fondo || "/fondocard.png"}
                    alt="Fondo decorativo"
                    className={`absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none select-none transition-opacity duration-700 ${
                      isFlipped ? 'opacity-0' : 'opacity-20'
                    }`}
                    style={{ zIndex: 0 }}
                  />

                  {/* Frente de la tarjeta */}
                  <div 
                    className={`relative z-10 flex flex-col w-full h-full transition-opacity duration-700 ${
                      isFlipped ? 'opacity-0' : 'opacity-100'
                    }`}
                    style={{ 
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Header con foto y nombre */}
                    <div className="flex items-start justify-between mb-4">
                      {/* Foto en esquina superior izquierda */}
                      <div
                        className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                        style={{ border: `3px solid ${borderColor}` }}
                      >
                        <img
                          src={logro.foto || "/deportista1.jpg"}
                          alt={logro.atleta}
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>

                      {/* Nombre y competencia en esquina superior derecha */}
                      <div className="flex-1 ml-3 text-right">
                        <h4 className="text-white font-extrabold text-lg md:text-xl mb-1 tracking-wide">
                          {logro.atleta.split(' ').slice(0, 2).join(' ')}<br />
                          {logro.atleta.split(' ').slice(2).join(' ')}
                        </h4>
                        <p className="text-gray-300 text-sm italic">{logro.competencia}</p>
                      </div>
                    </div>

                    {/* Espacio flexible para empujar el div de medalla hacia abajo */}
                    <div className="flex-1"></div>

                    {/* Div de medalla fijado en la parte inferior */}
                    <div className="mt-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow flex items-center justify-center gap-2">
                      <BootstrapIcon
                        name={logro.medalla === "Oro" ? "award-fill" : "award"}
                        size="1.5rem"
                        className={
                          logro.medalla === "Oro"
                            ? "text-yellow-400"
                            : logro.medalla === "Plata"
                            ? "text-gray-300"
                            : "text-orange-600"
                        }
                      />
                      <span className="text-gray-100 text-sm text-center">
                        {`${logro.atleta} obtuvo la medalla de ${logro.medalla.toLowerCase()} en el ${logro.competencia}, ${logro.año}.`}
                      </span>
                    </div>
                  </div>

                  {/* Reverso de la tarjeta - Solo fondo sin overlay */}
                  <div 
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-700 ${
                      isFlipped ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    <img
                      src={logro.fondo || "/fondocard.png"}
                      alt="Fondo del reconocimiento"
                      className="w-full h-full object-cover rounded-2xl"
                      style={{ transform: 'rotateY(180deg)' }}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <ScrollReveal delay={400}>
        <div className="mt-20 bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-2xl p-12 border border-red-500/20">
          <h3 className="text-3xl font-black text-white mb-8 text-center">
            ESTADÍSTICAS DE <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">EXCELENCIA</span>
          </h3>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
              <div className="transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={50} duration={2000} suffix="+" className="text-4xl font-black text-white mb-2" />
                <div className="text-white">Medallas Ganadas</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={15} duration={2000} className="text-4xl font-black text-white mb-2" />
                <div className="text-white">Campeones Nacionales</div>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300">
                <AnimatedCounter end={8} duration={2000} className="text-4xl font-black text-white mb-2" />
                <div className="text-white">Campeones Departamentales</div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
  );
};

export default Logros;
