import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";

const Chat = ({ openedChat }) => {
  const [state, dispatch] = useContext(Context);

  const [chat, setChat] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [reciever, setReciver] = useState("");

  const { username, socket } = state;

  useEffect(() => {
    // setChat(openedChat);
    const reciever =
      openedChat.username1 === username
        ? openedChat.username2
        : openedChat.username1;
    setReciver(reciever);
    setChat(openedChat);
  }, [openedChat]);

  useEffect(() => {
    state.socket.on("FromServer", data => {
      const newChat = [...chat, data];
      setChat(newChat);
    });
  });

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
    <div
      id="chat"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div>
        {chat.chat.map((item, index) => {
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
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          position: "absolute",
          bottom: 0,
          width: "100%"
        }}
      >
        <input
          placeholder="Enter Your Message..."
          className="form-control"
          onChange={handleChange}
        />
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};

export default Chat;
