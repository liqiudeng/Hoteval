import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";

class UnconnectedReviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      review: [],
      reviewInput: "",
      addToComments: null
    };
  }
  renderListingReview = async evt => {
    let data = new FormData();
    data.append("_id", this.props.item._id);
    console.log("_id", this.props.item._id);
    data.append("review", this.state.reviewInput);
    let response = await fetch("/review", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body);
    if (!body.success) {
      this.setState({ addToComments: false });
      return;
    }
    console.log("review");
    this.setState({ addToComments: true, review: body.review });
    // this.props.dispatch({
    //   type: "all-reviews",
    //   allReviews: body
    // });
  };
  componentDidMount = async () => {
    console.log(this.props);
    this.renderListingReview();
  };
  handleChange = evt => {
    this.setState({ reviewInput: evt.target.value });
  };
  SubmitComments = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("_id", this.props.item._id);
    data.append("review", this.state.reviewInput);
    let response = await fetch("/addToReview", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form addToReview", responseBody);
    let body = JSON.parse(responseBody);
    if (!body.success) {
      this.setState({ addToComments: false });
      return;
    }
    console.log("review");
    this.setState({ addToComments: true, reviewInput: body.review });
    this.renderListingReview();
  };

  render = () => {
    if (this.state.review.review == undefined) {
      <div>no review</div>;
    }
    return (
      <div id="review-page" className="bg-light py-3">
        {/* <div>this.renderListingReview()</div> */}
        <div className="container">
          <div className="info-left">
            <form onSubmit={this.SubmitComments}>
              <label className="l-heading">
                Comments for{" "}
                <span className="text-primary">{this.props.item.title}</span>
              </label>

              {/* <input type="text" placeholder="Your name" /> */}
              <div className="form-group-review">
                <textarea
                  onChange={this.handleChange}
                  type="message"
                  id="message"
                  name="message"
                ></textarea>
                {/* <input
                  onChange={this.handleChange}
                  type="text"
                  //   onChange={this.handlecomments}
                  placeholder="Your Comment..."
                /> */}
              </div>
              <div>
                <input className="btn" type="submit"></input>
              </div>
            </form>
          </div>
          <div className="info-right">
            {" "}
            <img src={this.props.item.images[0]} height="300px" />
            <p>${this.props.item.price} CAD</p>
            <p>{this.props.item.description}</p>
          </div>
          <div className="clr"></div>
          <div id="testimonials" className="py-1">
            <div className="container">
              <h2 className="l-heading">What Our Guest Say</h2>

              {/* need to change */}
              <div>
                {this.state.review.map(review => {
                  return (
                    <div className="testimonial bg-primary">
                      <span className="name">{review.username}</span> :
                      &nbsp;&nbsp;&nbsp;
                      <span className="review">{review.review}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="container py-3">
          <NavLink to="/">Go back to choose hotel</NavLink>
        </div>
      </div>
    );
    // } else <div />;
    // return (
    //   <div id="review-page" className="bg-light py-3">
    //     {/* <div>this.renderListingReview()</div> */}
    //     <div className="container">
    //       <div className="info-left">
    //         <form>
    //           <h1 className="l-heading">
    //             Comments for{" "}
    //             <span className="text-primary">{this.props.item.title}</span>
    //           </h1>

    //           {/* <input type="text" placeholder="Your name" /> */}
    //           <input
    //             onChange={this.handleChange}
    //             type="text"
    //             //   onChange={this.handlecomments}
    //             placeholder="Your Comment..."
    //           />
    //         </form>
    //         <form onSubmit={this.SubmitComments}>
    //           <input type="submit" value="Add your comments" />
    //         </form>
    //       </div>
    //       <div className="info-right">
    //         {" "}
    //         <img src={this.props.item.images[0]} height="300px" />
    //         <p>${this.props.item.price} CAD</p>
    //         <p>{this.props.item.description}</p>
    //       </div>
    //       <div className="clr"></div>
    //       <div id="testimonials" className="py-1">
    //         <div className="container">
    //           <h2 className="l-heading">What Our Guest Say</h2>

    //           {/* need to change */}
    //           <div className="testimonial bg-primary py-1">No review</div>
    //         </div>
    //       </div>
    //     </div>
  };
}

let mapStateToProps = st => {
  return {
    firstName: st.firstName,
    allItems: st.allItems
  };
};
let ReviewPage = connect(mapStateToProps)(UnconnectedReviewPage);

export default ReviewPage;
