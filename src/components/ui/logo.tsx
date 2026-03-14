import Image from 'next/image';

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed = false }: LogoProps) {
  if (collapsed) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-lg overflow-hidden">
        <Image
          src="/logo.avif"
          alt="Finca Sanro"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src="/logo.avif"
          alt="Finca Sanro"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
      <div>
        <h1 className="font-serif text-base font-bold text-gold tracking-wide">FINCA SANRO</h1>
        <p className="text-[10px] text-text-muted tracking-wider uppercase">Gestión Ecuestre</p>
      </div>
    </div>
  );
}
