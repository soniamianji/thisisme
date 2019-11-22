import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import JobHuntForm from '../child/JobHuntForm';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import { clearSearchResult } from "../../actions/searchActions"
import CircularProgress from '@material-ui/core/CircularProgress';
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

class JobHunt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentWillUnmount() {
        this.props.clearSearchResult()
    }

    loading = (bool) => {
        if (bool) {
            this.setState({
                isLoading: true
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.jobs !== prevProps.jobs) {
            this.setState({
                isLoading: false
            })
        }
    }
    goToJob = (url) => {
        console.log(url)
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <JobHuntForm loading={this.loading} />
                {this.state.isLoading ? (<div style={{ textAlign: "center", padding: "10%" }}> <CircularProgress style={{ color: "white" }} size={80} /></div>) : (<Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "75%", flexGrow: "1" }}>
                    {this.props.jobs &&
                        this.props.jobs.map((job, index) => (
                            <Grid item sm={12} key={index} style={{ marginBottom: "9px" }}>
                                <Box className={classes.root} >
                                    <Paper style={{ backgroundColor: "#fafafa", }} >
                                        <Grid container style={{ padding: "22px" }} onClick={this.goToJob(job.company_url)}>
                                            <Grid item md={6}><h4 >{job.title}</h4></Grid>
                                            <Grid item md={6} ><p style={{ textAlign: "right" }}> Date: {job.created_at}</p></Grid>
                                            <Grid item md={6} ><p>{job.company}- {job.type}</p></Grid>
                                            <Grid item md={6} ><p style={{ textAlign: "right" }}>{job.location}</p></Grid>
                                        </Grid>
                                    </Paper></Box>
                            </Grid>
                        ))}
                </Grid>
                )}
            </div>
        )
    }
}

JobHunt.propTypes = {
    jobs: PropTypes.array,
    msg: PropTypes.object,
    classes: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    jobs: state.jobs,
    msg: state.msg
});
export default connect(mapStateToProps, { clearSearchResult })(withStyles(styles)(JobHunt));



