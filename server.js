const express = require("express");
const app = express();
var http = require("http").Server(app);
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");

const keys = require("./config/keys/keys");
//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const users = require("./routes/api/users");
// Use Routes
app.use("/api/users", users);

// // Connect to mongo
mongoose.connect(
  keys.mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true
  },
  function(err, db) {
    if (err) {
      throw err;
    }
    

    //Server static assets if in production
    if (process.env.NODE_ENV === "production") {
      //Set static folder
      app.use(express.static("client/build"));

      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
      });
    }

    const PORT = process.env.PORT || 5000;

    var server = http.listen(PORT, () => {
      console.log("server is running on port", server.address().port);
    });
  }
);