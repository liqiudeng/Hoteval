import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class UnconnectedSearchResults extends Component {
  render = () => {
    if (this.props.query === "" || undefined) {
      return <div />;
    }
    let searchResults = this.props.allItems.filter(each => {
      let title = each.title.toLowerCase();
      let desc = each.description.toLowerCase();
      if (this.props.inStock && !each.inStock) return false;
      else
        return (
          title.includes(this.props.query.toLowerCase()) ||
          desc.includes(this.props.query.toLowerCase())
          // (each.price >= this.props.min && each.price <= this.props.max)
        );
    });

    return (
      <div className="flex container searchBarResault">
        {searchResults.map(each => {
          return (
            <div className="container">
              <div className="form-wrap">
                <div>
                  <Link to={"/itemDescription/" + each._id}>
                    {/* <img
                      className="fit-images"
                      src={each.images[0]}
                      height="80px"
                      width="100px"
                    /> */}
                  </Link>{" "}
                </div>
                <div>
                  <Link
                    to={"/itemDescription/" + each._id}
                    style={{ color: "#595858" }}
                  >
                    {each.title}{" "}
                  </Link>
                </div>
                <Link to={"/itemDescription/" + each._id}>
                  <div>${each.price}</div>{" "}
                </Link>
              </div>
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
