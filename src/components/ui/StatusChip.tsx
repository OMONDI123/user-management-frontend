import React from "react";
import { Chip } from "@mui/material";

interface StatusChipProps {
  value: string;
  description: string;
}

const STATUS_MAP: Record<
  string,
  { color: "success" | "error" | "warning" | "default"; bg: string; text: string }
> = {
  ACTIVE: { color: "success", bg: "#dcfce7", text: "#15803d" },
  INACTIVE: { color: "error", bg: "#fee2e2", text: "#dc2626" },
  SUSPENDED: { color: "warning", bg: "#fef3c7", text: "#d97706" },
};

const ROLE_MAP: Record<string, { bg: string; text: string }> = {
  ADMIN: { bg: "#ede9fe", text: "#7c3aed" },
  USER: { bg: "#dbeafe", text: "#1d4ed8" },
  MANAGER: { bg: "#fce7f3", text: "#be185d" },
};

export function StatusChip({ value, description }: StatusChipProps) {
  const style = STATUS_MAP[value] ?? { bg: "#f1f5f9", text: "#475569" };
  return (
    <Chip
      label={description}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.text,
        fontWeight: 600,
        fontSize: "0.7rem",
        height: 22,
        "& .MuiChip-label": { px: 1.25 },
      }}
    />
  );
}

export function RoleChip({ value, description }: StatusChipProps) {
  const style = ROLE_MAP[value] ?? { bg: "#f1f5f9", text: "#475569" };
  return (
    <Chip
      label={description}
      size="small"
      sx={{
        backgroundColor: style.bg,
        color: style.text,
        fontWeight: 600,
        fontSize: "0.7rem",
        height: 22,
        "& .MuiChip-label": { px: 1.25 },
      }}
    />
  );
}
