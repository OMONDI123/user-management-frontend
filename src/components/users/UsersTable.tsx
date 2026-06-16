"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Skeleton,
  Paper,
  TablePagination,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  LocationOn as AddressIcon,
} from "@mui/icons-material";
import { UserResponse } from "@/types";
import { StatusChip, RoleChip } from "@/components/ui/StatusChip";
import { useRouter } from "next/navigation";

function initials(u: UserResponse) {
  return `${u.firstName[0] ?? ""}${u.lastName[0] ?? ""}`.toUpperCase();
}

function avatarColor(userId: number) {
  const palette = [
    "#635bff","#00b37e","#f76b15","#e5484d","#0ea5e9","#8b5cf6","#ec4899",
  ];
  return palette[userId % palette.length];
}

interface UsersTableProps {
  users: UserResponse[];
  total: number;
  page: number;
  rowsPerPage: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  onEdit: (user: UserResponse) => void;
}

export default function UsersTable({
  users,
  total,
  page,
  rowsPerPage,
  loading,
  onPageChange,
  onEdit,
}: UsersTableProps) {
  const router = useRouter();

  return (
    <Paper
      variant="outlined"
      sx={{ borderRadius: 3, overflow: "hidden", borderColor: "divider" }}
    >
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>Email</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Role</TableCell>
              <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>Status</TableCell>
              <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                Addresses
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading
              ? Array.from({ length: rowsPerPage }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Skeleton variant="circular" width={36} height={36} />
                        <Box>
                          <Skeleton width={120} height={16} />
                          <Skeleton width={80} height={12} sx={{ mt: 0.5 }} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      <Skeleton width={160} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      <Skeleton width={60} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      <Skeleton width={60} />
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                      <Skeleton width={40} />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton width={80} sx={{ ml: "auto" }} />
                    </TableCell>
                  </TableRow>
                ))
              : users.map((user) => (
                  <TableRow key={user.userId} sx={{ cursor: "pointer" }}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Avatar
                          sx={{
                            width: 36,
                            height: 36,
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            backgroundColor: avatarColor(user.userId),
                          }}
                        >
                          {initials(user)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight={600}>
                            {user.firstName} {user.lastName}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: { sm: "none" } }}
                          >
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </TableCell>

                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      <RoleChip
                        value={user.role.value}
                        description={user.role.description}
                      />
                    </TableCell>

                    <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                      <StatusChip
                        value={user.status.value}
                        description={user.status.description}
                      />
                    </TableCell>

                    <TableCell sx={{ display: { xs: "none", lg: "table-cell" } }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <AddressIcon sx={{ fontSize: 14, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {user.userAddresses.length}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell align="right">
                      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 0.5 }}>
                        <Tooltip title="View & manage">
                          <IconButton
                            size="small"
                            onClick={() => router.push(`/users/${user.userId}`)}
                            sx={{
                              color: "secondary.main",
                              "&:hover": { backgroundColor: "rgba(99,91,255,0.08)" },
                            }}
                          >
                            <ViewIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit user">
                          <IconButton
                            size="small"
                            onClick={() => onEdit(user)}
                            sx={{
                              color: "text.secondary",
                              "&:hover": { color: "primary.main", backgroundColor: "action.hover" },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 17 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

            {!loading && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      textAlign: "center",
                      py: 6,
                      color: "text.secondary",
                    }}
                  >
                    <AddressIcon sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                    <Typography variant="body2">No users found</Typography>
                    <Typography variant="caption">
                      Try adjusting your filters or search term
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={total}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, p) => onPageChange(p)}
        onRowsPerPageChange={() => {}}
        sx={{ borderTop: "1px solid", borderColor: "divider" }}
      />
    </Paper>
  );
}
