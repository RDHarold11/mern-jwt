const asyncHandler = require("express-async-handler");
const Goal = require("../models/goalModel");
const User = require("../models/userModel");
//@desc Get Goals
//@route Get /api/goals
//@acces Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); //Agarramos solo los goals de cada usuario
  res.status(200).json(goals);
});

//@desc Set Goals
//@route Post /api/goals
//@acces Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text value");
  }
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

//@desc Put Goals
//@route Put /api/goals
//@acces Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({ msg: "No matches" });
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //verificar que el goal sea del usuario correcto
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedGoal);
});

//@desc Delete Goals
//@route Delete /api/goals
//@acces Private
const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400).json({ msg: "Goal not found" });
  }
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }
  //verificar que el goal sea del usuario correcto
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  await goal.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { getGoals, setGoal, updateGoal, deleteGoals };
