'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { TopBar } from './top-bar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Auto-collapse sidebar on tablet
  useEffect(() => {
    setMounted(true);
    const mql = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setCollapsed(!e.matches);
    };
    handleChange(mql);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  const sidebarWidth = collapsed ? '64px' : '220px';

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <MobileNav />

      {/* Main content - offset by sidebar width */}
      <div
        className="flex flex-col min-h-screen transition-[margin] duration-200 ease-in-out"
        style={{
          marginLeft: mounted ? undefined : 0,
        }}
      >
        <style jsx>{`
          @media (min-width: 768px) {
            div { margin-left: ${sidebarWidth} !important; }
          }
          @media (max-width: 767px) {
            div { margin-left: 0 !important; }
          }
        `}</style>
        <TopBar />
        <main className="flex-1 p-4 lg:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
