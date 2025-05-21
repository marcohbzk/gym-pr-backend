const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to protect all PR routes
router.use(authMiddleware);

// Create a new PR
router.post('/', async (req, res) => {
    const userId = req.userId; // Get userId from middleware
    const { liftType, weightKg, bodyweightKg, prDate, visibility } = req.body;
    if (!liftType || !weightKg || !bodyweightKg || !prDate)
        return res.status(400).json({error: "All fields are required"});
    try {
        // Create the PR record linked to the user
        const newPr = await prisma.pR.create({
            data: {
                userId,
                liftType,
                weightKg,
                bodyweightKg,
                prDate: new Date(prDate),
                visibility,
            },  
        });
        return res.status(201).json(newPr);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal Server Error" }); 
    }
});

// Read all PRs
router.get('/', async (req, res) => {
    const userId = req.userId;
    try {
        // Find the PR first to verify ownership
        const prs = await prisma.pR.findMany({
            where: { userId },
            orderBy: [
                {visibility: 'desc'},
                {liftType: 'asc'},
                {prDate: 'desc'}
            ]
        });
        return res.status(200).json(prs);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

// Read Specific PR
router.get('/:id', async (req, res) => {
    const userId = req.userId;
    const prId = req.params.id;

    try {
        const pr = await prisma.pR.findUnique({
            where: { id: prId },
        });

        if (!pr)
            return res.status(404).json({ error: "PR Not Found"});

        if (pr.userId !== userId)
            return res.status(403).json({ error: "Not authorized to view this PR" });

        return res.status(200).json(pr);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error"});
    }
});

// Update a PR
router.put('/', async (req, res) => {
    const userId = req.userId;
    const { id, liftType, weightKg, bodyweightKg, prDate, visibility } = req.body;
    if (!liftType || !weightKg || !bodyweightKg || !prDate)
        return res.status(400).json({error: "All fields are required"});

    try {
        const existingPr = await prisma.pR.findUnique({ where: { id } });

        if (!existingPr)
            return res.status(404).json({ error: "PR Not Found"});

        if (existingPr.userId !== userId)
            return res.status(403).json({ error: "Not authorized to update this PR" });
        const updatedPr = await prisma.pR.update({
            where: { id },
            data: {
                userId,
                liftType,
                weightKg,
                bodyweightKg,
                prDate: new Date(prDate),
                visibility,
            },  
        });
        return res.status(201).json(updatedPr);
    } catch (err) {
        console.error(err);
        return res.status(500).json({error: "Internal Server Error" }); 
    }
});

// Delete a PR
router.delete('/', async (req, res) =>{
    const userId = req.userId;
    const { id } = req.body;
    if (!id)
        return res.status(400).json({ error: "PR id is required"});
    try {
        // Find the PR first to verify ownership
        const prToDelete = await prisma.pR.findUnique({
            where: { id }
        });

        if (!prToDelete)
            return res.status(404).json({ error: "PR Not Found" });

        if (prToDelete.userId !== userId)
            return res.status(403).json({ error: "Not authorized to delete this PR"});

        // Delete the PR
        const deletedPr = await prisma.pR.delete({
            where: { id }
        });
        return res.status(200).json(deletedPr);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;