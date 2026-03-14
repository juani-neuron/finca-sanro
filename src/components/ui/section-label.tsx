interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <h2 className={`text-[11px] font-semibold uppercase tracking-[0.15em] text-gold ${className}`}>
      {children}
    </h2>
  );
}
