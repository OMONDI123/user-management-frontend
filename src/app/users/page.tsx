"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Alert,
  Stack,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UsersTable from "@/components/users/UsersTable";
import UserFiltersBar from "@/components/users/UserFiltersBar";
import UserDialog from "@/components/users/UserDialog";
import { useUsers, useBootstrapEnums } from "@/hooks/useUsers";
import { useUserStore } from "@/store/userStore";
import { UserResponse } from "@/types";

export default function UsersPage() {
  useBootstrapEnums();
  const { usersPage, loading, error } = useUsers();
  const setFilters = useUserStore((s) => s.setFilters);
  const filters = useUserStore((s) => s.filters);
  const clearError = useUserStore((s) => s.clearError);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  const handleCreate = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEdit = (user: UserResponse) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingUser(null);
  };

  return (
    <DashboardLayout pageTitle="Users">
      {/* Page header */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "center" }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Box>
          <Typography variant="h5" fontWeight={800}>
            User Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {usersPage?.totalElements ?? 0} users found · manage profiles and addresses
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={handleCreate}
          disableElevation
          sx={{ flexShrink: 0 }}
        >
          Add User
        </Button>
      </Stack>

      {/* Error alert */}
      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Filters */}
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          p: 2,
          mb: 2,
        }}
      >
        <UserFiltersBar />
      </Box>

      {/* Table */}
      <UsersTable
        users={usersPage?.content ?? []}
        total={usersPage?.totalElements ?? 0}
        page={filters.page}
        rowsPerPage={filters.size}
        loading={loading}
        onPageChange={(p) => setFilters({ page: p })}
        onEdit={handleEdit}
      />

      {/* User dialog */}
      <UserDialog
        open={dialogOpen}
        user={editingUser}
        onClose={handleDialogClose}
        onSaved={() => {}}
      />
    </DashboardLayout>
  );
}
