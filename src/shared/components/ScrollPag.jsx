import { useEffect } from "react";

export default function ScrollPag() {
  useEffect(() => {
    // Crea un style tag para el scrollbar global
    const style = document.createElement("style");
    style.innerHTML = `
      /* Scrollbar para navegadores basados en Webkit (Chrome, Edge, Safari) */
      ::-webkit-scrollbar {
        width: 10px;
        background: #181c24;
      }
      ::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #D42D2D, #FE5900);
        border-radius: 8px;
        min-height: 40px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #FE5900, #D42D2D);
      }
      ::-webkit-scrollbar-track {
        background: #181c24;
        border-radius: 8px;
      }
      /* OCULTAR FLECHAS DEL SCROLLBAR */
      ::-webkit-scrollbar-button {
        display: none;
        height: 0;
        width: 0;
      }

      /* Scrollbar para Firefox */
      html {
        scrollbar-width: thin;
        scrollbar-color: #D42D2D #181c24;
      }
      body {
        background: #181c24;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // No renderiza nada visible
} 