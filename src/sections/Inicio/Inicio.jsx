import React from "react";
import HorarioGrid from "../Horario/Horario";

const Inicio = () => {
  const [showSchedule, setShowSchedule] = React.useState(false);
  const [hideInicio, setHideInicio] = React.useState(false);

  // Maneja la transición para mostrar HorarioGrid
  const handleShowSchedule = () => {
    setHideInicio(true); // inicia animación de salida
    setTimeout(() => {
      setShowSchedule(true); // muestra HorarioGrid
    }, 500); // igual a la duración de la animación (500ms)
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fondo: imagen, video o gradiente */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 w-full h-full bg-center bg-cover z-0"
          style={{ backgroundImage: "url('/ImgInicio.jpg')" }}
        />
        {/* Si tienes un video, puedes ponerlo aquí */}
        {/* <video autoPlay loop muted className="w-full h-full object-cover">...</video> */}
        {/* Imagen de fondo o gradiente */}
        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-[#7a1a1a] via-black to-[#D42D2D] opacity-90"></div>
        {/* Puedes agregar aquí partículas, blobs, o un canvas para efectos */}
      </div>

      {/* Contenido principal o cuadrícula de horarios */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        {/* Solo renderiza el contenido de inicio si no está oculto */}
        {!hideInicio && (
          <div className={`transition-all duration-500 ${hideInicio ? "opacity-0 pointer-events-none" : "opacity-100"} relative`}>
            <h1 className=" text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg mb-2">
              BAEKHO
            </h1>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-lg mb-6">
              CLUB DEPORTIVA
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-2">
              Forjando campeones, inspirando futuros.
            </p>
            <p className="text-lg md:text-xl text-red-400 font-semibold mb-8">
              Descubre la excelencia en Taekwondo.
            </p>
          </div>
        )}
        {/* Solo renderiza HorarioGrid si showSchedule es true */}
        {showSchedule && (
          <div className={`transition-all duration-500 opacity-100 relative`}>
            <HorarioGrid />
          </div>
        )}
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {!showSchedule ? (
            <>
              <button
                onClick={handleShowSchedule}
                className="bg-[#D42D2D] text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-red-700 transition"
              >
                Ver Horarios
              </button>
              <a
                href="#logros"
                className="border-2 border-[#D42D2D] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#D42D2D]/20 transition"
              >
                Ver Logros
              </a>
            </>
          ) : (
            <>
              <a
                href="#contacto"
                className="bg-[#D42D2D] text-white font-bold px-8 py-3 rounded-lg shadow hover:bg-red-700 transition"
              >
                Únete ahora
              </a>
              <a
                href="#logros"
                className="border-2 border-[#D42D2D] text-white font-bold px-8 py-3 rounded-lg hover:bg-[#D42D2D]/20 transition"
              >
                Ver Logros
              </a>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Inicio; 