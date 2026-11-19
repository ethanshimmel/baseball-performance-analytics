const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(
    process.env.DATABASE_PATH ||
    path.join(__dirname, "../../baseball.db")
);

db.pragma("foreign_keys = ON");

db.exec(`
    CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        game_date TEXT NOT NULL,
        opponent TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES Users(id)
            ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS BattingStats (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        game_id INTEGER NOT NULL,
        at_bats INTEGER NOT NULL,
        hits INTEGER NOT NULL,
        doubles INTEGER NOT NULL,
        triples INTEGER NOT NULL,
        home_runs INTEGER NOT NULL,
        walks INTEGER NOT NULL,
        hit_by_pitch INTEGER NOT NULL,
        sacrifice_flies INTEGER NOT NULL,
        strikeouts INTEGER NOT NULL,
        stolen_bases INTEGER NOT NULL,
        FOREIGN KEY (game_id) REFERENCES Games(id)
            ON DELETE CASCADE
    );
`);

module.exports = db;