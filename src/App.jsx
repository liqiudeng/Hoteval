import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import "./main.css";
import Header from "./Header.jsx";
import Items from "./Items.jsx";
import ItemDescription from "./ItemDescription.jsx";

import Cart from "./Cart.jsx";
import Footer from "./Footer.jsx";
import OwnerPage from "./OwnerPage.jsx";

class App extends Component {
  renderHomePage = () => {
    this.renderListingItems();
    return (
      <div>
        <Header />
        <Search />
        <SearchResults />
        <Items />
        <Footer />
      </div>
    );
  };

  renderSearchPage = () => {
    return (
      <div>
        <Header />
        <div>
          <Search />
        </div>

        <div>
          <SearchResults />
        </div>
        <Footer />
      </div>
    );
  };
  renderLoginPage = () => {
    return (
      <div>
        <Header />
        <Login />
      </div>
    );
  };
  renderSignupPage = () => {
    return (
      <div>
        <Header />
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
        <Header />
        {<ItemDescription item={item} />}
        <Footer />
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
        <Header />
        {<OwnerPage items={items} />}
        <Footer />
      </div>
    );
  };

  renderCartPage = () => {
    return (
      <div>
        <Header />
        <Cart />
        <Footer />
      </div>
    );
  };
  renderListingPage = () => {
    return (
      <div>
        <Header />
        <Footer />
      </div>
    );
  };

  renderListingItems = async () => {
    let response = await fetch("/send-items");
    let body = await response.text();
    body = JSON.parse(body);
    console.log(body);
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

          <Route
            exact={true}
            path="/seller/:_id"
            render={this.renderOwnerPage}
          />

          <Route
            exact={true}
            path="/new-listing"
            render={this.renderListingPage}
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
