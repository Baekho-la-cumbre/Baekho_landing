import { useState, JSX } from "react";
import HorarioGrid from "../Horario/Horario";

export default function Inicio(): JSX.Element {
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [hideInicio, setHideInicio] = useState<boolean>(false);

  // Maneja la transición para mostrar HorarioGrid
  const handleShowSchedule = (): void => {
    setHideInicio(true); // inicia animación de salida
    window.setTimeout((): void => {
      setShowSchedule(true); // muestra HorarioGrid
    }, 500); // igual a la duración de la animación (500ms)
  };

  return (
    <section
      id="inicio"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      {/* Fondo: imagen, video o gradiente */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-0 w-full h-full bg-center bg-cover"
          style={{ backgroundImage: "url('/ImgInicio.jpg')" }}
        />
        {/* <video autoPlay loop muted className="object-cover w-full h-full">...</video> */}
        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-[#7a1a1a] via-black to-[#D42D2D] opacity-80" />
      </div>

      {/* Contenido principal o cuadrícula de horarios */}
      <div className="relative z-10 w-full max-w-5xl px-4 mx-auto text-center">
        {!hideInicio && (
          <div
            className={`transition-all duration-500 ${
              hideInicio ? "opacity-0 pointer-events-none" : "opacity-100"
            } relative`}
          >
            <h2 className="font-extrabold text-white text-1xl md:text-4xl drop-shadow-lg">
              CLUB DEPORTIVO
            </h2>
            <h1 className="mb-5 text-6xl text-transparent mfont-extrabold md:text-9xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text drop-shadow-lg baekho-title">
              BAEKHO
            </h1>
            <p className="text-sm text-gray-200 md:text-xl">
              Forjando campeones, inspirando futuros.
            </p>
            <p className="mb-8 text-sm font-semibold text-red-400 md:text-xl">
              Descubre la excelencia en Taekwondo.
            </p>
          </div>
        )}

        {showSchedule && (
          <div className="relative transition-all duration-500 opacity-100">
            <HorarioGrid />
          </div>
        )}

        {/* Botones */}
        <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
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
}