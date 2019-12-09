import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signIn: false,
      emailSignIn: "",
      userSignIn: "",
      passwordSignIn: ""
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    // submit login credentials
    const res = await axios.post("/api/users/login", {
      username: this.state.username,
      password: this.state.password
    });
    if (res.status === 200) {
      this.props.history.push("/itunes");
    }
    //after login, redirect to contacts page
  };

  makeSignIn = () => {
    this.setState({ signIn: true });
  };

  handleSignIn = async e => {
    e.preventDefault();
    const res = await axios.post("/api/users/login", {
      username: this.state.username,
      password: this.state.password
    });
    if (res.status === 200) {
      this.props.history.push("/itunes");
    }
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3 col-sm-12">
        <h1 className="text-center">Welcome to Itunes</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter username or email address"
            onChange={e => this.setState({ username: e.target.value })}
            value={this.state.username}
            className="form-control"
          ></input>
          <input
            placeholder="Enter password"
            onChange={e => this.setState({ password: e.target.value })}
            value={this.state.password}
            className="form-control"
          ></input>
          <button type="submit">Log in</button>
        </form>
        <div>
          <a onClick={this.makeSignIn}>sign in for new user</a>
        </div>

        {this.state.signIn && (
          <div style={{ margin: "20px" }}>
            <form onSubmit={this.handleSignIn}>
              <h5>fill details and create new user!</h5>
              <label> enter Email</label>
              <input
                placeholder="email"
                onChange={e => this.setState({ emailSignIn: e.target.value })}
                value={this.state.emailSignIn}
                className="form-control"
                type="email"
              ></input>
              <label> enter User name</label>
              <input
                placeholder="username"
                onChange={e => this.setState({ userSignIn: e.target.value })}
                value={this.state.userSignIn}
                className="form-control"
              ></input>
              <label> enter password</label>
              <input
                placeholder="password"
                onChange={e =>
                  this.setState({ passwordSignIn: e.target.value })
                }
                value={this.state.passwordSignIn}
                className="form-control"
                type="password"
              ></input>
              <button type="submit"> Sign In !</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
