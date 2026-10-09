import Image from "next/image";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { PHONE_DISPLAY, siteConfig } from "@/lib/site-config";
import { CONSULTANT_LINK } from "@/lib/whatsapp";

const labelClass = "font-mono text-[11px] tracking-widest text-slate-400";
const linkClass =
  "mt-2 inline-flex items-center gap-2 text-slate-300 transition-colors duration-200 hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate text-slate-400">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <Logo variant="stacked" />

          <div className="grid gap-8 text-sm sm:grid-cols-2 lg:grid-cols-4 lg:gap-14">
            <div>
              <p className={labelClass}>EMPRESA</p>
              <p className="mt-2 text-slate-300">{siteConfig.legalName}</p>
              <p>CNPJ: {siteConfig.cnpj}</p>
            </div>
            <address className="not-italic">
              <p className={labelClass}>SHOWROOM</p>
              <p className="mt-2 text-slate-300">{siteConfig.address.line}</p>
              <p>{siteConfig.address.city}</p>
            </address>
            <div>
              <p className={labelClass}>CONTATO</p>
              <a
                href={CONSULTANT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${PHONE_DISPLAY}`}
                className={linkClass}
              >
                <MessageCircle size={16} aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
            <div>
              <p className={labelClass}>REDES</p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                <InstagramIcon size={16} />
                {siteConfig.instagram.handle}
              </a>
            </div>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-xs">
          © {year} {siteConfig.legalName}. Todos os direitos reservados.
        </p>
      </div>

      <div className="border-t border-white/10 bg-white/3">
        <div className="mx-auto flex max-w-[1600px] justify-center px-6 py-8 md:justify-end md:px-12">
          <a
            href={siteConfig.developer.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
          >
            <span className="inline-flex items-center gap-1.5 text-base text-slate-300 transition-colors duration-200 group-hover:text-white md:text-lg">
              Site desenvolvido por <strong className="font-semibold text-white">{siteConfig.developer.name}</strong>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="text-brand-terracotta-light transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </span>
            <Image
              src="/brand/awt-development-light.png"
              alt=""
              width={480}
              height={184}
              unoptimized
              className="h-12 w-auto opacity-90 transition duration-200 group-hover:scale-105 group-hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
