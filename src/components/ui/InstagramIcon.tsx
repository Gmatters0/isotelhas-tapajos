interface InstagramIconProps {
  size?: number;
  className?: string;
}

/**
 * lucide-react removida os ícones de marca (Instagram, etc.) — usamos um SVG
 * próprio, desenhado no mesmo estilo (stroke, 24x24, cantos arredondados)
 * para combinar visualmente com os demais ícones Lucide do site.
 */
export function InstagramIcon({ size = 16, className }: InstagramIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174 4 4 0 0 1 7.914-1.174z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
