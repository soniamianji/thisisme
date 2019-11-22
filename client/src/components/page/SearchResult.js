import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../child/SearchForm";
import UserCard from "../child/UserCard";
import Box from "@material-ui/core/Box";
import { clearSearchResult } from "../../actions/searchActions"

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    this.props.clearSearchResult();
  }


  render() {
    return (
      <Box>
        <Box width="100" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <SearchForm />
        </Box>
        <Grid container style={{ margin: "22px auto", width: "75%" }}>
          {this.props.cards &&
            this.props.cards.map((card, index) => (
              <Grid item sm={12} lg={6} key={index} style={{ margin: "22px auto" }}>
                <UserCard card={card} links={card.links}
                />
              </Grid>
            ))}
        </Grid>

        <h3 style={{ textAlign: "center", color: "white" }}>{this.props.msg && this.props.msg.msg}</h3>
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

export default connect(mapStateToProps, { clearSearchResult })(SearchResult);
