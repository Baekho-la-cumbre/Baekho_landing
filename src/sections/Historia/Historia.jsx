import React, { useState, useEffect, useRef } from "react";

// Simple ScrollReveal (fade-in on scroll)
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
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

// AnimatedCounter
const AnimatedCounter = ({ end, suffix = "", className = "" }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
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

// InteractiveCard
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

// Datos de ejemplo para el carrusel
const historiaData = [
  {
    year: 2009,
    title: "Fundación de la Academia",
    desc: "Nace Baekho con la misión de formar campeones y personas íntegras.",
    logro: "Primeros estudiantes inscritos",
    img: '/ImgInicio.jpg',
  },
  {
    year: 2012,
    title: "Primeros logros nacionales",
    desc: "Nuestros atletas obtienen medallas en campeonatos nacionales.",
    logro: "Primera medalla nacional",
    img: '/ImgInicio.jpg',
  },
  {
    year: 2015,
    title: "Crecimiento y expansión",
    desc: "La academia crece en estudiantes y reconocimiento.",
    logro: "Más de 100 estudiantes",
    img: '/ImgInicio.jpg',
  },
  {
    year: 2018,
    title: "Reconocimiento Nacional",
    desc: "Baekho se posiciona como una de las academias más prestigiosas del país. Nuestros atletas representan a la región en competencias nacionales, obteniendo múltiples medallas y reconocimientos.",
    logro: "15 medallas nacionales",
    img: '/ImgInicio.jpg',
  },
  {
    year: 2021,
    title: "Proyección Internacional",
    desc: "Carlos López se convierte en nuestro primer atleta en competir internacionalmente, obteniendo una medalla de plata en el Open Internacional. Este logro marca un hito en nuestra historia.",
    logro: "Primera medalla internacional",
    img: '/ImgInicio.jpg',
  },
  {
    year: 2024,
    title: "Presente y futuro",
    desc: "Seguimos creciendo y formando nuevas generaciones de campeones.",
    logro: "Academia 100% dedicada",
    img: '/ImgInicio.jpg',
  },
];

const stats = [
  { value: 500, label: "Estudiantes", color: "red", suffix: "+" },
  { value: 50, label: "Medallas", color: "yellow", suffix: "+" },
  { value: 15, label: "Años", color: "red", suffix: "+" },
  { value: 100, label: "Dedicación", color: "orange", suffix: "%" },
];

// Carrusel simple
const TrayectoriaCarousel = () => {
  const [active, setActive] = useState(historiaData.length - 3); // 2018 por defecto
  const handlePrev = () => setActive((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setActive((prev) => (prev < historiaData.length - 1 ? prev + 1 : prev));
  const handleYear = (idx) => setActive(idx);
  const slide = historiaData[active];
  return (
    <div className="mb-8">
      <div className="max-w-6xl mx-auto bg-black/40 border border-red-900 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row gap-12 items-stretch relative shadow-lg" style={{boxShadow:'0 0 16px 0 #D42D2D88'}}>
        {/* Imagen o placeholder */}
        <div className="w-full md:w-[520px] h-[340px] bg-neutral-900 border-2 border-[#D42D2D] rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden" style={{boxShadow:'0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D'}}>
          <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{boxShadow:'0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D'}}></div>
          {slide.img
            ? <img src={slide.img} alt={slide.title} className="w-full h-full object-cover rounded-2xl z-10" />
            : <span className="text-gray-400 text-6xl z-10">🖼️</span>
          }
        </div>
        {/* Contenido */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-2">
            <span className="bg-gradient-to-r from-[#FE5900] to-[#D42D2D] text-white font-black px-3 py-5 rounded-full text-2xl shadow-lg border-1 border-black/30">{slide.year}</span>
            <span className="text-3xl md:text-4xl font-black text-white drop-shadow">{slide.title}</span>
          </div>
          <p className="text-xl text-gray-200 mb-4 leading-relaxed max-w-2xl">{slide.desc}</p>
          <div className="mt-2">
            <div className="bg-gradient-to-r from-[#2a0a0a] to-[#3a1a1a] border border-[#D42D2D] rounded-xl px-8 py-5 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#FE5900] inline-block"></span>
              <span className="text-[#FE5900] font-bold">Logro destacado:</span>
              <span className="ml-2 text-white font-extrabold">{slide.logro}</span>
            </div>
          </div>
        </div>
        {/* Flechas */}
        <button onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D42D2D] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-[#D42D2D] z-10 transition-all duration-200 focus:outline-none" style={{boxShadow:'0 0 12px 0 #D42D2D'}}>
          &#60;
        </button>
        <button onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#D42D2D] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-[#D42D2D] z-10 transition-all duration-200 focus:outline-none" style={{boxShadow:'0 0 12px 0 #D42D2D'}}>
          &#62;
        </button>
      </div>
      {/* Paginación (puntos) */}
      <div className="flex justify-center gap-2 mt-6">
        {historiaData.map((_, idx) => (
          <span
            key={idx}
            className={`h-3 rounded-full transition-all duration-300 ${idx === active ? 'bg-[#D42D2D] w-8' : 'bg-gray-700 w-3'}`}
          />
        ))}
      </div>
      {/* Navegación por años */}
      <div className="flex justify-center gap-2 mt-6 flex-wrap">
        {historiaData.map((item, idx) => (
          <button
            key={item.year}
            onClick={() => handleYear(idx)}
            className={`px-5 py-2 rounded-lg font-bold border border-gray-700 transition-all ${idx === active ? 'bg-[#D42D2D] text-white' : 'bg-neutral-800 text-gray-300 hover:bg-[#D42D2D]/80 hover:text-white'}`}
          >
            {item.year}
          </button>
        ))}
      </div>
    </div>
  );
};

const Historia = () => {
  return (
    <section id="trayectoria" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-orange-900/5"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            NUESTRA <span className="text-[#D42D2D] drop-shadow drop-shadow-[0_0_16px_#D42D2D] glow-text">TRAYECTORIA</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <TrayectoriaCarousel />
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center mt-16">
            {stats.map((stat) => (
              <InteractiveCard
                key={stat.label}
                className={`bg-black/30 rounded-xl p-6 border border-${stat.color}-500/20 hover:border-${stat.color}-500/50`}
                glowColor={stat.color === "yellow" ? "#facc15" : stat.color === "orange" ? "#fb923c" : "#ef4444"}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} className={`text-4xl font-black text-${stat.color}-500 mb-2`} />
                <div className="text-gray-400">{stat.label}</div>
              </InteractiveCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Historia; 