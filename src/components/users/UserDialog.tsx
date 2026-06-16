"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Typography,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { UserModel, UserResponse, RoleEnum } from "@/types";
import { useUserStore } from "@/store/userStore";

const EMPTY: UserModel = {
  userId: 0,
  email: "",
  firstName: "",
  lastName: "",
  phoneNumer: "",
  role: { value: "USER", description: "User" },
  userAddresses: [],
};

interface UserDialogProps {
  open: boolean;
  user?: UserResponse | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function UserDialog({ open, user, onClose, onSaved }: UserDialogProps) {
  const roles = useUserStore((s) => s.roles);
  const saveUser = useUserStore((s) => s.saveUser);
  const loading = useUserStore((s) => s.loading);

  const [form, setForm] = useState<UserModel>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof UserModel, string>>>({});

  useEffect(() => {
    if (user) {
      setForm({
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumer: user.phoneNumer ?? "",
        role: user.role,
        userAddresses: user.userAddresses,
      });
    } else {
      setForm(EMPTY);
    }
    setErrors({});
  }, [user, open]);

  const set = (field: keyof UserModel) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((e_) => ({ ...e_, [field]: undefined }));
  };

  const validate = () => {
    const errs: Partial<Record<keyof UserModel, string>> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Invalid email address";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      await saveUser(form);
      onSaved();
      onClose();
    } catch {
      // error is handled in store
    }
  };

  const isEdit = !!(user?.userId);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {isEdit ? "Edit User" : "Create New User"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isEdit ? "Update user profile information" : "Fill in the details to create a new user"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              value={form.firstName}
              onChange={set("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName}
              placeholder="Alice"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              value={form.lastName}
              onChange={set("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName}
              placeholder="Wanjiru"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={form.email}
              onChange={set("email")}
              error={!!errors.email}
              helperText={errors.email}
              placeholder="alice@example.com"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              value={form.phoneNumer ?? ""}
              onChange={set("phoneNumer")}
              placeholder="+254 7XX XXX XXX"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              select
              label="Role"
              value={form.role.value}
              onChange={(e) => {
                const role = roles.find((r) => r.value === e.target.value);
                if (role) setForm((f) => ({ ...f, role }));
              }}
            >
              {roles.length > 0 ? (
                roles.map((r) => (
                  <MenuItem key={r.value} value={r.value}>
                    {r.description}
                  </MenuItem>
                ))
              ) : (
                [
                  <MenuItem key="ADMIN" value="ADMIN">Admin</MenuItem>,
                  <MenuItem key="USER" value="USER">User</MenuItem>,
                ]
              )}
            </TextField>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disableElevation
          disabled={loading}
          startIcon={loading ? <CircularProgress size={14} color="inherit" /> : null}
        >
          {loading ? "Saving…" : isEdit ? "Save Changes" : "Create User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
