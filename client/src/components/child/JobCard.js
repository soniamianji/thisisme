import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ReactTimeAgo from 'react-time-ago';
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { Link } from "react-router-dom";




const styles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: "80%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('lg')]: {
            width: "80%",
            margin: "0 auto"
        },
    },
    gridStyle: {
        [theme.breakpoints.up('sm')]: {
            textAlign: "right"
        },

    },
    avatar: {
        width: "100px", height: "40px", borderRadius: "0",
        "& img.MuiAvatar-img": {
            objectFit: "contain"
        }
    }

});





class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: "panel1"
        }
    }


    componentWillMount() {
    }
    render() {
        const { classes } = this.props;
        return (
            <Grid item sm={12} style={{ marginBottom: "9px" }}>
                <Box className={classes.root}>
                    <Link style={{ textDecoration: "none" }} to={`/jobs/${this.props.job.id}/${this.props.job.source}`}>
                        <Paper style={{ backgroundColor: "#fafafa", }} >
                            <Grid container style={{ padding: "22px" }} >
                                <Grid item xs={12} sm={6} md={6} >
                                    <h3 style={{ margin: "0 0" }} >{this.props.job.title}</h3>
                                    <p style={{ margin: "0 0", fontSize: "14px" }}>{this.props.job.employer}</p>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
                                    {this.props.job.applicationDeadline ? <p className={classes.gridStyle} style={{ margin: "0 0" }}>Apply latest: <strong>{moment(this.props.job.applicationeDadline).format('LL')}</strong></p> : ""}
                                    <p className={classes.gridStyle} style={{ margin: "0 0", fontSize: "14px" }}>published {moment(this.props.job.publication_date).startOf('day').fromNow()}</p>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} >
                                    <p style={{ color: "grey", marginTop: "15px", marginBottom: "0" }}>{this.props.job.source}</p>
                                    <p style={{ marginTop: "0", fontSize: "14px" }}>{this.props.job.working_hours_type}</p>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6}>
                                    <p className={classes.gridStyle} style={{
                                        color: "grey", marginTop: "15px", marginBottom: "0"
                                    }}>{this.props.job.city}</p>
                                    <p className={classes.gridStyle} style={{ marginTop: "0", fontSize: "14px" }}>{this.props.job.country}</p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Link>
                </Box>
            </Grid>

        )
    }
}
export default (withStyles(styles)(JobCard))


