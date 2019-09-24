import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import "./main.css";
import "./mobile.css";
import NavBar from "./NavBar.jsx";

import Items from "./Items.jsx";
import ItemDescription from "./ItemDescription.jsx";
import OnlineService from "./onlineService.jsx";
import Cart from "./Cart.jsx";
import Footer from "./Footer.jsx";
import OwnerPage from "./OwnerPage.jsx";
import ReviewPage from "./ReviewPage.jsx";
import Help from "./Help.jsx";
import LocationMap from "./Map.jsx";
class App extends Component {
  renderHomePage = () => {
    this.renderListingItems();
    return (
      <div>
        <NavBar />
        <Items />
      </div>
    );
  };

  renderSearchPage = () => {
    return (
      <div>
        <NavBar />
        <div>
          <Search />
        </div>
        <div>
          <SearchResults />
        </div>
        {/* <div>
          <Footer />
        </div> */}
      </div>
    );
  };
  renderLoginPage = () => {
    return (
      <div>
        <NavBar />
        <Login />
      </div>
    );
  };
  renderSignupPage = () => {
    return (
      <div>
        <NavBar />
        <Signup />
      </div>
    );
  };

  renderItemDescriptionPage = routerData => {
    let itemId = routerData.match.params._id;
    console.log(routerData);
    let item = this.props.allItems.filter(item => {
      return item._id === itemId;
    })[0];
    return (
      <div>
        <div>
          <NavBar />
        </div>
        <div>{<ItemDescription item={item} />}</div>
        <div>
          <Footer />
        </div>
      </div>
    );
  };
  renderOwnerPage = routerData => {
    let seller = this.props.sellerClicked;
    let items = this.props.allItems.filter(item => {
      return item.seller === seller;
    });
    console.log(items, "checking items");
    return (
      <div>
        <NavBar />
        {<OwnerPage items={items} />}
        <Footer />
      </div>
    );
  };
  renderReviewPage = routerData => {
    let itemId = routerData.match.params._id;
    let item = this.props.allItems.filter(item => {
      return item._id === itemId;
    })[0];
    return (
      <div>
        <NavBar />
        {<ReviewPage item={item} />}
        <Footer />
      </div>
    );
  };
  renderCartPage = () => {
    return (
      <div>
        <NavBar />
        <Cart />
        <Footer />
      </div>
    );
  };
  renderonlineServicePage = () => {
    return (
      <div>
        <NavBar />
        <OnlineService />
        <Footer />
      </div>
    );
  };
  renderListingPage = () => {
    return (
      <div>
        <NavBar />
        <Footer />
      </div>
    );
  };
  renderhelpPage = () => {
    return (
      <div>
        <NavBar />
        <Help />
        <Footer />
      </div>
    );
  };
  renderMapPage = () => {
    return (
      <div>
        <LocationMap />
      </div>
    );
  };
  renderListingItems = async () => {
    let response = await fetch("/send-items");
    let body = await response.text();
    body = JSON.parse(body);
    // console.log(body);
    this.props.dispatch({
      type: "all-items",
      allItems: body
    });
  };

  componentDidMount = async () => {
    this.renderListingItems();
  };

  render = () => {
    return (
      <BrowserRouter>
        <div>
          <Route exact={true} path="/" render={this.renderHomePage} />
          <Route exact={true} path="/search" render={this.renderSearchPage} />
          <Route exact={true} path="/login" render={this.renderLoginPage} />
          <Route exact={true} path="/signup" render={this.renderSignupPage} />
          <Route exact={true} path="/map" render={this.renderMapPage} />
          <Route
            exact={true}
            path="/seller/:_id"
            render={this.renderOwnerPage}
          />

          <Route
            exact={true}
            path="/review/:_id"
            render={this.renderReviewPage}
          />
          <Route
            exact={true}
            path="/shopping-cart"
            render={this.renderCartPage}
          />
          <Route
            exact={true}
            path="/itemDescription/:_id"
            render={this.renderItemDescriptionPage}
          />
          <Route
            exact={true}
            path="/onlineService"
            render={this.renderonlineServicePage}
          />
          <Route exact={true} path="/aboutUs" render={this.renderhelpPage} />
        </div>
      </BrowserRouter>
      // <div><NewItems /></div>
    );
  };
}

let mapStateToProps = st => {
  return {
    allItems: st.allItems,
    sid: st.sessionId,
    sellerClicked: st.sellerClicked
  };
};

let connectedApp = connect(mapStateToProps)(App);
export default connectedApp;
