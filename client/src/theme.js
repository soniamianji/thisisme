import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "4rem",
      fontWeight: "bold",
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
  },
  spacing: 8
});

export default theme;
