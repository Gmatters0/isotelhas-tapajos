"use client";

import { useCallback, useSyncExternalStore } from "react";

// O produto aberto vive no hash da URL (/catalogo#slug): links compartilháveis, sem novas entradas no histórico.
// `replaceState` não dispara `hashchange`, por isso os assinantes são avisados manualmente.
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener("hashchange", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("hashchange", listener);
  };
}

const getSnapshot = () => window.location.hash;
const getServerSnapshot = () => "";

function writeHash(hash: string) {
  const { pathname, search } = window.location;
  window.history.replaceState(null, "", `${pathname}${search}${hash}`);
  listeners.forEach((listener) => listener());
}

function readSlug(hash: string): string | null {
  if (hash.length < 2) return null;
  try {
    return decodeURIComponent(hash.slice(1));
  } catch {
    return null;
  }
}

export function useProductHash() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const open = useCallback((slug: string) => writeHash(`#${encodeURIComponent(slug)}`), []);
  const close = useCallback(() => {
    if (window.location.hash) writeHash("");
  }, []);

  return { slug: readSlug(hash), open, close };
}
