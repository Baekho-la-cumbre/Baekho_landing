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

// AnimatedCounter avanzado con IntersectionObserver y easing
const AnimatedCounter = ({ end, duration = 2000, suffix = "", className = "" }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const animationRef = React.useRef();

  // Reinicia la animación cada vez que entra al viewport
  React.useEffect(() => {
    let observer;
    let timeoutId;
    const handleIntersect = (entries) => {
      if (entries[0].isIntersecting) {
        setCount(0);
        let startTime;
        const animate = (currentTime) => {
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
        timeoutId = setTimeout(() => {
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
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
};

// InteractiveCard con efecto glow interactivo
const InteractiveCard = ({ children, className = "", glowColor = "red" }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const glowColors = {
    red: "rgba(239, 68, 68, 0.3)",
    yellow: "rgba(234, 179, 8, 0.3)",
    orange: "rgba(249, 115, 22, 0.3)",
    "#FE5900": "#FE5900", // Naranja sólido
  };

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
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor] || glowColors.red} 0%, transparent 70%)`
          : "transparent",
        borderColor: "#ef4444",
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
            background: `radial-gradient(circle, ${glowColors[glowColor] || glowColors.red}, transparent 70%)`,
            borderRadius: "50%",
            opacity: 0.6,
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
};

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
    imagen: "/deportista1.jpg",
    categoria: "Cinturón Negro 2º Dan",
    logros: "Campeona Nacional 2024, 3 medallas de oro."
  },
  {
    nombre: "Carlos López",
    imagen: "/deportista2.jpg",
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
              <InteractiveCard className="group relative rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300 overflow-hidden"></div>
                <div className="relative bg-black/90 p-6 rounded-2xl">
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