const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const SongSchema = new Schema({
  songCounter: {
    type: Number
  },
songName: {
  type: String
}
});

module.exports = Song = mongoose.model("songs", SongSchema);