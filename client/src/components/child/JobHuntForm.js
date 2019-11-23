import React, { Component } from 'react'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { JobSearchResults, searchMsg } from "../../actions/searchActions";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import { TimelineLite } from "gsap/all";
import "gsap/CSSPlugin";

const styles = theme => ({
    root: {
        "& label.Mui-focused": {
            color: "white"
        },
        "& label": {
            color: "white"
        },
        // "& input:-internal-autofill-selected": {
        //     color: "blue !important",
        //     backgroundColor: "red !important"
        // },

        "& .MuiInput-underline:after": {
            borderBottomColor: "white"
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "white"
        },
        "& .MuiInput-underline:hover": {
            borderBottomColor: "orange"
        },
        "& input.MuiInputBase-input.MuiInput-input": {
            color: "white !important",
            backgroundColor: "transparent !important"
        },
        "& input.MuiInputBase-input.MuiInput-input:-webkitAutofill": {
            color: "white !important",
            backgroundColor: "blue !important"
        },

    },
    divWidth: {
        [theme.breakpoints.down('sm')]: {
            width: "80%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('md')]: {
            width: "60%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('lg')]: {
            width: "50%",
            margin: "0 auto"
        },
    }
})

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
        let isLoading = true;
        this.props.loading(isLoading);
        var tl = new TimelineLite({ paused: true });
        tl.to("#formAnimation", 0.5, { marginTop: 0 }).play()
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
        const { classes } = this.props;
        return (
            <div style={{ marginTop: "10%" }} id="formAnimation">
                <h1 style={{ textAlign: "center", color: "white" }}>Find Jobs!</h1>
                <div className={classes.divWidth} style={{ margin: "0 auto" }}>
                    <form onSubmit={this.submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    name="description"
                                    label="Description"
                                    fullWidth
                                    value={this.state.description}
                                    onChange={this.changeHandler}
                                    classes={this.props.classes}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    color="secondary"
                                    name="location"
                                    label="Location"
                                    id="location"
                                    fullWidth
                                    value={this.state.location}
                                    onChange={this.changeHandler}
                                    classes={this.props.classes}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <IconButton type="submit">
                                                    <SearchIcon style={{ color: "white" }} fontSize="large" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>
                        <Grid container justify="flex-end" />{" "}
                    </form>
                </div>
            </div>
        )
    }
}

JobHuntForm.propTypes = {
    JobSearchResults: PropTypes.func.isRequired,
    searchMsg: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,

};
export default connect(null, { searchMsg, JobSearchResults })(withStyles(styles)(JobHuntForm));
