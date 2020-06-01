import React, { Component } from "react";
import { Drawer, Grid, Box, Typography } from "@material-ui/core";
import { fetchUserCard } from "../../actions/authActions";
import { JobSearchResults } from "../../actions/searchActions"
import styled from "styled-components";
import { updateCard } from "../../SDK/userCards";
import { connect } from "react-redux";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SideBarForm from "../child/SideBarForm";

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
          this.props.JobSearchResults(this.state.occupation, this.state.country, () => {

          });
        } else {
          console.log(err);
        }
      });
    } else if (this.state.country !== "") {
      const accountId = this.props.account;
      //call action to update card
      updateCard(accountId, { country: this.state.country }, err => {
        if (err.length === 0) {
          this.props.drawerHandler();
          this.props.fetchUserCard(accountId);
          this.props.JobSearchResults(this.state.occupation, this.state.country, () => {

          });
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

          <SideBarForm saveCardChanges={this.saveCardChanges}
            color={this.state.color}
            changeCardColor={this.changeCardColor}
            changeFieldValue={this.changeFieldValue}
            occupation={this.props.occupation}
            country={this.state.country}
            countryfromChild={this.countryfromChild}
            phoneNumber={this.state.phoneNumber}
            handlePhoneChange={this.handlePhoneChange}
            comment={this.state.comment}
            github={this.state.github}
            _errors={this.state._errors}
            linkedin={this.state.linkedin}
            behance={this.state.behance}
            facebook={this.state.facebook}
            youtube={this.state.youtube}
            twitter={this.state.twitter}
            instagram={this.state.instagram}
          />

        </Grid>
      </StyledDrawer>
    );
  }
}

export default connect(null, { fetchUserCard, JobSearchResults })(SideBar);
