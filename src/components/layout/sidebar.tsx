'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftClose, PanelLeft } from 'lucide-react';
import { navItems } from '@/lib/navigation';
import { Logo } from '@/components/ui/logo';
import { GoldDivider } from '@/components/ui/gold-divider';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <motion.aside
      className="hidden md:flex flex-col h-screen bg-bg-card border-r border-border fixed left-0 top-0 z-40"
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className={`flex items-center h-16 ${collapsed ? 'justify-center px-2' : 'px-5'}`}>
        <Logo collapsed={collapsed} />
      </div>

      <GoldDivider />

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg transition-colors ${
                    collapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'
                  } ${
                    isActive
                      ? 'bg-gold-glow text-gold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        className="text-sm font-medium whitespace-nowrap"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <GoldDivider />

      {/* Collapse toggle */}
      <div className={`flex items-center h-14 ${collapsed ? 'justify-center' : 'px-3'}`}>
        <button
          onClick={onToggle}
          className="flex items-center gap-2 p-2 rounded-lg text-text-muted hover:text-text-secondary hover:bg-bg-elevated transition-colors"
          title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
        >
          {collapsed ? (
            <PanelLeft className="w-5 h-5" />
          ) : (
            <>
              <PanelLeftClose className="w-5 h-5" />
              <span className="text-xs">Colapsar</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
