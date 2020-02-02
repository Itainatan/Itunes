import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: null,
      errorsignUp: null,
      email: null,
      password: null,
      signUp: false,
      emailsignUp: null,
      usersignUp: null,
      passwordsignUp: null
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    if (this.state.email && this.state.password) {
      const res = await axios.post("/api/users/login", {
        email: this.state.email,
        password: this.state.password
      }).catch(err => {
        this.setState({ error: true, errorMessage: "user not found!" })
      });
      if (res && res.status === 200) {
        sessionStorage.setItem('user', JSON.stringify({ email: this.state.email }))
        this.props.history.push("/itunes");
      }
    }
    else this.setState({ error: true, errorMessage: "please fill the all fields" })
  };

  handlesignUp = async e => {
    e.preventDefault();
    if (this.state.usersignUp && this.state.passwordsignUp && this.state.emailsignUp) {
      const res = await axios.post("/api/users/signUp", {
        username: this.state.usersignUp,
        password: this.state.passwordsignUp,
        email: this.state.emailsignUp
      }).catch(err => {
        this.setState({ errorsignUp: true, errorMessage: "user already exist!" })
      });
      res && res.status === 200 && this.props.history.push("/itunes");
    }
    else this.setState({ errorsignUp: true, errorMessage: "please fill the all fields" })
  };

  submit = () => (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Enter email address"
          onChange={e => this.updateValue("email", e)}
        ></input>
        <input
          placeholder="Enter password"
          onChange={e => this.updateValue("password", e)}
          type="password"
        ></input>
        <button type="submit"> Log in </button>
      </form>
      {this.state.error && (
        <div className="error">
          {this.state.errorMessage}
        </div>
      )}
    </div>
  )

  signUp = () => (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <form onSubmit={this.handlesignUp}>
        <h5>fill details and create new user!</h5>
        <label> enter Email</label>
        <input
          placeholder="email"
          onChange={e => this.updateValue("emailsignUp", e)}
        ></input>
        <label> enter User name</label>
        <input
          placeholder="username"
          onChange={e => this.updateValue("usersignUp", e)}
        ></input>
        <label> enter password</label>
        <input
          placeholder="password"
          onChange={e => this.updateValue("passwordsignUp", e)}
        ></input>
        <button type="submit"> Sign Up ! </button>
      </form>
      {this.state.errorsignUp && (
        <div className="error">
          {this.state.errorMessage}
        </div>
      )}
    </div>
  )

  updateValue = (key, e) => this.setState({ [key]: e.target.value, errorsignUp: false, error: false })

  render() {
    return (
      <div>
        <h1 className="text-center">
          Welcome to Itunes
        </h1>
        {this.submit()}
        <div className="signUp">
          <a href="/#" onClick={() => this.setState({ signUp: !this.state.signUp })}>sign up for new user!</a>
        </div>
        {this.state.signUp && this.signUp()}
      </div>
    );
  }
}

export default Login;
