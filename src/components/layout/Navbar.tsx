"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/lib/site-config";
import { CONSULTANT_LINK } from "@/lib/whatsapp";

const linkClass =
  "relative py-1 font-mono text-xs uppercase tracking-widest text-slate-300 transition-colors hover:text-white after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-terracotta-light after:transition-transform after:duration-300 hover:after:scale-x-100";

const ctaClass =
  "items-center justify-center bg-brand-terracotta-deep font-semibold tracking-wide text-white transition duration-200 hover:bg-brand-terracotta-deep/90 active:scale-[0.98]";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-brand-slate/90 backdrop-blur-md">
      <nav aria-label="Principal" className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12">
        <Logo />

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={linkClass}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={CONSULTANT_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden px-5 py-2.5 text-xs md:inline-flex ${ctaClass}`}
        >
          Falar com Consultor
        </a>

        <button
          type="button"
          className="p-1 text-white transition-colors hover:text-brand-terracotta-light md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobile"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div id="menu-mobile" className="border-t border-white/10 bg-brand-slate px-6 py-6 md:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setMobileOpen(false)} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CONSULTANT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className={`mt-6 flex w-full px-5 py-3 text-sm ${ctaClass}`}
          >
            Falar com Consultor
          </a>
        </div>
      )}
    </header>
  );
}
