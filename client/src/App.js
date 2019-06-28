import React, { Component } from "react";
// import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      server_respond: "NO_server_respond"
    };
  }
  // componentDidMount() {
  //   axios
  //     .post("/api/users/current", { email: "rannn03@walla.co.il" })
  //     .then(res => {
  //       console.log(res);
  //       this.setState({ server_respond: res.data });
  //     })
  //     .catch(err => {
  //       // this.setState({ server_respond: err });
  //     });
  // }
  render() {
    return <h1>{this.state.server_respond}ddd</h1>;
  }
}

export default App;
