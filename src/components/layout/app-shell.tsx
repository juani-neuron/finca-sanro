'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from './sidebar';
import { MobileNav } from './mobile-nav';
import { TopBar } from './top-bar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // Auto-collapse sidebar on tablet
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setCollapsed(!e.matches);
    };
    handleChange(mql);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <MobileNav />

      {/* Main content - offset by sidebar width */}
      <div
        className="flex flex-col min-h-screen transition-[margin] duration-200 ease-in-out md:ml-16 lg:ml-0"
        style={{ marginLeft: undefined }}
      >
        <style jsx>{`
          @media (min-width: 768px) {
            div { margin-left: ${collapsed ? '64px' : '220px'} !important; }
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
