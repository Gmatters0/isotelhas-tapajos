"use client";

import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { images } from "@/lib/images";
import { quoteFormSchema, workTypes, type QuoteFormSchema } from "@/lib/schemas";
import { buildQuoteWhatsAppLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/ui/Reveal";

const fieldClass =
  "mt-2 w-full border-0 border-b border-white/20 bg-transparent py-2 text-white transition-colors placeholder:text-slate-400 hover:border-white/40 focus:border-brand-terracotta-light focus:outline-hidden aria-invalid:border-brand-terracotta-light";

interface FieldProps {
  name: keyof QuoteFormSchema;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ name, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-erro`} role="alert" className="mt-1 text-xs text-brand-terracotta-light">
          {error}
        </p>
      )}
    </div>
  );
}

export function QuoteFormSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormSchema>({ resolver: zodResolver(quoteFormSchema) });

  const field = (name: keyof QuoteFormSchema) => ({
    id: name,
    className: fieldClass,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-erro` : undefined,
    ...register(name),
  });

  function onSubmit(data: QuoteFormSchema) {
    window.open(buildQuoteWhatsAppLink(data), "_blank", "noopener,noreferrer");
    reset();
  }

  return (
    <section
      id="orcamento"
      aria-labelledby="orcamento-titulo"
      className="scroll-mt-24 grid md:grid-cols-2"
    >
      <div className="bg-brand-navy px-6 py-20 text-white md:px-16 md:py-28">
        <Reveal direction="left" className="mx-auto max-w-lg">
          <h2
            id="orcamento-titulo"
            className="font-display text-3xl font-semibold tracking-tight md:text-4xl"
          >
            Inicie seu Projeto com a Isotelhas Tapajós.
          </h2>
          <p className="mt-4 text-slate-300">
            Preencha os dados básicos da sua obra para receber uma estimativa técnica personalizada
            diretamente no seu WhatsApp.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-10 space-y-6">
            <Field name="nome" label="Nome completo" error={errors.nome?.message}>
              <input
                type="text"
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                {...field("nome")}
              />
            </Field>

            <Field name="whatsapp" label="WhatsApp com DDD" error={errors.whatsapp?.message}>
              <input
                type="tel"
                autoComplete="tel"
                placeholder="(93) 9XXXX-XXXX"
                {...field("whatsapp")}
              />
            </Field>

            <Field name="tipoObra" label="Tipo de obra" error={errors.tipoObra?.message}>
              <select defaultValue="" {...field("tipoObra")} className={`${fieldClass} [&>option]:text-brand-slate`}>
                <option value="" disabled>
                  Selecione...
                </option>
                {workTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Field>

            <Field name="metragem" label="Metragem aproximada (m²)" error={errors.metragem?.message}>
              <input type="text" inputMode="decimal" placeholder="Ex: 120" {...field("metragem")} />
            </Field>

            <button
              type="submit"
              className="group mt-4 inline-flex w-full items-center justify-center gap-2 bg-brand-terracotta-deep px-6 py-4 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98] sm:w-auto"
            >
              Solicitar Estimativa via WhatsApp
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>
      </div>

      <Reveal direction="right" delay={120} className="relative min-h-105 md:min-h-160">
        <Image
          src={images.quote.src}
          alt={images.quote.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </Reveal>
    </section>
  );
}
