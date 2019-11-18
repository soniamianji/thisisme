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

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/dist/style.css";
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
      contact: {
        city: "",
        country: "",
        phoneNumber: ""
      },
      links: {
        github: "",
        facebook: "",
        linkedIn: "",
        youtube: "",
        instagram: "",
        behance: "",
        portfolioSite: ""
      }
    };
  }

  componentDidMount() {
    if (this.props.usercard != {}) {
      this.setState({
        links: this.props.usercard.links
      });
    }
  }

  saveCardChanges = () => {
    const data = {
      name: this.props.name,
      email: this.props.email,
      contact: this.state.contact,
      occupation: this.state.occupation,
      links: this.state.links
    };
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
              onChange={e => this.setState({ occupation: e.target.value })}
              fullWidth="true"
              label="Job Title"
              margin="normal"
              value={this.props.occupation}
            />
            <TextField
              onChange={e =>
                this.setState({ contact: { city: e.target.value } })
              }
              fullWidth="true"
              label="City"
              margin="normal"
              value={this.props.city}
            />
            <TextField
              onChange={e =>
                this.setState({ contact: { country: e.target.value } })
              }
              fullWidth="true"
              label="Country"
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
          <Box m={1}>
            <form>
              <h3>Links</h3>
              <TextField
                onChange={e =>
                  this.setState({ links: { github: e.target.value } })
                }
                fullWidth="true"
                id="githubLink"
                label="Github"
                margin="normal"
                value={this.state.githubLink}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { linkedIn: e.target.value } })
                }
                id="linkedinLink"
                label="LinkedIn"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { behance: e.target.value } })
                }
                id="behanceLink"
                label="Behance"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { facebook: e.target.value } })
                }
                id="facebookLink"
                label="Facebook"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { youtube: e.target.value } })
                }
                id="youtubeLink"
                label="Youtube"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { twitter: e.target.value } })
                }
                id="addLinkTextField"
                label="Twitter"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { instagram: e.target.value } })
                }
                id="instagramLink"
                label="Instagram"
                margin="normal"
                value={this.state.LinkToAdd}
              />
              <TextField
                fullWidth="true"
                onChange={e =>
                  this.setState({ links: { portfolioSite: e.target.value } })
                }
                id="websiteLink"
                label="Website"
                margin="normal"
                value={this.state.LinkToAdd}
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

SideBar.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  email: PropTypes.string,
  occupation: PropTypes.string,
  contact: PropTypes.object,
  links: PropTypes.object
};

const mapStateToProps = state => ({
  id: state.account.id,
  name: state.account.name,
  email: state.account.email,

  occupation: state.usercard.occupation,
  contact: state.usercard.contact,
  links: state.usercard.links
});

export default connect(mapStateToProps, null)(SideBar);
