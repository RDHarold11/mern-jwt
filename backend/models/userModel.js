const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Add a name"],
    },
    email: {
      type: String,
      required: [true, "Add a email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Add a password"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
