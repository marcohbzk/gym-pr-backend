require('dotenv').config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
// const { PrismaClient } = require("@prisma/client");
const app = express();
// const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => res.send(`API WORKING`));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
