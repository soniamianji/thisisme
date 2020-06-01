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
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    // For Underline Hover Color
    overrides: {
        MuiInput: {
            underline: {
                color: "white",
                borderBottom: "white",
                '&:after': {
                    borderBottom: "2px solid white",
                },
                '&:focused::after': {
                    borderBottom: "2px solid white",
                },
                '&:before': {
                    borderBottom: "1px solid white",
                },
                '&:hover:not($disabled):not($error):not($focused):before': {
                    borderBottom: '1px solid white'
                },

            },
        }
    }
});
const styles = theme => ({
    root: {
        "& label.Mui-focused": {
            color: "white"
        },
        "& label": {
            color: "white"
        },
        textAlign: "center",
        [theme.breakpoints.down('sm')]: {
            width: "90%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('md')]: {
            width: "70%",
            margin: "0 auto"
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%",
            margin: "0 auto"
        },

    },


})

class JobHuntForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            location: "",
            error: ""
        }
    }
    submitHandler = (e) => {
        e.preventDefault();
        if (this.state.description.trim() === "" && this.state.location.trim() === "") {
            this.setState({
                error: "Please enter a search term. "
            })
            return;
        }
        let isLoading = true;
        this.props.loading(isLoading);
        var tl = new TimelineLite({ paused: true });
        tl.to("#formAnimation", 0.5, { marginTop: 0 }).play()
        this.props.JobSearchResults(this.state.description, this.state.location, () => { });
        this.setState({
            description: '',
            location: ''
        })
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value, error: "" });
    }
    render() {
        const { classes } = this.props;
        return (
            <div style={{ marginTop: "10%" }} id="formAnimation">
                <h1 style={{ textAlign: "center", color: "white" }}>Find Jobs!</h1>
                <div className={classes.root} style={{ margin: "0 auto" }}>
                    <form onSubmit={this.submitHandler}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name="description"
                                        label="Description"
                                        fullWidth
                                        value={this.state.description}
                                        onChange={this.changeHandler}
                                        classes={this.props.classes}
                                        autoComplete="off"
                                        error={this.state.error !== ""}
                                        helperText={this.state.error === "" ? "" : this.state.error}
                                    />
                                </MuiThemeProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <MuiThemeProvider theme={theme}>
                                    <TextField
                                        name="location"
                                        label="Location"
                                        id="location"
                                        fullWidth
                                        autoComplete="off"
                                        value={this.state.location}
                                        onChange={this.changeHandler}
                                        classes={this.props.classes}
                                        error={this.state.error !== ""}
                                        helperText={this.state.error === "" ? "" : this.state.error}
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
                                </MuiThemeProvider>
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
