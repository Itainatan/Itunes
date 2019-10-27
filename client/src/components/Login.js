import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "../App";
import io from "socket.io-client";

const Login = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, dispatch] = useContext(Context);

  const handleSubmit = async e => {
    e.preventDefault();
    // submit login credentials
    const res = await axios.post("/api/users/login", {
      username,
      password
    });
    if (res.status === 200) {
      const socket = io.connect("/");
      if (socket !== undefined) {
        socket.emit("join", username);
        dispatch({
          type: "Login",
          payload: {
            username: username,
            token: 0,
            chats: res.data.chats,
            socket: socket
          }
        });
        props.history.push("/chats");
      }
    }
    //after login, redirect to contacts page
  };
  return (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <h1 className="text-center">Welcome to ChatPool</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter username or email address"
          onChange={e => setUsername(e.target.value)}
          value={username}
          className="form-control"
        ></input>
        <input
          placeholder="Enter password"
          onChange={e => setPassword(e.target.value)}
          value={password}
          className="form-control"
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default Login;
