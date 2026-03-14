interface GoldDividerProps {
  className?: string;
}

export function GoldDivider({ className = '' }: GoldDividerProps) {
  return (
    <div
      className={`h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent ${className}`}
    />
  );
}
