require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

// Route constants
const authRoutes = require("./routes/auth");
const prsRoutes = require("./routes/prs");

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/prs", prsRoutes);

app.get("/", (req, res) => res.send(`API WORKING`));

app.listen(3000, () => console.log("Server on http://localhost:3000"));
