import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import ReactTimeAgo from 'react-time-ago';
import { withStyles } from "@material-ui/core/styles";


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

    }
});

class CardJobs extends Component {

    componentWillMount() {
    }
    render() {
        const { classes } = this.props;

        return (
            <Grid item sm={12} style={{ marginBottom: "9px" }}>
                <Box className={classes.root}  >
                    <Paper style={{ backgroundColor: "#fafafa", }} >
                        <Grid container style={{ padding: "22px" }} >
                            <Grid item xs={12} sm={6} md={6} ><h4 style={{ margin: "0 0" }} >{this.props.jobs.title}</h4></Grid>
                            <Grid item xs={12} sm={6} md={6} ><p className={classes.gridStyle} style={{ margin: "11px 0" }}><ReactTimeAgo date={this.props.jobs.created_at} /></p></Grid>
                            <Grid item xs={12} sm={6} md={6} ><h5 style={{ color: "grey", margin: "11px 0" }}>{this.props.jobs.company}</h5></Grid>
                            <Grid item xs={12} sm={6} md={6}><h5 className={classes.gridStyle} style={{ color: "grey", margin: "11px 0" }}>{this.props.jobs.location}</h5></Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>

        )
    }
}
export default (withStyles(styles)(CardJobs))


