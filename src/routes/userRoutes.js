const express = require("express");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./../controllers/userController");
const { getDecksByOwner } = require("./../controllers/deckController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
router.route("/decks/:userId").get(getDecksByOwner);

module.exports = router;
