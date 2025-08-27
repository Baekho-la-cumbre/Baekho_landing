import { useEffect } from "react";

export default function ScrollPag(): null {
  useEffect(() => {
    // Evita ejecutar en SSR
    if (typeof document === "undefined") return;

    const STYLE_ID = "global-scrollbar-style";
    let addedByMe = false;

    // Reutiliza si ya existe; si no, lo crea
    let styleEl = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = STYLE_ID;
      styleEl.innerHTML = `
        /* Scrollbar para WebKit (Chrome, Edge, Safari) */
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
        /* Ocultar flechas del scrollbar */
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
      document.head.appendChild(styleEl);
      addedByMe = true;
    }

    return () => {
      // Solo lo removemos si lo inyectamos en este montaje
      if (addedByMe && styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
    };
  }, []);

  return null;
}
