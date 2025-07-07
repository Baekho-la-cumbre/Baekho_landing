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

// InteractiveCard con efecto glow y scale en hover
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

// Iconos simples
const MapPin = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10A8 8 0 0112 3a8 8 0 018 8c0 4.627-3.582 10-8 10z" /><circle cx={12} cy={11} r={3} /></svg>;
const Phone = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm0 14a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2zm14-14a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5a2 2 0 012-2h2zm0 14a2 2 0 002 2h-2a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2z" /></svg>;
const Mail = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

const Contacto = () => (
  <section id="contacto" className="py-20 px-4 min-h-[100vh] relative" style={{background: 'radial-gradient(ellipse at top, #181c24 0%, #0a0a0a 100%)'}}>
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            <span className="text-red-500 drop-shadow-[0_0_16px_#D42D2D]">CONTACTO</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Listo para comenzar tu camino hacia la excelencia? Contáctanos y únete a la familia Baekho
          </p>
        </div>
      </ScrollReveal>
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Formulario */}
        <ScrollReveal delay={200}>
          <InteractiveCard className="bg-black/80 border border-red-500/30 rounded-2xl p-8 h-full flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-6">
              Envíanos un <span className="text-red-500">Mensaje</span>
            </h3>
            <form className="flex flex-col h-full justify-between flex-1">
              <div className="flex-grow space-y-6">
                <div>
                  <label htmlFor="nombre" className="block text-gray-300 font-semibold mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 hover:border-red-400"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 hover:border-red-400"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-gray-300 font-semibold mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 resize-none hover:border-red-400"
                    placeholder="Cuéntanos sobre tu interés en el Taekwondo, tu experiencia previa, horarios preferidos, etc."
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25 interactive-btn mt-6"
              >
                Enviar Mensaje
              </button>
            </form>
          </InteractiveCard>
        </ScrollReveal>
        {/* Información de Contacto y Horarios */}
        <div className="space-y-8">
          {/* Datos de Contacto */}
          <ScrollReveal delay={300}>
            <InteractiveCard className="bg-gradient-to-r from-red-900/30 to-black/50 border border-red-500/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Información de <span className="text-red-500">Contacto</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Dirección</h4>
                    <p className="text-gray-300">carrera 9AE 29A-56<br />Floridablanca, Colombia</p>
                  </div>
                </div>
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Teléfono</h4>
                    <p className="text-gray-300">+57 317 7688456</p>
                  </div>
                </div>
                <div className="flex items-start transform hover:translate-x-2 transition-transform duration-300">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Correo</h4>
                    <p className="text-gray-300">Baekhotaekwondo2016@outlook.com</p>
                  </div>
                </div>
              </div>
            </InteractiveCard>
          </ScrollReveal>
          {/* Redes sociales */}
          <ScrollReveal delay={400}>
            <InteractiveCard className="bg-black/80 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center">
              <h3 className="text-2xl font-bold text-white mb-6">
                Síguenos en <span className="text-red-500">Redes</span>
              </h3>
              <div className="flex space-x-6">
                <a href="https://www.facebook.com/share/1BoxMgww6V/" target="_blank" rel="noopener noreferrer">
                  <img src="/facebook.png" alt="Facebook" className="w-8 h-8 inline" />
                </a>
                <a href="https://www.tiktok.com/@club_baekho?_t=ZS-8xiu94xikDa&_r=1" target="_blank" rel="noopener noreferrer">
                  <img src="/tik-tok.png" alt="TikTok" className="w-8 h-8 inline" />
                </a>
                <a href="https://www.instagram.com/tkd_baekho?igsh=MWgyM2YxaHFodG53MQ==" target="_blank" rel="noopener noreferrer">
                  <img src="/instagram.png" alt="Instagram" className="w-8 h-8 inline" />
                </a>
              </div>
            </InteractiveCard>
          </ScrollReveal>
          {/* Horarios */}
          <ScrollReveal delay={500}>
            <InteractiveCard className="bg-black/80 border border-red-500/30 rounded-2xl p-8 flex flex-col items-center">
              <a
                href="https://www.google.com/maps/place/CLUB+ACADEMIA+DE+TAEKWONDO+BAEKHO/@7.0779146,-73.0867798,17z/data=!4m15!1m8!3m7!1s0x8e683f7fe821b0b1:0x572b14a9dde32b20!2sLa+Cumbre,+Bucaramanga,+Floridablanca,+Santander!3b1!8m2!3d7.0771402!4d-73.0892245!16s%2Fg%2F1hhx7y362!3m5!1s0x8e683f4005ef85b3:0xabe0ad6590ee3710!8m2!3d7.0779454!4d-73.0867341!16s%2Fg%2F11fkbcdqb5?entry=ttu&g_ep=EgoyMDI1MDYzMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg text-xl text-center w-full"
              >
                Cómo encontrarnos
              </a>
            </InteractiveCard>
          </ScrollReveal>
        </div>
      </div>
      {/* Call to Action Final */}
      <ScrollReveal delay={600}>
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-red-900 to-black rounded-2xl p-12 border border-red-500/30">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ¿LISTO PARA SER UN <span className="" style={{ color: '#D42D2D', filter: 'drop-shadow(0 0 16px #D42D2D)' }}>CAMPEÓN</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a nuestra familia y descubre tu potencial en el Taekwondo
            </p>
            <a
              href="#contacto"
              className="inline-block bg-gradient-to-r from-[#D42D2D] to-red-700 hover:from-red-700 hover:to-[#D42D2D] text-white px-12 py-4 rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl interactive-btn"
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