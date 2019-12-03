import React, {Component } from "react";
import axios from "axios";

class Login extends Component {

  constructor(props){
    super(props)
     this.state = {
      username: '',
      password: ''
    }
  }
   
   handleSubmit = async e => {
    e.preventDefault();
    // submit login credentials
    const res = await axios.post("/api/users/login", {
      username: this.state.username,
      password: this.state.password
    });
    if (res.status === 200) {
        this.props.history.push("/chats");
    }
    //after login, redirect to contacts page
  };

  render(){

      return (
        <div className="col-md-6 offset-md-3 col-sm-12">
          <h1 className="text-center">Welcome to Itunes</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Enter username or email address"
              onChange={e => this.setState({username: e.target.value})}
              value={this.state.username}
              className="form-control"
            ></input>
            <input
              placeholder="Enter password"
              onChange={e => this.setState({password: e.target.value})}
              value={this.state.password}
              className="form-control"
            ></input>
            <button type="submit">Log in</button>
          </form>
        </div>)
  }
};

export default Login;
