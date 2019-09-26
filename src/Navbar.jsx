import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class NavBAr extends Component {
  constructor(props) {
    super(props);
  }
  logoutHandler = () => {
    this.props.dispatch({
      type: "logout",
      username: undefined
    });
  };

  render = () => {
    console.log(this.props.firstName);
    if (this.props.username === "" || this.props.username === undefined) {
      return (
        <div className="navbar">
          <div className="container">
            <h1 className="logo">
              <a href="/">Hoteval</a>
            </h1>
            {/* <div>
                <img src="/icons8-mobile-home-64.png" height="100px" />
              </div>        */}
            <ul>
              <li>
                <Link className="current" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search">
                  {"   "}

                  <div>
                    Search<span className="fas fa-search fa-1x"></span>
                  </div>
                </Link>
              </li>
              <li>
                {" "}
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
              {/* <li>
              <NavLink to="/shopping-cart">
                <img src="/cart1.png" width="50px" />
              </NavLink>
            </li> */}
              <li>
                <Link to="/aboutUs">Help</Link>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar">
          <div className="container">
            <h1>
              <Link to="/">
                {/* <img src="/icons8-mobile-home-64.png" height="40px" />{" "} */}
                <div className="logo">Hoteval</div>
              </Link>
            </h1>
            {/* <div>
              <Link to="/">
                <h3 className="lgo">Welcome to Montreal</h3>
              </Link>
            </div> */}
            <ul>
              <li>
                <Link className="current" to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search">
                  {"   "}

                  <div>
                    Search<span className="fas fa-search fa-1x"></span>
                  </div>
                </Link>
              </li>

              <li>
                <a onClick={this.logoutHandler}>Logout</a>
              </li>

              <li>
                <Link to="/aboutUs">Help</Link>
              </li>
              <li>
                <a>
                  Hi,{" "}
                  {this.props.firstName.charAt(0).toUpperCase() +
                    this.props.firstName.slice(1)}
                </a>
              </li>
              <li>
                <NavLink to="/shopping-cart">
                  Cart ({this.props.addToCartItems})
                  {/* <img src="/cart1.png" width="50px" /> */}
                </NavLink>{" "}
              </li>
            </ul>
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

let connectedNavBar = connect(mapStateToProps)(NavBAr);
export default connectedNavBar;
