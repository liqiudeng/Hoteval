import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class OwnerPage extends Component {
  render = () => {
    return (
      <div>
        <div className="container seller-items">
          {" "}
          <h2>{this.props.items[0].seller}</h2>
        </div>

        <div className="flex container items-sold">
          {this.props.items.map(item => {
            return (
              <div className="item">
                <div className="each-item">
                  <Link to={"/itemDescription/" + item._id}>
                    <img src={item.images[0]} height="200px" width="165px" />
                  </Link>
                </div>
                <div className="each-item">{item.title}</div>
                <div className="item-price">${item.price} CAD</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
}

export default OwnerPage;
