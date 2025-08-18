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

// InteractiveCard
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
  };

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
          ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${
              glowColors[glowColor] || glowColors.red
            }, transparent 50%)`
          : "transparent",
        borderColor: "#ef4444",
      }}
    >
      {children}
      {isHovered && (
        <div
          className="absolute transition-opacity duration-300 pointer-events-none"
          style={{
            left: mousePosition.x - 50,
            top: mousePosition.y - 50,
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${
              glowColors[glowColor] || glowColors.red
            }, transparent 70%)`,
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
      )}
    </div>
  );
};

const Contacto = () => (
  <section
    id="contacto"
    className="relative px-4 py-16"
    style={{
      background: "radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)",
    }}
  >
    <div className="max-w-6xl mx-auto">
      <ScrollReveal>
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-black text-white sm:text-5xl md:text-6xl">
            <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">
              CONTACTO
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-300 sm:text-lg md:text-xl">
            ¿Listo para comenzar tu camino hacia la excelencia? Contáctanos y únete a la familia Baekho
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Formulario */}
        <ScrollReveal delay={200}>
          <div className="flex flex-col h-full p-4 border bg-black/80 border-red-500/30 rounded-2xl sm:p-6 md:p-8">
            <h3 className="mb-4 text-xl font-bold text-white sm:text-2xl sm:mb-6">
              Envíanos un <span className="text-red-500">Mensaje</span>
            </h3>
            <form className="flex flex-col space-y-6">
              <div>
                <label htmlFor="nombre" className="block mb-1 font-semibold text-gray-300">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full px-4 py-3 text-white transition-all duration-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 hover:border-red-400"
                  placeholder="Tu nombre completo"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 font-semibold text-gray-300">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 text-white transition-all duration-300 bg-gray-900 border border-gray-700 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 hover:border-red-400"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label htmlFor="mensaje" className="block mb-1 font-semibold text-gray-300">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  className="w-full px-4 py-3 text-white transition-all duration-300 bg-gray-900 border border-gray-700 rounded-lg resize-none focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 hover:border-red-400"
                  placeholder="Cuéntanos sobre tu interés en el Taekwondo, tu experiencia previa, horarios preferidos, etc."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 font-bold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 sm:py-4 sm:px-8 hover:scale-105 hover:shadow-red-500/25 interactive-btn"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </ScrollReveal>

        {/* Información de Contacto */}
        <div className="space-y-8">
          {/* Dirección, WhatsApp, Correo */}
          <ScrollReveal delay={300}>
            <InteractiveCard className="p-4 border bg-gradient-to-r from-red-900/30 to-black/50 border-red-500/30 rounded-2xl sm:p-6 md:p-8">
              <h3 className="mb-6 text-xl font-bold text-white sm:text-2xl">
                Información de <span className="text-red-500">Contacto</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-red-500 rounded-full sm:w-12 sm:h-12">
                    <img src="/gps.png" alt="Ubicación" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Dirección</h4>
                    <p className="text-gray-300">carrera 9AE 29A-56<br />Floridablanca, Colombia</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                    <img src="/whatsapp.png" alt="WhatsApp" className="w-10 h-10 sm:w-12 sm:h-12" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">WhatsApp</h4>
                    <p className="text-gray-300">+57 317 7688456</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full sm:w-12 sm:h-12">
                    <img src="/gmail.png" alt="Correo" className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-white">Correo</h4>
                    <p className="text-gray-300 break-all">Baekhotaekwondo2016@outlook.com</p>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>

          {/* Redes sociales */}
          <ScrollReveal delay={400}>
            <InteractiveCard className="flex flex-col items-center p-4 border bg-black/80 border-red-500/30 rounded-2xl sm:p-6 md:p-8">
              <h3 className="mb-6 text-xl font-bold text-white sm:text-2xl">
                Síguenos en <span className="text-red-500">Redes</span>
              </h3>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/share/1BoxMgww6V/" target="_blank" rel="noopener noreferrer">
                  <img src="/facebook.png" alt="Facebook" className="w-8 h-8" />
                </a>
                <a href="https://www.tiktok.com/@club_baekho?_t=ZS-8xiu94xikDa&_r=1" target="_blank" rel="noopener noreferrer">
                  <img src="/tik-tok.png" alt="TikTok" className="w-9 h-9" />
                </a>
                <a href="https://www.instagram.com/tkd_baekho?igsh=MWgyM2YxaHFodG53MQ==" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram.png" alt="Instagram" className="w-9 h-9" />
                </a>
              </div>
            </InteractiveCard>
          </ScrollReveal>

          {/* CTA Google Maps */}
          <ScrollReveal delay={500}>
            <InteractiveCard className="flex flex-col items-center p-4 border bg-black/80 border-red-500/30 rounded-2xl sm:p-6 md:p-8">
              <a
                href="https://www.google.com/maps/place/CLUB+ACADEMIA+DE+TAEKWONDO+BAEKHO/@7.0779666,-73.0970339,15z/data=!3m1!4b1!4m6!3m5!1s0x8e683f4005ef85b3:0xabe0ad6590ee3710!8m2!3d7.0779454!4d-73.0867341!16s%2Fg%2F11fkbcdqb5?entry=ttu&g_ep=EgoyMDI1MDcwOS4wIKXMDSoASAFQAw%3D%3D/..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-3 text-base font-bold text-center text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 sm:px-10 hover:scale-105 sm:text-lg md:text-xl"
              >
                Cómo encontrarnos
              </a>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </div>

      {/* CTA Final */}
      <ScrollReveal delay={600}>
        <div className="mt-16 text-center">
          <div className="p-8 border bg-gradient-to-r from-red-900 to-black rounded-2xl sm:p-10 md:p-12 border-red-500/30">
            <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl md:text-5xl">
              ¿LISTO PARA SER UN <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">CAMPEÓN</span>?
            </h2>
            <p className="mb-6 text-base text-gray-300 sm:text-lg md:text-xl">
              Únete a nuestra familia y descubre tu potencial en el Taekwondo
            </p>
            <a
              href="#contacto"
              className="inline-block bg-gradient-to-r from-[#D42D2D] to-red-700 hover:from-red-700 hover:to-[#D42D2D] text-white px-8 py-3 rounded-lg font-bold text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Comienza Tu Entrenamiento
            </a>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default Contacto;
