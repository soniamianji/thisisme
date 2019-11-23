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
            margin: "0 auto"
        },
        [theme.breakpoints.up('md')]: {
            width: "80%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('lg')]: {
            width: "65%",
            margin: "0 auto"
        },
    },
});

class CardJobs extends Component {
    constructor(props) {
        super(props);
        //onClick={this.goToJob(this.props.company_url)}
    }
    componentWillMount() {
        console.log(this.props.jobs)
    }
    render() {
        const { classes } = this.props;

        return (
            <Grid item sm={12} style={{ marginBottom: "9px" }}>
                <Box className={classes.root}  >
                    <Paper style={{ backgroundColor: "#fafafa", }} >
                        <Grid container style={{ padding: "22px" }} >
                            <Grid item md={6}><h4 >{this.props.jobs.title}</h4></Grid>
                            <Grid item md={6} ><p style={{ textAlign: "right" }}><ReactTimeAgo date={this.props.jobs.created_at} /></p></Grid>
                            <Grid item md={6} ><p style={{ color: "grey", margin: "0 0" }}>{this.props.jobs.company} <span><strong>{this.props.jobs.type}</strong></span> </p></Grid>
                            <Grid item md={6} ><p style={{ textAlign: "right", color: "grey", margin: "0 0" }}>{this.props.jobs.location}</p></Grid>
                        </Grid>
                    </Paper>
                </Box>
            </Grid>

        )
    }
}
export default (withStyles(styles)(CardJobs))


