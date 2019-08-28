import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import "./Login.css";
import Items from "./Items.jsx";
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      failedLogin: undefined
    };
  }
  handleUsername = evt => {
    console.log("username", evt.target.value);
    this.setState({ username: evt.target.value });
  };
  handlePassword = evt => {
    console.log("password", evt.target.value);
    this.setState({ password: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    console.log("login form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/login", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      this.props.dispatch({
        type: "username",
        username: ""
      });
      this.setState({ failedLogin: false });
      return;
    }
    let response2 = await fetch("/update-cart", {
      method: "POST",
      credentials: "include"
    });
    let responseBody2 = await response2.text();
    let body2 = JSON.parse(responseBody2);
    console.log("parsed body", body2);
    if (body.success) {
      console.log(body2, "body");
      this.props.dispatch({
        type: "username",
        username: body.username,
        sid: body.sid,
        firstName: body.fName,
        lastName: body.lName,
        cartLength: body2.cartLength,
        cart: body2.cart
      });
      this.setState({ failedLogin: true });
      return;
    }
  };
  render = () => {
    if (this.state.failedLogin === false) {
      return (
        <div>
          <h2>Login failed, please try again</h2>
        </div>
      );
    }
    if (this.state.failedLogin === true) {
      return (
        <div>
          <Items />
        </div>
      );
    }
    return (
      <div>
        <div className="container white">
          <div>
            <form className="white" onSubmit={this.handleSubmit}>
              <h5 className="grey-text text-darken-3">Log in </h5>
              <div className="input-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={this.handleUsername} />
              </div>
              <div className="input-field">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handlePassword}
                />
              </div>
              <div className="input-field">
                <input
                  className="btn pink lighten-1 z-depth-0"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <p> Or </p>
            <div>
              <Link className="btn pink lighten-1 z-depth-0" to="/signup">
                Signup
              </Link>
            </div>
            {/* <div>
              <Link to="/">Return to marketplace</Link>
            </div> */}
          </div>
        </div>
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
let Login = connect(mapStateToProps)(UnconnectedLogin);
export default Login;
