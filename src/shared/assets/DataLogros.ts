// src/assets/DataLogros.ts
export type Medalla = "Oro" | "Plata" | "Bronce";

export interface LogroItem {
  atleta: string;
  año: number;
  competencia: string;
  medalla: Medalla;
  foto: string;
  fondo?: string;
}

export const logrosData: LogroItem[] = [
  { atleta: "Ana Pérez",    año: 2024, competencia: "Campeonato Nacional", medalla: "Oro",   foto: "/reconocimiento1.jpg" , fondo: "/danna.jpg" },
  { atleta: "Carlos López", año: 2024, competencia: "Open Internacional",  medalla: "Plata", foto: "/reconocimiento2.jpg" , fondo: "/richard.jpg" },
  { atleta: "María González", año: 2023, competencia: "Copa Panamericana", medalla: "Oro",   foto: "/reconocimiento3.jpg" , fondo: "/juanPablo.jpg" },
  { atleta: "Diego Marín",  año: 2023, competencia: "Torneo Regional",     medalla: "Bronce", foto: "/reconocimiento4.jpg" , fondo: "/luna.jpg" },
  { atleta: "Sofía Ruiz",   año: 2023, competencia: "Campeonato Juvenil",  medalla: "Plata", foto: "/reconocimiento5.jpg" , fondo: "/niño.jpg" },
  { atleta: "Andrés Castro", año: 2022, competencia: "Copa Nacional",      medalla: "Oro",   foto: "/deportista2.jpg" , fondo: "/fondocard.png" },
];

export interface AtletaDestacado {
  nombre: string;
  imagen: string;
  categoria: string;
  logros: string;
  medalla: Medalla;
  fondo?: string;
}

export const atletasDestacados: AtletaDestacado[] = [
  {
    nombre: "Sarith Sofía Gómez Pinto",
    imagen: "/deportistaDestacado1.jpg",
    categoria: "Cinturón Franga Negro",
    logros: "Campeona departamental sénior Negros ranking -46 kg y campeona departamental intercolegiados superare 2025 juvenil -44 kg",
    medalla: "Oro",
    fondo: "/sofia.jpg",
  },
  {
    nombre: "Nicole Tatiana muentes Diaz ",
    imagen: "/deportistaDestacado2.jpg",
    categoria: "Cinturón Negro 1º Dan",
    logros: "Medalla de bronce infantil  Panamericana y Campeona mundial infantil categoría tk3 sogamoso 2023",
    medalla: "Oro",
    fondo: "/nicol.jpg",
  },
];
