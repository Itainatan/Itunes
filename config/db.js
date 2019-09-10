const mongoose = require("mongoose");
const db = require("./keys/keys").mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true
    });

    console.log("connected to MongoDB");
  } catch (err) {
    console.log(err.message);
    // process.exit(1);
  }
};
module.exports = connectDB;
