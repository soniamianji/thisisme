import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cardSearchResults, searchMsg } from "../../actions/searchActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";


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
    "& .MuiInput-underline:hover": {
      borderBottomColor: "orange"
    },
    "& .MuiInput-input": {
      color: "white",
      backgroundColro: "transparent"
    },
    // "& input:-internal-autofill-selected": {
    //   color: "white !important",
    //   backgroundColro: "black !important"
    // },
  }
})

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWords: "",
      _errors: "",

    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.cardSearchResults(
      this.state.searchWords
    );
    this.setState({
      name: "",

    });
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1 style={{ textAlign: "center", color: "white" }}>SearchResult</h1>
        <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }} >
          <form onSubmit={this.submitHandler} >
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <TextField
                  fullWidth
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
