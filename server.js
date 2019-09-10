const express = require("express");
const path = require("path");
const users = require("./routes/api/users");
const connectDB = require("./config/db");

const app = express();
connectDB();
//Body parser middleware
app.use(express.json({ extended: false }));

//Use Routes
app.use("/api/users", users);

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
