const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const ChatSchema = new Schema({
  username1: {
    type: String
  },
  username2: {
    type: String
  },
  chat: {
    type: [
      {
        time: String,
        sender: String,
        message: String
      }
    ]
  }
});

module.exports = Chat = mongoose.model("chats", ChatSchema);
