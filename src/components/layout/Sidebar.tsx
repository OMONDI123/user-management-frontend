"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  Avatar,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  People as PeopleIcon,
  Dashboard as DashboardIcon,
  Shield as ShieldIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import IconButtonMui from "@mui/material/IconButton";

const DRAWER_WIDTH = 240;
const DRAWER_COLLAPSED = 72;

const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: <DashboardIcon fontSize="small" /> },
  { label: "Users", href: "/users", icon: <PeopleIcon fontSize="small" /> },
];

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  open,
  collapsed,
  onClose,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = collapsed ? DRAWER_COLLAPSED : DRAWER_WIDTH;

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        color: "white",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          px: collapsed ? 1.5 : 3,
          py: 2.5,
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minHeight: 64,
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            background: "linear-gradient(135deg, #635bff 0%, #8b85ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <ShieldIcon sx={{ fontSize: 20, color: "white" }} />
        </Box>
        {!collapsed && (
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, color: "white", lineHeight: 1.2 }}
            >
              AdminHub
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.5)" }}>
              User Management
            </Typography>
          </Box>
        )}
        {isMobile && (
          <IconButtonMui
            size="small"
            onClick={onMobileClose}
            sx={{ ml: "auto", color: "rgba(255,255,255,0.6)" }}
          >
            <CloseIcon fontSize="small" />
          </IconButtonMui>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />

      {/* Nav */}
      <Box sx={{ flex: 1, py: 2 }}>
        {!collapsed && (
          <Typography
            variant="caption"
            sx={{
              px: 3,
              mb: 1,
              display: "block",
              color: "rgba(255,255,255,0.35)",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Main Menu
          </Typography>
        )}
        <List disablePadding>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Tooltip
                key={item.href}
                title={collapsed ? item.label : ""}
                placement="right"
              >
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={isMobile ? onMobileClose : undefined}
                  sx={{
                    mx: 1.5,
                    mb: 0.5,
                    borderRadius: 2,
                    px: collapsed ? 1.5 : 2,
                    py: 1.2,
                    justifyContent: collapsed ? "center" : "flex-start",
                    backgroundColor: active
                      ? "rgba(99,91,255,0.2)"
                      : "transparent",
                    border: active
                      ? "1px solid rgba(99,91,255,0.35)"
                      : "1px solid transparent",
                    "&:hover": {
                      backgroundColor: active
                        ? "rgba(99,91,255,0.25)"
                        : "rgba(255,255,255,0.05)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 36,
                      color: active ? "#635bff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: active ? 600 : 500,
                        color: active ? "white" : "rgba(255,255,255,0.65)",
                      }}
                    />
                  )}
                  {!collapsed && active && (
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#635bff",
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
      </Box>

      {/* Footer */}
      <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mx: 2 }} />
      <Box sx={{ p: collapsed ? 1.5 : 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar
          sx={{
            width: 34,
            height: 34,
            backgroundColor: "rgba(99,91,255,0.3)",
            fontSize: "0.8rem",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          A
        </Avatar>
        {!collapsed && (
          <Box sx={{ overflow: "hidden" }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: "white", lineHeight: 1.3 }}
              noWrap
            >
              Administrator
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.45)" }} noWrap>
              admin@company.com
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            backgroundColor: "#1a1f36",
            boxSizing: "border-box",
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: "width 0.25s ease",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          backgroundColor: "#1a1f36",
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.25s ease",
        },
      }}
    >
      {content}
    </Drawer>
  );
}
