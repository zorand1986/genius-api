const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userDecksSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, "ID is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required field!"],
    validate: [validator.isEmail, "Please provide a valid email address."],
    unique: [true, "User with that email already exists."],
    lowercase: true,
  },
  userName: {
    type: String,
    required: [true, "User name is required!"],
    unique: [true, "User with that username already exists."],
  },
  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [6, "Password must be atleast 6 characters long."],
  },
  decks: {
    type: [userDecksSchema],
    required: false,
  },
});

userSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
