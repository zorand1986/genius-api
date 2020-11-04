const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};
exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    userName: req.body.userName,
    password: req.body.password,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { userName, password } = req.body;

  //Check if email and password exist
  if (!userName || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  //Check if user exists && password is correct
  const user = await User.findOne({ userName }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password.", 401));
  }

  //Send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});
