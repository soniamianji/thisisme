import React, { useState } from "react";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
// import SideBar from "../child/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import { TwitterPicker } from "react-color";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

import {
  Button,
  Drawer,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  TextField,
  Divider
} from "@material-ui/core";
import FontPicker from "font-picker-react";
import clsx from "clsx";

// styles
const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  drawerBox: {
    margin: "1rem 0"
  },
  root: {
    display: "flex",
    backgroundColor: "#272727"
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
    activeFontFamily: "Open Sans",
    cardColor: "#ff336f"
  });

  const classes = useStyles();

  // functions
  const drawerHandler = () => {
    setState({
      open: !state.open,
      activeFontFamily: state.activeFontFamily,
      cardColor: state.cardColor
    });
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

          <Box className={classes.drawerBox} textAlign="left">
            <FormControlLabel
              label="Font"
              labelPlacement="top"
              control={
                <FontPicker
                  apiKey="AIzaSyDqYbs7r18hvAF5gz1FK_HGoER2BmcHjv4"
                  activeFontFamily={state.activeFontFamily}
                  onChange={nextFont =>
                    setState({
                      activeFontFamily: nextFont.family,
                      open: state.open,
                      cardColor: state.cardColor
                    })
                  }
                />
              }
            />
          </Box>

          <Box className={classes.drawerBox} textAlign="left">
            <label>Card Color</label>
            <TwitterPicker
              onChangeComplete={color => {
                setState({
                  cardColor: color.hex,
                  open: state.open,
                  activeFontFamily: state.activeFontFamily
                });
              }}
            />
          </Box>

          <Box className={classes.drawerBox}>
            <List
              aria-labelledby="linkedPlatformsTitle"
              subheader={
                <ListSubheader component="div" id="linkedPlatformsTitle">
                  Linked Platforms
                </ListSubheader>
              }
            >
              <ListItem>
                <ListItemText primary="Github" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Github" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Github" />
              </ListItem>
              <Divider />
            </List>
            <TextField
              id="addLinkTextField"
              className={classes.textField}
              label="Add Link"
              margin="normal"
            />
            <Button>Add</Button>
          </Box>
          <Box className={classes.drawerBox}>
            <TextField
              id="addLinkTextField"
              className={classes.textField}
              label="Job Title"
              margin="normal"
            />
            <FormControlLabel
              control={
                <PhoneInput
                  defaultCountry={"us"}
                  // value={this.state.phone}
                  // onChange={handleOnChange}
                />
              }
              label="Phone Number"
              labelPlacement="Top"
            />
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
          <UserCard cardColor={state.cardColor} />
        </Container>
      </div>
    </div>
  );
};

export default Profile;
