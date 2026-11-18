const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/authMiddleware");
const gameService = require("../services/gameService");

router.get("/games/new", requireAuth, (req, res) => {
    res.render("game-entry", { error: null });
});

router.post("/games", requireAuth, (req, res) => {
    try {
        const game = {
            date: req.body.date,
            opponent: req.body.opponent
        };

        const stats = {
            atBats: Number(req.body.atBats),
            hits: Number(req.body.hits),
            doubles: Number(req.body.doubles),
            triples: Number(req.body.triples),
            homeRuns: Number(req.body.homeRuns),
            walks: Number(req.body.walks),
            hitByPitch: Number(req.body.hitByPitch),
            sacrificeFlies: Number(req.body.sacrificeFlies),
            strikeouts: Number(req.body.strikeouts),
            stolenBases: Number(req.body.stolenBases)
        };

        gameService.saveGame(req.session.userId, game, stats);

        res.redirect("/dashboard");
    } catch (error) {
        res.status(400).render("game-entry", {
            error: error.message
        });
    }
});

module.exports = router;