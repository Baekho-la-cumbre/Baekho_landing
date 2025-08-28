// src/assets/DataHorario.ts

export const horas = [
  "4:00 – 5:00 PM",
  "5:00 – 7:30 PM",
  "7:30 – 9:00 PM",
] as const;

export const dias = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
] as const;

export type Dia = typeof dias[number];

export type HorarioMatriz = Record<Dia, readonly string[]>;

export const horarioData: HorarioMatriz = {
  Lunes: [
    "Fuerza específica (Cadetes, Junior, Mayores 12+)",
    "Técnico (Niños 5–12 años)",
    "Técnico (Cadetes, Junior, Mayores 12+)",
  ],
  Martes: [
    "—",
    "Fuerza (Niños 5–12 años)",
    "Fuerza (Cadetes, Junior, Mayores 12+)",
  ],
  Miércoles: [
    "—",
    "Resistencia (Niños 5–12 años)",
    "Resistencia (Cadetes, Junior, Mayores 12+)",
  ],
  Jueves: [
    "—",
    "Combate (Niños 5–12 años)",
    "Combate (Cadetes, Junior, Mayores 12+)",
  ],
  Viernes: [
    "—",
    "Fuerza específica (Cadetes, Junior, Mayores 12+)",
    "—",
  ],
} as const;
