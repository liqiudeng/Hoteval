import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import store from "./store.jsx";
class UnconnectedSearchResults extends Component {
  render = () => {
    // if (this.props.query === "" || undefined) {
    //   return <div />;
    // }
    let itemsInStock = this.props.allItems.filter(each => {
      return each.inStock === store.getState().inStock;
    });
    console.log(this.props.inStock);
    let searchResults = itemsInStock.filter(each => {
      let title = each.title.toLowerCase();
      let desc = each.description.toLowerCase();

      return (
        title.includes(this.props.query.toLowerCase()) ||
        desc.includes(this.props.query.toLowerCase())
        // (each.price >= this.props.min && each.price <= this.props.max)
      );
    });

    return (
      <div id="SearchResault">
        {searchResults.map(each => {
          return (
            <div className="container">
              <Link to={"/itemDescription/" + each._id}>
                <div className="Resault-item bg-dark">
                  <img src={each.images[0]} height="80px" width="100px" />
                  {/* <p className="center">{each.description}</p> */}
                  <p>{each.title} </p>
                  <p className="text-primary">${each.price}</p>{" "}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    query: st.searchQuery,
    allItems: st.allItems,
    min: st.min,
    max: st.max,
    inStock: st.inStock
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
