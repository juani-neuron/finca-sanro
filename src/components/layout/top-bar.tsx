'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';
import { navItems } from '@/lib/navigation';
import Image from 'next/image';

function getPageTitle(pathname: string): string {
  if (pathname === '/') return 'Dashboard';
  const segment = pathname.split('/')[1];
  const nav = navItems.find((item) => item.href === `/${segment}`);
  return nav?.label ?? 'Finca Sanro';
}

export function TopBar() {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="flex items-center justify-between h-16 px-4 lg:px-6 border-b border-border bg-bg/80 backdrop-blur-sm sticky top-0 z-30">
      {/* Desktop: page title */}
      <h1 className="hidden md:block text-lg font-semibold text-text-primary">{title}</h1>

      {/* Mobile: centered logo */}
      <div className="flex md:hidden items-center justify-center flex-1">
        <div className="flex items-center gap-2.5">
          <Image
            src="/logo.avif"
            alt="Finca Sanro"
            width={56}
            height={56}
            className="object-contain"
          />
          <span className="font-serif text-base font-bold text-gold tracking-wide">FINCA SANRO</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-text-muted text-sm">
          <Search className="w-4 h-4" />
          <span>Buscar...</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-elevated transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
        </button>
      </div>
    </header>
  );
}
