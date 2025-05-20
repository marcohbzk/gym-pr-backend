// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

    if (!token) return res.sendStatus(401); // Unauthorized -> No token

    // eslint-disable-next-line
    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if (err) return res.sendStatus(403); // Forbidden -> Token invalid

        req.userId = user.userId; // Save the user ID from the token
        next(); // Continue to the route logic
    });
}

module.exports = authenticateToken;