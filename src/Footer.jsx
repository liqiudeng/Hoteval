import React, { Component } from "react";

class Footer extends Component {
  render = () => {
    return (
      <div>
        <hr />
        <div className="flex container footer">
          <ul>
            <li>
              <p className="footer-title">About</p>
            </li>
            <li>
              <a>About us</a>
            </li>
            <li>
              <a>Service Guarantee</a>
            </li>
            <li>
              <a>Careers</a>
            </li>
            <li>
              <a>Terms of Use</a>
            </li>
            <li>
              <a>Privacy statement</a>
            </li>
          </ul>

          <ul>
            <li>
              <p className="footer-title">Contact Us</p>
            </li>
            <li>
              <a>Instagram</a>
            </li>
            <li>
              <a>Twitter</a>
            </li>
            <li>
              <a>Facebook</a>
            </li>
            <li>
              <a>Pinterest</a>
            </li>
          </ul>

          <ul>
            <li>
              <p className="footer-title">Other Services</p>
            </li>
            <li>
              <a>Investor Relations</a>
            </li>
            <li>
              <a>TripPlus Rewards Program</a>
            </li>
            <li>
              <a>PointsPLUS</a>
            </li>
            <li>
              <a>Partners</a>
            </li>
          </ul>
        </div>
        <div className="clr"></div>
        <div id="main-footer">
          <p>&copy; 2019 Hoteval – All Rights Reserved</p>
        </div>
        
      </div>
    );
  };
}

export default Footer;
