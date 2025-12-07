// src/sections/Contacto/service/Contacto.services.ts
import api from "@/lib/axios";

export interface FormularioContactoPayload {
  nombre_completo: string;
  email: string;
  mensaje_texto: string;
}

export interface FormularioContactoResponse {
  message: string;
  data: any; // si quieres luego lo tipamos con tu DTO real
}

export async function enviarFormularioContacto(
  payload: FormularioContactoPayload
): Promise<FormularioContactoResponse> {
  const { data } = await api.post<FormularioContactoResponse>("/formulario", payload);
  return data;
}
