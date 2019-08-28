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

      return (
        title.includes(this.props.query.toLowerCase()) ||
        desc.includes(this.props.query.toLowerCase())
      );
    });
    return (
      <div className="flex container">
        {searchResults.map(each => {
          return (
            <div>
              <div className="lex container white">
                <div>
                  <Link
                    to={"/itemDescription/" + each._id}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <img src={each.images[0]} width="50px" />
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
        {/* <div>
          <Link to={"/"}>Return to marketplace</Link>
        </div> */}
      </div>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery,
    allItems: storeState.allItems
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
