import "./App.css";

import React, { Component } from "react";
import Popup from "./components/Popup";
import axios from "axios";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phonenumber: "",
      email: "",
      message: "",
      sent: false,
      showPopup: false,
    };
  }

  handleFullname = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handlePhoneNumber = (e) => {
    this.setState({
      phonenumber: e.target.value,
    });
  };
  handleMessage = (e) => {
    this.setState({
      message: e.target.value,
    });
  };
  handleSubmit = async(e)=> {
    e.preventDefault();

    await axios.post("http://localhost:4000/api/sendEmail",this.state)
      .then(res => {
        this.setState({
          sent: true,
        });
      })
      .then(() =>
        this.setState({
          showPopup: true,
        })
      )
      .catch(() =>
        this.setState({
          showPopup: true,
        })
      );
  };
  resetForm = () => {
    this.setState({
      name: "",
      phonenumber: "",
      email: "",
      message: "",
      sent: false,
      showPopup: false,
    });
  };

  render() {
    return (
      <>
        <div className="form">
          <h1>Contact us</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="text_field">
              <input
                type="text"
                required
                onChange={this.handleFullname}
                value={this.state.name}
              />
              <span></span>
              <label>Full Name</label>
            </div>
            <div className="text_field">
              <input
                type="number"
                required
                onChange={this.handlePhoneNumber}
                value={this.state.phonenumber}
              />
              <span></span>
              <label>Phone Number</label>
            </div>
            <div className="text_field">
              <input
                type="email"
                required
                onChange={this.handleEmail}
                value={this.state.email}
              />
              <span></span>
              <label>Email</label>
            </div>
            <div className="text_field">
              <textarea
                type="text"
                required
                onChange={this.handleMessage}
                value={this.state.message}
              />
              <span className="textarea_span"></span>
              <label className="textarea_label">Message</label>
            </div>
            <div className="button">
              <button type="submit">SEND</button>
            </div>
          </form>
        </div>
        {this.state.sent && this.state.showPopup ? 
          <Popup
            msg="message has been sent successfully!"
            resetForm={this.resetForm}
          />
         : this.state.showPopup ? 
          <Popup
            msg="Message has not been sent something went wrong"
            resetForm={this.resetForm}
          />
         : null}
      </>
    );
  }
}

export default App;
