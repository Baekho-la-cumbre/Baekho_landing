import { atletasDestacados, logrosData } from "./DataLogros";

export interface DeportistaItem {
  nombre: string;
  foto: string;
  fondo?: string;
  detalle: string;
  categoria?: string;
}

/** Une reconocimientos y destacados (sin glorias del pasado / Nicole). */
export const deportistasData: DeportistaItem[] = (() => {
  const byName = new Map<string, DeportistaItem>();

  for (const logro of logrosData) {
    const key = logro.atleta.trim().toLowerCase();
    byName.set(key, {
      nombre: logro.atleta.trim(),
      foto: logro.foto,
      fondo: logro.fondo,
      detalle: `Medalla de ${logro.medalla.toLowerCase()} en el ${logro.competencia}, ${logro.año}.`,
    });
  }

  // Solo Sarith Sofía; se omiten Nicole, Jeyson y Rubí
  const sarith = atletasDestacados[0];
  if (sarith) {
    const key = sarith.nombre.trim().toLowerCase();
    if (!byName.has(key)) {
      byName.set(key, {
        nombre: sarith.nombre.trim(),
        foto: sarith.imagen,
        fondo: sarith.fondo,
        detalle: sarith.logros,
        categoria: sarith.categoria,
      });
    }
  }

  return Array.from(byName.values());
})();
