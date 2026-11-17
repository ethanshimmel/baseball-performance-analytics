const bcrypt = require("bcryptjs");
const users = require("../repositories/userRepository");

async function registerUser(email, password) {
    email = email.trim().toLowerCase();

    if (!email || !email.includes("@")) {
        throw new Error("Enter a valid email address.");
    }

    if (!password || password.length < 8) {
        throw new Error("Password must be at least 8 characters.");
    }

    if (users.findUserByEmail(email)) {
        throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    users.createUser(email, passwordHash);
}

async function loginUser(email, password) {
    email = email.trim().toLowerCase();

    const user = users.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!validPassword) {
        throw new Error("Invalid email or password.");
    }

    return {
        id: user.id,
        email: user.email
    };
}

module.exports = {
    registerUser,
    loginUser
};