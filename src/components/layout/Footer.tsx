import { AtSign } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-slate text-slate-400">
      <div className="mx-auto max-w-[1600px] px-6 py-16 md:px-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <Logo />

          <div className="grid gap-8 text-sm sm:grid-cols-3 md:gap-16">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-slate-500">EMPRESA</p>
              <p className="mt-2 text-slate-300">{siteConfig.legalName}</p>
              <p>CNPJ: {siteConfig.cnpj}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-slate-500">SHOWROOM</p>
              <p className="mt-2 text-slate-300">{siteConfig.address.line}</p>
              <p>{siteConfig.address.city}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-widest text-slate-500">REDES</p>
              <a
                href={siteConfig.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-slate-300 transition-colors hover:text-white"
              >
                <AtSign size={16} />
                {siteConfig.instagram.handle}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {year} {siteConfig.legalName}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
