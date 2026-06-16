"use client";

import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  InputBase,
  Badge,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as CollapseIcon,
  Search as SearchIcon,
  Notifications as BellIcon,
} from "@mui/icons-material";

interface TopBarProps {
  title: string;
  sidebarCollapsed: boolean;
  drawerWidth: number;
  onToggleMobile: () => void;
  onToggleCollapse: () => void;
}

export default function TopBar({
  title,
  sidebarCollapsed,
  drawerWidth,
  onToggleMobile,
  onToggleCollapse,
}: TopBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
        ml: isMobile ? 0 : `${drawerWidth}px`,
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e3e8ee",
        transition: "width 0.25s ease, margin-left 0.25s ease",
        zIndex: theme.zIndex.drawer - 1,
      }}
    >
      <Toolbar sx={{ gap: 2, px: { xs: 2, sm: 3 } }}>
        {/* Mobile hamburger */}
        {isMobile && (
          <IconButton
            edge="start"
            onClick={onToggleMobile}
            sx={{ color: "text.primary" }}
          >
            <MenuIcon />
          </IconButton>
        )}

        {/* Desktop collapse toggle */}
        {!isMobile && (
          <IconButton
            onClick={onToggleCollapse}
            size="small"
            sx={{
              color: "text.secondary",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              p: 0.75,
              "&:hover": { backgroundColor: "action.hover" },
            }}
          >
            <CollapseIcon
              fontSize="small"
              sx={{
                transform: sidebarCollapsed ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.25s ease",
              }}
            />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: "text.primary", flexGrow: 0 }}
        >
          {title}
        </Typography>

        <Box sx={{ flex: 1 }} />

        {/* Search bar (desktop only) */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            alignItems: "center",
            backgroundColor: "#f5f6fa",
            borderRadius: 2,
            px: 1.5,
            py: 0.75,
            border: "1px solid #e3e8ee",
            width: 220,
            gap: 1,
          }}
        >
          <SearchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
          <InputBase
            placeholder="Quick search..."
            sx={{ fontSize: "0.875rem", flex: 1 }}
          />
        </Box>

        {/* Notifications */}
        <IconButton size="small" sx={{ color: "text.secondary" }}>
          <Badge badgeContent={3} color="secondary" variant="dot">
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
