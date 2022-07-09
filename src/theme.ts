import { createTheme } from "@mui/material/styles";
import { red, purple } from "@mui/material/colors";


// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: purple[300],
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
