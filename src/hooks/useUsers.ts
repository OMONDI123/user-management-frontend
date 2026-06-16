import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

/**
 * Bootstraps enums (roles + statuses) once on mount.
 */
export function useBootstrapEnums() {
  const fetchRoles = useUserStore((s) => s.fetchRoles);
  const fetchStatuses = useUserStore((s) => s.fetchStatuses);

  useEffect(() => {
    fetchRoles();
    fetchStatuses();
  }, [fetchRoles, fetchStatuses]);
}

/**
 * Re-fetches users whenever filters change.
 */
export function useUsers() {
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const filters = useUserStore((s) => s.filters);
  const usersPage = useUserStore((s) => s.usersPage);
  const loading = useUserStore((s) => s.loading);
  const error = useUserStore((s) => s.error);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, filters]);

  return { usersPage, loading, error };
}
