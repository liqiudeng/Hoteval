import { connect } from "react-redux";
import React, { Component } from "react";
import "./main.css";
import { Link } from "react-router-dom";
import Banner from "./Banner.jsx";
import Footer from "./Footer.jsx";
class UnconnectedItems extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.allItems);
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
      category: this.state.category,
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
      category: this.state.category,
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
      category: this.state.category,
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
      category: this.state.category,
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
      category: this.state.category,
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
      this.setState({ showType: "unexpandable" });
    } else {
      this.setState({ showType: "expandable" });
    }
  };
  handleShowMore = () => {
    if (12 * this.state.showMoreClicks > this.props.allItems) {
      return;
    }
    this.setState({ showMoreClicks: this.state.showMoreClicks + 1 });
  };

  render = () => {
    // console.log(this.props.allItems);
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
    let starterItems = 8;
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

    if (toDisplayItems.length > 8) {
      toDisplayItems = toDisplayItems.slice(
        0,
        starterItems * this.state.showMoreClicks
      );
    }

    return (
      <div>
        <Banner />
        {/* <div className="container">
          
          <iframe
            width="600"
            height="350"
            src="https://www.youtube.com/embed/OsgiaQnN82I"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div> */}
        <div>
          <Link to={"/onlineService"}>
            <img
              className="onlineService"
              src="/icons8-call-male-50.png"
              width="100px"
            ></img>
          </Link>
        </div>
        <div className="row">
          <div className="col s12 m1 14">
            <div className="row">
              <div className="col s12 m6">
                {/* <a href="#nav"> */}
                <div className="type waves-effect waves-light btn-small">
                  Type
                </div>
                {/* </a> */}
                {/* <input
                  type="submit"
                  value="Type"
                  onClick={this.handleShowType}
                /> */}
                {/* <div className="expandable" id="nav"> */}
                <div onClick={this.handleHotel}>
                  <i className="fas fa-hotel fa-3x"></i>{" "}
                </div>
                <div onClick={this.handleBoutiqueHotel}>
                  <i className="fas fa-hotel fa-2x"></i>{" "}
                </div>
                <div onClick={this.handleBedBreakfast}>
                  <i className="fas fa-hotel fa-1x"></i>
                </div>
                {/* </div> */}
              </div>
            </div>
            <div className="row">
              <div className="col s12 m6">
                {/* <a href="#nav1"> */}
                <div className="rate waves-effect waves-light btn-small">
                  Rate
                </div>
                {/* </a> */}
                {/* <div className="expandable" id="nav1"> */}
                <div onClick={this.handleOneStar}>
                  <i className="fas fa-star fa-1x"></i>
                </div>
                <div
                  // className="waves-effect waves-teal btn-flat"
                  onClick={this.handleTwoStar}
                >
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                </div>
                <div
                  // className="waves-effect waves-teal btn-flat"
                  onClick={this.handleThreeStar}
                >
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                </div>
                <div
                  // className="waves-effect waves-teal btn-flat"
                  onClick={this.handleFourStar}
                >
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                </div>
                <div onClick={this.handleFiveStar}>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                  <i className="fas fa-star fa-1x"></i>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="col s12 m11 16">
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
                          height="145px"
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
        </div>
        <Footer />
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
