import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  handleQuery = evt => {
    console.log("Typed search:", evt.target.value);
    this.props.dispatch({
      type: "search",
      typedSearch: evt.target.value
    });
  };
  handleCloseSearch = () => {
    this.props.dispatch({
      type: "search",
      typedSearch: ""
    });
    window.history.back();
  };
  render = () => {
    return (
      <div className="container transparent">
        <input
          type="text"
          onChange={this.handleQuery}
          value={this.props.query}
          placeholder="Type your key word here...."
        />
        <a onClick={this.handleCloseSearch}>
          <img
            src="https://img.icons8.com/windows/96/000000/multiply.png"
            width="25px"
          />
        </a>
      </div>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
