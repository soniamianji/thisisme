import React, { Component } from "react";
import { Drawer, Grid, Box, Typography, Button, TextField } from "@material-ui/core";
import { fetchUserCard } from "../../actions/authActions";
import { JobSearchResults } from "../../actions/searchActions"
import { TwitterPicker } from "react-color";
import styled from "styled-components";
import { updateCard } from "../../SDK/userCards";
import { connect } from "react-redux";
import MuiPhoneNumber from "material-ui-phone-number";
import LocationForm from "./CountryInput";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const StyledDrawer = styled(Drawer)`
  width: 400,
  flexShrink: 0
`;

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "",
      occupation: "",
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

  changeFieldValue = (e) => {
    const input = e.target;
    const isValid = input.checkValidity()
    this.setState({ [input.name]: input.value });
    if (!isValid) {
      this.setState(prevState => ({
        _errors: {
          ...prevState._errors,
          [input.name]: input.validationMessage
        }
      }))
    } if (isValid) {
      this.setState(prevState => ({
        _errors: {
          ...prevState._errors,
          [input.name]: ""
        }
      }))
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.card !== prevProps.card) {
      if (this.props.links) {
        this.setState({
          twitter: this.props.links.twitter ? this.props.links.twitter : "",
          github: this.props.links.github ? this.props.links.github : "",
          facebook: this.props.links.facebook ? this.props.links.facebook : "",
          linkedin: this.props.links.linkedin ? this.props.links.linkedin : "",
          youtube: this.props.links.youtube ? this.props.links.youtube : "",
          instagram: this.props.links.instagram ? this.props.links.instagram : "",
          behance: this.props.links.behance ? this.props.links.behance : "",
          portfolioSite: this.props.links.portfolioSite ? this.props.links.portfolioSite : ""
        });
      }

      this.setState({
        comment: this.props.card.comment ? this.props.card.comment : "",
        occupation: this.props.card.occupation ? this.props.card.occupation : "",
        country: this.props.card.country ? this.props.card.country : "",
        phoneNumber: this.props.card.phoneNumber ? this.props.card.phoneNumber : "",
        name: this.props.card.name,
        email: this.props.card.email,
        color: this.props.card.color,
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
    if (isValid) {
      const data = {
        name: this.state.name,
        email: this.state.email,
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
      };
      const accountId = this.props.account;
      //call action to update card
      updateCard(accountId, data, err => {
        if (err.length === 0) {
          this.props.drawerHandler();
          this.props.fetchUserCard(accountId);
          // this.props.JobSearchResults(this.state.occupation, this.state.country, () => { })

        } else {
          console.log(err);
        }
      });
    }
  };
  handlePhoneChange = (value) => {
    if (value) {
      this.setState({
        phoneNumber: value
      })
    }
  };
  countryfromChild = (value) => {
    this.setState(prevState => ({
      ...prevState,
      country: value
    }))
  };

  changeCardColor = color => {
    this.setState(prevState => ({
      ...prevState,
      color: color.hex,
    }));
    const accountId = this.props.account;
    const colorData = { color: this.state.color }
    //call action to update card with the color change
    updateCard(accountId, colorData, err => {
      if (err.length === 0) {
        this.props.fetchUserCard(accountId);
      } else {
        console.log(err);
      }
    });
  };

  render() {
    return (
      <StyledDrawer open={this.props.open} variant="persistent" anchor="left" classes={{ paper: "drawerPaper" }}>
        <HighlightOffIcon color="secondary" style={{ position: "fixed", marginLeft: "332px", cursor: "pointer" }} onClick={this.props.drawerHandler}></HighlightOffIcon>
        <Grid container style={{ paddingRight: "25px" }}>
          <Grid item xs={12}>
            <Box textAlign="left">
              <Typography variant="h1">Edit Card</Typography>
              <Typography paragraph>
                Complete your profile for better results.
              </Typography>
            </Box>
          </Grid>

          <form onSubmit={this.saveCardChanges} noValidate>
            <Box m={1} textAlign="left">
              <label>Card Color</label>
              <Box mt={1}>
                <TwitterPicker
                  triangle="hide"
                  width="100%"
                  color={this.state.color}
                  onChangeComplete={color => this.changeCardColor(color)}
                />
              </Box>
            </Box>
            <Box m={1}>
              <TextField
                onChange={this.changeFieldValue}
                name="occupation"
                fullWidth
                label="Job Title"
                margin="normal"
                id="textFieldOccupation"
                required
                value={this.state.occupation}
              />
              <LocationForm value={this.state.country} countryfromChild={this.countryfromChild} />

              <MuiPhoneNumber
                margin="normal"
                fullWidth
                label="Phone Number"
                defaultCountry={"se"}
                value={this.state.phoneNumber}
                onChange={this.handlePhoneChange}
              />

              <TextField
                label="Description"
                InputLabelProps={{ shrink: true }}
                fullWidth
                multiline
                rowsMax="3"
                id="textFieldDesc"
                name="comment"
                value={this.state.comment}
                onChange={this.changeFieldValue}
                margin="normal"
              />
            </Box>
            <Box m={1}>
              <h3>Links</h3>
              <TextField
                onChange={this.changeFieldValue}
                name="github"
                fullWidth
                id="githubLink"
                label="Github"
                margin="normal"
                value={this.state.github}
                placeholder="https://github.com/"
                inputProps={{ pattern: "https://github.com/.*" }}
                error={Boolean(this.state._errors.github && this.state._errors.github !== "")}
                helperText={this.state._errors.github === "" ? "" : this.state._errors.github}

              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                name="linkedin"
                id="linkedinLink"
                label="LinkedIn"
                margin="normal"
                value={this.state.linkedin}
                placeholder="https://linkedin.com/"
                inputProps={{ pattern: "https://linkedin.com/.*", }}
                error={Boolean(this.state._errors.linkedin && this.state._errors.linkedin !== "")}
                helperText={this.state._errors.linkedin === "" ? "" : this.state._errors.linkedin}
              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                name="behance"
                id="behanceLink"
                label="Behance"
                margin="normal"
                value={this.state.behance}
                placeholder="https://behance.com/"
                inputProps={{ pattern: "https://behance.com/.*" }}
                error={Boolean(this.state._errors.behance && this.state._errors.behance !== "")}
                helperText={this.state._errors.behance === "" ? "" : this.state._errors.behance}
                multiline
              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                name="facebook"
                id="facebookLink"
                label="Facebook"
                margin="normal"
                value={this.state.facebook}
                placeholder="https://facebook.com/"
                inputProps={{ pattern: "https://facebook.com.*" }}
                error={Boolean(this.state._errors.facebook && this.state._errors.facebook !== "")}
                helperText={this.state._errors.facebook === "" ? "" : this.state._errors.facebook}
              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                id="youtubeLink"
                label="Youtube"
                margin="normal"
                name="youtube"
                value={this.state.youtube}
                placeholder="https://youtube.com/"
                inputProps={{ pattern: "https://youtube.com.*" }}
                error={Boolean(this.state._errors.youtube && this.state._errors.youtube !== "")}
                helperText={this.state._errors.youtube === "" ? "" : this.state._errors.youtube}
              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                name="twitter"
                id="addLinkTextField"
                label="Twitter"
                margin="normal"
                value={this.state.twitter}
                placeholder="https://twitter.com/"
                inputProps={{ pattern: "https://twitter.com.*" }}
                error={Boolean(this.state._errors.twitter && this.state._errors.twitter !== "")}
                helperText={this.state._errors.twitter === "" ? "" : this.state._errors.twitter}
              />
              <TextField
                fullWidth
                onChange={this.changeFieldValue}
                name="instagram"
                id="instagramLink"
                label="Instagram"
                margin="normal"
                value={this.state.instagram}
                placeholder="https://instagram.com/"
                inputProps={{ pattern: "https://instagram.com.*" }}
                error={Boolean(this.state._errors.instagram && this.state._errors.instagram !== "")}
                helperText={this.state._errors.instagram === "" ? "" : this.state._errors.instagram}
              />
              <TextField
                fullWidth
                name="portfolioSite"
                onChange={this.changeFieldValue}
                id="websiteLink"
                label="Website"
                margin="normal"
                value={this.state.portfolioSite}
                placeholder="https://example.com/"
                inputProps={{ pattern: "https://.*" }}
                error={Boolean(this.state._errors.portfolioSite && this.state._errors.portfolioSite !== "")}
                helperText={this.state._errors.portfolioSite === "" ? "" : this.state._errors.portfolioSite}
              />

            </Box>
            <Grid container>
              <Grid item xs={12}>
                <Button variant="contained" color="#282c34" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white" }} fullWidth type="submit">Save Changes</Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </StyledDrawer>
    );
  }
}

export default connect(null, { fetchUserCard, JobSearchResults })(SideBar);
