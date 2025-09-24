// src/assets/DataValoresFilosofia.ts

export interface ValorItem {
  valor: string;
  descripcion: string;
  icono: string; // o si quieres ser estricto: "clock" | "shield-check" | ...
}

export const valoresData: ValorItem[] = [
  {
    valor: "CORTESÍA",
    descripcion:
      "El respeto y la consideración hacia los demás son fundamentales. Tratamos a todos con amabilidad y educación, reflejando la nobleza del arte marcial.",
    icono: "hand-thumbs-up",
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
    valor: "LEALTAD",
    descripcion:
      "La fidelidad y compromiso hacia nuestros principios, compañeros y maestros. Construimos relaciones sólidas basadas en la confianza mutua.",
    icono: "people",
  },
  {
    valor: "EMPATÍA",
    descripcion:
      "La capacidad de entender y compartir los sentimientos de otros. Nos conectamos con nuestros compañeros y creamos un ambiente de apoyo mutuo.",
    icono: "people-fill",
  },
  {
    valor: "AMOR",
    descripcion:
      "El amor por el arte marcial, por nuestros compañeros y por el crecimiento personal es lo que nos motiva cada día a ser mejores.",
    icono: "heart-fill",
  },
  {
    valor: "RESPETO",
    descripcion:
      "El reconocimiento del valor y dignidad de cada persona. Honramos a nuestros maestros, compañeros y a nosotros mismos con reverencia y consideración.",
    icono: "award",
  },
];
