import React, { useState, useEffect, Fragment } from "react";
import UserCardMobile from "../child/UserCardMobile";
import UserCard from "../child/UserCard";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import SideBar from "../child/SideBar";
import { makeStyles } from "@material-ui/core/styles";
import { fetchUserCard } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Box, Paper, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import { searchMsg, clearSearchResult, profileJobSearch } from "../../actions/searchActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Media from "react-media";
import JobCard from "../child/JobCard";
import EditIcon from '@material-ui/icons/Edit';
import { withRouter } from "react-router";


const useStyles = makeStyles(theme => ({
  root: {
    paddingRight: "0",
    paddingLeft: "0"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingRight: "0",
    paddingLeft: "0",
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
    isLoading: true,
  });

  const { fetchUserCard, profileJobSearch } = props
  //lifecycle hook
  useEffect(() => {
    const userId = props.account.id;
    fetchUserCard(userId);
    profileJobSearch(props.usercard.occupation, props.usercard.country, () => {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    })
    if (props.jobs !== "") {
      setState((prevState) => ({
        ...prevState,
        isLoading: false,
      }));
    }
  }, [fetchUserCard, profileJobSearch, props.account.id, props.usercard.occupation, props.usercard.country]);

  const classes = useStyles();

  // functions
  const drawerHandler = () => {
    setState({
      open: !state.open
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
      />
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: state.open
        })}
      >
        <Container>
          <Box display="flex" flexDirection="row-reverse" style={{ width: "50%", margin: "0 auto" }}>
            <Button onClick={drawerHandler} style={{ color: "gray", marginRight: "41px" }}><EditIcon></EditIcon>Edit Card</Button>
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
                    links={props.links}
                    card={props.usercard}
                  />
                )}
                {matches.medium && (
                  <UserCard
                    links={props.links}
                    card={props.usercard}
                  />
                )}
              </div>
            )}
          </Media>
        </Container>
        <Paper style={{ marginTop: "44px", backgroundColor: `${props.usercard.color}`, padding: "44px 0", width: "100%", height: "auto" }}>
          {state.isLoading ? <div style={{ textAlign: "center", padding: "10%" }}> <CircularProgress style={{ color: "white" }} size={80} /></div> :
            <Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "90%", flexGrow: "1", justifyContent: "center" }}>
              {props.jobs && props.jobs.length !== 0 ? <Fragment><Typography style={{ color: "white", marginBottom: 44, }} component="h3" gutterBottom>
                Don't miss any opportunities  {props.account.name}! Apply Now!
              </Typography>
                {props.jobs && props.jobs.map((job, index) => (
                  <JobCard job={job} key={index} />
                ))}
              </Fragment> : <Typography style={{ color: "white", marginBottom: 44, maxWidth: "400px", textAlign: "center" }} component="h2" gutterBottom>
                  Sorry no jobs were found based on your location. Currently we mostly support jobs based in Sweden. But stay tuned! we are actively working on improving our services!
            </Typography>}
            </Grid>
          }
        </Paper>
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
  jobs: state.profileJobs.data,
  msg: state.msg
});

export default connect(mapStateToProps, {
  fetchUserCard,
  searchMsg,
  clearSearchResult,
  profileJobSearch
})(withRouter(Profile));
