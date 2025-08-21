import React from "react";

const horas = [
  "4:00 – 5:00 PM",
  "5:00 – 7:30 PM",
  "7:30 – 9:00 PM",
];

const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
];

const data = {
  "Lunes": [
    "Fuerza específica (Cadetes, Junior, Mayores 12+)",
    "Técnico (Niños 5–12 años)",
    "Técnico (Cadetes, Junior, Mayores 12+)",
  ],
  "Martes": [
    "—",
    "Fuerza (Niños 5–12 años)",
    "Fuerza (Cadetes, Junior, Mayores 12+)",
  ],
  "Miércoles": [
    "—",
    "Resistencia (Niños 5–12 años)",
    "Resistencia (Cadetes, Junior, Mayores 12+)",
  ],
  "Jueves": [
    "—",
    "Combate (Niños 5–12 años)",
    "Combate (Cadetes, Junior, Mayores 12+)",
  ],
  "Viernes": [
    "—",
    "Fuerza específica (Cadetes, Junior, Mayores 12+)",
    "—",
  ],
};

const HorarioGrid = () => (
  <div className="flex justify-center items-center w-full h-[70vh]">
    <div className="bg-black/60 rounded-xl p-0 shadow-lg max-w-5xl w-full border-2 border-[#D42D2D] overflow-x-auto">
      {/* Título sticky y centrado */}
      <div className="sticky top-0 z-20 bg-black/60 rounded-t-xl">
        <h2 className="text-3xl font-bold text-center text-[#D42D2D] mb-0 py-6 drop-shadow">
          Horario
        </h2>
      </div>
      {/* Tabla con scroll horizontal en móvil */}
      <div className="overflow-x-auto pb-2">
        <table className="min-w-full text-white text-center border-separate border-spacing-0 rounded-b-xl">
          <thead>
            <tr className="bg-gradient-to-r from-[#D42D2D] to-[#D42D2D] text-white">
              <th className="p-2 border border-[#D42D2D]">Hora</th>
              {dias.map((dia) => (
                <th key={dia} className="p-2 border border-[#D42D2D]">{dia}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {horas.map((hora, horaIdx) => (
              <tr key={hora}>
                <td className="p-2 border border-[#D42D2D] bg-black/40 font-semibold text-[#D42D2D]">{hora}</td>
                {dias.map((dia) => (
                  <td key={dia} className="p-2 border border-[#D42D2D] bg-black/30 text-white">{data[dia][horaIdx]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default HorarioGrid;
