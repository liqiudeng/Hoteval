import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      message: ""
    };
  }

  // componentDidMount() {
  //   this.renderMap();
  // }
  // renderMap = () => {
  //   loadScript(
  //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1DrDBUd6GNL2EIBCxK-K0OjkTny8kbuA&callback=initMap"
  //   );
  //   window.initMap = this.initMap;
  // };
  // initMap = () => {
  //   let map = new window.google.maps.Map(document.getElementById("map"), {
  //     center: { lat: -34.397, lng: 150.644 },
  //     zoom: 8
  //   });
  // };
  handleFirstName = evt => {
    this.setState({ firstName: evt.target.value });
  };
  handleLastName = evt => {
    this.setState({ lastName: evt.target.value });
  };
  handleEmail = evt => {
    this.setState({ email: evt.target.value });
  };
  handleMessage = evt => {
    this.setState({ message: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("firstName", this.state.firstName);
    data.append("lastName", this.state.lastName);
    data.append("email", this.state.email);
    data.append("message", this.state.message);
    let response = await fetch("/help", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (!body.success) {
      window.alert("send unsuccefully");
      return;
    } else {
      window.alert("send succefully");
    }
  };

  render = () => {
    return (
      <div className="helpPage container">
        <div className="container py-3">
          <Link to="/">Go back to choose Hotel</Link>
        </div>
        <div id="features">
          <div className="box bg-light">
            <i className="fas fa-hotel fa-3x"></i>
            <h3>Address</h3>

            <h5 className="py-3">Main Office</h5>

            <p className="py-3">1000, av. Miss Zang, QC H9W 2H5</p>

            <h5 className="py-3">Kirkland Office</h5>

            <p className="py-1">2000, av. Miss Verdun, QC H9C 2U1</p>

            <a className="text-third py-3" href="/map">
              Go to map
            </a>
          </div>
          <div className="box bg-primary">
            <i className="fas fa-phone fa-3x"></i>
            <h3>Telephone & Email</h3>
            <br />
            <br />
            <h5>Main Office</h5>
            <p>Téléphone: 514 855-4195</p>
            <p>Télécopieur: 514 636-0838</p>
            <p> E-mail:hoteval@decode.com</p>
            <br />
            <br />
            <h5>Kirkland Office</h5>
            <p>Téléphone: 514 855-4190</p>
            <p>Télécopieur: 514 636-0830</p>
            <p> E-mail:hoteval.kirkland@decode.com</p>
          </div>
          <div className="box bg-dark">
            <div className="form-wrap-contact">
              <i className="fas fa-paper-plane fa-3x"></i>
              <h3>Contact us</h3>

              <form onSubmit={this.handleSubmit}>
                <div className="form-group-contact">
                  <label htmlFor="firstname">First Name</label>
                  <input
                    onChange={this.handleFirstName}
                    type="text"
                    id="firstname"
                    name="firstname"
                  ></input>
                </div>
                <div className="form-group-contact">
                  <label htmlFor="lastname">Last Name</label>
                  <input
                    onChange={this.handleLastName}
                    type="text"
                    id="lastname"
                    name="lastname"
                  ></input>
                </div>
                <div className="form-group-contact">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={this.handleEmail}
                    type="email"
                    id="email"
                    name="email"
                  ></input>
                </div>
                <div className="form-group-contact">
                  <label htmlFor="message">Message</label>
                  <textarea
                    onChange={this.handleMessage}
                    type="message"
                    id="message"
                    name="message"
                  ></textarea>
                </div>
                <div>
                  <input className="btn" type="submit"></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };
}
{
  /* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script> */
}
// let loadScript = url => {
//   let index = window.document.getElementsByTagName("script")[0];
//   let script = window.document.createElement("script");
//   script.src = url;
//   script.async = true;
//   script.defer = true;
//   index.parentNode.insertBefore(script, index);
// };
// //

export default Help;
