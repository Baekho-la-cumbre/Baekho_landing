import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Al cambiar de ruta, lleva siempre al inicio de la vista. */
export default function ScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
