import { createMuiTheme } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  // palette: {
  //   primary: {
  //     main: red[500]
  //   }
  // },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
      lineHeight: 1.4
    },
    h2: {
      fontSize: "1rem",
      color: grey[500],
      lineHeight: 1.2
    },
    h3: {
      fontSize: "1rem",
      fontWeight: "200",
      lineHeight: 1.2
    },
    h4: {
      fontSize: "0.75rem",
      fontWeight: "200",
      color: grey[500]
    }
  },
  spacing: 8
});

export default theme;
