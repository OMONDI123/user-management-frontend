"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Chip,
  Stack,
} from "@mui/material";
import { Search as SearchIcon, Clear as ClearIcon } from "@mui/icons-material";
import { useUserStore } from "@/store/userStore";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export default function UserFiltersBar() {
  const roles = useUserStore((s) => s.roles);
  const statuses = useUserStore((s) => s.statuses);
  const filters = useUserStore((s) => s.filters);
  const setFilters = useUserStore((s) => s.setFilters);

  const [search, setSearch] = useState(filters.searchTerm ?? "");
  const debouncedSearch = useDebouncedValue(search, 400);

  // Push the debounced value into the store once it settles, and
  // jump back to page 0 so the user doesn't land on an empty page.
  useEffect(() => {
    const trimmed = debouncedSearch.trim();
    if (trimmed !== (filters.searchTerm ?? "")) {
      setFilters({ searchTerm: trimmed || undefined, page: 0 });
    }
  }, [debouncedSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const clearRole = () => setFilters({ role: undefined, page: 0 });
  const clearSearch = () => {
    setSearch("");
    setFilters({ searchTerm: undefined, page: 0 });
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <Box sx={{ flex: 1, maxWidth: { sm: 320 } }}>
          <TextField
            fullWidth
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={clearSearch} sx={{ p: 0.5 }}>
                    <ClearIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={(e) => setFilters({ status: e.target.value, page: 0 })}
          sx={{ minWidth: 130 }}
        >
          {statuses.length > 0 ? (
            statuses.map((s) => (
              <MenuItem key={s.value} value={s.value}>{s.description}</MenuItem>
            ))
          ) : (
            [
              <MenuItem key="ACTIVE" value="ACTIVE">Active</MenuItem>,
              <MenuItem key="INACTIVE" value="INACTIVE">Inactive</MenuItem>,
            ]
          )}
        </TextField>

        <TextField
          select
          label="Role"
          value={filters.role ?? ""}
          onChange={(e) => setFilters({ role: e.target.value || undefined, page: 0 })}
          sx={{ minWidth: 130 }}
        >
          <MenuItem value="">All Roles</MenuItem>
          {roles.length > 0 ? (
            roles.map((r) => (
              <MenuItem key={r.value} value={r.value}>{r.description}</MenuItem>
            ))
          ) : (
            [
              <MenuItem key="ADMIN" value="ADMIN">Admin</MenuItem>,
              <MenuItem key="USER" value="USER">User</MenuItem>,
            ]
          )}
        </TextField>
      </Stack>

      {(filters.searchTerm || filters.role) && (
        <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
          {filters.searchTerm && (
            <Chip
              label={`Search: "${filters.searchTerm}"`}
              size="small"
              onDelete={clearSearch}
              sx={{ fontSize: "0.75rem" }}
            />
          )}
          {filters.role && (
            <Chip
              label={`Role: ${roles.find((r) => r.value === filters.role)?.description ?? filters.role}`}
              size="small"
              onDelete={clearRole}
              sx={{ fontSize: "0.75rem" }}
            />
          )}
        </Stack>
      )}
    </Box>
  );
}