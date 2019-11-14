import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import "../../style/userCard.css";
import TweenLite from "gsap/TweenLite";
import { TimelineLite, CSSPlugin } from "gsap/all";
import "gsap/CSSPlugin";

const UserCard = props => {
  const useStyles = makeStyles({
    avatar: {
      width: 100,
      height: 100
    },
    button: {
      backgroundColor: "darkblue",
      padding: "0.25rem",
      position: "absolute",
      width: "100%",
      bottom: 0
    },
    contactInfo: {
      margin: "1rem 0"
    },

    card: {
      width: 525,
      height: 300,
      position: "relative",
      marginLeft: "auto",
      marginRight: "auto"
    },

    wrapper: {
      padding: "2rem"
    },
    cardColor: {
      backgroundColor: props.cardColor,
      padding: "1rem",
      display: "flex",
      flexGrow: 1
    },
    paper: {
      width: 525,
      height: 300,
      marginBottom: 22,
      position: "relative",
      position: "absolute"
    }
  });

  const classes = useStyles();
  const userInfo = props.result;
  var tl = new TimelineLite({ paused: true });

  const flip = () => {
    TweenLite.set(".cardWrapper", { perspective: 800 });
    TweenLite.set("#card", { transformStyle: "preserve-3d" });
    TweenLite.set("#back", { rotationX: -180 });
    TweenLite.set(["#front", "#back"], { backfaceVisibility: "hidden" });

    tl.to("#front", 0.5, { rotationX: 180 }).to(
      "#back",
      0.5,
      { rotationX: 0 },
      0
    );

    tl.play();
  };
  const flipBack = () => {
    tl.reverse();
  };
  return (
    <div className={classes.cardWrapper}>
      <div id="card" className={classes.card}>
        <Paper id="back" className={classes.paper}>
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid item xs={9}>
                <Grid item direction="column">
                  <Box textAlign="left">
                    <Typography variant="h2">
                      "Blub blub I am awesome Hire me now Bitch!"
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} className={classes.button} onClick={flipBack}>
            <ExpandMoreIcon color="secondary" />
          </Grid>
        </Paper>
        <Paper className={classes.paper} id="front">
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid container item xs={3} direction="column">
                <Grid item>
                  <Avatar
                    id="img"
                    className={classes.avatar}
                    src={userInfo.img}
                  />
                </Grid>
              </Grid>
              <Grid item xs={9}>
                <Grid item direction="column">
                  <Box textAlign="left">
                    <Typography variant="h1">{userInfo.name}</Typography>
                    <Typography variant="h2">
                      UX Designer & Front End Developer
                    </Typography>
                    <Box className={classes.contactInfo} textAlign="left">
                      <Typography variant="h3">{userInfo.email}</Typography>
                      <Typography variant="h3">+49 151 107 68 106</Typography>
                    </Box>
                    <Box className={classes.contactInfo} textAlign="left">
                      <Typography variant="h4">
                        <RoomIcon color="primary" />
                        Jönköping, Sweden
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={2} direction="row">
                <Grid item>
                  <img src="https://via.placeholder.com/25" />
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/25" />
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/25" />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} className={classes.button} onClick={flip}>
            <ExpandMoreIcon color="secondary" />
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  result: PropTypes.array
};

const mapStateToProps = state => ({
  result: state.result
});

export default connect(mapStateToProps, null)(UserCard);
