const express = require("express");
const router = express.Router();
const { getRankingByLiftType } = require("../utility/ranking");

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

module.exports = router;