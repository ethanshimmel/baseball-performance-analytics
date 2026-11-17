const db = require("../database/database");

function createUser(email, passwordHash) {
    const statement = db.prepare(`
        INSERT INTO Users (email, password_hash)
        VALUES (?, ?)
    `);

    return statement.run(email, passwordHash);
}

function findUserByEmail(email) {
    return db.prepare(`
        SELECT * FROM Users WHERE email = ?
    `).get(email);
}

function findUserById(id) {
    return db.prepare(`
        SELECT id, email FROM Users WHERE id = ?
    `).get(id);
}

module.exports = {
    createUser,
    findUserByEmail,
    findUserById
};