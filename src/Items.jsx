import { connect } from "react-redux";
import React, { Component } from "react";

import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      category: "Recommanded Hotel",
      count: null,
      showMoreClicks: 1
    };
  }

  handleHotel = evt => {
    console.log("clicked Hotel");
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Hotel";
    });
    this.setState({
      category: "Hotel",
      showMoreClicks: 1,
      count: newCount.length
    });
  };

  handleBoutiqueHotel = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Boutique Hotel";
    });
    this.setState({
      category: "Boutique Hotel",
      showMoreClicks: 1,
      count: newCount
    });
  };
  handleBedBreakfast = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Bed and Breakfast";
    });
    newCount = newCount.length;
    this.setState({
      category: "Bed and Breakfast",
      showMoreClicks: 1,
      count: newCount
    });
  };

  handleAll = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.length;
    this.setState({
      category: "Recommanded Hotel",
      showMoreClicks: 1,
      count: newCount
    });
  };

  handleShowMore = () => {
    if (12 * this.state.showMoreClicks > this.props.allItems) {
      return;
    }
    this.setState({ showMoreClicks: this.state.showMoreClicks + 1 });
  };

  render = () => {
    console.log(this.props.allItems);
    let toDisplayItems = this.props.allItems;
    let amountOfItems = 0;
    if (this.state.category === "Recommanded Hotel") {
      amountOfItems = this.props.allItems.length;
    } else {
      let cat = this.props.allItems.filter(cat => {
        return cat.category === this.state.category;
      });
      amountOfItems = cat.length;
    }
    let starterItems = 12;
    if (this.state.category !== "Recommanded Hotel")
      toDisplayItems = this.props.allItems.filter(item => {
        return item.category === this.state.category;
      });
    if (toDisplayItems.length > 12) {
      toDisplayItems = toDisplayItems.slice(
        0,
        starterItems * this.state.showMoreClicks
      );
    }
    return (
      <div>
        <div className="hero container">
          <div className="hero-text">
            <h5 className="">
              {" "}
              {/* <div>
                <Link to="/search">
                  _____
                  <img
                    src="https://img.icons8.com/ios/50/000000/search--v1.png"
                    width="20px"
                  />
                  {"   "}
                </Link>
              </div> */}
            </h5>
            <h2 className="margin-bottom-20">
              <img src="mountroyal.png" height="200px" />
            </h2>
          </div>
        </div>
        <div className="flex container cat-btns">
          <div>
            <a className="category-btn" onClick={this.handleAll}>
              Recommanded Hotel
            </a>
          </div>
          <div>
            <div>
              <a onClick={this.handleHotel}>Hotel </a>
            </div>
          </div>
          <div>
            <div>
              <a onClick={this.handleBoutiqueHotel}>Boutique Hotel </a>
            </div>
          </div>
          <div>
            <div>
              <a className="category-btn" onClick={this.handleBedBreakfast}>
                Bed and Breakfast
              </a>
            </div>
          </div>
        </div>
        {/* <div className="container cat-text">
          {this.state.category} ({amountOfItems})
        </div> */}
        <div className="container item-cont">
          {toDisplayItems.map(item => {
            return (
              <div>
                <div>
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} width="200px" />
                  </Link>
                </div>
                <div>
                  <Link to={"/itemDescription/" + item._id}>{item.title}</Link>
                </div>
                <div>${item.price}</div>
              </div>
            );
          })}
        </div>
        <div>
          <div>
            <a onClick={this.handleShowMore}>Show more</a>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return { allItems: st.allItems };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
