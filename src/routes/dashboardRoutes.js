const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const gameRepository = require("../repositories/gameRepository");
const statsService = require("../services/statsService");

router.get("/dashboard", requireAuth, (req, res) => {
    const games = gameRepository.getGamesByUser(req.session.userId);

    const totals = statsService.calculateSeasonStats(games);

    res.render("dashboard", {
        games,
        totals
    });
});

module.exports = router;