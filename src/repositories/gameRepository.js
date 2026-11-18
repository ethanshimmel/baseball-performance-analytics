const db = require("../database/database");

function createGame(userId, game, stats) {
    const saveGame = db.transaction(() => {
        const gameResult = db.prepare(`
            INSERT INTO Games (user_id, game_date, opponent)
            VALUES (?, ?, ?)
        `).run(userId, game.date, game.opponent);

        db.prepare(`
            INSERT INTO BattingStats (
                game_id, at_bats, hits, doubles, triples,
                home_runs, walks, hit_by_pitch,
                sacrifice_flies, strikeouts, stolen_bases
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            gameResult.lastInsertRowid,
            stats.atBats,
            stats.hits,
            stats.doubles,
            stats.triples,
            stats.homeRuns,
            stats.walks,
            stats.hitByPitch,
            stats.sacrificeFlies,
            stats.strikeouts,
            stats.stolenBases
        );

        return gameResult.lastInsertRowid;
    });

    return saveGame();
}

function getGamesByUser(userId) {
    return db.prepare(`
        SELECT Games.*, BattingStats.*
        FROM Games
        JOIN BattingStats ON Games.id = BattingStats.game_id
        WHERE Games.user_id = ?
        ORDER BY Games.game_date DESC
    `).all(userId);
}

module.exports = {
    createGame,
    getGamesByUser
};