import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
// import { relative } from "path";
// import io from "socket.io-client";

// import axios from "axios";
// import { Context } from "../App";
const Chat = props => {
  const [state, dispatch] = useContext(Context);
  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reciever, setReciver] = useState("");
  const { data } = props;
  const { username, socket } = state;
  console.log(data);
  useEffect(() => {
    state.socket.on("FromServer", data => {
      const newChat = [...chat, data];
      setChat(newChat);
    });
  });

  useEffect(() => {
    setChat(data.chat.chat);
    setReciver(data.reciever);
  }, [data.chat, data.reciever]);

  const handleChange = e => {
    setNewMessage(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    const data = {
      time: "",
      sender: state.username,
      reciever: reciever,
      message: newMessage
    };
    socket.emit("FromClient", data);
  };

  return (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <div
        id="chat"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <h1>Chat</h1>
        <div
          className="form-control"
          style={{ height: 500, position: "relative" }}
        >
          {chat.map((item, index) => {
            if (item.sender === username) {
              return (
                <div key={index} style={{ color: "grey" }}>
                  {item.message}
                </div>
              );
            } else {
              return (
                <div key={index} style={{ color: "green" }}>
                  {item.message}
                </div>
              );
            }
          })}
        </div>
        <form onSubmit={handleSubmit} style={{ display: "flex" }}>
          <input
            placeholder="Enter Your Message..."
            className="form-control"
            onChange={handleChange}
          />
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
