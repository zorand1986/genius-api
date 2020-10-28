const User = require("../models/userModel");
const AppError = require("../utils/appError");
const Deck = require("./../models/deckModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllDecks = catchAsync(async (req, res, next) => {
  const decks = await Deck.find();
  res.status(200).json({
    status: "success",
    data: {
      decks,
    },
  });
});

exports.createDeck = catchAsync(async (req, res, next) => {
  const newDeck = await Deck.create(req.body);

  await User.findByIdAndUpdate(req.params.id, {
    $push: { decks: { _id: newDeck._id, name: newDeck.name } },
  });
  res.status(201).json({
    status: "success",
    data: {
      deck: newDeck,
    },
  });
});

exports.getDecksByOwner = catchAsync(async (req, res, next) => {
  const userDecks = await Deck.find({ owner: req.params.id });
  res.status(200).json({
    status: "success",
    data: {
      userDecks,
    },
  });
});

exports.getDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findById(req.params.id);

  if (!deck) {
    return next(new AppError("No deck found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      deck,
    },
  });
});

exports.updateDeck = catchAsync(async (req, res, next) => {
  const newDeck = await Deck.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!newDeck) {
    return next(new AppError("No deck found with that ID.", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      deck: newDeck,
    },
  });
});

exports.addCardToDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findByIdAndUpdate(
    req.params.id,
    {
      $push: { cards: req.body },
    },
    {
      new: true,
    }
  );

  if (!deck) {
    return next(new AppError("No deck found with that ID.", 404));
  }

  res.status(204).json({
    status: "success",
    data: {
      deck,
    },
  });
});

exports.deleteDeck = catchAsync(async (req, res, next) => {
  const deck = await Deck.findByIdAndDelete(req.params.id);

  if (!deck) {
    return next(new AppError("No deck found with that ID.", 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
