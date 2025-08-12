import React, { useState, useEffect, useRef } from "react";
import BootstrapIcon from "../../shared/components/BootstrapIcon";

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
    
    // Delay para evitar que se ejecute inmediatamente
    const timeoutId = setTimeout(() => {
      window.addEventListener("scroll", onScroll);
      onScroll();
    }, 500);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
    };
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
    <div ref={ref} className={className}>
      {count}{suffix}
    </div>
  );
};

// InteractiveCard con efecto glow interactivo
const InteractiveCard = ({ children, className = "", glowColor = "red" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
  };

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform ${isHovered ? "scale-105 border-[2.7px]" : "border-2"} border-red-500 ${className} rounded-2xl`}
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

// Datos de ejemplo para el carrusel
const historiaData = [
  { year: "video", title: "", desc: "", logro: "", video: "https://www.youtube.com/embed/RXI9L5DADl8" },
  { year: 2016, title: "Fundación del Club", desc: "El 4 de abril nace el Club Academia de Taekwondo Baekho, fruto de la visión de nuestro entrenador fundador tras emprender un proyecto independiente, llevando el Taekwondo a comunidades vulnerables y fomentando valores como disciplina, respeto y superación.", logro: "Inicio de actividades formativas", img: '/ImgInicio.jpg' },
  { year: 2017, title: "Años de desafío", desc: "Enfrentamos retos por la falta de recursos y un espacio adecuado, pero la pasión y perseverancia permitieron continuar formando deportistas incluso en condiciones adversas.", logro: "Superación de adversidades iniciales", img: '/ImgInicio.jpg' },
  { year: 2018, title: "Primeras competencias", desc: "Participamos en festivales infantiles y campeonatos oficiales, demostrando la calidad del proceso formativo y fortaleciendo la confianza de la comunidad.", logro: "Primeras apariciones competitivas", img: '/ImgInicio.jpg' },
  { year: 2019, title: "Reconocimiento y formalización", desc: "Afiliación oficial a la Liga Santandereana de Taekwondo y reconocimiento deportivo municipal, abriendo puertas al calendario competitivo departamental y nacional.", logro: "Reconocimiento deportivo oficial", img: '/ImgInicio.jpg' },
  { year: 2020, title: "Resiliencia en pandemia", desc: "Frente al COVID-19, adaptamos entrenamientos virtuales y estrategias motivacionales, manteniendo el progreso y compromiso de los atletas.", logro: "Entrenamientos virtuales implementados", img: '/ImgInicio.jpg' },
  { year: 2021, title: "Reactivación competitiva", desc: "Retorno a la presencialidad con resultados destacados a nivel departamental y nacional, y proyección de atletas hacia eventos internacionales.", logro: "Regreso a competencias con medallas", img: '/ImgInicio.jpg' },
  { year: 2022, title: "Orgullo Panamericano", desc: "Nicole Tatiana Muentes integra la Selección Colombia Infantil y gana medalla de bronce en el Panamericano, enfrentando a rivales de Brasil y Nicaragua.", logro: "Medalla de bronce Panamericano", img: '/ImgInicio.jpg' },
  { year: 2023, title: "Campeones mundiales", desc: "Nicole Tatiana Muentes, en la categoría TK3 Infantil, se corona Campeona Mundial en el evento de WT en Sogamoso, consolidando el trabajo del club.", logro: "Título Mundial TK3 Infantil", img: '/ImgInicio.jpg' },
  { year: 2024, title: "Consolidación del alto rendimiento", desc: "Seguimos participando en eventos nacionales e internacionales, fortaleciendo procesos para el rendimiento élite.", logro: "Expansión del equipo de alto nivel", img: '/ImgInicio.jpg' },
  { year: 2025, title: "Rumbo a Juegos Nacionales 2027", desc: "Planificamos y preparamos un grupo selecto de atletas para clasificar y destacar en los Juegos Nacionales, manteniendo la excelencia deportiva.", logro: "Proyección hacia Juegos Nacionales", img: '/ImgInicio.jpg' },
];

const stats = [
  { value: 500, label: "Estudiantes", color: "red", suffix: "+" },
  { value: 15, label: "Años", color: "red", suffix: "+" },
  { value: 100, label: "Dedicación", color: "orange", suffix: "%" },
];

const TrayectoriaCarousel = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState("right");
  const [fade, setFade] = useState(true);
  const autoplayRef = useRef();
  const yearsBarRef = useRef(null);
  const yearRefs = useRef([]);
  const [autoplay, setAutoplay] = useState(true);

  const handleYear = (idx) => {
    setFade(false);
    setDirection(idx > active ? "right" : "left");
    setPrev(active);
    setAutoplay(false); // Desactivar autoplay al hacer clic
    setTimeout(() => {
      setActive(idx);
      setFade(true);
    }, 300);
  };

  // Centrar el año activo en la barra (solo cuando se hace clic manualmente)
  useEffect(() => {
    // Solo centrar si no es por autoplay
    if (!autoplay) {
      const el = yearRefs.current[active];
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [active, autoplay]);

  useEffect(() => {
    if (!autoplay) return; // Si autoplay está desactivado, no hacer nada

    autoplayRef.current = setInterval(() => {
      setFade(false);
      setDirection("right");
      setTimeout(() => {
        setActive((prevIndex) => {
          const nextIndex = (prevIndex + 1) % historiaData.length;
          setPrev(prevIndex);
          return nextIndex;
        });
        setFade(true);
      }, 300);
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, [active, autoplay]);

  const slide = historiaData[active];

  return (
    <div className="mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative bg-black/40 border border-red-900 rounded-2xl p-4 sm:p-6 md:p-12 shadow-lg" style={{ boxShadow: "0 0 16px 0 #D42D2D88" }}>
          <div className="overflow-x-hidden">
            <div className="w-full h-full p-2">
              <div className={`transition-all duration-500 ease-in-out transform flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 relative ${
                fade ? "opacity-100 translate-x-0" : direction === "right" ? "opacity-0 translate-x-20" : "opacity-0 -translate-x-20"
              } bg-transparent p-6 rounded-xl`} style={{ maxWidth: "100%", margin: "0 auto" }}>
                {/* Imagen / Video */}
                  <div
                    className={`${slide.video ? "w-full" : "w-full lg:w-1/2"} h-[300px] sm:h-[400px] md:h-[500px] bg-neutral-900 border-2 border-[#D42D2D] rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                    style={{ boxShadow: "0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D" }}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none rounded-2xl"
                      style={{ boxShadow: "0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D" }}
                    ></div>
                    
                    {slide.video ? (
                      slide.video.includes('youtube.com') ? (
                        <iframe
                          src={`${slide.video}?autoplay=0&mute=1`}
                          title="YouTube video"
                          className="w-full h-full rounded-2xl z-10"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video
                          src={slide.video}
                          controls
                          className="w-full h-full object-contain object-center rounded-2xl z-10"
                        />
                      )
                    ) : slide.img ? (
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="w-full h-full object-cover rounded-2xl z-10"
                      />
                    ) : (
                      <span className="text-gray-400 text-6xl z-10">🖼️</span>
                    )}
                  </div>

                  {/* Texto */}
                  {!slide.video && (
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                      <div className="flex flex-wrap items-center gap-4 mb-2">
                        <span className="bg-gradient-to-r from-[#FE5900] to-[#D42D2D] text-white font-black px-3 py-3 rounded-full text-xl sm:text-2xl shadow-lg border border-black/30">
                          {slide.year}
                        </span>
                        <span className="text-xl sm:text-2xl md:text-4xl font-black text-white drop-shadow break-words max-w-full">
                          {slide.title}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base md:text-xl text-gray-200 mb-4 leading-relaxed">
                        {slide.desc}
                      </p>
                      <div className="mt-2">
                        <div className="bg-gradient-to-r from-[#2a0a0a] to-[#3a1a1a] border border-[#D42D2D] rounded-xl px-4 sm:px-6 py-4 flex flex-wrap items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-[#D42D2D] inline-block"></span>
                          <span className="text-[#D42D2D] font-bold text-sm sm:text-base">
                            Logro destacado:
                          </span>
                          <span className="ml-2 text-white font-extrabold text-sm sm:text-base">
                            {slide.logro}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Paginación por años (centrada siempre) */}
        <div className="mt-6">
          <div ref={yearsBarRef} className="w-full max-w-4xl mx-auto flex justify-center gap-2 px-2 overflow-x-auto no-scrollbar">
                         {historiaData.map((item, idx) => (
               <button
                 key={item.year}
                 ref={(el) => (yearRefs.current[idx] = el)}
                 onClick={() => handleYear(idx)}
                 className={`shrink-0 font-bold border transition-all text-sm sm:text-base ${
                   item.year === "video" 
                     ? "w-12 h-12 rounded-full flex items-center justify-center" 
                     : "px-4 py-2 rounded-lg"
                 }
                   ${idx === active ? "bg-[#D42D2D] text-white border-[#D42D2D]" : "bg-neutral-800 text-gray-300 border-gray-700 hover:bg-[#D42D2D]/80 hover:text-white"}`}
                 aria-current={idx === active ? "true" : undefined}
                 aria-label={item.year === "video" ? "Ver video" : `Ir al año ${item.year}`}
               >
                 {item.year === "video" ? (
                   <BootstrapIcon name="play-circle-fill" size="1.5rem" />
                 ) : (
                   item.year
                 )}
               </button>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Historia = () => {
  return (
    <section id="historia" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-900/5 to-orange-900/5"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 text-white">
            NUESTRA <span className="text-[#D42D2D] drop-shadow">TRAYECTORIA</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <TrayectoriaCarousel />
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center mt-16">
            {stats.map((stat) => (
              <InteractiveCard
                key={stat.label}
                className={"bg-black/30 rounded-2xl p-6"}
                glowColor={stat.color === "yellow" ? "#facc15" : stat.color === "orange" ? "#fb923c" : "#ef4444"}
              >
                <AnimatedCounter end={stat.value} duration={2000} suffix={stat.suffix} className="text-4xl font-black text-white mb-2" />
                <div className="text-white font-bold">{stat.label}</div>
              </InteractiveCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Historia;
