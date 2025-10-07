import { JSX, useState } from "react";
import { momentos, type Momento } from "@/shared/assets/DataGaleria";

// Tipos y datos fueron movidos a DataGaleria.ts

interface MomentoCardProps extends Momento {
  onClick: () => void;
}

function MomentoCard({ tipo, src, titulo, onClick }: MomentoCardProps): JSX.Element {
  return (
    <div 
      className="relative bg-gray-100 rounded-xl border-2 border-[#D42D2D] shadow-lg overflow-hidden group transition-transform duration-300 transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {tipo === "imagen" ? (
        <img src={src} alt={titulo} className="w-full h-56 object-cover" loading="lazy" />
      ) : (
        <video src={src} controls className="w-full h-56 object-cover" preload="metadata" />
      )}
      <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
        <span className="text-white font-bold text-lg drop-shadow">{titulo}</span>
      </div>
      
      {/* Overlay con icono de zoom */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg className="w-12 h-12 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function Galeria(): JSX.Element {
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const [momentoSeleccionado, setMomentoSeleccionado] = useState<Momento | null>(null);

  const abrirLightbox = (momento: Momento) => {
    setMomentoSeleccionado(momento);
    setLightboxAbierto(true);
  };

  const cerrarLightbox = () => {
    setLightboxAbierto(false);
    setMomentoSeleccionado(null);
  };

  return (
    <>
      <section id="galeria" className="py-20 px-4 bg-gradient-to-b from-[#181c24] to-black min-h-[60vh]">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white">
          GALERÍA DE <span className="text-[#D42D2D] drop-shadow-[0_0_16px_#D42D2D]">MOMENTOS</span>
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {momentos.map((m, i) => (
            <MomentoCard key={i} {...m} onClick={() => abrirLightbox(m)} />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxAbierto && momentoSeleccionado && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
          onClick={cerrarLightbox}
        >
          {/* Botón de cerrar */}
          <button
            onClick={cerrarLightbox}
            className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors duration-200 z-10 bg-black/50 rounded-full p-3"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Contenido del lightbox */}
          <div 
            className="relative w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {momentoSeleccionado.tipo === "imagen" ? (
              <img 
                src={momentoSeleccionado.src} 
                alt={momentoSeleccionado.titulo} 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video 
                src={momentoSeleccionado.src} 
                controls 
                autoPlay
                className="max-w-full max-h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
