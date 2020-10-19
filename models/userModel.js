const mongoose = require("mongoose");

const validateEmail = (email) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required field!"],
    validate: [validateEmail, "Please fill a valid email address"],
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
});

const User = mongoose.model("User", userSchema);

module.exports = User;
