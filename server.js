const express = require("express");
// const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
const path = require("path");
const app = express();
// const users = require("./config/routes/api/users");

//Body parser middleware
app.use(express.json({ extended: false }));
//DB Config
// const db = require("./config/keys").mongoURI;
//Connect to MongoDB

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       useCreateIndex: true
//     });

//     console.log("connected to MongoDB");
//   } catch (err) {
//     console.log(err.message);
//     console.log(
//       "********************************************************************"
//     );
//     // process.exit(1);
//   }
// };

// connectDB();

//Use Routes
// app.use("/api/users", users);
app.get("/api", (req, res) => res.send("respnde success from server"));

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
