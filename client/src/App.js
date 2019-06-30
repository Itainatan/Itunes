import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter, Route } from "react-router-dom";
import Dashboard from "./components/dashbaord";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Link } from "react-router-dom";

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
      <GoogleReCaptchaProvider reCaptchaKey="6LepYasUAAAAADZGCIAP3VXc5l07KyZJZak-R3FQ">
        <BrowserRouter>
          <div>
            <Route
              path="/"
              component={() => (
                <div>
                  <Link to="/dashboard" className="btn btn-light">
                    Dashboard
                  </Link>
                  <h1>Welcome {this.state.server_respond}</h1>
                </div>
              )}
              exact
            />
            <Route path="/dashboard" component={Dashboard} exact />
          </div>
        </BrowserRouter>
      </GoogleReCaptchaProvider>
    );
  }
}

export default App;
