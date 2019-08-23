import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  render = () => {
    return <div />;
  };
}
let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
