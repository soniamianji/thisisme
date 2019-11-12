import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";

const UserCard = () => {
  const useStyles = makeStyles({
    avatar: {
      width: 200,
      height: 200
    },
    button: {
      backgroundColor: "darkblue",
      padding: "1rem"
    },
    contactInfo: {
      margin: "2rem 0"
    },
    wrapper: {
      padding: "2rem"
    }
  });

  const classes = useStyles();

  return (
    <Paper>
      <Box className={classes.wrapper}>
        <Grid container direction="row">
          <Grid container item xs={3} direction="column">
            <Grid item>
              <Avatar
                className={classes.avatar}
                src="https://via.placeholder.com/100"
              />
            </Grid>
          </Grid>
          <Grid item xs={9}>
            <Grid item direction="column">
              <Box textAlign="left">
                <Typography variant="h1">Felix Rossel</Typography>
                <Typography variant="h2">
                  UX Designer & Front End Developer
                </Typography>
                <Box className={classes.contactInfo} textAlign="left">
                  <Typography variant="h3">hello@felixrossel.com</Typography>
                  <Typography variant="h3">+49 151 107 68 106</Typography>
                </Box>
                <Box className={classes.contactInfo} textAlign="left">
                  <Typography variant="h4">
                    <RoomIcon color="primary" />
                    Jönköping, Sweden
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={4} direction="row">
            <Grid item>
              <img src="https://via.placeholder.com/50" />
            </Grid>
            <Grid item>
              <img src="https://via.placeholder.com/50" />
            </Grid>
            <Grid item>
              <img src="https://via.placeholder.com/50" />
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Grid item xs={12} className={classes.button}>
        <ExpandMoreIcon color="secondary" />
      </Grid>
    </Paper>
  );
};

export default UserCard;