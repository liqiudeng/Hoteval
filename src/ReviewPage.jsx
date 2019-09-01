import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class ReviewPage extends Component {
  render = () => {
    return (
      <div>
        <div className="container">
          {" "}
          <h2>Review for {this.props.item.seller}</h2>
        </div>

        <div className="flex container">{this.props.item.review}</div>
        {/* <div>
            {this.props.items[0].review}
        </div> */}
      </div>
    );
  };
}

export default ReviewPage;
