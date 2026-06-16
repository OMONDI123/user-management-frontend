"use client";

import React, { useState } from "react";
import { Box, Toolbar, useTheme, useMediaQuery } from "@mui/material";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

const DRAWER_FULL = 240;
const DRAWER_MINI = 72;

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

export default function DashboardLayout({
  children,
  pageTitle,
}: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const drawerWidth = collapsed ? DRAWER_MINI : DRAWER_FULL;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", backgroundColor: "background.default" }}>
      <Sidebar
        open={!collapsed}
        collapsed={collapsed}
        onClose={() => setCollapsed(true)}
        onToggleCollapse={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
          minWidth: 0,
          transition: "width 0.25s ease",
        }}
      >
        <TopBar
          title={pageTitle}
          sidebarCollapsed={collapsed}
          drawerWidth={isMobile ? 0 : drawerWidth}
          onToggleMobile={() => setMobileOpen(true)}
          onToggleCollapse={() => setCollapsed((v) => !v)}
        />
        <Toolbar />
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, sm: 3 },
            overflowY: "auto",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
