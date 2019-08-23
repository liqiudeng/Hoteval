import React, { Component } from "react";
import { connect } from "react-redux";

class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      LoginStatus: false
    };
  }
  usernameChange = event => {
    console.log("new username", event.target.value);
    this.setState({ username: event.target.value });
  };
  passwordChange = event => {
    console.log("new password", event.target.value);
    this.setState({ password: event.target.value });
  };
  submitHandler = async evt => {
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
    console.log("responseBody from login", responseBody);
    let body = JSON.parse(responseBody);
    console.log("parsed body", body);
    if (!body.success) {
      this.props.dispatch({
        type: "username",
        username: ""
      });
      this.setState({ LoginStatus: false });
      return;
    } else {
      this.props.dispatch({
        type: "username",
        username: body.username,
        sid: body.sid
      });
      this.setState({ LoginStatus: true });
      return;
    }
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {" "}
          Username <input
            type="text"
            onChange={this.usernameChange}
          /> Password <input type="text" onChange={this.passwordChange} />{" "}
          <input type="submit" value="login" />
        </form>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
