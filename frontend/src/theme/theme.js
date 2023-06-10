import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  breakpoints: {
    values: {
      small: 320,
      medium: 768,
      ml:800,
      large: 1200,
    },
  },
  palette: {
    primary: {
      main: "#680a83",
    },
    secondary: {
      main: "#e8efff",
    },
    success: {
      main: "#2e7d32",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          boxShadow: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Poppins';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        },
        * {
          ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background-color: #fff;
          },
          :hover ::-webkit-scrollbar-track-piece {
            background-color: #fff;
            border-radius: 6px;
          },
          :hover::-webkit-scrollbar-thumb:vertical {
            background-color: #c0cedc;
            border-radius: 6px;
            outline: 2px solid #fff;
            outline-offset: -2px;
            border: 2px solid #fff;
          },
          :hover::-webkit-scrollbar-thumb:vertical:hover {
            background-color: #c0cecc;
          },
          
          scrollbar-color: #c0cedc #fff;
          scrollbar-width: thin;
        }
      `,
    },
  },
});

export default theme;
