const express = require("express");
const app = express();
var http = require("http").Server(app);
var client = require("socket.io")(http);
const path = require("path");
const mongoose = require("mongoose");

// const users = require("./routes/api/users");
//Use Routes
// app.use("/api/users", users);

// Connect to mongo
mongoose.connect(
  "mongodb+srv://ranchuk:ranchuk@cluster0-aysjk.mongodb.net/test?retryWrites=true&w=majority",
  function(err, db) {
    if (err) {
      throw err;
    }
    client.on("connection", socket => {
      let chat = db.collection("chats");

      // Create function to send status
      const sendStatus = function(s) {
        socket.emit("status", s);
      };

      // Get chats from mongo collection
      chat
        .find()
        .limit(100)
        .sort({ _id: 1 })
        .toArray(function(err, res) {
          if (err) {
            throw err;
          }

          // Emit the messages
          socket.emit("output", res);
        });

      // Handle input events
      socket.on("input", function(data) {
        let name = data.name;
        let message = data.message;

        // Check for name and message
        if (name === "" || message === "") {
          // Send error status
          sendStatus("Please enter a name and message");
        } else {
          // Insert message
          chat.insert({ name: name, message: message }, function() {
            client.emit("output", [data]);

            // Send status object
            sendStatus({
              message: "Message sent",
              clear: true
            });
          });
        }
      });

      // Handle clear
      socket.on("clear", function(data) {
        // Remove all chats from collection
        chat.remove({}, function() {
          // Emit cleared
          socket.emit("cleared");
        });
      });
    });

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
