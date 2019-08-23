import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearchResults extends Component {
  render = () => {};
}
let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
