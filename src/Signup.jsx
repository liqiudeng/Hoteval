import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./main.css";
import Items from "./Items.jsx";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      registered: null
    };
  }

  usernameChange = evt => {
    this.setState({
      username: evt.target.value
    });
  };
  passwordChange = evt => {
    this.setState({
      password: evt.target.value
    });
  };
  firstNameChange = evt => {
    this.setState({
      firstName: evt.target.value
    });
  };
  lastNameChange = evt => {
    this.setState({
      lastName: evt.target.value
    });
  };

  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    let response = await fetch("/signup", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form signup", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success === false) {
      this.setState({ registered: false });
      return;
    } else {
      //update the info to store
      console.log(body.username, "body");

      this.setState({ registered: true });
      //update the chart
      let response2 = await fetch("/update-cart", {
        method: "POST",
        credentials: "include"
      });
      //obtain info from back end
      let responseBody2 = await response2.text();
      let body2 = JSON.parse(responseBody2);
      console.log("parsed body", body2);
      this.props.dispatch({
        type: "username",
        username: body.username,
        sid: body.sid,
        firstName: body.fName,
        lastName: body.lName,
        cartLength: body2.cartLength, //???
        cart: body2.cart //???
      });
      return;
    }
  };
  render = () => {
    if (this.state.registered === true) {
      return (
        <div>
          <Items />
        </div>
      );
    } else if (this.state.registered === false) {
      return (
        <div>
          <h2>Sorry this email address already exists.</h2>
        </div>
      );
    }

    return (
      <div id="container-Login">
        <form className="form-wrap" onSubmit={this.submitHandler}>
          <h1>
            <span className="text-primary">Sign</span> up
          </h1>
          <div className="form-group">
            {" "}
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.firstNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.lastNameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.usernameChange} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={this.passwordChange}
            />
          </div>
          <div>
            <input className="button" type="submit" value="Register" />
          </div>
          <p className="bottom-text">
            By clicking the Sign Up button, you agree to our
            <a href="#">Terms & Conditions</a> and
            <a href="#">Privacy Policy</a>
          </p>
        </form>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    username: st.username,
    sid: st.sid,
    firstName: st.fName,
    lastName: st.lName
  };
};
let Signup = connect(mapStateToProps)(UnconnectedSignup);
export default Signup;
