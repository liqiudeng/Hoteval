import React, { Component } from "react";
import { connect } from "react-redux";
// import Swal from "sweetalert2";

class UnconnectedSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      registered: false
    };
  }

  submitsignupHandler = async evt => {
    evt.preventDefault();
    console.log("signup form submitted");
    let data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    let response = await fetch("/signup", { method: "POST", body: data });
    let responsebody = await response.text();
    let body = JSON.parse(responsebody);

    if (body.success === false) {
      this.setState({ registered: false });
      return;
    }
    console.log("parsed body", body);
    this.setState({ registered: true });
    //  Swal.fire({
    //      text:'Account created.',
    //      showConfirmButton:false,
    //      timer:1000
    //  })
  };
  usernameChange = evt => {
    this.setState({ username: evt.target.value });
  };
  passwordChange = evt => {
    this.setState({ password: evt.target.value });
  };

  render = () => {
    return (
      <div>
        <form onSubmit={this.submitsignupHandler}>
          {" "}
          Username <input
            type="text"
            onChange={this.usernameChange}
          /> Password <input type="text" onChange={this.passwordChange} />{" "}
          <input type="submit" value="signup" />
        </form>
      </div>
    );
  };
}
let Signup = connect()(UnconnectedSignup);
export default Signup;
