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
  { atleta: "Ana Pérez", año: 2024, competencia: "Campeonato Nacional", medalla: "Oro", foto: "/deportista1.jpg" },
  { atleta: "Carlos López", año: 2024, competencia: "Open Internacional", medalla: "Plata", foto: "/deportista2.jpg" },
  { atleta: "María González", año: 2023, competencia: "Copa Panamericana", medalla: "Oro", foto: "/deportista1.jpg" },
  { atleta: "Diego Marín", año: 2023, competencia: "Torneo Regional", medalla: "Bronce", foto: "/deportista2.jpg" },
  { atleta: "Sofía Ruiz", año: 2023, competencia: "Campeonato Juvenil", medalla: "Plata", foto: "/deportista1.jpg" },
  { atleta: "Andrés Castro", año: 2022, competencia: "Copa Nacional", medalla: "Oro", foto: "/deportista2.jpg" },
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
        <div className="flex flex-col items-center justify-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 text-center flex flex-wrap justify-center items-center gap-2 sm:gap-3">
            NUESTROS{" "}
            <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">LOGROS</span>
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
            <ScrollReveal key={index} delay={index * 200}>
              <div className="relative group rounded-3xl overflow-visible shadow-2xl border-4 border-red-500 bg-gradient-to-br from-red-700/30 via-red-900/10 to-black/0 p-0 transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_64px_0_#D42D2D99] h-full">
                {/* Fondo decorativo (fondocard.png) */}
                <img
                  src="/fondocard.png"
                  alt="Fondo decorativo"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 brightness-125 pointer-events-none select-none z-0"
                  style={{ zIndex: 0 }}
                />
                {/* Fondo decorativo (emoji corazón) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-10">
                  <span className="text-[8rem] text-red-500">❤️</span>
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
                      <span className="text-6xl text-red-400">🧑‍🎓</span>
                    )}
                  </div>
                  <h4 className="text-3xl md:text-4xl font-black text-red-400 mb-2 text-center tracking-wider drop-shadow-[0_0_16px_#D42D2D] animate-glow">
                    {atleta.nombre}
                  </h4>
                  <p className="text-red-200 font-semibold mb-4 text-lg text-center drop-shadow">{atleta.categoria}</p>
                  <div className="bg-red-50/10 rounded-xl p-4 border border-red-200/30 w-full">
                    <h5 className="text-red-400 font-bold mb-2 text-center">Inspirando a nuestra comunidad:</h5>
                    <p className="text-red-100 text-base leading-relaxed text-center">{atleta.logros} <br/> <span className='italic text-sm text-orange-300'>Ejemplo de dedicación y excelencia.</span></p>
                  </div>
                </div>
                {/* Efecto de resplandor al hacer hover */}
                <div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:shadow-[0_0_64px_16px_#D42D2D99] transition-all duration-300" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
      <br /><br /><br />

      {/* Reconocimientos */}
      <div className="mb-20">
        <ScrollReveal delay={200}>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-12 text-center flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
            RECONOCIMIENTOS{" "}
            <span className="text-orange-500 drop-shadow-[0_0_16px_#FE5900]">RECIENTES</span>
          </h3>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {logrosData.map((logro, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <InteractiveCard
                className="bg-gradient-to-br from-black/80 to-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center border-4 min-h-[320px] relative overflow-hidden h-full"
                style={{
                  borderColor:
                    logro.medalla === "Oro"
                      ? "#FFD700"
                      : logro.medalla === "Plata"
                      ? "#C0C0C0"
                      : logro.medalla === "Bronce"
                      ? "#FF8C00"
                      : "#ef4444",
                  boxShadow:
                    logro.medalla === "Oro"
                      ? "0 0 32px 0 #FFD70055"
                      : logro.medalla === "Plata"
                      ? "0 0 32px 0 #C0C0C055"
                      : logro.medalla === "Bronce"
                      ? "0 0 32px 0 #FF8C0055"
                      : "0 0 16px 0 #ef444455",
                }}
              >
                {/* Fondo de la tarjeta: imagen opaca */}
                <img
                  src="/fondocard.png"
                  alt="Fondo decorativo"
                  className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none select-none"
                  style={{ zIndex: 0 }}
                />
                {/* Contenido principal (z-10) */}
                <div className="relative z-10 flex flex-col items-center w-full h-full">
                  {/* Foto del deportista con borde de color de medalla y año */}
                  <div
                    className="w-20 h-20 rounded-full mb-4 shadow-lg flex items-center justify-center overflow-hidden relative"
                    style={{
                      border: '4px solid ' + (
                        logro.medalla === "Oro"
                          ? "#FFD700"
                          : logro.medalla === "Plata"
                          ? "#C0C0C0"
                          : logro.medalla === "Bronce"
                          ? "#FF8C00"
                          : "#fff"
                      ),
                    }}
                  >
                    <img
                      src={logro.foto || "/deportista1.jpg"}
                      alt={logro.atleta}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Nombre del atleta */}
                  <h4 className="text-white font-extrabold text-xl md:text-2xl mb-1 text-center tracking-wide">
                    {logro.atleta}
                  </h4>
                  {/* Competencia */}
                  <p className="text-gray-300 text-base mb-2 text-center italic">{logro.competencia}</p>
                  {/* Descripción del mérito en div traslúcido con emoji */}
                  <div className="mb-4 px-4 py-2 rounded-xl bg-white/10 border border-white/20 shadow flex items-center justify-center gap-2">
                    <span className="text-xl">
                      {logro.medalla === "Oro" ? "🥇" : logro.medalla === "Plata" ? "🥈" : "🥉"}
                    </span>
                    <span className="text-gray-100 text-sm text-center">
                      {`${logro.atleta} obtuvo la medalla de ${logro.medalla.toLowerCase()} en el ${logro.competencia}, ${logro.año}.`}
                    </span>
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