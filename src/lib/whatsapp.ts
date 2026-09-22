import { WHATSAPP_NUMBER } from "@/lib/site-config";
import type { QuoteFormSchema } from "@/lib/schemas";

export function buildWhatsAppLink(message: string, number: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_GREETING =
  "Olá! Vim pelo site da Isotelhas Tapajós e gostaria de falar com um consultor sobre coberturas termoacústicas.";

export function buildQuoteWhatsAppLink(values: QuoteFormSchema): string {
  const message = [
    `Olá! Meu nome é ${values.nome}.`,
    "Gostaria de solicitar uma estimativa técnica para a minha obra.",
    "",
    `Telefone: ${values.whatsapp}`,
    `Tipo de obra: ${values.tipoObra}`,
    `Metragem aproximada: ${values.metragem} m²`,
  ].join("\n");

  return buildWhatsAppLink(message);
}
