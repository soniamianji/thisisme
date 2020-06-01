import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import RoomIcon from "@material-ui/icons/Room";
import TweenLite from "gsap/TweenLite";
import { TimelineLite } from "gsap/all";
import "gsap/CSSPlugin";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

const UserCardMobile = props => {
  const useStyles = makeStyles({
    avatar: {
      width: 150,
      height: 150,
      postition: "absolut",
      left: "22%"
    },
    button: {
      textAlign: "center",
      backgroundColor: props.card.color,
      padding: "0.25rem",
      position: "absolute",
      width: "100%",
      bottom: 0
    },
    contactInfo: {
      margin: "1rem 0"
    },
    card: {
      height: 525,
      width: 300,
      position: "relative",
      marginLeft: "auto",
      marginRight: "auto"
    },
    name: {
      textTransform: "capitalize"
    },
    location: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    locationIcon: {
      marginRight: "2px"
    },
    icons: {
      color: props.card.color
    },
    wrapper: {
      padding: "0.5rem"
    },
    cardColor: {
      backgroundColor: props.card.color,
      padding: "1rem",
      display: "flex",
      flexGrow: 1
    },
    paper: {
      height: 525,
      width: 300,
      marginBottom: 22,
      position: "absolute"
    }
  });

  const classes = useStyles();
  var tl = new TimelineLite({ paused: true });
  const flip = () => {
    TweenLite.set(".cardWrapper", { perspective: 800 });
    TweenLite.set(`.card${props.i}`, { transformStyle: "preserve-3d" });
    TweenLite.set(`.back${props.i}`, { rotationX: -180 });
    TweenLite.set([`.front${props.i}`, `.back${props.i}`], { backfaceVisibility: "hidden" });

    tl.to(`.front${props.i}`, 0.5, { rotationX: 180 }).to(
      `.back${props.i}`,
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
      <div className={`card${props.i} ` + classes.card} >
        <Paper className={`back${props.i} ` + classes.paper} >
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid item xs={9}>
                <Grid item>
                  <Box textAlign="left">
                    <Typography className="apply-font" variant="h2">
                      {props.card.comment}
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
        <Paper className={`front${props.i} ` + classes.paper}>
          <Box m={2}>
            <Avatar id="img" className={classes.avatar} src={props.card.img} />
          </Box>
          <Box className={classes.wrapper}>
            <Grid container direction="row">
              <Grid item xs={12}>
                <Grid item>
                  <Box textAlign="center">
                    <Typography className="apply-font" variant="h1">
                      <span className={classes.name}>{props.card.name}</span>
                    </Typography>
                    <Typography className="apply-font" variant="h2">
                      {props.card.occupation}
                    </Typography>
                    <Box className={classes.contactInfo} textAlign="center">
                      <Typography className="apply-font" variant="h3">
                        {props.card.email}
                      </Typography>

                      <Typography className="apply-font" variant="h3">
                        {props.card.phoneNumber}
                      </Typography>
                    </Box>
                    <Box className={classes.contactInfo} textAlign="center">
                      <Typography className="apply-font" variant="h4">
                        <span className={classes.location}>
                          <RoomIcon
                            className={classes.locationIcon}
                            color="primary"
                          />
                          {props.card.city},{props.card.country}
                        </span>
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ paddingLeft: "12px" }} direction="row">
                {props.links &&
                  Object.keys(props.links).map((key, index) =>
                    props.links[key] !== "" ? (
                      <Grid item key={index}>
                        {key === "portfolioSite" ? (
                          <a className={classes.icons} href={props.links[key]}>
                            <i className={"far fa-3x fa-user-circle"} />
                          </a>
                        ) : (
                            <a className={classes.icons} href={props.links[key]}>
                              <i className={"fab fa-3x fa-" + key} />
                            </a>
                          )}
                      </Grid>
                    ) : null
                  )}
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={12} className={classes.button} onClick={flip}>
            <ExpandMoreIcon style={{ color: "white" }} />
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default UserCardMobile;
