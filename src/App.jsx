import React, { Component } from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import Search from "./Search.jsx";
import SearchResults from "./SearchResults.jsx";
import "./main.css";
import Footer from "./Footer.jsx";

class App extends Component {
  render = () => {
    return (
      <div>
        <Signup />;
        <Login />;
        <Footer />;
      </div>
    );
  };
}

export default App;
