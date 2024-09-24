const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("./multer"); // Import multer setup

// GET route to fetch users except the user with the given ID
router.get("/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const users = await User.find();
        const friends = users.filter(user => user._id.toString() !== userId);
        res.status(200).json({ friends });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});
router.get("/friend/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);
        res.status(200).json({ user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


// PUT route to update user information and avatar
router.put("/:id", upload.single('avatar'), async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findById(req.params.id);
        if (!existingUser) {
            return res.status(404).json({ message: "Account does not exist" });
        }

        // Check if username and email are provided
        if (!username || !email) {
            return res.status(400).json({ message: "Username and email are required" });
        }

        // Hash password if provided
        let hashedPassword = existingUser.password;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            hashedPassword = await bcrypt.hash(password, salt);
        }

        // Update user information
        existingUser.username = username;
        existingUser.email = email;
        existingUser.password = hashedPassword;

        // Update avatar if a file is uploaded
        if (req.file) {
            existingUser.avatar = req.file.path;
        }
         
        await existingUser.save();

        return res.status(200).json({ message: "User updated successfully", user: existingUser });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
