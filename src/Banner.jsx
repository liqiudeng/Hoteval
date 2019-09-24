import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
class Banner extends Component {
  render = () => {
    return (
      <div>
        <div id="showcase">
          <iframe
            width="180"
            height="100"
            src="https://www.youtube.com/embed/OsgiaQnN82I"
            frameBorder="0"
            allowFullScreen
          ></iframe>
          <div className="onlineService">
            <Link to={"/onlineService"}>
              <img src="/icons8-call-male-50.png" width="50px"></img>
            </Link>
          </div>
          <div className="container">
            <div className="showcase-content">
              <h1>
                <span className="text-primary">Welcome</span> To Montreal
              </h1>
              <p className="lead">
                The world’s second largest francophone city after Paris, it
                naming‘international’ city, a cosmopolitan centre with proud
                roots in the past that enthusiastically embraces the future.
              </p>
              <Link className="btn" to="/aboutUS">
                About Hoteval
              </Link>
            </div>
          </div>
        </div>
        <div id="home-info" className="bg-dark">
          <div className="info-img"></div>
          <div className="info-content">
            <h2>
              <span className="text-primary">Service</span> of Hoteval
            </h2>
            <p>
              Are you looking for a hotel in Montreal? we can help you find your
              decent hotel. If you are in Montreal,you need to have enough
              information about attractions around it. We can help you get those
              information. If any problem befor or after your booking, we can
              help you resolve your troubles!
            </p>
            <Link to="/onlineService" className="btn btn-light">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  };
}
export default Banner;
