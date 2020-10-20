const mongoose = require("mongoose");
const cardSchema = require("./cardModel");

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of the deck is required."],
  },
  owner: {
    type: String,
    required: [true, "Owner ID is missing."],
  },
  cards: [cardSchema],
});

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
