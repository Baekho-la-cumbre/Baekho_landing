import React, { useState, useEffect, useRef } from "react";
import BootstrapIcon from "../../shared/components/BootstrapIcon";
import { historiaData, stats } from "../../shared/assets/DataHistoria";

/** ScrollReveal simple (fade-in on scroll) */
type ScrollRevealProps = React.PropsWithChildren<{ delay?: number }>;

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, delay = 0 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) setVisible(true);
      }
    };

    const timeoutId = window.setTimeout(() => {
      window.addEventListener("scroll", onScroll);
      onScroll();
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
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

/** AnimatedCounter avanzado con IntersectionObserver y easing */
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
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLDivElement | null>(null);
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
    <div ref={ref} className={className}>
      {count}
      {suffix}
    </div>
  );
};

/** InteractiveCard con efecto glow interactivo */
interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  /** Acepta alias ("red", "yellow", "orange") o cualquier color CSS/hex */
  glowColor?: string;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = "",
  glowColor = "red",
}) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const map: Record<string, string> = {
    red: "rgba(239, 68, 68, 0.3)",
    yellow: "rgba(234, 179, 8, 0.3)",
    orange: "rgba(249, 115, 22, 0.3)",
  };

  const color = map[glowColor] ?? glowColor; // permite hex/cualquier css color

  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 transform ${
        isHovered ? "scale-105 border-[2.7px]" : "border-2"
      } border-red-500 ${className} rounded-2xl`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}, transparent 50%)`
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

