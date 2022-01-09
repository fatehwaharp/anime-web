import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          // padding: "100px",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#6640b3",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
