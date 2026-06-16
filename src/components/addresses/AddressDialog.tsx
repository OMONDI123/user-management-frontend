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
  FormControlLabel,
  Switch,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { UserAddress } from "@/types";

const EMPTY_ADDRESS: UserAddress = {
  street: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
  primary: false,
};

interface AddressDialogProps {
  open: boolean;
  address?: UserAddress | null;
  onClose: () => void;
  onSave: (address: UserAddress) => void;
}

export default function AddressDialog({
  open,
  address,
  onClose,
  onSave,
}: AddressDialogProps) {
  const [form, setForm] = useState<UserAddress>(EMPTY_ADDRESS);
  const [errors, setErrors] = useState<Partial<UserAddress>>({});

  useEffect(() => {
    setForm(address ? { ...address } : EMPTY_ADDRESS);
    setErrors({});
  }, [address, open]);

  const set = (field: keyof UserAddress) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((e_) => ({ ...e_, [field]: undefined }));
  };

  const validate = () => {
    const errs: Partial<UserAddress> = {};
    if (!form.street) errs.street = "Street is required";
    if (!form.city) errs.city = "City is required";
    if (!form.state) errs.state = "State is required";
    if (!form.postalCode) errs.postalCode = "Postal code is required";
    if (!form.country) errs.country = "Country is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (validate()) onSave(form);
  };

  const isEdit = !!address?.addressId;

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
            {isEdit ? "Edit Address" : "Add New Address"}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isEdit ? "Update the address details below" : "Fill in the address details below"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Address"
              value={form.street}
              onChange={set("street")}
              error={!!errors.street}
              helperText={errors.street}
              placeholder="123 Main Street"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              value={form.city}
              onChange={set("city")}
              error={!!errors.city}
              helperText={errors.city}
              placeholder="Nairobi"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State / County"
              value={form.state}
              onChange={set("state")}
              error={!!errors.state}
              helperText={errors.state}
              placeholder="Nairobi County"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              value={form.postalCode}
              onChange={set("postalCode")}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              placeholder="00100"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              value={form.country}
              onChange={set("country")}
              error={!!errors.country}
              helperText={errors.country}
              placeholder="Kenya"
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: form.primary ? "#ede9fe" : "#f8f9fc",
                borderRadius: 2,
                px: 2,
                py: 1.5,
                border: "1px solid",
                borderColor: form.primary ? "rgba(99,91,255,0.3)" : "divider",
                transition: "all 0.2s ease",
              }}
            >
              <Box>
                <Typography variant="body2" fontWeight={600}>
                  Primary Address
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Set as the default address for this user
                </Typography>
              </Box>
              <Switch
                checked={form.primary}
                onChange={(e) => setForm((f) => ({ ...f, primary: e.target.checked }))}
                color="secondary"
              />
            </Box>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSave} variant="contained" disableElevation>
          {isEdit ? "Save Changes" : "Add Address"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
