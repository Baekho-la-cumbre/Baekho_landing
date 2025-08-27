// src/assets/DataLogros.ts
export type Medalla = "Oro" | "Plata" | "Bronce";

export interface LogroItem {
  atleta: string;
  año: number;
  competencia: string;
  medalla: Medalla;
  foto: string;
}

export const logrosData: LogroItem[] = [
  { atleta: "Ana Pérez",    año: 2024, competencia: "Campeonato Nacional", medalla: "Oro",   foto: "/deportista1.jpg" },
  { atleta: "Carlos López", año: 2024, competencia: "Open Internacional",  medalla: "Plata", foto: "/deportista2.jpg" },
  { atleta: "María González", año: 2023, competencia: "Copa Panamericana", medalla: "Oro",   foto: "/deportista1.jpg" },
  { atleta: "Diego Marín",  año: 2023, competencia: "Torneo Regional",     medalla: "Bronce", foto: "/deportista2.jpg" },
  { atleta: "Sofía Ruiz",   año: 2023, competencia: "Campeonato Juvenil",  medalla: "Plata", foto: "/deportista1.jpg" },
  { atleta: "Andrés Castro", año: 2022, competencia: "Copa Nacional",      medalla: "Oro",   foto: "/deportista2.jpg" },
];

export interface AtletaDestacado {
  nombre: string;
  imagen: string;
  categoria: string;
  logros: string;
  medalla: Medalla;
}

export const atletasDestacados: AtletaDestacado[] = [
  {
    nombre: "Ana Pérez",
    imagen: "/deportista1.jpg",
    categoria: "Cinturón Negro 2º Dan",
    logros: "Campeona Nacional 2024, 3 medallas de oro.",
    medalla: "Oro",
  },
  {
    nombre: "Carlos López",
    imagen: "/deportista2.jpg",
    categoria: "Cinturón Negro 1º Dan",
    logros: "Subcampeón Internacional 2024, 2 medallas de plata.",
    medalla: "Plata",
  },
];
