// src/assets/DataValoresFilosofia.ts

export interface ValorItem {
  valor: string;
  descripcion: string;
  icono: string; // o si quieres ser estricto: "clock" | "shield-check" | ...
}

export const valoresData: ValorItem[] = [
  {
    valor: "DISCIPLINA",
    descripcion:
      "La constancia y el orden en el entrenamiento son la base del progreso. Cultivamos la autodisciplina como herramienta para alcanzar metas.",
    icono: "clock",
  },
  {
    valor: "INTEGRIDAD",
    descripcion:
      "Actuamos con honestidad y coherencia entre nuestros valores y acciones, tanto en el dojang como en la vida cotidiana.",
    icono: "shield-check",
  },
  {
    valor: "PERSEVERANCIA",
    descripcion:
      "Nunca rendirse ante las dificultades. Cada obstáculo es una oportunidad para crecer y demostrar nuestro verdadero carácter.",
    icono: "lightning-charge",
  },
  {
    valor: "AUTOCONTROL",
    descripcion:
      "El dominio de nuestras emociones y reacciones nos permite tomar decisiones sabias y actuar con serenidad en cualquier situación.",
    icono: "peace",
  },
  {
    valor: "ESPÍRITU INDOMABLE",
    descripcion:
      "Un corazón valiente que no se rinde jamás. La fuerza interior que nos impulsa a superar cualquier adversidad con determinación.",
    icono: "fire",
  },
  {
    valor: "CIENCIA",
    descripcion:
      "El conocimiento y la técnica perfecta son fundamentales. Estudiamos cada movimiento, cada estrategia, para alcanzar la maestría.",
    icono: "cpu",
  },
  {
    valor: "BONDAD",
    descripcion:
      "La compasión y el respeto hacia otros son esenciales. Usamos nuestras habilidades para proteger y ayudar, nunca para dañar.",
    icono: "heart",
  },
  {
    valor: "AMOR",
    descripcion:
      "El amor por el arte marcial, por nuestros compañeros y por el crecimiento personal es lo que nos motiva cada día a ser mejores.",
    icono: "heart-fill",
  },
];
