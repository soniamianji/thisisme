import React, { useState } from "react";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import SideBar from "../child/SideBar";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ChromePicker } from "react-color";

import {
  Drawer,
  Grid,
  Box,
  Typography,
  FormControlLabel
} from "@material-ui/core";
import FontPicker from "font-picker-react";
import clsx from "clsx";

// styles
const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    padding: "1rem"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Profile = () => {
  // state
  const [state, setState] = useState({
    open: false,
    activeFontFamily: "Open Sans"
  });

  const classes = useStyles();

  // functions
  const drawerHandler = () => {
    setState({ open: !state.open, activeFontFamily: state.activeFontFamily });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        open={state.open}
        variant="persistent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Box textAlign="left">
              <Typography variant="h1">Edit Card</Typography>
              <Typography paragraph>
                Change the typeface, design color, background color and add
                Links in the sidebar. To change the content (e.g. mail address)
                of your card by clicking directly on it and typing in the input
                field.
              </Typography>
            </Box>
          </Grid>
          <Box textAlign="left">
            <FormControlLabel
              label="Font"
              labelPlacement="top"
              control={
                <FontPicker
                  apiKey="AIzaSyDqYbs7r18hvAF5gz1FK_HGoER2BmcHjv4"
                  activeFontFamily={state.activeFontFamily}
                  onChange={nextFont =>
                    setState({
                      activeFontFamily: nextFont.family
                    })
                  }
                />
              }
            />
          </Box>
          <Box textAlign="left">
            <label>Card Color</label>
            <ChromePicker />
          </Box>
        </Grid>
      </Drawer>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: state.open
        })}
      >
        <Container>
          <Button onClick={drawerHandler}>Toggle Drawer</Button>
          <UserCard />
        </Container>
      </div>
    </div>
  );
};

export default Profile;
