import React, { useState, useEffect } from "react";
import UserCardMobile from "../child/UserCardMobile";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideBar from "../child/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import { fetchUserCard } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Box } from "@material-ui/core";
import clsx from "clsx";
import CardJobs from "../child/CardJobs";
import {
  JobSearchResults,
  searchMsg,
  clearSearchResult
} from "../../actions/searchActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Media from "react-media";


const useStyles = makeStyles(theme => ({
  root: {
    // backgroundColor: "#272727",
    // height: "100vh",
    // display: "flex",
    // alignItems: "center"
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
    activeFontFamily: props.usercard.fontFamily,
    cardColor: props.usercard.color
  });

  //lifecycle hook
  useEffect(() => {
    const userId = props.account.id;
    props.fetchUserCard(userId);
    if (props.usercard.occupation != undefined) {
      props.JobSearchResults(props.usercard.occupation, props.usercard.country);
    }
    return () => {
      props.clearSearchResult();
    };
  }, [props.account.id, props.usercard.occupation, props.usercard.country]);

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
          <Media
            queries={{
              small: "(max-width: 600px)",
              medium: "(min-width: 600px)"
            }}
          >
            {matches => (
              <div>
                {matches.small && (
                  <UserCardMobile
                    cardColor={state.cardColor}
                    links={props.links}
                    card={props.usercard}
                  />
                )}
                {matches.medium && (
                  <UserCard
                    cardColor={state.cardColor}
                    links={props.links}
                    card={props.usercard}
                  />
                )}
              </div>
            )}
          </Media>

          <Box style={{ marginTop: "44px" }}>
            {props.jobs != "" ? (
              props.jobs.map((job, index) => (
                <div key={index}>
                  <CardJobs jobs={job} />
                </div>
              ))
            ) : (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress style={{ color: "white" }} size={40} />
                </div>
              )}
          </Box>
        </Container>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  usercard: PropTypes.object,
  account: PropTypes.object,
};

const mapStateToProps = state => ({
  usercard: state.usercard,
  links: state.usercard.links,
  account: state.account,
  jobs: state.jobs,
  msg: state.msg
});

export default connect(mapStateToProps, {
  fetchUserCard,
  JobSearchResults,
  searchMsg,
  clearSearchResult
})(Profile);
