import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import SearchForm from "../child/SearchForm";
import UserCard from "../child/UserCard";
import Box from "@material-ui/core/Box";
import { clearSearchResult } from "../../actions/searchActions";
import Media from "react-media";
import UserCardMobile from "../child/UserCardMobile";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: "center",
      margin: "22px auto",

    },
    [theme.breakpoints.up('md')]: {
      textAlign: "left",
      margin: "0 auto",
      width: "82%"
    },
  }
})

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: ""
    };
  }

  componentWillUnmount() {
    this.props.clearSearchResult();
  }
  getSearchWord = (value) => {
    this.setState({ searchWord: value })
  }

  render() {
    const { classes } = this.props;
    return (
      <Box>
        <Box width="100" style={{ marginRight: "auto", marginLeft: "auto" }}>
          <SearchForm searchWord={this.getSearchWord} />
        </Box>
        <p style={{ color: "white", textAlign: "center" }}>{this.state.searchWord !== "" ? (<p>Search Results for "{this.state.searchWord}"</p>) : ("")}</p>
        <Grid container className={classes.root}>

          {this.props.cards &&
            this.props.cards.map((card, index) => (
              <Grid item sm={12} lg={6} key={index} style={{ margin: "22px 0" }}>
                <Media
                  queries={{
                    small: "(max-width: 600px)",
                    medium: "(min-width: 600px)"
                  }}
                >
                  {matches => (
                    <div>
                      {matches.small && (
                        <UserCardMobile
                          card={card} links={card.links} i={index}
                        />
                      )}
                      {matches.medium && (
                        <UserCard card={card} links={card.links} i={index}
                        />
                      )}
                    </div>
                  )}
                </Media>
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
  msg: PropTypes.object,
  classes: PropTypes.object.isRequired,

};

const mapStateToProps = state => ({
  cards: state.cards,
  msg: state.msg
});

export default connect(mapStateToProps, { clearSearchResult })(withStyles(styles)(SearchResult));
