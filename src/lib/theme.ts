"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1f36",
      light: "#2d3561",
      dark: "#0d1020",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#635bff",
      light: "#8b85ff",
      dark: "#3d35cc",
      contrastText: "#ffffff",
    },
    success: {
      main: "#00b37e",
      light: "#33c498",
      dark: "#007f58",
    },
    error: {
      main: "#e5484d",
      light: "#eb6f73",
      dark: "#aa2429",
    },
    warning: {
      main: "#f76b15",
      light: "#f98944",
      dark: "#b54d0e",
    },
    background: {
      default: "#f5f6fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1f36",
      secondary: "#697386",
    },
    divider: "#e3e8ee",
  },
  typography: {
    fontFamily: "'Inter', 'system-ui', sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500, color: "#697386" },
    body1: { fontSize: "0.9375rem" },
    body2: { fontSize: "0.875rem", color: "#697386" },
    caption: { fontSize: "0.75rem", color: "#697386" },
  },
  shape: { borderRadius: 10 },
  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
    "0 4px 6px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.08)",
    "0 10px 15px rgba(0,0,0,0.05), 0 4px 6px rgba(0,0,0,0.07)",
    "0 20px 25px rgba(0,0,0,0.05), 0 10px 10px rgba(0,0,0,0.04)",
    "0 25px 50px rgba(0,0,0,0.1)",
    ...Array(19).fill("none"),
  ] as any,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          fontSize: "0.875rem",
          padding: "8px 20px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #635bff 0%, #4a45d4 100%)",
          boxShadow: "0 2px 8px rgba(99,91,255,0.35)",
          "&:hover": {
            background: "linear-gradient(135deg, #4a45d4 0%, #3530a8 100%)",
            boxShadow: "0 4px 12px rgba(99,91,255,0.45)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          border: "1px solid #e3e8ee",
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: "outlined", size: "small" },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 8,
            backgroundColor: "#ffffff",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 600, fontSize: "0.75rem", borderRadius: 6 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          "& .MuiTableCell-root": {
            fontWeight: 600,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#697386",
            backgroundColor: "#f8f9fc",
            borderBottom: "2px solid #e3e8ee",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderColor: "#f0f2f5", padding: "14px 16px" },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:hover": { backgroundColor: "#f8f9fc" },
          transition: "background-color 0.15s ease",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #e3e8ee",
          backgroundColor: "#1a1f36",
        },
      },
    },
    MuiAlert: {
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 16, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" },
      },
    },
    MuiSelect: {
      defaultProps: { size: "small" },
      styleOverrides: {
        outlined: { borderRadius: 8 },
      },
    },
  },
});
