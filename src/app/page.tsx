"use client";

import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Stack,
  Divider,
} from "@mui/material";
import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  LocationOn as AddressIcon,
  CheckCircle as ActiveIcon,
  TrendingUp as TrendingIcon,
} from "@mui/icons-material";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useUserStore } from "@/store/userStore";
import { useBootstrapEnums } from "@/hooks/useUsers";
import Link from "next/link";

function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub: string;
  color: string;
}) {
  return (
    <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "divider", height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {label}
            </Typography>
            <Typography variant="h4" fontWeight={800} sx={{ mt: 0.5, lineHeight: 1 }}>
              {value}
            </Typography>
          </Box>
          <Avatar sx={{ backgroundColor: `${color}18`, width: 44, height: 44, borderRadius: 2 }}>
            <Box sx={{ color }}>{icon}</Box>
          </Avatar>
        </Box>
        <Typography variant="caption" color="text.secondary">
          {sub}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  useBootstrapEnums();
  const fetchUsers = useUserStore((s) => s.fetchUsers);
  const usersPage = useUserStore((s) => s.usersPage);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const totalUsers = usersPage?.totalElements ?? 0;
  const activeCount = usersPage?.content.filter((u) => u.status.value === "ACTIVE").length ?? 0;
  const adminCount = usersPage?.content.filter((u) => u.role.value === "ADMIN").length ?? 0;
  const addressCount = usersPage?.content.reduce((acc, u) => acc + u.userAddresses.length, 0) ?? 0;

  return (
    <DashboardLayout pageTitle="Dashboard">
      {/* Welcome banner */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1a1f36 0%, #2d3561 50%, #3d3580 100%)",
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
          mb: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(99,91,255,0.2)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            right: 60,
            bottom: -60,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(99,91,255,0.1)",
          }}
        />
        <Typography variant="h5" fontWeight={800} color="white" gutterBottom>
          Welcome back, Administrator 
        </Typography>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)", mb: 3, maxWidth: 480 }}>
          Manage your users, update profiles, and keep address records up to date all from one place.
        </Typography>
        <Button
          component={Link}
          href="/users"
          variant="contained"
          sx={{
            background: "rgba(255,255,255,0.15)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(8px)",
            "&:hover": { background: "rgba(255,255,255,0.22)" },
            boxShadow: "none",
          }}
          startIcon={<PeopleIcon />}
        >
          View All Users
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} md={3}>
          <StatCard icon={<PeopleIcon />} label="Total Users" value={totalUsers} sub="All registered users" color="#635bff" />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard icon={<ActiveIcon />} label="Active Users" value={activeCount} sub="On current page" color="#00b37e" />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard icon={<TrendingIcon />} label="Admins" value={adminCount} sub="With admin role" color="#f76b15" />
        </Grid>
        <Grid item xs={6} md={3}>
          <StatCard icon={<AddressIcon />} label="Addresses" value={addressCount} sub="Total addresses on record" color="#e5484d" />
        </Grid>
      </Grid>

      {/* Recent users preview */}
      <Card variant="outlined" sx={{ borderRadius: 3, borderColor: "divider" }}>
        <Box sx={{ p: 2.5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1" fontWeight={700}>
            Recent Users
          </Typography>
          <Button component={Link} href="/users" size="small" sx={{ color: "secondary.main" }}>
            View all →
          </Button>
        </Box>
        <Divider />
        <Stack divider={<Divider />}>
          {(usersPage?.content ?? []).slice(0, 5).map((user) => (
            <Box
              key={user.userId}
              component={Link}
              href={`/users/${user.userId}`}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                px: 2.5,
                py: 1.75,
                textDecoration: "none",
                color: "inherit",
                "&:hover": { backgroundColor: "#f8f9fc" },
                transition: "background-color 0.15s ease",
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  backgroundColor: "#635bff",
                }}
              >
                {user.firstName[0]}{user.lastName[0]}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" fontWeight={600} noWrap>
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  {user.email}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary">
                {user.userAddresses.length} address{user.userAddresses.length !== 1 ? "es" : ""}
              </Typography>
            </Box>
          ))}
          {(!usersPage || usersPage.content.length === 0) && (
            <Box sx={{ py: 4, textAlign: "center", color: "text.secondary" }}>
              <Typography variant="body2">No users yet</Typography>
            </Box>
          )}
        </Stack>
      </Card>
    </DashboardLayout>
  );
}
