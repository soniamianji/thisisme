import React, { Component } from "react";
import {
  Drawer,
  Grid,
  Box,
  Typography,
  FormControlLabel,
  Input,
  Button,
  TextField
} from "@material-ui/core";
import { fetchUserCard } from "../../actions/authActions";
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
      linkedin: "",
      youtube: "",
      instagram: "",
      behance: "",
      twitter: "",
      portfolioSite: "",
      _errors: {}
    };
  }

  changeFieldValue = e => {

    const input = e.target
    const isValid = input.checkValidity()
    console.log(isValid);
    this.setState({ [input.name]: input.value })
    if (!isValid) {
      this.setState(prevState => ({
        _errors: {                   // object that we want to update
          ...prevState._errors,    // keep all other key-value pairs
          [input.name]: input.validationMessage       // update the value of specific key
        }
      }))
    } if (isValid) {
      this.setState(prevState => ({
        _errors: {                   // object that we want to update
          ...prevState._errors,    // keep all other key-value pairs
          [input.name]: ""       // update the value of specific key
        }
      }))
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.card != prevProps.card) {
      //set your state now!
      if (this.props.links) {
        this.setState({
          twitter: this.props.links.twitter ? this.props.links.twitter : "",
          github: this.props.links.github ? this.props.links.github : "",
          facebook: this.props.links.facebook ? this.props.links.facebook : "",
          linkedin: this.props.links.linkedin ? this.props.links.linkedin : "",
          youtube: this.props.links.youtube ? this.props.links.youtube : "",
          instagram: this.props.links.instagram
            ? this.props.links.instagram
            : "",
          behance: this.props.links.behance ? this.props.links.behance : "",
          portfolioSite: this.props.links.portfolioSite
            ? this.props.links.portfolioSite
            : ""
        });
      }
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
        name: this.props.card.name,
        email: this.props.card.email
      });
    }
  }

  saveCardChanges = (e) => {
    e.preventDefault();
    const form = e.target
    const isValid = form.checkValidity();
    const formData = new FormData(form)
    const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
      acc[key] = form.elements[key].validationMessage
      return acc
    }, {})
    this.setState({
      _errors: validationMessages
    })


    // if (isValid) {
    //   // here you do what you need to do if is valid
    //   const data = Array.from(formData.keys()).reduce((acc, key) => {
    //     acc[key] = formData.get(key)
    //     return acc
    //   }, {})
    //   console.log(data)
    // }
    if (isValid) {

      const data = {
        name: this.state.name,
        email: this.state.email,
        city: this.state.city,
        country: this.state.country,
        phoneNumber: this.state.phoneNumber,
        comment: this.state.comment,
        occupation: this.state.occupation,
        links: {
          github: this.state.github,
          facebook: this.state.facebook,
          linkedin: this.state.linkedin,
          youtube: this.state.youtube,
          twitter: this.state.twitter,
          instagram: this.state.instagram,
          behance: this.state.behance,
          portfolioSite: this.state.portfolioSite
        },
        fontFamily: this.props.activeFontFamily,
        color: this.props.cardColor
      };
      const accountId = this.props.account;

      //call action to update card
      console.log(accountId);
      updateCard(accountId, data, err => {
        if (err.length === 0) {
          console.log("done");
          this.props.drawerHandler();
          this.props.fetchUserCard(accountId);
        } else {
          console.log(err);
        }
      });

    }


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
          <form onSubmit={this.saveCardChanges} noValidate >
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
                required
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

              <h3>Links</h3>
              <TextField
                onChange={this.changeFieldValue}
                name="github"
                fullWidth="true"
                id="githubLink"
                label="Github"
                margin="normal"
                value={this.state.github}
                placeholder="https://github.com/"
                inputProps={{
                  pattern: "https://github.com/.*"
                }}
                error={this.state._errors.github && this.state._errors.github !== ""}

                helperText={this.state._errors.github === "" ? "" : this.state._errors.github}
              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="linkedin"
                id="linkedinLink"
                label="LinkedIn"
                margin="normal"
                value={this.state.linkedin}
                placeholder="https://linkedin.com/"
                inputProps={{
                  pattern: "https://linkedin.com/.*"
                }}
                error={this.state._errors.linkedin && this.state._errors.linkedin !== ""}
                helperText={this.state._errors.linkedin === "" ? "" : this.state._errors.linkedin}

              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="behance"
                id="behanceLink"
                label="Behance"
                margin="normal"
                value={this.state.behance}
                placeholder="https://behance.com/"
                inputProps={{
                  pattern: "https://behance.com.*"
                }}
                error={this.state._errors.behance && this.state._errors.behance !== ""}
                helperText={this.state._errors.behance === "" ? "" : this.state._errors.behance}

              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="facebook"
                id="facebookLink"
                label="Facebook"
                margin="normal"
                value={this.state.facebook}
                placeholder="https://facebook.com/"
                inputProps={{
                  pattern: "https://facebook.com.*"
                }}
                error={this.state._errors.facebook && this.state._errors.facebook !== ""}
                helperText={this.state._errors.facebook === "" ? "" : this.state._errors.facebook}

              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                id="youtubeLink"
                label="Youtube"
                margin="normal"
                name="youtube"
                value={this.state.youtube}
                placeholder="https://youtube.com/"
                inputProps={{
                  pattern: "https://youtube.com.*"
                }}
                error={this.state._errors.youtube && this.state._errors.youtube !== ""}
                helperText={this.state._errors.youtube === "" ? "" : this.state._errors.youtube}

              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="twitter"
                id="addLinkTextField"
                label="Twitter"
                margin="normal"
                value={this.state.twitter}
                placeholder="https://twitter.com/"
                inputProps={{
                  pattern: "https://twitter.com.*"
                }}
                error={this.state._errors.twitter && this.state._errors.twitter !== ""}
                helperText={this.state._errors.twitter === "" ? "" : this.state._errors.twitter}

              />
              <TextField
                fullWidth="true"
                onChange={this.changeFieldValue}
                name="instagram"
                id="instagramLink"
                label="Instagram"
                margin="normal"
                value={this.state.instagram}
                placeholder="https://instagram.com/"
                inputProps={{
                  pattern: "https://instagram.com.*"
                }}
                error={this.state._errors.instagram && this.state._errors.instagram !== ""}
                helperText={this.state._errors.instagram === "" ? "" : this.state._errors.instagram}

              />
              <TextField
                fullWidth="true"
                name="portfolioSite"
                onChange={this.changeFieldValue}
                id="websiteLink"
                label="Website"
                margin="normal"
                value={this.state.portfolioSite}
                placeholder="https://example.com/"
                inputProps={{
                  pattern: "https://.*"
                }}
                error={this.state._errors.portfolioSite && this.state._errors.portfolioSite !== ""}
                helperText={this.state._errors.portfolioSite === "" ? "" : this.state._errors.portfolioSite}

              />

            </Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
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
          </form>
        </Grid>
      </StyledDrawer>
    );
  }
}

export default connect(null, { fetchUserCard })(SideBar);
