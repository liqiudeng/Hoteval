import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedOnlineService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageInput: ""
    };
  }
  componentDidMount = () => {
    let renderListingMessages = async () => {
      let response = await fetch("/listingMessages");
      let responseBody = await response.text();
      console.log("response from messages", responseBody);
      let parsed = JSON.parse(responseBody);
      console.log("parsed", parsed);
      this.props.dispatch({
        type: "set-messages",
        messages: parsed.messages
      });

      let response2 = await fetch("/listingUsers");
      let responseBody2 = await response2.text();
      console.log("response from messages", responseBody2);
      let parsed2 = JSON.parse(responseBody2).username;
      this.props.dispatch({
        type: "set-usersrecord",
        usersRecord: parsed2
      });
      // console.log("parsed", usersRecord);
    };
    setInterval(renderListingMessages, 500);
  };
  handleMessage = evt => {
    console.log(evt.target.value);
    this.setState({ messageInput: evt.target.value });
  };
  handleSubmit = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("message", this.state.messageInput);
    console.log("message", this.state.messageInput);
    let response = await fetch("/onlineService", {
      method: "POST",
      body: data,
      credential: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log("body", body);
    if (!body.success) {
      return;
    }
    console.log("onlineservice");
    this.setState({ messageInput: body.message });
  };
  render = () => {
    console.log("online", this.props, this.state);
    if (
      this.props.usersRecord !== undefined &&
      this.props.messages !== undefined
    )
      return (
        <div>
          <div className="flex container">
            <div id="userRecord">
              <img src="/la-ronde.jpg" />

              <ul>{this.props.usersRecord} has entered</ul>
            </div>
            <div id="serviceMessages">
              <img src="/vieux-montreal.jpg" />

              <ul>
                {this.props.messages.map(message => {
                  return (
                    <li>
                      {message.username} : {message.message}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div id="form-online">
            <form className="form-wrap" onSubmit={this.handleSubmit}>
              <div className="form-group">
                {" "}
                <input
                  type="text"
                  onChange={this.handleMessage}
                  // value={this.state.message}
                  placeholder="Type your words here"
                />
              </div>
              <div className="py-3">
                <input className="btn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      );
    if (
      this.props.usersRecord !== undefined &&
      this.props.messages == undefined
    )
      return (
        <div>
          <div className="flex container">
            <div id="userRecord">
              <img src="/la-ronde.jpg" />

              <ul>{this.props.usersRecord}has entered</ul>
            </div>
            <div id="serviceMessages">
              <img src="/vieux-montreal.jpg" />
            </div>
          </div>

          <div id="form-online">
            <form className="form-wrap" onSubmit={this.handleSubmit}>
              <div className="form-group">
                {" "}
                <input
                  type="text"
                  onChange={this.handleMessage}
                  // value={this.state.message}
                  placeholder="Type your words here"
                />
              </div>
              <div className="py-3">
                <input className="btn" type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
      );
    else
      return (
        <h1 className="container text-third py-3">You need have an account</h1>
      );
  };
}
let mapStateToProps = state => {
  return {
    messages: state.allMessages,
    usersRecord: state.usersRecord
  };
};
let OnlineService = connect(mapStateToProps)(UnconnectedOnlineService);

export default OnlineService;
