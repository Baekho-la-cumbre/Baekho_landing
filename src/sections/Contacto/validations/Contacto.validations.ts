import { z } from "zod";

export const ContactoFormSchema = z.object({
  nombre_completo: z
    .string("El nombre es obligatorio")
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(150, "El nombre debe tener como máximo 150 caracteres"),
  email: z
    .string("El correo es obligatorio")
    .email("Correo inválido")
    .max(150, "El correo debe tener como máximo 150 caracteres"),
  mensaje_texto: z
    .string("El mensaje es obligatorio")
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactoFormValues = z.infer<typeof ContactoFormSchema>;
