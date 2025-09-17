// src/assets/DataHistoria.ts

export type HistoriaYear = number | "video";

export type VideoSlide = {
  year: "video";
  title: "";
  desc: "";
  logro: "";
  video: string;            // URL de YouTube o archivo de video
};

export type YearSlide = {
  year: number;
  title: string;
  desc: string;
  logro: string;
  img?: string;
  video?: undefined;
};

export type HistoriaSlide = VideoSlide | YearSlide;

export const historiaData: HistoriaSlide[] = [
  { year: "video", title: "", desc: "", logro: "", video: "https://www.youtube.com/embed/RXI9L5DADl8" },
  {
    year: 2016,
    title: "Fundación del Club",
    desc: "El 4 de abril nace el Club Academia de Taekwondo Baekho, fruto de la visión de nuestro entrenador fundador tras emprender un proyecto independiente, llevando el Taekwondo a comunidades vulnerables y fomentando valores como disciplina, respeto y superación.",
    logro: "Inicio de actividades formativas",
    img: "/2016.jpg",
  },
  {
    year: 2017,
    title: "Años de desafío",
    desc: "Enfrentamos retos por la falta de recursos y un espacio adecuado, pero la pasión y perseverancia permitieron continuar formando deportistas incluso en condiciones adversas.",
    logro: "Superación de adversidades iniciales",
    img: "/2017.jpg",
  },
  {
    year: 2018,
    title: "Primeras competencias",
    desc: "Participamos en festivales infantiles y campeonatos oficiales, demostrando la calidad del proceso formativo y fortaleciendo la confianza de la comunidad.",
    logro: "Primeras apariciones competitivas",
    img: "/2018.jpg",
  },
  {
    year: 2019,
    title: "Reconocimiento y formalización",
    desc: "Afiliación oficial a la Liga Santandereana de Taekwondo y reconocimiento deportivo municipal, abriendo puertas al calendario competitivo departamental y nacional.",
    logro: "Reconocimiento deportivo oficial",
    img: "/2019.jpg",
  },
  {
    year: 2020,
    title: "Resiliencia en pandemia",
    desc: "Frente al COVID-19, adaptamos entrenamientos virtuales y estrategias motivacionales, manteniendo el progreso y compromiso de los atletas.",
    logro: "Entrenamientos virtuales implementados",
    img: "/2020.jpg",
  },
  {
    year: 2021,
    title: "Reactivación competitiva",
    desc: "Retorno a la presencialidad con resultados destacados a nivel departamental y nacional, y proyección de atletas hacia eventos internacionales.",
    logro: "Regreso a competencias con medallas",
    img: "/2021.jpg",
  },
  {
    year: 2022,
    title: "Orgullo Panamericano",
    desc: "Nicole Tatiana Muentes integra la Selección Colombia Infantil y gana medalla de bronce en el Panamericano, enfrentando a rivales de Brasil y Nicaragua.",
    logro: "Medalla de bronce Panamericano",
    img: "/2022.jpg",
  },
  {
    year: 2023,
    title: "Campeones mundiales",
    desc: "Nicole Tatiana Muentes, en la categoría TK3 Infantil, se corona Campeona Mundial en el evento de WT en Sogamoso, consolidando el trabajo del club.",
    logro: "Título Mundial TK3 Infantil",
    img: "/2023.jpg",
  },
  {
    year: 2024,
    title: "Consolidación del alto rendimiento",
    desc: "Seguimos participando en eventos nacionales e internacionales, fortaleciendo procesos para el rendimiento élite.",
    logro: "Expansión del equipo de alto nivel",
    img: "/2024.jpg",
  },
  {
    year: 2025,
    title: "Rumbo a Juegos Nacionales 2027",
    desc: "Planificamos y preparamos un grupo selecto de atletas para clasificar y destacar en los Juegos Nacionales, manteniendo la excelencia deportiva.",
    logro: "Proyección hacia Juegos Nacionales",
    img: "/2025.jpg",
  },
];

export type StatColor = "red" | "orange" | "yellow";

export interface HistoriaStat {
  value: number;
  label: string;
  color: StatColor;
  suffix?: string;
}

export const stats: HistoriaStat[] = [
  { value: 500, label: "Estudiantes", color: "red", suffix: "+" },
  { value: 15,  label: "Años",       color: "red", suffix: "+" },
  { value: 100, label: "Dedicación", color: "orange", suffix: "%" },
];
