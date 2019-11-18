import React, { Component } from "react";
import {
  Drawer,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Button,
  TextField
} from "@material-ui/core";

import FontPicker from "font-picker-react";
import { TwitterPicker } from "react-color";
import styled from "styled-components";

import { updateCard } from "../../SDK/userCards";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const StyledDrawer = styled(Drawer)`
  width: 400,
  flexShrink: 0
`;

class SideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      occupation: "",
      city: "",
      country: "",
      phoneNumber: "",
      github: "",
      facebook: "",
      linkedIn: "",
      youtube: "",
      instagram: "",
      behance: "",
      twitter: "",
      portfolioSite: ""
    };
  }

  changeFieldValue = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidUpdate(prevProps) {
    if (this.props.card != prevProps.card) {
      //set your state now!
      this.setState({
        comment: this.props.card.comment ? this.props.card.comment : "",
        occupation: this.props.card.occupation
          ? this.props.card.occupation
          : "",
        city: this.props.card.city ? this.props.card.city : "",
        country: this.props.card.country ? this.props.card.country : "",
        phoneNumber: this.props.card.phoneNumber
          ? this.props.card.phoneNumber
          : "",
        twitter: this.props.card.twitter ? this.props.card.twitter : "",
        github: this.props.card.github ? this.props.card.github : "",
        facebook: this.props.card.facebook ? this.props.card.facebook : "",
        linkedIn: this.props.card.linkedIn ? this.props.card.linkedIn : "",
        youtube: this.props.card.youtube ? this.props.card.youtube : "",
        instagram: this.props.card.instagram ? this.props.card.instagram : "",
        behance: this.props.card.behance ? this.props.card.behance : "",
        portfolioSite: this.props.card.portfolioSite
          ? this.props.card.portfolioSite
          : "",
        name: this.props.card.name,
        email: this.props.card.email
      });
    }
  }
  saveCardChanges = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      city: this.state.city,
      country: this.state.country,
      phoneNumber: this.state.phoneNumber,
      comment: this.state.comment,
      occupation: this.state.occupation,
      github: this.state.github,
      facebook: this.state.facebook,
      linkedIn: this.state.linkedIn,
      youtube: this.state.youtube,
      twitter: this.state.twitter,
      instagram: this.state.instagram,
      behance: this.state.behance,
      portfolioSite: this.state.portfolioSite
    };
    console.log(data);
    updateCard(this.props.id, data, error => {
      console.log(error);
    });
  };

  render() {
    return (
      <StyledDrawer
        open={this.props.open}
        variant="persistent"
        anchor="left"
        classes={{
          paper: "drawerPaper"
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

          <Box m={1} textAlign="left">
            <label>Font</label>
            <FontPicker
              apiKey="AIzaSyD4-cMeFhw8_m93qT0Bd1xIY128Mj8P_Zc"
              activeFontFamily={this.props.activeFontFamily}
              onChange={nextFont => this.props.changeActiveFont(nextFont)}
            />
          </Box>

          <Box m={1} textAlign="left">
            <label>Card Color</label>
            <Box mt={1}>
              <TwitterPicker
                triangle="hide"
                width="100%"
                onChangeComplete={color => this.props.changeCardColor(color)}
              />
            </Box>
          </Box>
          <Box m={1}>
            <TextField
              onChange={this.changeFieldValue}
              name="occupation"
              fullWidth="true"
              label="Job Title"
              margin="normal"
              value={this.state.occupation}
            />
            <TextField
              onChange={this.changeFieldValue}
              name="city"
              fullWidth="true"
              label="City"
              margin="normal"
              value={this.state.city}
            />
            <TextField
              onChange={this.changeFieldValue}
              value={this.state.country}
              name="country"
              fullWidth="true"
              label="Country"
              margin="normal"
            />
            <TextField
              onChange={this.changeFieldValue}
              value={this.state.phoneNumber}
              name="phoneNumber"
              fullWidth="true"
              label="Phone Number"
              margin="normal"
            />

            <TextField
              fullWidth="true"
              multiline={true}
              rows={3}
              name="comment"
              value={this.state.comment}
              onChange={this.changeFieldValue}
              label="Description"
            />
          </Box>
          <Box m={1}>
            <form>
              <h3>Links</h3>
              <TextField
                onChange={this.changeFieldValue}
                name="github"
                fullWidth="true"
                id="githubLink"
                label="Github"
                margin="normal"
                value={this.state.github}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="linkedin"
                id="linkedinLink"
                label="LinkedIn"
                margin="normal"
                value={this.state.linkedIn}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="behance"
                id="behanceLink"
                label="Behance"
                margin="normal"
                value={this.state.behance}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="facebook"
                id="facebookLink"
                label="Facebook"
                margin="normal"
                value={this.state.facebook}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                id="youtubeLink"
                label="Youtube"
                margin="normal"
                name="youtube"
                value={this.state.youtube}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="twitter"
                id="addLinkTextField"
                label="Twitter"
                margin="normal"
                value={this.state.twitter}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="instagram"
                id="instagramLink"
                label="Instagram"
                margin="normal"
                value={this.state.instagram}
              />
              <TextField
                fullWidth="true"
                name="portfolioSite"
                onChange={this.changeFieldValue}
                id="websiteLink"
                label="Website"
                margin="normal"
                value={this.state.portfolioSite}
              />
            </form>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveCardChanges}
            >
              Save Changes
            </Button>
            <Button
              onClick={this.props.drawerHandler}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          </Box>
        </Grid>
      </StyledDrawer>
    );
  }
}

export default SideBar;
