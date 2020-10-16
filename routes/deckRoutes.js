const express = require("express");
const {
  getAllDecks,
  createDeck,
  getDeck,
  updateDeck,
  deleteDeck,
} = require("./../controllers/deckController");

const router = express.Router();

router.route("/").get(getAllDecks).post(createDeck);
router.route("/:id").get(getDeck).patch(updateDeck).delete(deleteDeck);

module.exports = router;
