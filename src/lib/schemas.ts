import { z } from "zod";

export const workTypes = ["Residencial", "Chalé/Lazer", "Comercial", "Galpão Industrial"] as const;

export type WorkType = (typeof workTypes)[number];

export const quoteFormSchema = z.object({
  nome: z.string().trim().min(3, "Informe seu nome completo"),
  whatsapp: z
    .string()
    .trim()
    .min(10, "Informe um número válido com DDD")
    .regex(/^[\d\s()+-]+$/, "Use apenas números, espaços e parênteses"),
  tipoObra: z.enum(workTypes),
  metragem: z
    .string()
    .trim()
    .min(1, "Informe a metragem aproximada")
    .regex(/^\d+([.,]\d+)?$/, "Use apenas números"),
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
