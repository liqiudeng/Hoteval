import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeClass: "head"
    };
  }
  logoutHandler = () => {
    this.props.dispatch({
      type: "logout",
      username: undefined
    });
  };
  componentDidMount = () => {
    window.addEventListener("scroll", evt => {
      let activeClass = "head";
      console.log("scroll event", window.pageYOffset);
      if (window.pageYOffset > 200) {
        console.log("scrolled 200");
        activeClass = "head sticky";
      }
      this.setState({ activeClass });
    });
  };
  render = () => {
    console.log(this.props.firstName);
    if (this.props.username === "" || this.props.username === undefined) {
      return (
        <div className="nav-wrapper grey darken-3">
          <div className="flex container">
            <div className="brand-logo">
              <Link to="/">
                <img src="logo.png" height="50px" />{" "}
              </Link>
            </div>
            <div className="flex container">
              <div>
                <Link to="/search">
                  <img
                    src="https://img.icons8.com/ios/50/000000/search--v1.png"
                    width="12px"
                  />
                  {"   "}
                  Search
                </Link>
              </div>
              <div className="right">
                <div>
                  {" "}
                  <Link to="/login">Login</Link>
                </div>
                <div>
                  <Link to="/signup">Signup</Link>
                </div>
              </div>
              <div className="right">
                <NavLink to="/shopping-cart">
                  <img src="cart1.png" width="50px" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="nav-wrapper grey darken-3">
          <div className="flex container">
            <div className="brand-logo">
              <Link to="/">
                <img src="icons8-mobile-home-64.png" height="40px" />{" "}
              </Link>
            </div>
            <div>
              <Link to="/">
                <h3 className="lgo">Welcome to Montreal</h3>
              </Link>
            </div>
            <div className="log-cart-in">
              <div>
                <Link to="/search">
                  <img
                    src="https://img.icons8.com/ios/50/000000/search--v1.png"
                    width="12px"
                  />
                  {"   "}
                  Search
                </Link>
              </div>
              {/* <div>
                <Link to="/new-listing">Create Listing</Link>
              </div> */}
              <div>
                <div>
                  <a>
                    Hi,{" "}
                    {this.props.firstName.charAt(0).toUpperCase() +
                      this.props.firstName.slice(1)}
                  </a>
                </div>
                <div>
                  <a className="log-out-link" onClick={this.logoutHandler}>
                    Logout
                  </a>
                </div>
              </div>
              <div>
                <NavLink to="/shopping-cart">
                  <img src="cart1.png" width="50px" />
                </NavLink>{" "}
                ({this.props.addToCartItems})
              </div>
            </div>
          </div>
        </div>
      );
    }
  };
}

let mapStateToProps = storeState => {
  return {
    username: storeState.username,
    firstName: storeState.firstName,
    addToCartItems: storeState.addToCartItems
  };
};

let connectedHeader = connect(mapStateToProps)(Header);
export default connectedHeader;
