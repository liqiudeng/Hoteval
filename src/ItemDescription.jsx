import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class UnconnectedItemDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemClicked: 0,
      cart: []
    };
  }
  imageClickHandler = index => {
    this.setState({ currentItemClicked: index });
  };

  handleClick = async () => {
    let data = new FormData();
    data.append("id", this.props.item._id);
    let response = await fetch("/addToCart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body);
    this.setState({ cart: body.list });
    this.props.dispatch({
      type: "addCartItems",
      addToCartItems: body.arrLength
    });
  };
  // handleReviewClicked = () => {
  //   this.props.dispatch({
  //     type: "review-clicked",
  //     reviewClicked: this.props.item.review
  //   });
  // };
  handleSellerClicked = () => {
    this.props.dispatch({
      type: "seller-clicked",
      sellerClicked: this.props.item.seller
    });
  };
  render = () => {
    let toDisplayItems = this.props.allItems;
    toDisplayItems = toDisplayItems.filter(item => {
      if (
        item.category === this.props.item.category &&
        item.title !== this.props.item.title
      ) {
        console.log(item.category);
        return item;
      }
    });
    if (toDisplayItems.length > 5) {
      toDisplayItems = toDisplayItems.slice(0, 4);
    }
    return (
      <div>
        <div>
          <div className="flex">
            <div className="left">
              <div className="item-title"> {this.props.item.title}</div>
              <div className="item-price">${this.props.item.price} CAD </div>
              {"  "}
              {"  "}
              <div className="item-descript">
                {" "}
                {this.props.item.description}
              </div>
              <div className="item-descript">{this.props.item.rate}</div>
              <div className="Otherrooms">
                <Link
                  to={"/seller/" + this.props.item.seller}
                  className="waves-effect waves-light btn pink lighten-2 z-depth-2"
                  onClick={this.handleSellerClicked}
                >
                  OtherRooms
                </Link>
              </div>
            </div>
            <div className="center">
              <img
                src={this.props.item.images[this.state.currentItemClicked]}
                height="500px"
                // style="object-fit:none"
              />
            </div>
            <div className="right">
              <div className="AddtoCartbtn">
                <button
                  to={"/shopping-cart"}
                  className="waves-effect waves-light btn pink lighten-2 z-depth-2"
                  onClick={this.handleClick}
                >
                  {" "}
                  Select{" "}
                </button>
              </div>
              <div className="AddtoCartbtn">
                <Link
                  to={"/review/" + this.props.item._id}
                  className="waves-effect waves-light btn pink lighten-2 z-depth-2"
                  // onClick={this.handleReviewClick}
                >
                  {" "}
                  Reviews{" "}
                </Link>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="flex container">
              {this.props.item.images.map((each, index) => {
                return (
                  <div className="col s4">
                    <img
                      src={each}
                      onClick={() => {
                        this.imageClickHandler(index);
                      }}
                      height="100px"
                      width="150px"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>


        <div className="otherChoose">
          <div className="suggestion container">
            <h5>Similar Hotels</h5>
          </div>
          <div className="flex container">
            {toDisplayItems.map(item => {
              return (
                <div className="each-item">
                  <div>
                    <Link to={"/itemDescription/" + item._id}>
                      <img src={item.images[0]} height="200px" width="165px" />
                    </Link>
                  </div>
                  <div className="item-descrip">
                    <Link
                      className="black-text"
                      to={"/itemDescription/" + item._id}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="grey-text">${item.price} CAD</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };
}
let mapStateToProps = st => {
  return {
    allItems: st.allItems,
    cart: st.cart
  };
};

let ItemDescription = connect(mapStateToProps)(UnconnectedItemDescription);

export default ItemDescription;
