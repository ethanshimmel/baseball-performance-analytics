const gameRepository = require("../repositories/gameRepository");

const statFields = [
    "atBats",
    "hits",
    "doubles",
    "triples",
    "homeRuns",
    "walks",
    "hitByPitch",
    "sacrificeFlies",
    "strikeouts",
    "stolenBases"
];

function validateStats(stats) {
    for (const field of statFields) {
        if (!Number.isInteger(stats[field]) || stats[field] < 0) {
            throw new Error("Statistics must be nonnegative whole numbers.");
        }
    }

    if (stats.hits > stats.atBats) {
        throw new Error("Hits cannot exceed at-bats.");
    }

    if (stats.doubles + stats.triples + stats.homeRuns > stats.hits) {
        throw new Error("Extra-base hits cannot exceed total hits.");
    }

    if (stats.strikeouts > stats.atBats) {
        throw new Error("Strikeouts cannot exceed at-bats.");
    }
}

function saveGame(userId, game, stats) {
    if (!game.date || !game.opponent.trim()) {
        throw new Error("Enter a game date and opponent.");
    }

    validateStats(stats);

    return gameRepository.createGame(userId, game, stats);
}

module.exports = {
    saveGame,
    validateStats
};