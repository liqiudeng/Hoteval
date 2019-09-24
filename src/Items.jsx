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
      rate: ""
    };
  }
  // handleMinimumPrice = evt => {
  //   let price = parseInt(evt.target.value);
  //   this.props.dispatch({ type: "minimum-price", price: price });
  // };
  // handleMaximumPrice = evt => {
  //   let price = parseInt(evt.target.value);
  //   this.props.dispatch({ type: "maximum-price", price: price });
  // };

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

    if (this.state.rate !== "" && this.state.category !== "Recommanded Hotel") {
      let tofilterItems = this.props.allItems.filter(item => {
        return item.rate === this.state.rate;
      });
      toDisplayItems = tofilterItems.filter(item => {
        return item.category === this.state.category;
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

        <div className="container">
          <nav className="nav">
            {/* <a href="#nav"> */}
            <ul className="nav__menu">
              <li className="nav__menu-item" onClick={this.handleAll}>
                Recommanded Hotels
              </li>
              {/* <li className="nav__menu-item">
                Price
                <ul className="nav__submenu">
                  <li className="nav__submenu-item">
                    <span>
                      Min$
                      <input
                        type="number"
                        onChange={this.handleMinimumPrice}
                        value={this.props.minPrice}
                        placeholder="0.."
                      />
                    </span>
                  </li>

                  <li
                    className="nav__submenu-item"
                    onClick={this.handleBoutiqueHotel}
                  >
                    <span>
                      Max${" "}
                      <input
                        type="number"
                        onChange={this.handleMaximumPrice}
                        value={this.props.maxPrice}
                        placeholder="100000..."
                      />
                    </span>
                  </li>
                </ul>
              </li> */}
              <li className="nav__menu-item">
                Type
                <ul className="nav__submenu">
                  <li className="nav__submenu-item" onClick={this.handleHotel}>
                    <span>Hotel</span>
                    {/* <i className="fas fa-hotel fa-3x"></i>{" "} */}
                  </li>
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleBoutiqueHotel}
                  >
                    <span>Boutique Hotel</span>
                    {/* <i className="fas fa-hotel fa-2x"></i>{" "} */}
                  </li>
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleBedBreakfast}
                  >
                    <span>Bed&Breakfast</span>
                    {/* <i className="fas fa-hotel fa-1x"></i> */}
                  </li>
                </ul>
              </li>

              <li className="nav__menu-item">
                Rate
                <ul className="nav__submenu">
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleOneStar}
                  >
                    <span className="fas fa-star fa-1x"></span>
                  </li>
                  <li
                    className="nav__submenu-item"
                    // className="waves-effect waves-teal btn-flat"
                    onClick={this.handleTwoStar}
                  >
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                  </li>
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleThreeStar}
                  >
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                  </li>
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleFourStar}
                  >
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                  </li>
                  <li
                    className="nav__submenu-item"
                    onClick={this.handleFiveStar}
                  >
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                    <span className="fas fa-star fa-1x"></span>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>

          <div className="container">
            <div id="eachItem">
              <h1 className="py-3">Featured Hotels</h1>
              {toDisplayItems.map(item => {
                return (
                  <div className="card py-3">
                    <Link to={"/itemDescription/" + item._id}>
                      <img src={item.images[0]} height="145px" width="200px" />
                    </Link>

                    <Link to={"/itemDescription/" + item._id}>
                      {item.title}
                    </Link>

                    <div className="text-third">${item.price}</div>
                  </div>
                );
              })}
            </div>

            <div className="container">
              <div onClick={this.handleShowMore}>Show more</div>
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
    // minPrice: st.min,
    // maxPrice: st.max,
    allItems: st.allItems,
    rate: st.rate
  };
};

let Items = connect(mapStateToProps)(UnconnectedItems);
export default Items;
