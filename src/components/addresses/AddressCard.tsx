"use client";

import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { UserAddress } from "@/types";

interface AddressCardProps {
  address: UserAddress;
  onEdit: (address: UserAddress) => void;
  onDelete: (address: UserAddress) => void;
}

export default function AddressCard({ address, onEdit, onDelete }: AddressCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        borderColor: address.primary ? "rgba(99,91,255,0.4)" : "divider",
        backgroundColor: address.primary ? "#faf9ff" : "white",
        transition: "box-shadow 0.2s ease",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }}
    >
      {address.primary && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #635bff, #8b85ff)",
            borderRadius: "10px 10px 0 0",
          }}
        />
      )}

      <CardContent sx={{ pt: address.primary ? 2.5 : 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: address.primary ? "rgba(99,91,255,0.12)" : "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocationIcon
                sx={{
                  fontSize: 16,
                  color: address.primary ? "#635bff" : "text.secondary",
                }}
              />
            </Box>
            {address.primary && (
              <Chip
                icon={<StarIcon sx={{ fontSize: 12 }} />}
                label="Primary"
                size="small"
                sx={{
                  backgroundColor: "rgba(99,91,255,0.12)",
                  color: "#635bff",
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  height: 22,
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <Tooltip title="Edit address">
              <IconButton
                size="small"
                onClick={() => onEdit(address)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "secondary.main", backgroundColor: "rgba(99,91,255,0.08)" },
                }}
              >
                <EditIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remove address">
              <IconButton
                size="small"
                onClick={() => onDelete(address)}
                sx={{
                  color: "text.secondary",
                  "&:hover": { color: "error.main", backgroundColor: "rgba(229,72,77,0.08)" },
                }}
              >
                <DeleteIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="body2" fontWeight={600} color="text.primary" gutterBottom>
          {address.street}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.city}, {address.state}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address.postalCode} · {address.country}
        </Typography>
      </CardContent>
    </Card>
  );
}
