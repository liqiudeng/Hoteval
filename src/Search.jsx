import { connect } from "react-redux";
import React, { Component } from "react";

class UnconnectedSearch extends Component {
  handleStock = evt => {
    let inStock = evt.target.checked;
    console.log(inStock); // true | false
    this.props.dispatch({ type: "inStock", stock: inStock });
  };
  handleMinimumPrice = evt => {
    let price = parseInt(evt.target.value);
    this.props.dispatch({ type: "minimum-price", price: price });
  };
  handleMaximumPrice = evt => {
    let price = parseInt(evt.target.value);
    this.props.dispatch({ type: "maximum-price", price: price });
  };

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
      <div>
        <div className="container white">
          <div className="container">
            <div>
              <form>
                {/* <label>
                  <input
                    type="checkbox"
                    onChange={this.handleStock}
                    checked={this.props.inStock}
                  />
                  <span>inStock</span>
                </label> */}
                <div className="input-field">
                  <span>Minimum price</span>
                  <input
                    type="number"
                    onChange={this.handleMinimumPrice}
                    value={this.props.minPrice}
                    placeholder="0.."
                  />
                </div>

                <div className="input-field">
                  <span>Maximum price</span>
                  <input
                    type="number"
                    onChange={this.handleMaximumPrice}
                    value={this.props.maxPrice}
                    placeholder="100000..."
                  />
                </div>
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
              </form>
            </div>
          </div>
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
