import {
  LayoutDashboard,
  Crown,
  Baby,
  Calendar,
  Users,
  Trophy,
  DollarSign,
  Settings,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  phase: number;
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/', icon: LayoutDashboard, phase: 3 },
  { id: 'caballos', label: 'Caballos', href: '/caballos', icon: Crown, phase: 4 },
  { id: 'maquila', label: 'Maquila', href: '/maquila', icon: Baby, phase: 5 },
  { id: 'calendario', label: 'Calendario', href: '/calendario', icon: Calendar, phase: 6 },
  { id: 'personal', label: 'Personal', href: '/personal', icon: Users, phase: 7 },
  { id: 'competencias', label: 'Competencias', href: '/competencias', icon: Trophy, phase: 7 },
  { id: 'financiero', label: 'Financiero', href: '/financiero', icon: DollarSign, phase: 8 },
  { id: 'configuracion', label: 'Configuración', href: '/configuracion', icon: Settings, phase: 9 },
];

// First 5 items for mobile bottom nav, rest go in "More" menu
export const mobileNavItems = navItems.slice(0, 4);
export const mobileMoreItems = navItems.slice(4);
