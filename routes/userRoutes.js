const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  checkId,
  checkBody,
} = require("./../controllers/userController");

const router = express.Router();

router.param("id", checkId);

router.route("/").get(getAllUsers).post(checkBody, createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
