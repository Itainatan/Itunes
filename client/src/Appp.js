import React from "react";
import "./App.css";
import io from "socket.io-client";

class App extends React.Component {
  state = {
    messages: [],
    username: "",
    message: "",
    socket: undefined,
    status: "",
    writingStatus: ""
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
        this.state.socket.on("writing", data => {
          this.setState({ writingStatus: data });
        });
        this.state.socket.on("stoppedWriting", data => {
          this.setState({ writingStatus: "" });
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
    this.setState({ message: e.target.value }, () => {
      if (this.state.username) {
        this.state.socket.emit("writing", {
          messageLength: this.state.message.length,
          username: this.state.username
        });
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.state.socket.emit("input", {
      name: this.state.username,
      message: this.state.message
    });
    this.setState({ message: "" }, () => {
      this.state.socket.emit("writing", {
        messageLength: this.state.message.length,
        username: this.state.username
      });
    });
  };

  handleClear = e => {
    // this.state.socket.emit("clear");
    this.setState({ messages: [] });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-sm-12">
            <h1 className="text-center">Chat With Your Friends</h1>
            <div id="chat">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter Your Nickname..."
                onChange={this.handleInput}
                value={this.state.username}
              />
              <div
                id="status"
                style={{
                  color: "red",
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 20
                }}
              >
                {this.state.writingStatus}
              </div>
              <div
                id="status"
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: 20,
                  fontSize: 20
                }}
              >
                {this.state.status}
              </div>
              <br />
              <div className="card" style={{ padding: 10 }}>
                <div
                  id="messages"
                  style={{ minHeight: 200 }}
                  className="card-block"
                >
                  {this.showMessage()}
                </div>
              </div>
              <br />
              <form onSubmit={this.handleSubmit}>
                <textarea
                  id="textarea"
                  className="form-control"
                  placeholder={
                    !this.state.username
                      ? "Enter NickName To Send Message!"
                      : "Enter message..."
                  }
                  onChange={this.handleTextArea}
                  value={this.state.message}
                  disabled={!this.state.username}
                ></textarea>
                <br />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <button
                    className="btn btn-primary"
                    disabled={!this.state.message}
                    type="submit"
                  >
                    Send
                  </button>
                  <div>
                    <button
                      id="clear"
                      className="btn btn-danger"
                      onClick={this.handleClear}
                      style={{ marginRight: 0 }}
                    >
                      Clear All Messages
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
