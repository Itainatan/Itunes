import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
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
    if (this.state.email !== "" && this.state.password !== "") {
      const res = await axios.post("/api/users/login", {
        email: this.state.email,
        password: this.state.password
      }).catch(err => {
        console.log(err)
        this.setState({ error: true, errorMessage: "user not found!" })
      });
      if (res && res.status === 200) {
        sessionStorage.setItem('user', JSON.stringify({ email: this.state.email }))
        this.props.history.push("/itunes");
      }
    }
    else this.setState({ error: true, errorMessage: "please fill the all fields" })
  };

  makesignUp = () => {
    this.setState({ signUp: !this.state.signUp });
  };

  handlesignUp = async e => {
    e.preventDefault();
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
            onChange={e => this.setState({ email: e.target.value, error: false })}
            value={this.state.email}
            className="form-control"
          ></input>
          <input
            style={{ margin: "20px" }}
            placeholder="Enter password"
            onChange={e => this.setState({ password: e.target.value, error: false })}
            value={this.state.password}
            className="form-control"
            type="password"
          ></input>
          <button style={{ margin: "20px" }} type="submit">
            Log in
          </button>
        </form>
        {this.state.error && (
          <div className="error">
            {this.state.errorMessage}
          </div>
        )}
        <div className="signUp">
          <a href="/#" onClick={this.makesignUp}>sign up for new user!</a>
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
