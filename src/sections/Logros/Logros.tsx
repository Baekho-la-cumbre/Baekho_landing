import React from "react";
import BootstrapIcon from "../../shared/components/BootstrapIcon";
import {
  logrosData,
  atletasDestacados,
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

/** InteractiveCard con efecto glow interactivo */
type GlowKey = "red" | "yellow" | "orange" | "#FE5900";

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: GlowKey;
  style?: React.CSSProperties;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = "",
  glowColor = "red",
  style,
}) => {
  const [mousePosition, setMousePosition] = React.useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const glowColors: Record<GlowKey, string> = {
    red: "rgba(239, 68, 68, 0.3)",
    yellow: "rgba(234, 179, 8, 0.3)",
    orange: "rgba(249, 115, 22, 0.3)",
    "#FE5900": "#FE5900",
  };

  const color = glowColors[glowColor] ?? glowColors.red;

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105 border-[2.7px]" : "border-2"
      } border-red-500 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color} 0%, transparent 70%)`
          : "transparent",
        borderColor: "#ef4444",
        ...style,
      }}
    >
      {children}
      {isHovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${color}, transparent 70%)`,
            borderRadius: "50%",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

const Logros: React.FC = () => (
  <section
    id="logros"
    className="py-20 px-4 min-h-[100vh] relative"
    style={{ background: "radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)" }}
  >
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

      {/* Atletas Destacados */}
      <div>
        <ScrollReveal>
          <h3 className="text-3xl md:text-4xl font-black text-red-500 mb-12 text-center drop-shadow-[0_0_24px_#D42D2D] tracking-widest flex items-center justify-center gap-2">
            ATLETAS DESTACADOS
          </h3>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto items-stretch">
          {atletasDestacados.map((atleta, index) => (
            <ScrollReveal key={atleta.nombre} delay={index * 200}>
              <div className="relative group rounded-3xl overflow-visible shadow-2xl border-4 border-red-500 bg-gradient-to-br from-red-700/30 via-red-900/10 to-black/0 p-0 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_64px_0_#D42D2D99] h-full">
                {/* Fondo decorativo */}
                <img
                  src={atleta.fondo || "/fondocard.png"}
                  alt="Fondo decorativo"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-125 pointer-events-none select-none z-0"
                  style={{ zIndex: 0 }}
                />
                {/* Ícono decorativo */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-10">
                  <BootstrapIcon name="heart-fill" size="8rem" className="text-red-500" />
                </div>

                <div className="relative z-10 bg-black/60 rounded-3xl p-8 flex flex-col items-center">
                  <div className="w-36 h-36 mx-auto mb-4 rounded-full border-8 border-red-500 shadow-lg bg-gradient-to-tr from-red-400 via-red-200 to-red-600 flex items-center justify-center overflow-hidden">
                    {atleta.imagen ? (
                      <img
                        src={atleta.imagen}
                        alt={atleta.nombre}
                        className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                      />
                    ) : (
                      <BootstrapIcon name="person-circle" size="3rem" className="text-red-400" />
                    )}
                  </div>

                  <h4 className="text-3xl md:text-4xl font-black text-red-400 mb-2 text-center tracking-wider drop-shadow-[0_0_16px_#D42D2D] animate-glow">
                    {atleta.nombre}
                  </h4>
                  <p className="text-red-200 font-semibold mb-4 text-lg text-center drop-shadow">{atleta.categoria}</p>

                  <div className="bg-red-50/10 rounded-xl p-4 border border-red-200/30 w-full">
                    <h5 className="text-red-400 font-bold mb-2 text-center">Inspirando a nuestra comunidad:</h5>
                    <p className="text-red-100 text-base leading-relaxed text-center">
                      {atleta.logros} <br />
                      <span className="italic text-sm text-orange-300">Ejemplo de dedicación y excelencia.</span>
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:shadow-[0_0_64px_16px_#D42D2D99] transition-all duration-300" />
              </div>
            </ScrollReveal>
          ))}
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
                <InteractiveCard
                  className="bg-gradient-to-br from-black/80 to-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center border-4 min-h-[320px] relative overflow-hidden h-full"
                  style={{ borderColor, boxShadow: shadowColor }}
                >
                  {/* Fondo */}
                  <img
                    src="/fondocard.png"
                    alt="Fondo decorativo"
                    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
                    style={{ zIndex: 0 }}
                  />

                  {/* Contenido */}
                  <div className="relative z-10 flex flex-col items-center w-full h-full">
                    <div
                      className="w-20 h-20 rounded-full mb-4 shadow-lg flex items-center justify-center overflow-hidden relative"
                      style={{ border: `4px solid ${borderColor}` }}
                    >
                      <img
                        src={logro.foto || "/deportista1.jpg"}
                        alt={logro.atleta}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <h4 className="text-white font-extrabold text-xl md:text-2xl mb-1 text-center tracking-wide">
                      {logro.atleta}
                    </h4>

                    <p className="text-gray-300 text-base mb-2 text-center italic">{logro.competencia}</p>

                    <div className="mb-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow flex items-center justify-center gap-2">
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
                </InteractiveCard>
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

export default Logros;
