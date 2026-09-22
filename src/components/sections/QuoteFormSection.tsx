"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { quoteFormSchema, workTypes, type QuoteFormSchema } from "@/lib/schemas";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";

const fieldClass =
  "mt-2 w-full border-0 border-b border-white/20 bg-transparent py-2 text-white placeholder-slate-500 focus:border-brand-terracotta focus:outline-none focus:ring-0";

export function QuoteFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormSchema>({ resolver: zodResolver(quoteFormSchema) });

  function onSubmit(data: QuoteFormSchema) {
    window.open(buildQuoteWhatsAppLink(data), "_blank", "noopener,noreferrer");
    reset();
  }

  return (
    <section id="orcamento" className="scroll-mt-24 grid md:grid-cols-2">
      <div className="bg-brand-navy px-6 py-20 text-white md:px-16 md:py-28">
        <div className="mx-auto max-w-lg">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Inicie seu Projeto com a Isotelhas Tapajós.
          </h2>
          <p className="mt-4 text-slate-300">
            Preencha os dados básicos da sua obra para receber uma estimativa técnica personalizada
            diretamente no seu WhatsApp.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
            <div>
              <label htmlFor="nome" className="block text-xs uppercase tracking-widest text-slate-400">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                className={fieldClass}
                {...register("nome")}
              />
              {errors.nome && <p className="mt-1 text-xs text-brand-terracotta">{errors.nome.message}</p>}
            </div>

            <div>
              <label htmlFor="whatsapp" className="block text-xs uppercase tracking-widest text-slate-400">
                WhatsApp com DDD
              </label>
              <input
                id="whatsapp"
                type="text"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(93) 9XXXX-XXXX"
                className={fieldClass}
                {...register("whatsapp")}
              />
              {errors.whatsapp && (
                <p className="mt-1 text-xs text-brand-terracotta">{errors.whatsapp.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="tipoObra" className="block text-xs uppercase tracking-widest text-slate-400">
                Tipo de obra
              </label>
              <select
                id="tipoObra"
                defaultValue=""
                className={`${fieldClass} [&>option]:text-brand-slate`}
                {...register("tipoObra")}
              >
                <option value="" disabled>
                  Selecione...
                </option>
                {workTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.tipoObra && (
                <p className="mt-1 text-xs text-brand-terracotta">Selecione o tipo de obra</p>
              )}
            </div>

            <div>
              <label htmlFor="metragem" className="block text-xs uppercase tracking-widest text-slate-400">
                Metragem aproximada (m²)
              </label>
              <input
                id="metragem"
                type="text"
                inputMode="decimal"
                placeholder="Ex: 120"
                className={fieldClass}
                {...register("metragem")}
              />
              {errors.metragem && (
                <p className="mt-1 text-xs text-brand-terracotta">{errors.metragem.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 bg-brand-terracotta px-6 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-brand-terracotta/90 disabled:opacity-60 sm:w-auto"
            >
              Solicitar Estimativa via WhatsApp
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>

      <div className="relative min-h-[420px] md:min-h-[640px]">
        <Image
          src="https://images.unsplash.com/photo-1781231702773-4cf3247fc061?w=1600&auto=format&fit=crop&q=80"
          alt="Fachada de arquitetura contemporânea em alta resolução"
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
