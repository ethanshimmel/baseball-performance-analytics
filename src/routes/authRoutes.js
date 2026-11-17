const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

router.get("/register", (req, res) => {
    res.render("register", { error: null });
});

router.post("/register", async (req, res) => {
    try {
        await authService.registerUser(
            req.body.email,
            req.body.password
        );

        res.redirect("/login");
    } catch (error) {
        res.status(400).render("register", {
            error: error.message
        });
    }
});

router.get("/login", (req, res) => {
    res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
    try {
        const user = await authService.loginUser(
            req.body.email,
            req.body.password
        );

        req.session.userId = user.id;

        res.redirect("/dashboard");
    } catch (error) {
        res.status(401).render("login", {
            error: error.message
        });
    }
});

router.post("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;