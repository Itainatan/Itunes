const express = require("express");
const router = express.Router();

const Song = require("../../config/models/song");

router.post("/insertSong", (req, res) => {
  const { songName } = req.body;
  Song.findOne({ songName: songName }).then(song => {
    if (song) {
      Song.collection.updateOne(
        { songName: song.songName },
        { $set: { songCounter: song.songCounter + 1 } }
      );
    } else {
      const newSong = { songCounter: 1, songName: songName };
      Song.collection.insertOne(newSong);
    }
    res.status(200).json({ success: true });
  });
});

router.get("/top10", (req, res) => {
  Song.find({}, [], { limit: 10, sort: { songCounter: -1 } }).then(
    (songs) => {
      res.status(200).json({ list: songs });
    });
});

module.exports = router;