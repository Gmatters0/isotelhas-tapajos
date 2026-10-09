import { WHATSAPP_NUMBER } from "@/lib/site-config";
import type { QuoteFormSchema } from "@/lib/schemas";

/** Link wa.me com mensagem pré-preenchida. O número vem de `WHATSAPP_NUMBER` (único lugar a editar). */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Link genérico para falar com um consultor (navbar, hero e botão flutuante). */
export const CONSULTANT_LINK = buildWhatsAppLink(
  "Olá! Vim pelo site da Isotelhas Tapajós e gostaria de falar com um consultor sobre coberturas termoacústicas."
);

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
