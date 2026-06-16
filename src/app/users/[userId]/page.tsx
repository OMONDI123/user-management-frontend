"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Stack,
  Alert,
  Breadcrumbs,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as AddressIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AddressCard from "@/components/addresses/AddressCard";
import AddressDialog from "@/components/addresses/AddressDialog";
import UserDialog from "@/components/users/UserDialog";
import { StatusChip, RoleChip } from "@/components/ui/StatusChip";
import { useUserStore } from "@/store/userStore";
import { useBootstrapEnums } from "@/hooks/useUsers";
import { UserAddress, UserResponse, UserModel } from "@/types";

function avatarColor(id: number) {
  const p = ["#635bff","#00b37e","#f76b15","#e5484d","#0ea5e9","#8b5cf6","#ec4899"];
  return p[id % p.length];
}

export default function UserDetailPage() {
  useBootstrapEnums();
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.userId);

  const usersPage = useUserStore((s) => s.usersPage);
  const saveUser = useUserStore((s) => s.saveUser);
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const loading = useUserStore((s) => s.loading);
  const error = useUserStore((s) => s.error);
  const clearError = useUserStore((s) => s.clearError);

  const [user, setUser] = useState<UserResponse | null>(null);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  // Address dialog state
  const [addrDialogOpen, setAddrDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);

  // User edit dialog
  const [userDialogOpen, setUserDialogOpen] = useState(false);

  // Load user from store or fetch
  useEffect(() => {
    if (!usersPage) {
      fetchUsers();
    }
  }, [usersPage, fetchUsers]);

  useEffect(() => {
    const found = usersPage?.content.find((u) => u.userId === userId);
    if (found) {
      setUser(found);
      setAddresses([...found.userAddresses]);
    }
  }, [usersPage, userId]);

  // ── Address operations (local state, persisted via saveUser) ──────────────

  const handleAddAddress = () => {
    setEditingAddress(null);
    setAddrDialogOpen(true);
  };

  const handleEditAddress = (addr: UserAddress) => {
    setEditingAddress(addr);
    setAddrDialogOpen(true);
  };

  const handleDeleteAddress = async (addr: UserAddress) => {
    if (!user) return;
    const updated = addresses.filter((a) => a.addressId !== addr.addressId);
    setAddresses(updated);
    const model: UserModel = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumer: user.phoneNumer,
      role: user.role,
      userAddresses: updated,
    };
    try {
      await saveUser(model);
    } catch {
      setAddresses(addresses); // rollback
    }
  };

  const handleSaveAddress = async (addr: UserAddress) => {
    if (!user) return;
    let updated: UserAddress[];

    if (editingAddress?.addressId) {
      // update existing
      updated = addresses.map((a) =>
        a.addressId === editingAddress.addressId ? { ...addr, addressId: a.addressId } : a
      );
    } else {
      // add new (temp ID, backend will assign real one)
      const tempId = Date.now();
      updated = [...addresses, { ...addr, addressId: tempId }];
    }

    // If setting primary, clear others
    if (addr.primary) {
      updated = updated.map((a) => ({
        ...a,
        primary: a === (editingAddress?.addressId ? updated.find((u) => u.addressId === editingAddress.addressId) : updated[updated.length - 1]),
      }));
    }

    setAddresses(updated);
    setAddrDialogOpen(false);
    setEditingAddress(null);

    const model: UserModel = {
      userId: user.userId,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumer: user.phoneNumer,
      role: user.role,
      userAddresses: updated,
    };
    try {
      await saveUser(model);
    } catch {
      setAddresses(addresses); // rollback
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (!user && !loading) {
    return (
      <DashboardLayout pageTitle="User Profile">
        <Alert severity="warning">
          User not found.{" "}
          <Link href="/users" style={{ color: "inherit" }}>
            Back to users
          </Link>
        </Alert>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout pageTitle="User Profile">
        <Box sx={{ display: "flex", justifyContent: "center", pt: 8 }}>
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="User Profile">
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2, fontSize: "0.85rem" }}>
        <Link href="/users" style={{ color: "#697386", textDecoration: "none" }}>
          Users
        </Link>
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>
      </Breadcrumbs>

      {error && (
        <Alert severity="error" onClose={clearError} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* ── Left: Profile card ── */}
        <Grid item xs={12} md={4}>
          <Card
            variant="outlined"
            sx={{ borderRadius: 3, borderColor: "divider", position: "sticky", top: 88 }}
          >
            {/* Color band */}
            <Box
              sx={{
                height: 80,
                background: `linear-gradient(135deg, ${avatarColor(user.userId)}, ${avatarColor(user.userId)}aa)`,
                borderRadius: "12px 12px 0 0",
              }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Box sx={{ display: "flex", justifyContent: "center", mt: -4, mb: 2 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    backgroundColor: avatarColor(user.userId),
                    border: "4px solid white",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  }}
                >
                  {user.firstName[0]}{user.lastName[0]}
                </Avatar>
              </Box>

              <Box sx={{ textAlign: "center", mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.email}
                </Typography>
                <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 1 }}>
                  <RoleChip value={user.role.value} description={user.role.description} />
                  <StatusChip value={user.status.value} description={user.status.description} />
                </Stack>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <EmailIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Email
                    </Typography>
                    <Typography variant="body2" fontWeight={500} sx={{ wordBreak: "break-all" }}>
                      {user.email}
                    </Typography>
                  </Box>
                </Box>

                {user.phoneNumer && (
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                    <PhoneIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block">
                        Phone
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {user.phoneNumer}
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
                  <AddressIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">
                      Addresses
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {addresses.length} address{addresses.length !== 1 ? "es" : ""} on record
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Button
                fullWidth
                variant="contained"
                disableElevation
                startIcon={<EditIcon />}
                onClick={() => setUserDialogOpen(true)}
                disabled={loading}
              >
                Edit Profile
              </Button>

              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                startIcon={<BackIcon />}
                onClick={() => router.push("/users")}
                sx={{ mt: 1 }}
              >
                Back to Users
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* ── Right: Addresses ── */}
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                Addresses
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage delivery and billing addresses for this user
              </Typography>
            </Box>
            <Button
              variant="contained"
              disableElevation
              startIcon={<AddIcon />}
              onClick={handleAddAddress}
              disabled={loading}
            >
              Add Address
            </Button>
          </Box>

          {addresses.length === 0 ? (
            <Card
              variant="outlined"
              sx={{
                borderRadius: 3,
                borderColor: "divider",
                borderStyle: "dashed",
                p: 5,
                textAlign: "center",
              }}
            >
              <AddressIcon sx={{ fontSize: 48, color: "text.disabled", mb: 1 }} />
              <Typography variant="body1" fontWeight={600} gutterBottom>
                No addresses yet
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Add a primary address to get started
              </Typography>
              <Button
                variant="contained"
                disableElevation
                startIcon={<AddIcon />}
                onClick={handleAddAddress}
                sx={{ mt: 1 }}
              >
                Add First Address
              </Button>
            </Card>
          ) : (
            <Grid container spacing={2}>
              {addresses.map((addr, idx) => (
                <Grid item xs={12} sm={6} key={addr.addressId ?? idx}>
                  <AddressCard
                    address={addr}
                    onEdit={handleEditAddress}
                    onDelete={handleDeleteAddress}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>

      {/* Dialogs */}
      <AddressDialog
        open={addrDialogOpen}
        address={editingAddress}
        onClose={() => {
          setAddrDialogOpen(false);
          setEditingAddress(null);
        }}
        onSave={handleSaveAddress}
      />

      <UserDialog
        open={userDialogOpen}
        user={user}
        onClose={() => setUserDialogOpen(false)}
        onSaved={() => setUserDialogOpen(false)}
      />
    </DashboardLayout>
  );
}
