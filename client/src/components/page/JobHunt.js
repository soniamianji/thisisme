import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import JobHuntForm from '../child/JobHuntForm';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";


class JobHunt extends Component {
    constructor(props) {
        super(props);

    }

    goToJob = (url) => {
        console.log(url)
    }

    render() {
        return (
            <div>
                <JobHuntForm />
                <Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "75%", flexGrow: "1" }}>
                    {this.props.jobs &&
                        this.props.jobs.map((job, index) => (
                            <Grid item sm={12} key={index} style={{ marginBottom: "9px" }}>
                                <Grid onClick={this.goToJob(job.company_url)}>
                                    <Grid item xs><h4>{job.title}</h4></Grid>
                                    <Grid item xs><h6>{job.company}</h6></Grid>
                                    <Grid item xs><p>{job.created_at}</p></Grid>
                                    <Grid item xs> <p>{job.location}</p></Grid>
                                </Grid>

                            </Grid>
                        ))}
                </Grid>

            </div>
        )
    }
}

JobHunt.propTypes = {
    jobs: PropTypes.array,
    msg: PropTypes.object
};
const mapStateToProps = state => ({
    jobs: state.jobs,
    msg: state.msg
});
export default connect(mapStateToProps, null)(JobHunt);



