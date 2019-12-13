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
import { Button, Box, Paper, Grid, Typography } from "@material-ui/core";
import clsx from "clsx";
import { searchMsg, clearSearchResult, JobSearchResults } from "../../actions/searchActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Media from "react-media";
import JobCard from "../child/JobCard";
import EditIcon from '@material-ui/icons/Edit';


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
    isLoading: true,
  });

  //lifecycle hook
  useEffect(() => {
    const userId = props.account.id;
    props.fetchUserCard(userId);
    props.JobSearchResults(props.usercard.occupation, props.usercard.city, () => {
      setState({ isLoading: false, open: false })
    });
    return () => {
      props.clearSearchResult();
    };
  }, [props.account.id, props.usercard.occupation, props.usercard.city]);

  const classes = useStyles();

  // functions
  const drawerHandler = () => {
    console.log("called")
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

          <Paper style={{ marginTop: "44px", backgroundColor: "#424242", padding: "44px" }}>
            {state.isLoading ? <div style={{ textAlign: "center", padding: "10%" }}> <CircularProgress style={{ color: "white" }} size={80} /></div> :
              <Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "75%", flexGrow: "1", justifyContent: "center" }}>
                <Typography style={{ color: "white", marginBottom: 44, }} component="h2" variant="h2" gutterBottom>
                  Don't miss any opportunities  {props.account.name}! Apply Now!
                 </Typography>
                {props.jobs && props.jobs.map((job, index) => (
                  <JobCard job={job} key={index} />
                ))}
              </Grid>
            }

          </Paper>
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
  jobs: state.jobs.data,
  msg: state.msg
});

export default connect(mapStateToProps, {
  fetchUserCard,
  searchMsg,
  clearSearchResult,
  JobSearchResults
})(Profile);
