import React, { Component } from "react";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import SideBar from "../child/SideBar";
import { Drawer, Button, Grid, Typography, Box } from "@material-ui/core";
import FontPicker from "font-picker-react";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      activeFontFamily: "Open Sans"
    };

    this.sideBarHandler = this.sideBarHandler.bind(this);
  }

  sideBarHandler() {
    this.setState({ open: !this.state.open });
  }

  render() {
    return (
      <Container>
        <Button onClick={this.sideBarHandler}>Edit</Button>
        <Drawer open={this.state.open} variant="persistent" anchor="left">
          <Grid container xs={4}>
            <Grid item>
              <Box textAlign="left">
                <Typography variant="h1">Edit Card</Typography>
                <Typography variant="p">
                  Change the typeface, design color, background color and add
                  Links in the sidebar. To change the content (e.g. mail
                  address) of your card by clicking directly on it and typing in
                  the input field.
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <FontPicker
                apiKey="AIzaSyC3p-QXrMiMZ-8hBAdSZRiiQUmMmrPaOBI"
                activeFontFamily={this.state.activeFontFamily}
                onChange={nextFont =>
                  this.setState({
                    activeFontFamily: nextFont.family
                  })
                }
              />
            </Grid>
          </Grid>
        </Drawer>
        <UserCard></UserCard>
      </Container>
    );
  }
}
