// Signup/login routes
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// POST /signup
router.post("/signup", async (req, res) =>{
    
    // Extract email and password from req.body
    const { email, password} = req.body;
    // Validate input
    if (!email || !password)
        return res.status(400).json({error: "Email and password required" });
    try {
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser)
            return res.status(400).json({error: "User already exists"});

        // Hash password
        const hashedPw = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPw,
            },
        });
        // Return success message or token
        return res.status(201).json({ message: "User Created", userId: newUser.id});
    } catch (err){
        console.error(err);
        return res.status(500).json({error: "Internal Server Error" });
    }
});

// POST /login
router.post("/login", async (req, res) =>{
    const {email, password} = req.body;

    if(!email || !password)
        return res.status(400).json({error: "Email and password required"});
    
    try {
        // Find user in DB
        const user = await prisma.user.findUnique({ where: { email } });
        if(!user)
            return res.status(400).json({ error: "Invalid Credentials" });
        
        // Compare Hashed Passwords
        const pwMatch = await bcrypt.compare(password, user.password);
        if(!pwMatch)
            return res.status(400).json({ error: "Invalid Credentials" });
        
        // If valid, create JWT and return it
        const token = jwt.sign(
            { userId: user.id },
            // eslint-disable-next-line
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        return res.status(200).json({ message: "Login sucessful", token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

module.exports = router;