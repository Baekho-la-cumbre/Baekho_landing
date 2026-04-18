// src/sections/Filosofia/validations/Filosofia.validations.ts
import { ValorPayload } from "../service/Filosofia.services";

export interface ValidacionResultado {
  valido: boolean;
  errores: Partial<Record<keyof ValorPayload, string>>;
}

export function validarValor(
  payload: ValorPayload
): ValidacionResultado {
  const errores: ValidacionResultado["errores"] = {};

  // nombre_valor
  if (!payload.nombre_valor.trim()) {
    errores.nombre_valor = "El nombre del valor es obligatorio";
  } else if (payload.nombre_valor.length > 100) {
    errores.nombre_valor = "El nombre no puede superar 100 caracteres";
  }

  // descripcion
  if (!payload.descripcion.trim()) {
    errores.descripcion = "La descripción es obligatoria";
  }

  // orden_visual
  if (
    payload.orden_visual === null ||
    payload.orden_visual === undefined
  ) {
    errores.orden_visual = "El orden visual es obligatorio";
  } else if (payload.orden_visual < 0) {
    errores.orden_visual = "El orden visual no puede ser negativo";
  }

  // id_icono
  if (!payload.id_icono || payload.id_icono <= 0) {
    errores.id_icono = "Debe seleccionar un ícono válido";
  }

  // id_academia
  if (!payload.id_academia || payload.id_academia <= 0) {
    errores.id_academia = "Debe seleccionar una academia válida";
  }

  return {
    valido: Object.keys(errores).length === 0,
    errores,
  };
}
