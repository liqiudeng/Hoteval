import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      registered: false
    };
  }
  

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          {" "}
          Username <input
            type="text"
            onChange={this.usernameChange}
          /> Password <input type="text" onChange={this.passwordChange} />{" "}
          <input type="submit" value="login" /> {/* 3 */}
        </form>
      </div>
    );
  };
}
let Login = connect()(UnconnectedLogin);
export default Login;
