const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const hashPassword = require("./../utils/authUtil");

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
    select: false,
  },
  decks: {
    type: [userDecksSchema],
    required: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetTokenExp: {
    type: Number,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  this.password = await hashPassword(this.password);
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
