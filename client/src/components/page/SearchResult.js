import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { cardSearchResults, searchMsg } from "../../actions/authActions";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../child/SearchForm";
import UserCard from "../child/UserCard";

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.cards[0]);
    return (
      <div>
        <SearchForm />

        <Grid
          container
          width={"80%"}
          style={{ marginTop: 22, justifyContent: "center" }}
        >
          {this.props.cards &&
            this.props.cards.map((card, index) => (
              <Grid item xs={12} sm={5} key={index}>
                <UserCard card={card} />
              </Grid>
            ))}
        </Grid>

        <h6>{this.props.msg && this.props.msg.msg}</h6>
      </div>
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
