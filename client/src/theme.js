import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: red[500]
    }
  },
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: "200",
      lineHeight: 1.4
    },
    h2: {
      fontSize: "2rem",
      color: grey[500],
      lineHeight: 1.2
    },
    h3: {
      fontSize: "2rem",
      fontWeight: "200",
      lineHeight: 1.2
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "200",
      color: grey[500]
    }
  }
});

export default theme;
