import React, { Component } from "react";
import { Drawer, Grid, Box, Typography } from "@material-ui/core";
import { fetchUserCard } from "../../actions/authActions";
import { profileJobSearch } from "../../actions/searchActions"
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
      occupation: '',
      country: "",
      phoneNumber: "",
      comment: '',
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
    if (this.props.usercard !== prevProps.usercard) {
      this.setState(this.props.usercard)
    }
    if (this.props.links !== prevProps.links) {
      this.setState(this.props.links)
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
          this.props.profileJobSearch(this.state.occupation, this.state.country, () => {

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
      <StyledDrawer open={this.props.open} variant="temporary" anchor="left" docked={false} classes={{ paper: "drawerPaper" }}>
        <HighlightOffIcon style={{ position: "fixed", marginLeft: "332px", cursor: "pointer", color: "black" }} onClick={this.props.drawerHandler}></HighlightOffIcon>
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
            occupation={this.state.occupation}
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

const mapStateToProps = state => ({
  usercard: state.usercard,
  links: state.usercard.links,

});
export default connect(mapStateToProps, { fetchUserCard, profileJobSearch })(SideBar);
