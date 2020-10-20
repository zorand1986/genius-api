const User = require("../models/userModel");
const Deck = require("./../models/deckModel");

exports.getAllDecks = async (req, res) => {
  try {
    const decks = await Deck.find();
    res.status(200).json({
      status: "success",
      data: {
        decks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createDeck = async (req, res) => {
  try {
    const newDeck = await Deck.create(req.body);
    const { decks } = await User.findById(req.params.id);

    await User.findByIdAndUpdate(req.params.id, {
      $push: { decks: { _id: newDeck._id, name: newDeck.name } },
    });
    res.status(201).json({
      status: "success",
      data: {
        deck: newDeck,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDecksByOwner = async (req, res) => {
  try {
    const userDecks = await Deck.find({ owner: req.params.id });
    res.status(200).json({
      status: "success",
      data: {
        userDecks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.param.id);
    res.status(200).json({
      status: "success",
      data: {
        deck,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.updateDeck = async (req, res) => {
  try {
    const newDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(204).json({
      status: "success",
      data: {
        deck: newDeck,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteDeck = async (req, res) => {
  try {
    await Deck.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};
