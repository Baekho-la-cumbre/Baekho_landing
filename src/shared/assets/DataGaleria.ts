// Datos para la sección de Galería

export type MomentoTipo = "imagen" | "video";

export interface Momento {
  tipo: MomentoTipo;
  src: string;
  titulo: string;
}

export const momentos: Momento[] = [
  { tipo: "video", src: "https://i.imgur.com/7nCSpbZ.mp4", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/5RMdEZe.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/CxR6wyz.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/cs8yTHd.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/Ig2XmwY.jpeg", titulo: "" },
  { tipo: "video", src: "https://i.imgur.com/XIZXGzT.mp4", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/h4Bujl8.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/Vvl4r0s.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/gzBb86p.jpeg", titulo: "" },
  { tipo: "video", src: "https://i.imgur.com/mLcxUJJ.mp4", titulo: "" },
  { tipo: "video", src: "https://i.imgur.com/XoV5GDO.mp4", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/FwZLMSQ.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/f8I3hU3.jpeg", titulo: "" },
  { tipo: "imagen", src: "https://i.imgur.com/ehGSaVs.jpeg", titulo: "" },
  { tipo: "video", src: "https://imgur.com/rCQWYrE.mp4", titulo: "" },
];


