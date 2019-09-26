import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Login.jsx";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      allItems: [],
      result: [],
      total: 0,
      deleteStatus: false
    };
  }
  renderCart = async () => {
    let data = new FormData();
    data.append("username", this.props.username);
    let response = await fetch("/checkout", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    this.props.dispatch({ type: "cart", cartList: body });
    let response2 = await fetch("/send-items");
    let body2 = await response2.text();
    body2 = JSON.parse(body2);
    this.setState({ allItems: body2 });
    let newArr = [];
    let priceTotal = 0;
    for (let i = 0; i < this.props.cartList.length; i++) {
      for (let e = 0; e < this.state.allItems.length; e++) {
        if (this.props.cartList[i] === this.state.allItems[e]._id) {
          newArr.push(this.state.allItems[e]);
          priceTotal += parseFloat(this.state.allItems[e].price);
        }
      }
    }
    this.setState({ result: newArr, total: priceTotal });
    if (this.state.deleteStatus) {
      console.log(this.props.addToCartItems);
      this.props.dispatch({
        type: "removeToCart",
        removeItems: this.props.addToCartItems
      });
      this.setState({ deleteStatus: false });
    }
  };

  onToken = async token => {
    let response = await fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token)
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    if (body.success) {
      this.props.dispatch({ type: "checkout", addToCartItems: 0 });
      alert(`thank you for your purchase, ${this.props.firstName}`);
      this.renderCart();
    }
  };

  deleteItem = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("id", this.state.id);
    let response = await fetch("/deleteItemCart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body, "body");
    this.setState({ deleteStatus: true });
    this.renderCart();
  };

  componentDidMount = () => {
    this.renderCart();
  };

  render = () => {
    console.log(this.state.username);
    if (this.props.username === undefined || "") {
      return (
        <div>
          <Login />
        </div>
      );
    }
    return (
      <div>
        <div>
          <div className="l-heading container py-3">Book List</div>

          {this.state.result.map(item => {
            return (
              <div className="checkoutBox container">
                <img className="imgCart" src={item.images[0]} />
                <div>{item.title}</div>

                <form onSubmit={this.deleteItem}>
                  <input
                    className="removeButton"
                    type="submit"
                    onClick={() => {
                      this.setState({ id: item._id });
                    }}
                    value="delete"
                  />
                </form>
                <div className="checkoutprice">${item.price}</div>
              </div>
            );
          })}

          <div className="totalBox container">
            Grand total{" "}
            <span className="checkoutprice"> ${this.state.total}</span>
          </div>
          <div className="flex container pay">
            <div className="cart-link">
              {" "}
              <Link to={"/"}>
                <span>Return to HomePage</span>
              </Link>
            </div>
            <div className="payButton">
              Procceed to Payment
              <StripeCheckout
                token={this.onToken}
                stripeKey="pk_test_8l4JXUo5a7x8FBxatzwcYun400u6hJY5PF"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    cartList: state.cartList,
    allItems: state.allItems,
    sid: state.sessionId,
    addToCartItems: state.addToCartItems,
    firstName: state.firstName
  };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
