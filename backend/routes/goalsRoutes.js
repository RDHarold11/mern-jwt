const { Router } = require("express");
const router = Router();
const {
  getGoals,
  setGoal,
  deleteGoals,
  updateGoal,
} = require("../controller/goalsController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoals);

module.exports = router;
