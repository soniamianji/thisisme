import React, { Component } from 'react'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { JobSearchResults, searchMsg } from "../../actions/authActions";


class JobHuntForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            location: ""
        }
    }

    submitHandler = (e) => {
        e.preventDefault();

        this.props.JobSearchResults(this.state.description, this.state.location);
        this.setState({
            description: '',
            location: ''
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });

    }

    render() {
        return (
            <div>
                <h4>On a job hunt? </h4>

                <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}>
                    <form onSubmit={this.submitHandler}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    value={this.state.description}
                                    onChange={this.changeHandler}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    color="secondary"
                                    name="location"
                                    label="location"
                                    id="location"
                                    fullWidth
                                    value={this.state.location}
                                    onChange={this.changeHandler}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            style={{ marginTop: 22 }}
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="secondary"
                        >
                            Search
                    </Button>
                        <Grid container justify="flex-end" />{" "}
                    </form>
                </div>

            </div>
        )
    }
}

JobHuntForm.propTypes = {
    JobSearchResults: PropTypes.func.isRequired,
    searchMsg: PropTypes.func.isRequired
};
export default connect(null, { searchMsg, JobSearchResults })(JobHuntForm);
