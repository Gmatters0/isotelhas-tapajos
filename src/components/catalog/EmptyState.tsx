import { MessageCircle, PackageSearch } from "lucide-react";
import { CONSULTANT_LINK } from "@/lib/whatsapp";

const suggestions = ["Isotelha Trapezoidal", "KingWall", "Telha colonial", "Porta frigorífica", "Forro", "Brise"];

interface EmptyStateProps {
  onClear: () => void;
  onSuggest: (term: string) => void;
}

export function EmptyState({ onClear, onSuggest }: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-xl border border-dashed border-brand-border-light bg-white px-6 py-16 text-center md:px-12">
      <PackageSearch size={36} aria-hidden="true" className="mx-auto text-brand-terracotta-deep" />
      <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight text-brand-slate">
        Nenhum produto encontrado
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Tente outro termo ou remova alguns filtros. Se procura algo específico, nosso time ajuda a encontrar a solução
        certa para a sua obra.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Sugestões de busca">
        {suggestions.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSuggest(term)}
            className="border border-brand-border-light px-3 py-2 text-xs text-slate-700 transition duration-200 hover:border-brand-slate hover:text-brand-slate"
          >
            {term}
          </button>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center justify-center border border-brand-slate px-6 py-3 text-sm font-medium text-brand-slate transition duration-200 hover:bg-brand-slate hover:text-white active:scale-[0.98]"
        >
          Limpar busca e filtros
        </button>
        <a
          href={CONSULTANT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-brand-terracotta-deep px-6 py-3 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98]"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Falar com um consultor
        </a>
      </div>
    </div>
  );
}
