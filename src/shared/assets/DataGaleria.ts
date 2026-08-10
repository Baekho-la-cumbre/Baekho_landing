// Datos para la sección de Galería

export type MomentoTipo = "imagen" | "video";

export interface Momento {
  tipo: MomentoTipo;
  src: string;
  titulo: string;
}

export const momentos: Momento[] = [
  { tipo: "video", src: "https://rr5---sn-q4flrnl6.googlevideo.com/videoplayback?expire=1786408978&ei=8lN6auGKLr6M2O4P_oedgQI&ip=2800:484:fa76:ecd0:7057:8cf:ccff:e9a1&id=eb6ab2a4bd7338a5&itag=18&source=contrib_service_geo_ugc&begin=0&requiressl=yes&xpc=EghoqJzIP3oBAQ==&rms=su,su&sc=yes&susc=gugc&app=fife&ic=1061&eaua=KYUM_BxKKd8&pcm2=yes&mime=video/mp4&vprv=1&rqh=1&dur=59.861&lmt=1726620356357907&cpn=G1NEK9lbFsZ1J0Zf&txp=0000224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,susc,app,ic,eaua,pcm2,mime,vprv,rqh,dur,lmt&sig=AE0s2JYwRAIgIoc4VegDzRoU7-151KlTC_Ou1nP4g8UX1b_roe3zPZgCIEUc9QMfEawJRu2HZh6UPyYrH-W-_SSiQ7UpaLBZmjIe&redirect_counter=1&cm2rm=sn-cvbee76&rrc=191&req_id=6275d9a784c836e2&cms_redirect=yes&cmsv=e&met=1786401779,&mh=iB&mm=34&mn=sn-q4flrnl6&ms=ltu&mt=1786401149&mv=m&mvi=5&pl=45&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms,sc&lsig=APaTxxMwRQIhALvv8mBbEEXc7QVZ0xiKQpF0YlcfL6GTWjeI7HuZkER-AiBUg8xzZ_kAlg48iWr7c9U-Fa4tQbsEa2dzDeYbbEpMtA%3D%3D", titulo: "" },
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