/** Carrusel de trayectoria */
/** Carrusel de trayectoria */
const TrayectoriaCarousel: React.FC = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"right" | "left">("right");
  const [fade, setFade] = useState(true);
  const [autoplay, setAutoplay] = useState(true);

  const autoplayRef = useRef<number | null>(null);
  const yearsBarRef = useRef<HTMLDivElement | null>(null);
  const yearRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleYear = (idx: number) => {
    setFade(false);
    setDirection(idx > active ? "right" : "left");
    setAutoplay(false); // desactiva autoplay al hacer clic
    window.setTimeout(() => {
      setActive(idx);
      setFade(true);
    }, 300);
  };

  // Centrar el año activo en la barra (solo cuando se hace clic manualmente)
  useEffect(() => {
    if (!autoplay) {
      const el = yearRefs.current[active];
      if (el && "scrollIntoView" in el) {
        window.setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }, 50);
      }
    }
  }, [active, autoplay]);

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;

    const id = window.setInterval(() => {
      setFade(false);
      setDirection("right");
      window.setTimeout(() => {
        setActive((prevIndex) => (prevIndex + 1) % historiaData.length);
        setFade(true);
      }, 300);
    }, 5000);

    autoplayRef.current = id;
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
    };
  }, [active, autoplay]);

  const slide = historiaData[active];

  return (
    <div className="mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="relative bg-black/40 border border-red-900 rounded-2xl p-4 sm:p-6 md:p-12 shadow-lg"
          style={{ boxShadow: "0 0 16px 0 #D42D2D88" }}
        >
          <div className="overflow-x-hidden">
            <div className="w-full h-full p-2">
              <div
                className={`transition-all duration-500 ease-in-out transform flex flex-col lg:flex-row items-stretch gap-6 lg:gap-12 relative ${
                  fade ? "opacity-100 translate-x-0" : direction === "right" ? "opacity-0 translate-x-20" : "opacity-0 -translate-x-20"
                } bg-transparent p-6 rounded-xl`}
                style={{ maxWidth: "100%", margin: "0 auto" }}
              >
                {/* Imagen / Video */}
                <div
                  className={`${
                    slide && "video" in slide ? "w-full" : "w-full lg:w-1/2"
                  } h-[300px] sm:h-[400px] md:h-[500px] bg-neutral-900 border-2 border-[#D42D2D] rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden`}
                  style={{ boxShadow: "0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D" }}
                >
                  <div
                    className="absolute inset-0 pointer-events-none rounded-2xl"
                    style={{ boxShadow: "0 0 24px 2px #D42D2D,0 0 0 2px #D42D2D" }}
                  />
                  {slide && "video" in slide ? (
                    slide.video && slide.video.includes("youtube.com") ? (
                      <iframe
                        src={`${slide.video}?autoplay=0&mute=1`}
                        title="YouTube video"
                        className="w-full h-full rounded-2xl z-10"
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <video src={slide.video} controls className="w-full h-full object-contain object-center rounded-2xl z-10" />
                    )
                  ) : slide && slide.img ? (
                    <img src={slide.img} alt={slide.title} className="w-full h-full object-cover rounded-2xl z-10" />
                  ) : (
                    <span className="text-gray-400 text-6xl z-10">🖼️</span>
                  )}
                </div>

                {/* Texto */}
                {slide && !("video" in slide) && (
                  <div className="w-full lg:w-1/2 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="bg-gradient-to-r from-[#FE5900] to-[#D42D2D] text-white font-black px-3 py-3 rounded-full text-xl sm:text-2xl shadow-lg border border-black/30">
                        {slide?.year}
                      </span>
                      <span className="text-xl sm:text-2xl md:text-4xl font-black text-white drop-shadow break-words max-w-full">
                        {slide.title}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base md:text-xl text-gray-200 mb-4 leading-relaxed">{slide.desc}</p>
                    <div className="mt-2">
                      <div className="bg-gradient-to-r from-[#2a0a0a] to-[#3a1a1a] border border-[#D42D2D] rounded-xl px-4 sm:px-6 py-4 flex flex-wrap items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#D42D2D] inline-block" />
                        <span className="text-[#D42D2D] font-bold text-sm sm:text-base">Logro destacado:</span>
                        <span className="ml-2 text-white font-extrabold text-sm sm:text-base">{slide.logro}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Paginación por años con navegación responsiva */}
        <div className="mt-6 w-full">
          {/* Navegación con flechas para pantallas pequeñas */}
          <div className="flex items-center justify-center gap-4 mb-4 years-nav-mobile">
            <button
              onClick={() => handleYear(active > 0 ? active - 1 : historiaData.length - 1)}
              className="w-10 h-10 bg-neutral-800 border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-[#D42D2D]/80 transition-colors"
              aria-label="Año anterior"
            >
              <BootstrapIcon name="chevron-left" size="1.2rem" />
            </button>

            <div className="flex-1 text-center">
              <span className="text-white font-bold text-lg">
                {historiaData[active] && historiaData[active].year === "video" ? "Video" : historiaData[active]?.year}
              </span>
              <div className="text-gray-400 text-sm">
                {active + 1} de {historiaData.length}
              </div>
            </div>

            <button
              onClick={() => handleYear(active < historiaData.length - 1 ? active + 1 : 0)}
              className="w-10 h-10 bg-neutral-800 border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-[#D42D2D]/80 transition-colors"
              aria-label="Siguiente año"
            >
              <BootstrapIcon name="chevron-right" size="1.2rem" />
            </button>
          </div>

          {/* Scroll horizontal para pantallas grandes */}
          <div className="years-nav-desktop">
            <div
              ref={yearsBarRef}
              className="years-scroll flex gap-2 overflow-x-auto no-scrollbar justify-center"
              style={{ scrollPaddingInline: "1rem", WebkitOverflowScrolling: "touch" }}
            >
              {historiaData.map((item, idx) => (
                <button
                  key={String(item.year)}
                  ref={(el) => { yearRefs.current[idx] = el; }}
                  onClick={() => handleYear(idx)}
                  className={`shrink-0 font-bold border transition-all text-sm sm:text-base ${
                    item.year === "video" ? "w-12 h-12 rounded-full flex items-center justify-center" : "px-4 py-2 rounded-lg"
                  } ${
                    idx === active
                      ? "bg-[#D42D2D] text-white border-[#D42D2D]"
                      : "bg-neutral-800 text-gray-300 border-gray-700 hover:bg-[#D42D2D]/80 hover:text-white"
                  }`}
                  aria-current={idx === active ? "true" : undefined}
                  aria-label={item.year === "video" ? "Ver video" : `Ir al año ${item.year}`}
                >
                  {item.year === "video" ? <BootstrapIcon name="play-circle-fill" size="1.5rem" /> : item.year}
                </button>
              ))}
            </div>
          </div>

          {/* Indicadores de puntos para pantallas pequeñas */}
          <div className="flex justify-center gap-2 mt-4 years-nav-mobile">
            {historiaData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleYear(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === active ? "bg-[#D42D2D]" : "bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`Ir al año ${historiaData[idx]?.year}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Historia: React.FC = () => {
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
                className="bg-black/30 rounded-2xl p-6"
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
