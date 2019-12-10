import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signUp: false,
      emailsignUp: "",
      usersignUp: "",
      passwordsignUp: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    // submit login credentials
    const res = await axios.post("/api/users/login", {
      email: this.state.email,
      password: this.state.password
    });
    if (res.status === 200) {
      this.props.history.push("/itunes");
    }
    //after login, redirect to contacts page
  };

  makesignUp = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  handlesignUp = async e => {
    const res = await axios.post("/api/users/signUp", {
      username: this.state.usersignUp,
      password: this.state.passwordsignUp,
      email: this.state.emailsignUp
    });
    if (res.status === 200) {
      this.props.history.push("/itunes");
    }
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12">
        <h1 style={{ marginTop: "15px" }} className="text-center">
          Welcome to Itunes
        </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            style={{ margin: "20px" }}
            placeholder="Enter email address"
            onChange={e => this.setState({ email: e.target.value })}
            value={this.state.email}
            className="form-control"
            type="email"
          ></input>
          <input
            style={{ margin: "20px" }}
            placeholder="Enter password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
            className="form-control"
            type="password"
          ></input>
          <button style={{ margin: "20px" }} type="submit">
            Log in
          </button>
        </form>
        <div className="signUp">
          <a onClick={this.makesignUp}>sign up for new user</a>
        </div>

        {this.state.signUp && (
          <div style={{ margin: "40px" }}>
            <form onSubmit={this.handlesignUp}>
              <h5>fill details and create new user!</h5>
              <label style={{ marginTop: "5px" }}> enter Email</label>
              <input
                placeholder="email"
                onChange={e => this.setState({ emailsignUp: e.target.value })}
                value={this.state.emailsignUp}
                className="form-control"
                type="email"
              ></input>
              <label style={{ marginTop: "5px" }}> enter User name</label>
              <input
                placeholder="username"
                onChange={e => this.setState({ usersignUp: e.target.value })}
                value={this.state.usersignUp}
                className="form-control"
              ></input>
              <label style={{ marginTop: "5px" }}> enter password</label>
              <input
                placeholder="password"
                onChange={e =>
                  this.setState({ passwordsignUp: e.target.value })
                }
                value={this.state.passwordsignUp}
                className="form-control"
                type="password"
              ></input>
              <button style={{ marginTop: "20px" }} type="submit">
                {" "}
                Sign Up !
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
