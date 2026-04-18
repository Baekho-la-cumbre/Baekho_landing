// src/sections/Filosofia/service/Filosofia.services.ts
import api from "@/lib/axios";

/**
 * Payload para crear o actualizar un valor
 * (NO incluye id_valor porque lo maneja la BD)
 */
export interface ValorPayload {
  nombre_valor: string;
  descripcion: string;
  orden_visual: number;
  id_icono: number;
  id_academia: number;
}

/**
 * Modelo completo que viene del backend
 */
export interface Valor {
  id_valor: number;
  nombre_valor: string;
  descripcion: string;
  orden_visual: number;
  id_icono: number;
  id_academia: number;
}

/**
 * Respuesta estándar
 */
export interface ValoresResponse {
  message: string;
  data: Valor | Valor[];
}

/**
 * Crear valor
 */
export async function crearValor(
  payload: ValorPayload
): Promise<ValoresResponse> {
  const { data } = await api.post<ValoresResponse>(
    "/valores",
    payload
  );
  return data;
}

/**
 * Obtener todos los valores
 */
export async function obtenerValores(): Promise<ValoresResponse> {
  const { data } = await api.get<ValoresResponse>("/valores");
  return data;
}

/**
 * Obtener un valor por ID
 */
export async function obtenerValorPorId(
  id: number
): Promise<ValoresResponse> {
  const { data } = await api.get<ValoresResponse>(
    `/valores/${id}`
  );
  return data;
}

/**
 * Actualizar valor
 */
export async function actualizarValor(
  id: number,
  payload: ValorPayload
): Promise<ValoresResponse> {
  const { data } = await api.put<ValoresResponse>(
    `/valores/${id}`,
    payload
  );
  return data;
}

/**
 * Eliminar valor
 */
export async function eliminarValor(
  id: number
): Promise<ValoresResponse> {
  const { data } = await api.delete<ValoresResponse>(
    `/valores/${id}`
  );
  return data;
}
