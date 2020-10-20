const express = require("express");
const {
  getAllDecks,
  createDeck,
  getDeck,
  updateDeck,
  deleteDeck,
} = require("./../controllers/deckController");

const router = express.Router();

router.route("/").get(getAllDecks);
router
  .route("/:id")
  .get(getDeck)
  .patch(updateDeck)
  .delete(deleteDeck)
  .post(createDeck);

module.exports = router;
