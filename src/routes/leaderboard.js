const express = require("express");
const router = express.Router();
const { getRankingByLiftType, getRankingByLiftTypeAndGym } = require("../utility/ranking");

router.get("/:liftType", async (req, res) => {
    const { liftType } = req.params;
    try {
        const rankings = await getRankingByLiftType(liftType);
        return res.status(200).json(rankings);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

// Gym leaderboard: /api/leaderboard/:liftType/gym/:gymId
router.get("/:liftType/gym/:gymId", async (req, res) => {
  const { liftType, gymId } = req.params;
  try {
    const rankings = await getRankingByLiftTypeAndGym(gymId, liftType);
    return res.status(200).json(rankings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;