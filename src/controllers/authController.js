const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const sendEmail = require("./../utils/sendEmail");

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email provided.", 400));
  }

  //create resetToken
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log(resetToken, hashedToken);
  user.passwordResetToken = hashedToken;
  user.passwordResetTokenExp = parseInt(Date.now() + 60 * 60 * 1000);
  await user.save();

  //send email with reset password link
  sendEmail("Whoever", resetToken);

  res.status(200).json({
    status: "success",
    message: "Reset email has been sent to your email.",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const providedTokenHashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: providedTokenHashed,
  }).select("+passwordResetTokenExp +passwordResetToken");
  if (!user) {
    return next(new AppError("Invalid token", 400));
  }
  if (user.passwordResetTokenExp < Date.now()) {
    return next(new AppError("Token expired. Please request a new one", 400));
  }

  user.password = req.body.password;
  await user.save({ runValidators: true });

  res.status(201).json({
    status: "success",
    message: "Password has been updated.",
  });
});
