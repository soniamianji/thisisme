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
      width: 200,
      height: 200
    },
    button: {
      backgroundColor: "darkblue",
      padding: "1rem"
    },
    contactInfo: {
      margin: "2rem 0"
    },
    wrapper: {
      padding: "2rem"
    },
    cardColor: {
      backgroundColor: props.cardColor
    }
  });

  const classes = useStyles();
  const userInfo = props.result;
  TweenLite.set(".cardWrapper", { perspective: 800 });
  TweenLite.set(".card", { transformStyle: "preserve-3d" });
  TweenLite.set(".back", { rotationY: -180 });
  TweenLite.set([".back", ".front"], { backfaceVisibility: "hidden" });

  var tl = new TimelineLite({ paused: true });
  const flip = () => {
    tl.to(".card", 1, { rotationY: -180 });

    tl.play();
  };

  const flipBack = () => {
    tl.reverse();
  };
  return (
    <div className="cardWrapper">
      <div className="card">
        <Paper className="front cardFace">
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid container item xs={3} direction="column">
                <Button onClick={flip}>Move</Button>
                <Grid item>
                  <Avatar className={classes.avatar} src={userInfo.img} />
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
              <Grid container spacing={4} direction="row">
                <Grid item>
                  <img src="https://via.placeholder.com/50" />
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/50" />
                </Grid>
                <Grid item>
                  <img src="https://via.placeholder.com/50" />
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} className={classes.cardColor}>
            <ExpandMoreIcon color="secondary" />
          </Grid>
        </Paper>
        <Paper className="back cardFace">
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid container item xs={3} direction="column">
                <Button onClick={flipBack}>Reverse</Button>
              </Grid>
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
          <Grid item xs={12} className={classes.cardColor}>
            <ExpandMoreIcon color="secondary" />
          </Grid>
        </Paper>
      </div>
      <div id="hotSpot"></div>
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
