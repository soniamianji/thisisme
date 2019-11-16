import React, { useState } from "react";
import {
  Drawer,
  Grid,
  Box,
  Typography,
  Divider,
  FormControlLabel,
  Button,
  TextField
} from "@material-ui/core";
import FontPicker from "font-picker-react";
import { makeStyles } from "@material-ui/core/styles";
import { TwitterPicker } from "react-color";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";

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
  }
}));

export const SideBar = props => {
  const classes = useStyles();
  const [state, setState] = useState({ LinkToAdd: "" });

  const linkPlatform = event => {
    event.preventDefault();
    fetch(
      "http://besticon-demo.herokuapp.com//allicons.json?url=" +
        state.LinkToAdd +
        "&formats=png"
    ).then(response => {
      if (response.status !== 200) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
    // validate url
    // get favicon
    // safe link url and image url to local state
  };

  const setLink = e => {
    setState({ LinkToAdd: e.target.value });
  };

  return (
    <Drawer
      open={props.open}
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
              Change the typeface, design color, background color and add Links
              in the sidebar. To change the content (e.g. mail address) of your
              card by clicking directly on it and typing in the input field.
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
                activeFontFamily={props.activeFontFamily}
                onChange={nextFont => props.changeActiveFont(nextFont)}
              />
            }
          />
        </Box>

        <Box className={classes.drawerBox} textAlign="left">
          <label>Card Color</label>
          <TwitterPicker
            onChangeComplete={color => props.changeCardColor(color)}
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
          <form onSubmit={linkPlatform}>
            <TextField
              onChange={setLink}
              id="addLinkTextField"
              className={classes.textField}
              label="Add Link"
              margin="normal"
              value={state.LinkToAdd}
            />
            <Button type="submit">Add</Button>
          </form>
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
  );
};
