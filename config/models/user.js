const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserSchema = new Schema({
  name: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = User = mongoose.model("user", UserSchema);
