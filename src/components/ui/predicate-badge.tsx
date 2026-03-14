interface PredicateBadgeProps {
  text: string;
}

export function PredicateBadge({ text }: PredicateBadgeProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded border border-gold-border text-[10px] font-semibold uppercase tracking-widest text-gold">
      {text}
    </span>
  );
}
