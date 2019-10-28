import React, { useState, useEffect, useContext } from "react";
import { Context } from "../App";
import Chat from "./Chat";

const ChatsList = props => {
  const [chatList, setChatList] = useState([]);
  const [state, dispatch] = useContext(Context);
  const [openedChat, setOpenedChat] = useState({});

  const { chats, username } = state;

  useEffect(() => {
    setChatList(chats);
  }, [chats]);

  useEffect(() => {
    state.socket.on("FromServer", data => {
      for (let i = 0; i < chatList.length; i++) {
        if (
          (chatList[i].username1 === data.reciever) &
            (chatList[i].username2 === data.sender) ||
          (chatList[i].username1 === data.sender) &
            (chatList[i].username2 === data.reciever)
        ) {
          const newChatList = [...JSON.parse(JSON.stringify(chatList))];
          newChatList[i].chat.push(data);
          setChatList(newChatList);
          break;
        }
      }
    });
  });

  return (
    <div className="col-md-6 offset-md-3 col-sm-12">
      <h1>Chats</h1>
      <div style={{ display: "flex" }}>
        <div
          className="form-control"
          style={{
            height: 500,
            width: 200
          }}
        >
          {chatList.map((item, index) => {
            const reciever =
              item.username1 !== username ? item.username1 : item.username2;
            return (
              <div
                key={index}
                onClick={e => {
                  setOpenedChat(item);
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
        <div
          className="form-control"
          style={{
            height: 500,
            width: 400
          }}
        >
          {Object.keys(openedChat).length > 0 && (
            <Chat openedChat={openedChat} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatsList;
