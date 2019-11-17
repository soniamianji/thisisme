import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cardSearchResults, searchMsg } from "../../actions/authActions";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      occupation: "",
      _errors: "",
      location: ""
    };
  }
  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = e => {
    e.preventDefault();
    this.props.cardSearchResults(
      this.state.name,
      this.state.occupation,
      this.state.location
    );
    this.setState({
      name: "",
      occupation: "",
      location: ""
    });
  };
  render() {
    return (
      <div>
        <h1>SearchResult</h1>
        <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}>
          <form onSubmit={this.submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  autoFocus
                  name="name"
                  label="Full Name"
                  value={this.state.name}
                  onChange={this.changeHandler}
                  error={this.state._errors !== ""}
                  helperText={
                    this.state._errors === "" ? "" : this.state._errors
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="occupation"
                  label="Occupation"
                  fullWidth
                  value={this.state.occupation}
                  onChange={this.changeHandler}
                  error={this.state._errors !== ""}
                  helperText={
                    this.state._errors === "" ? "" : this.state._errors
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  color="secondary"
                  name="location"
                  label="Country"
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
    );
  }
}

SearchForm.propTypes = {
  cardSearchResults: PropTypes.func.isRequired,
  searchMsg: PropTypes.func.isRequired
};
export default connect(null, { searchMsg, cardSearchResults })(SearchForm);
