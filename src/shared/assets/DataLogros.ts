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
  { atleta: "Danna Sofía Sierra Daza",    año: 2025, competencia: "campeonato ranking G1 Cartagena", medalla: "Plata",   foto: "/reconocimiento1.jpg" , fondo: "/danna.jpg" },
  { atleta: "Richard Daniel Grueso Quiñonez", año: 2025, competencia: "campeonato ranking G1 Cartagena",  medalla: "Bronce", foto: "/reconocimiento2.jpg" , fondo: "/richard.jpg" },
  { atleta: "Juan Pablo Silva Durán", año: 2025, competencia: "campeonato ranking G1 Cartagena", medalla: "Plata",   foto: "/reconocimiento3.jpg" , fondo: "/juanPablo.jpg" },
  { atleta: "Luna Sofía Ospina",  año: 2025, competencia: "campeonato ranking G1 Cartagena",     medalla: "Oro", foto: "/reconocimiento4.jpg" , fondo: "/luna.jpg" },
  { atleta: "Ihaan Daniel Rivera Naranjo",   año: 2025, competencia: "campeonato open Cartagena",  medalla: "Oro", foto: "/reconocimiento5.jpg" , fondo: "/ihaan.jpg" },
  { atleta: "Marco Aurelio Ospina Jaimes", año: 2025, competencia: "campeonato open Cartagena",      medalla: "Plata",   foto: "/deportista2.jpg" , fondo: "/fondocard.png" },
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
