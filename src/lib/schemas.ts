import * as z from "zod/mini";

export const workTypes = ["Residencial", "Chalé/Lazer", "Comercial", "Galpão Industrial"] as const;

// zod/mini (~5 KB) em vez de zod completo (~90 KB): o bundle do cliente carrega só o que o formulário usa.
export const quoteFormSchema = z.object({
  nome: z.string().check(z.trim(), z.minLength(3, "Informe seu nome completo")),
  whatsapp: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, "Informe um número válido com DDD"),
      z.regex(/^[\d\s()+-]+$/, "Use apenas números, espaços e parênteses")
    ),
  tipoObra: z.enum(workTypes, { error: "Selecione o tipo de obra" }),
  metragem: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, "Informe a metragem aproximada"),
      z.regex(/^\d+([.,]\d+)?$/, "Use apenas números")
    ),
});

export type QuoteFormSchema = z.infer<typeof quoteFormSchema>;
