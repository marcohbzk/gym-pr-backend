require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

// Route constants
const authRoutes = require("./routes/auth");
const prsRoutes = require("./routes/prs");
const lbRoutes = require("./routes/leaderboard");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/prs", prsRoutes);
app.use("/api/leaderboard", lbRoutes);

app.get("/", (req, res) => res.send(`API WORKING`));

app.listen(3000, () => console.log("Server on http://localhost:3000"));

module.exports = app; // <- Expost the app for tests to run