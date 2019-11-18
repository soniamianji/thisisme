import React, { useState, useEffect } from "react";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideBar from "../child/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import { fetchUserCard } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Grid, Box } from "@material-ui/core";
import clsx from "clsx";

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#272727",
    height: "100vh",
    display: "flex",
    alignItems: "center"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const Profile = props => {
  // state
  const [state, setState] = useState({
    open: false,
    activeFontFamily: "Open Sans",
    cardColor: "#ff336f"
  });

  //lifecycle hook
  useEffect(() => {
    const userId = props.account.id;
    console.log(userId);
    props.fetchUserCard(userId);
  }, [props.account.id]);

  const classes = useStyles();

  // functions
  const drawerHandler = () => {
    setState({
      open: !state.open,
      activeFontFamily: state.activeFontFamily,
      cardColor: state.cardColor,
      body: state.body
    });
  };

  const changeCardColor = color => {
    setState({
      cardColor: color.hex,
      open: state.open,
      activeFontFamily: state.activeFontFamily
    });
  };

  const changeActiveFont = font => {
    setState({
      activeFontFamily: font.family,
      open: state.open,
      cardColor: state.cardColor
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <SideBar
        links={props.links}
        card={props.usercard}
        account={props.account.id}
        drawerHandler={drawerHandler}
        open={state.open}
        activeFontFamily={state.activeFontFamily}
        cardColor={state.cardColor}
        changeCardColor={changeCardColor}
        changeActiveFont={changeActiveFont}
      />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: state.open
        })}
      >
        <Container>
          <Box display="flex" flexDirection="row-reverse">
            <Button onClick={drawerHandler}>Edit Card</Button>
          </Box>
          <UserCard
            cardColor={state.cardColor}
            links={props.links}
            card={props.usercard}
          />
        </Container>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  usercard: PropTypes.object,
  account: PropTypes.object,
  fetchUserCard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  usercard: state.usercard,
  links: state.usercard.links,
  account: state.account
});

export default connect(mapStateToProps, { fetchUserCard })(Profile);
