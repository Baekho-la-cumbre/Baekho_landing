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

// InteractiveCard simple
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
    "#FE5900": "#FE5900",
    "#D42D2D": "#D42D2D",
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105 border-[2.7px]" : "border-2"
      } border-red-500 rounded-md ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColors[glowColor] || glowColors.red}, transparent 50%)`
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

// Valores de ejemplo
const valoresData = [
  { valor: "DISCIPLINA", descripcion: "La constancia y el orden en el entrenamiento son la base del progreso. Cultivamos la autodisciplina como herramienta para alcanzar metas.", icono: "🥋" },
  { valor: "INTEGRIDAD", descripcion: "Actuamos con honestidad y coherencia entre nuestros valores y acciones, tanto en el dojang como en la vida cotidiana.", icono: "⚖️" },
  { valor: "PERSEVERANCIA", descripcion: "Nunca rendirse ante las dificultades. Cada obstáculo es una oportunidad para crecer y demostrar nuestro verdadero carácter.", icono: "💪" },
  { valor: "AUTOCONTROL", descripcion: "El dominio de nuestras emociones y reacciones nos permite tomar decisiones sabias y actuar con serenidad en cualquier situación.", icono: "🧘" },
  { valor: "ESPÍRITU INDOMABLE", descripcion: "Un corazón valiente que no se rinde jamás. La fuerza interior que nos impulsa a superar cualquier adversidad con determinación.", icono: "🔥" },
  { valor: "CIENCIA", descripcion: "El conocimiento y la técnica perfecta son fundamentales. Estudiamos cada movimiento, cada estrategia, para alcanzar la maestría.", icono: "🧠" },
  { valor: "BONDAD", descripcion: "La compasión y el respeto hacia otros son esenciales. Usamos nuestras habilidades para proteger y ayudar, nunca para dañar.", icono: "❤️" },
  { valor: "AMOR", descripcion: "El amor por el arte marcial, por nuestros compañeros y por el crecimiento personal es lo que nos motiva cada día a ser mejores.", icono: "💖" },
];

const Filosofia = () => (
  <section id="filosofia" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative">
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            NUESTRA <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">FILOSOFÍA</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Los principios que guían cada entrenamiento y forjan el carácter de nuestros atletas
          </p>
        </div>
      </ScrollReveal>

      {/* Misión */}
      <ScrollReveal delay={200}>
        <div className="mb-16">
          <InteractiveCard className="bg-black/30 rounded-xl p-6">
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6 bg-black/0">
                <img src="/calvin.png" alt="Calvin" className="w-14 h-14 object-contain" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                NUESTRA <span className="text-red-500">MISIÓN</span>
              </h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Formar atletas integrales a través del Taekwondo, desarrollando no solo sus habilidades físicas y técnicas, sino también su carácter, disciplina y valores. Nos comprometemos a brindar una educación marcial de excelencia que inspire a nuestros estudiantes a alcanzar su máximo potencial tanto dentro como fuera del dojang, contribuyendo positivamente a la sociedad.
            </p>
          </InteractiveCard>
        </div>
      </ScrollReveal>

      {/* Visión */}
      <ScrollReveal delay={300}>
        <div className="mb-16">
          <InteractiveCard
            className="bg-black/30 rounded-xl p-6"
            glowColor="orange"
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mr-6 bg-black/0">
                <img src="/calvin.png" alt="Calvin" className="w-14 h-14 object-contain" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white">
                NUESTRA <span className="text-orange-500">VISIÓN</span>
              </h3>
            </div>
            <p className="text-lg text-gray-300 leading-relaxed">
              Ser reconocidos como la academia de Taekwondo líder en la región, destacando por la formación de campeones nacionales e internacionales, y por ser un referente en la enseñanza de valores y principios marciales. Aspiramos a expandir nuestra influencia positiva, creando una comunidad global de practicantes comprometidos con la excelencia y el crecimiento personal.
            </p>
          </InteractiveCard>
        </div>
      </ScrollReveal>

      {/* Valores */}
      <div>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              NUESTROS <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">VALORES</span>
            </h3>
            <p className="text-gray-300">Los pilares fundamentales que sostienen nuestra enseñanza</p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valoresData.map((item, index) => (
            <ScrollReveal key={index} delay={index * 100}>
              <InteractiveCard className="bg-black/30 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                    {item.icono}
                  </div>
                  <h4 className="text-xl font-black text-red-400 mb-4">{item.valor}</h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{item.descripcion}</p>
              </InteractiveCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Código del Guerrero */}
      <ScrollReveal delay={600}>
        <div className="mt-20">
          <InteractiveCard className="bg-gradient-to-r from-black to-red-900/20 rounded-2xl p-8 md:p-12 border-2 border-red-500/50">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
              CÓDIGO DEL <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">GUERRERO BAEKHO</span>
            </h3>
            {/* Frase Principal */}
            <div className="text-center mb-12">
              <div className="text-2xl md:text-3xl font-black text-transparent bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text mb-4 drop-shadow-[0_0_16px_#D42D2D]">
                "DETRÁS DEL MIEDO, ESTÁN MIS SUEÑOS"
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-yellow-500 mx-auto animate-pulse"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Entrena con propósito y pasión</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Respeta a todos, teme a ninguno</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">La derrota es temporal, rendirse es permanente</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Ayuda a tus compañeros a crecer</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Mantén la mente abierta al aprendizaje</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Honra la tradición, abraza la innovación</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">Sé un ejemplo dentro y fuera del dojang</p>
                </div>
                <div className="flex items-center transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4 animate-pulse"></div>
                  <p className="text-gray-300">La verdadera victoria es sobre uno mismo</p>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </ScrollReveal>
      </div>
    </section>
  );

export default Filosofia; 