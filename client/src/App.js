import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/dashbaord";
class App extends Component {
  constructor() {
    super();
    this.state = {
      server_respond: "NO_server_respond"
    };
  }
  componentDidMount() {
    axios
      .post("/api/users/current", { email: "rannn03@walla.co.il" })
      .then(res => {
        this.setState({ server_respond: res.data.name });
      })
      .catch(err => {
        this.setState({ server_respond: err.response.data.error });
      });
  }
  render() {
    // return <h1>{this.state.server_respond}</h1>;
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/"
            component={() => <h1>{this.state.server_respond}</h1>}
            exact
          />
          <Route path="/dashboard" component={Dashboard} exact />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
