import React from "react";
import "./App.css";
import io from "socket.io-client";

class App extends React.Component {
  state = {
    messages: [],
    username: "",
    message: "",
    socket: undefined,
    status: ""
  };
  componentDidMount() {
    // Connect to socket.io
    const socket = io.connect("/");
    if (socket !== undefined) {
      this.setState({ socket }, () => {
        console.log("Connected to socket...");

        // Handle Output
        this.state.socket.on("output", data => {
          if (data.length) {
            this.setState({ messages: [...this.state.messages, ...data] }, () =>
              this.showMessage()
            );
          }
        });
        // Get Status From Server
        this.state.socket.on("status", data => {
          // get message status
          this.setState({ status: data.message });
          // If status is clear, clear text
          setTimeout(() => {
            if (data.clear) {
              this.setState({ status: "" });
            }
          }, 2000);
        });

        this.state.socket.on("cleared", data => {
          this.setState({ messages: [] });
        });
      });
    }
  }
  showMessage = () => {
    if (this.state.messages.length) {
      return this.state.messages.map((message, index) => {
        return (
          <div key={index}>
            {message.name}: {message.message}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  handleInput = e => {
    this.setState({ username: e.target.value });
  };

  handleTextArea = e => {
    this.setState({ message: e.target.value });
  };

  handleSubmit = e => {
    this.state.socket.emit("input", {
      name: this.state.username,
      message: this.state.message
    });
    this.setState({ username: "", message: "" });
  };

  handleClear = e => {
    this.state.socket.emit("clear");
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-12">
            <h1 className="text-center">
              Chat Pool
              <button
                id="clear"
                className="btn btn-danger"
                onClick={this.handleClear}
              >
                Clear
              </button>
            </h1>
            <div id="status">{this.state.status}</div>
            <div id="chat">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter name..."
                onChange={this.handleInput}
                value={this.state.username}
              />
              <br />
              <div className="card">
                <div
                  id="messages"
                  style={{ height: 200 }}
                  className="card-block"
                >
                  {this.showMessage()}
                </div>
              </div>
              <br />
              <textarea
                id="textarea"
                className="form-control"
                placeholder="Enter message..."
                onChange={this.handleTextArea}
                value={this.state.message}
              ></textarea>
              <button onClick={this.handleSubmit} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
