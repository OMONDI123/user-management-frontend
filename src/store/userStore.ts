import { create } from "zustand";
import {
  Page,
  RoleEnum,
  StatusEnum,
  UserFilters,
  UserModel,
  UserResponse,
} from "@/types";
import * as api from "@/services/userService";

interface UserStore {
  // ── Data ──────────────────────────────────────────────────────────────────
  usersPage: Page<UserResponse> | null;
  roles: RoleEnum[];
  statuses: StatusEnum[];
  selectedUser: UserResponse | null;
  filters: UserFilters;

  // ── UI State ──────────────────────────────────────────────────────────────
  loading: boolean;
  error: string | null;

  // ── Actions ───────────────────────────────────────────────────────────────
  setFilters: (filters: Partial<UserFilters>) => void;
  setSelectedUser: (user: UserResponse | null) => void;
  fetchUsers: () => Promise<void>;
  fetchRoles: () => Promise<void>;
  fetchStatuses: () => Promise<void>;
  saveUser: (model: UserModel) => Promise<UserResponse>;
  clearError: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  usersPage: null,
  roles: [],
  statuses: [],
  selectedUser: null,
  loading: false,
  error: null,
  filters: {
    status: "ACTIVE",
    role: undefined,
    searchTerm: undefined,
    page: 0,
    size: 10,
  },

  setFilters: (partial) => {
    set((s) => ({ filters: { ...s.filters, ...partial, page: 0 } }));
  },

  setSelectedUser: (user) => set({ selectedUser: user }),

  clearError: () => set({ error: null }),

  fetchUsers: async () => {
    const { filters } = get();
    set({ loading: true, error: null });
    try {
      let page: Page<UserResponse>;
      if (filters.role) {
        page = await api.getUsersByStatusAndRole(
          filters.status,
          filters.role,
          filters.page,
          filters.size,
          filters.searchTerm
        );
      } else {
        page = await api.getUsersByStatus(
          filters.status,
          filters.page,
          filters.size,
          filters.searchTerm
        );
      }
      set({ usersPage: page });
    } catch (err) {
      set({ error: (err as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  fetchRoles: async () => {
    try {
      const roles = await api.getRoleEnum();
      set({ roles });
    } catch {
      /* non-fatal */
    }
  },

  fetchStatuses: async () => {
    try {
      const statuses = await api.getStatus();
      set({ statuses });
    } catch {
      /* non-fatal */
    }
  },

  saveUser: async (model: UserModel) => {
    set({ loading: true, error: null });
    try {
      const saved = await api.createOrUpdateUser(model);
      // Refresh the list after save
      await get().fetchUsers();
      return saved;
    } catch (err) {
      set({ error: (err as Error).message });
      throw err;
    } finally {
      set({ loading: false });
    }
  },
}));
