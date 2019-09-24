import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearch extends Component {
  handleClick = evt => {
    this.props.dispatch({ type: "display" });
  };
  handleStock = evt => {
    let inStock = evt.target.checked;
    console.log(inStock); // true | false
    this.props.dispatch({ type: "inStock", stock: inStock });
  };
 

  handleQuery = evt => {
    console.log("Typed search:", evt.target.value);
    this.props.dispatch({
      type: "search",
      typedSearch: evt.target.value
    });
  };
  // handleCloseSearch = () => {
  //   this.props.dispatch({
  //     type: "search",
  //     typedSearch: ""
  //   });
  //   window.history.back();
  // };
  render = () => {
    return (
      <div>
        <div className="searchPage">
          <form className="container form-warp py-3">
            <div className="form-group">
              <div className={this.props.display}>
                <input
                  type="checkbox"
                  onChange={this.handleStock}
                  checked={this.props.inStock}
                />
                <span className="text-primary">inStock</span>
              </div>
            </div>

            
            <div className="form-group py-2">
              <input
                className="form-search"
                type="text"
                onChange={this.handleQuery}
                value={this.props.query}
                placeholder="Type your key word here...."
              />
              <Link to="/">
                <i className="far fa-arrow-alt-circle-left fa-3x"></i>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    
    inStock: st.inStock,
    query: st.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
