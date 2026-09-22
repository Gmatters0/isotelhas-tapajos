"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site-config";
import { buildWhatsAppLink, WHATSAPP_GREETING } from "@/lib/whatsapp";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const consultantLink = buildWhatsAppLink(WHATSAPP_GREETING);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-slate/80 backdrop-blur-md">
      <nav className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-widest text-slate-300 transition-colors hover:text-white"
              >
                {link.label.toUpperCase()}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={consultantLink}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center justify-center bg-brand-terracotta px-5 py-2.5 text-xs font-semibold tracking-wide text-white transition-colors hover:bg-brand-terracotta/90 md:inline-flex"
        >
          Falar com Consultor
        </a>

        <button
          type="button"
          className="text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-brand-slate px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-mono text-sm tracking-widest text-slate-300"
                >
                  {link.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={consultantLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 inline-flex w-full items-center justify-center bg-brand-terracotta px-5 py-3 text-sm font-semibold text-white"
          >
            Falar com Consultor
          </a>
        </div>
      )}
    </header>
  );
}
