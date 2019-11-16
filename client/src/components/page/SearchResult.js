import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cardSearchResults, searchMsg } from "../../actions/authActions";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../child/SearchForm";
import UserCard from "../child/UserCard";
import Box from "@material-ui/core/Box";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.cards[0]);
    return (
      <Box>
        <Box width="100" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <SearchForm />
        </Box>
        <Grid container style={{ marginTop: 22, marginLeft: "auto", marginRight: "auto", width: "75%" }}>
          {this.props.cards &&
            this.props.cards.map((card, index) => (
              <Grid item sm={12} lg={6} key={index} style={{ marginBottom: "9px" }}>
                <UserCard card={card} />
              </Grid>
            ))}
        </Grid>

        <h6>{this.props.msg && this.props.msg.msg}</h6>
      </Box>
    );
  }
}

SearchResult.propTypes = {
  cards: PropTypes.array,
  msg: PropTypes.object
};

const mapStateToProps = state => ({
  cards: state.cards,
  msg: state.msg
});

export default connect(mapStateToProps, null)(SearchResult);
