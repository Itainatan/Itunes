import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      server_respond: "NO_server_respond"
    };
  }
  componentDidMount() {
    axios
      .get("/api")
      .then(res => {
        this.setState({ server_respond: res.data });
      })
      .catch(err => this.setState({ server_respond: "error respond" }));
  }
  render() {
    return <h1>{this.state.server_respond}</h1>;
  }
}

export default App;
