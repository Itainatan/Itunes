import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Chat from "./Chat";
const ChatsList = props => {
  const [chatList, setChatList] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [chat, setChat] = useState({});

  const [reciever, setReciever] = useState("");

  const { chats, username } = state;
  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  return (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <h1>Chats</h1>
      <div>
        {chatList.map((item, index) => {
          const reciever =
            item.username1 !== username ? item.username1 : item.username2;
          return (
            <div
              key={index}
              onClick={e => {
                setChat(item);
                setReciever(reciever);
              }}
            >
              <span>
                {reciever}
                's Room
              </span>
            </div>
          );
        })}
      </div>
      <div>
        {Object.keys(chat).length > 0 && <Chat data={{ chat, reciever }} />}
      </div>
    </div>
  );
};

export default ChatsList;
