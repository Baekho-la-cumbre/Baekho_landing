import React from "react";

const momentos = [
  { tipo: "imagen", src: "/ImgInicio.jpg", titulo: "Unidos en el Camino" },
  { tipo: "imagen", src: "/ImgInicio.jpg", titulo: "Futuros Campeones" },
  { tipo: "imagen", src: "/ImgInicio.jpg", titulo: "Disciplina y Enfoque" },
  { tipo: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4", titulo: "Video de Ejemplo" },
];

const MomentoCard = ({ tipo, src, titulo }) => (
  <div className="relative bg-gray-100 rounded-xl border-2 border-[#D42D2D] shadow-lg overflow-hidden group transition-transform duration-300 transform hover:scale-105">
    {tipo === "imagen" ? (
      <img src={src} alt={titulo} className="w-full h-56 object-cover" />
    ) : (
      <video src={src} controls className="w-full h-56 object-cover" />
    )}
    <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
      <span className="text-white font-bold text-lg drop-shadow">{titulo}</span>
    </div>
  </div>
);

const Galeria = () => (
  <section id="galeria" className="py-20 px-4 bg-gradient-to-b from-[#181c24] to-black min-h-[60vh]">
    <h2 className="text-4xl md:text-5xl font-black text-center mb-12 text-white">
      GALERÍA DE <span className="text-[#D42D2D] drop-shadow-[0_0_16px_#D42D2D]">MOMENTOS</span>
    </h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {momentos.map((m, i) => (
        <MomentoCard key={i} {...m} />
      ))}
    </div>
  </section>
);

export default Galeria; 