import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import JobHuntForm from '../child/JobHuntForm';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { clearSearchResult } from "../../actions/searchActions"
import CircularProgress from '@material-ui/core/CircularProgress';
import CardJobs from '../child/CardJobs';

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
        return (
            <div >
                <JobHuntForm loading={this.loading} />
                {this.state.isLoading ? (<div style={{ textAlign: "center", padding: "10%" }}> <CircularProgress style={{ color: "white" }} size={80} /></div>) :
                    (<Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "75%", flexGrow: "1" }}>
                        {this.props.jobs &&
                            this.props.jobs.map((job, index) => (
                                <CardJobs jobs={job} />
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
export default connect(mapStateToProps, { clearSearchResult })(JobHunt);



