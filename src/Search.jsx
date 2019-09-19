import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearch extends Component {
  handleStock = evt => {
    let inStock = evt.target.checked;
    console.log(inStock); // true | false
    this.props.dispatch({ type: "inStock", stock: inStock });
  };
  // handleMinimumPrice = evt => {
  //   let price = parseInt(evt.target.value);
  //   this.props.dispatch({ type: "minimum-price", price: price });
  // };
  // handleMaximumPrice = evt => {
  //   let price = parseInt(evt.target.value);
  //   this.props.dispatch({ type: "maximum-price", price: price });
  // };

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
          <form className="container form-warp">
            <div className="form-group">
              <input
                type="checkbox"
                onChange={this.handleStock}
                checked={this.props.inStock}
              />
              <span className="text-primary">inStock</span>
            </div>

            {/* <div className="form-group">
              <span className="text-primary">Minimum price</span>
              <input
                type="number"
                onChange={this.handleMinimumPrice}
                value={this.props.minPrice}
                placeholder="0.."
              />
            </div>

            <div className="form-group">
              <span className="text-primary">Maximum price</span>
              <input
                type="number"
                onChange={this.handleMaximumPrice}
                value={this.props.maxPrice}
                placeholder="100000..."
              />
            </div> */}
            <div className="form-group py-3">
              <input
                type="text"
                onChange={this.handleQuery}
                value={this.props.query}
                placeholder="Type your key word here...."
              />
              <Link to="/">
                <i className="fas fa-times-circle fa-1x"></i>
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
    minPrice: st.min,
    maxPrice: st.max,
    inStock: st.inStock,
    query: st.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
