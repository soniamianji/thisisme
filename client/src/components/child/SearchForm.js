import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cardSearchResults, searchMsg } from "../../actions/searchActions";
import Grid from "@material-ui/core/Grid";
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
    "& .MuiInput-underline:after": {
      borderBottomColor: "white"
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "white"
    },
    "& .MuiInput-input": {
      color: "white",
      backgroundColro: "transparent"
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

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: "",
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    var tl = new TimelineLite({ paused: true });
    tl.to("#formAnimation", 0.5, { marginTop: 0 }).play();
    this.props.cardSearchResults(
      this.state.searchWords
    );
    this.setState({
      searchWords: ""
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div style={{ marginTop: "10%" }} id="formAnimation">
        <h1 style={{ textAlign: "center", color: "white" }}>Find peeps!</h1>
        <div className={classes.divWidth} style={{ marginRight: "auto", marginLeft: "auto" }} >
          <form onSubmit={this.submitHandler} >
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  autoFocus
                  name="searchWords"
                  label="Seacrh by Name Title or Location"
                  value={this.state.searchWords}
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
                >
                </TextField>
              </Grid>
            </Grid>
            <Grid container justify="flex-end" />{" "}
          </form>
        </div>
      </div>
    );
  }
}

SearchForm.propTypes = {
  cardSearchResults: PropTypes.func.isRequired,
  searchMsg: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,

};
export default connect(null, { searchMsg, cardSearchResults })(withStyles(styles)(SearchForm));
