import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Items from "./Items.jsx";
// import "./signup.css";
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
      // this.props.dispatch({
      //   type: "username",
      //   username: body.username,
      //   sid: body.sid,
      //   firstName: body.fName,
      //   lastName: body.lName
      // });
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
        cartLength: body2.cartLength,//???
        cart: body2.cart    //???
      })
      return
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
      <div className="container">
        <form className="white" onSubmit={this.submitHandler}>
          <h5 className="grey-text text-darken-3">Sign up</h5>
          <div className="input field">
            {" "}
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.firstNameChange} />
          </div>
          <div className="input field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.lastNameChange} />
          </div>
          <div className="input field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.usernameChange} />
          </div>
          <div className="input field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={this.passwordChange}
            />
          </div>
          {/* <div>
              <input type="checkbox" id="newsletter" name="newsletter" />
              <p>Sign me up for emails to get exclusive offers</p>
            </div> */}
          <div className="input field">
            <input
              className="btn pink lighten-1 z-depth-0"
              type="submit"
              value="Register"
            />
          </div>
          <div>
            By clicking “Register”, you agree to our terms of service, privacy
            policy and cookie policy
          </div>

          {/* <div className="link linkSignup">
            <Link to="/">
              <span className="arrow">←</span>Return to marketplace
            </Link>
          </div> */}
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
