// Datos para la sección de Galería

export type MomentoTipo = "imagen" | "video";

export interface Momento {
  tipo: MomentoTipo;
  src: string;
  titulo: string;
}

export const momentos: Momento[] = [
  { tipo: "imagen", src: "https://i.imgur.com/cs8yTHd.jpeg", titulo: "Unidos en el Camino" },
  { tipo: "imagen", src: "https://i.imgur.com/Ig2XmwY.jpeg", titulo: "Futuros Campeones" },
  { tipo: "video", src: "https://i.imgur.com/XIZXGzT.mp4", titulo: "Disciplina y Enfoque" },
  { tipo: "imagen", src: "https://i.imgur.com/h4Bujl8.jpeg", titulo: "Disciplina y Enfoque" },
  { tipo: "imagen", src: "https://i.imgur.com/Vvl4r0s.jpeg", titulo: "Disciplina y Enfoque" },
  { tipo: "imagen", src: "https://i.imgur.com/gzBb86p.jpeg", titulo: "Disciplina y Enfoque" },
  { tipo: "video", src: "https://i.imgur.com/mLcxUJJ.mp4", titulo: "Disciplina y Enfoque" },
  { tipo: "video", src: "https://i.imgur.com/XoV5GDO.mp4", titulo: "Disciplina y Enfoque" },
  { tipo: "imagen", src: "https://i.imgur.com/FwZLMSQ.jpeg", titulo: "Disciplina y Enfoque" },
];


