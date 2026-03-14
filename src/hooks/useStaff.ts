import { staff } from '@/data/staff';
import { StaffMember, StaffRole } from '@/types';

interface StaffFilters {
  role?: StaffRole;
  isActive?: boolean;
  isExternal?: boolean;
}

export function useStaff(filters?: StaffFilters) {
  let filtered = [...staff];

  if (filters?.role) {
    filtered = filtered.filter((s) => s.role === filters.role);
  }
  if (filters?.isActive !== undefined) {
    filtered = filtered.filter((s) => s.isActive === filters.isActive);
  }
  if (filters?.isExternal !== undefined) {
    filtered = filtered.filter((s) => s.isExternal === filters.isExternal);
  }

  return {
    staff: filtered,
    total: filtered.length,
  };
}

export function useStaffMember(id: string): StaffMember | undefined {
  return staff.find((s) => s.id === id);
}
