import { connect } from "react-redux";
import React, { Component } from "react";
import "./main.css";
import { Link } from "react-router-dom";

class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.allItems);
    this.state = {
      category: "Recommanded Hotel",
      count: null,
      showMoreClicks: 1,
      rate: "",
      showType: "expandable"
    };
  }

  handleOneStar = evt => {
    // console.log("rate", rate);
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.rate === "1 star";
    });
    this.setState({
      category: "Recommanded Hotel",
      rate: "1 star",
      showMoreClicks: 1,
      count: newCount.length
    });
  };
  handleTwoStar = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.rate === "2 stars";
    });
    this.setState({
      category: "Recommanded Hotel",
      rate: "2 stars",
      showMoreClicks: 1,
      count: newCount.length
    });
  };
  handleThreeStar = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.rate === "3 stars";
    });
    this.setState({
      category: "Recommanded Hotel",
      rate: "3 stars",
      showMoreClicks: 1,
      count: newCount.length
    });
  };
  handleFourStar = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.rate === "4 star";
    });
    this.setState({
      category: "Recommanded Hotel",
      rate: "4 stars",
      showMoreClicks: 1,
      count: newCount.length
    });
  };
  handleFiveStar = evt => {
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.rate === "5 star";
    });
    this.setState({
      category: "Recommanded Hotel",
      rate: "5 stars",
      showMoreClicks: 1,
      count: newCount.length
    });
  };

  handleHotel = evt => {
    console.log("clicked Hotel");
    evt.preventDefault();
    let newCount = this.props.allItems.filter(each => {
      return each.category === "Hotel";
    });
    this.setState({
      category: "Hotel",
      showMoreClicks: 1,
      count: newCount.length,
      rate: ""
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
      count: newCount,
      rate: ""
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
      count: newCount,
      rate: ""
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
  handleShowType = evt => {
    console.log(this.state.showType);
    evt.preventDefault();
    if (this.state.showType === "expandable") {
      console.log(this.state.showType);
      this.setState.showType === "unexpandable";
    } else {
      this.setState.showType === "expandable";
    }
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
    let starterItems = 9;
    if (this.state.category !== "Recommanded Hotel" && this.state.rate == "")
      toDisplayItems = this.props.allItems.filter(item => {
        return item.category === this.state.category;
      });

    if (this.state.rate === "1 star") {
      toDisplayItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
    }
    if (this.state.rate === "2 stars") {
      toDisplayItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
    }
    if (this.state.rate === "3 stars") {
      toDisplayItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
    }
    if (this.state.rate === "4 stars") {
      toDisplayItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
    }
    if (this.state.rate === "5 stars") {
      toDisplayItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
    }

    if (toDisplayItems.length > 9) {
      toDisplayItems = toDisplayItems.slice(
        0,
        starterItems * this.state.showMoreClicks
      );
    }

    return (
      <div>
        <div className="container center">
          <iframe
            width="600"
            height="350"
            src="https://www.youtube.com/embed/OsgiaQnN82I"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="row">
          <div className="col s12 m2 13">
            <div className="row">
              <div className="col s6">
                <a href="#nav">
                  <span className="waves-effect waves-teal btn-flat">Type</span>
                </a>
                {/* <input
                  type="submit"
                  value="Choose Type"
                  onClick={this.handleShowType}
                /> */}
                <div className="expandable" id="nav">
                  <p
                    className="waves-effect waves-light btn-small"
                    onClick={this.handleHotel}
                  >
                    Hotel{" "}
                  </p>

                  <p
                    className="waves-effect waves-light btn-small"
                    onClick={this.handleBoutiqueHotel}
                  >
                    Boutique Hotel{" "}
                  </p>

                  <p
                    className="waves-effect waves-light btn-small"
                    onClick={this.handleBedBreakfast}
                  >
                    Bed and Breakfast
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col s12 m8 17">
            <div className="container center">
              <h4>Featured Hotels</h4>
              <p onClick={this.handleAll}>
                {" "}
                Recommanded Hotel({amountOfItems})
              </p>{" "}
            </div>
            <div className="flex container center searchBarResault">
              {toDisplayItems.map(item => {
                return (
                  <div>
                    <div className="z-depth-1">
                      <Link to={"/itemDescription/" + item._id}>
                        <img
                          src={item.images[0]}
                          height="150px"
                          width="200px"
                        />
                      </Link>
                    </div>
                    <div>
                      <Link
                        className="black-text text-darken-3"
                        to={"/itemDescription/" + item._id}
                      >
                        {item.title}
                      </Link>
                    </div>
                    <div className="grey-text text-darken-3">${item.price}</div>
                  </div>
                );
              })}
            </div>
            <div>
              <div className="container">
                <div onClick={this.handleShowMore}>Show more</div>
              </div>
            </div>
          </div>
          <div className="col s12 m2 12">
            <a href="#nav1">
              <span className="waves-effect waves-teal btn-flat">Rate</span>
            </a>
            <div className="expandable" id="nav1">
              <p
                className="waves-effect waves-light btn-small"
                onClick={this.handleOneStar}
              >
                1 star
              </p>
              <p
                className="waves-effect waves-light btn-small"
                onClick={this.handleTwoStar}
              >
                2 stars
              </p>
              <p
                className="waves-effect waves-light btn-small"
                onClick={this.handleThreeStar}
              >
                {" "}
                3 stars{" "}
              </p>
              <p
                className="waves-effect waves-light btn-small"
                onClick={this.handleFourStar}
              >
                4 stars
              </p>
              <p
                className="waves-effect waves-light btn-small"
                onClick={this.handleFiveStar}
              >
                5 stars
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

let mapStateToProps = st => {
  return {
    allItems: st.allItems,
    rate: st.rate
  };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
