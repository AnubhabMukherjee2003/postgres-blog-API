const jwt = require("jsonwebtoken");
const verify = async (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }else{
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        try {
            jwt.verify(token, process.env.JWT_SECRET || 'defaultsecretkey', (err, decoded) => {
                if (err) {
                    return res.status(403).json({ error: "Invalid token" });
                }
                next();
            }
        );
        }catch (error) {
            console.error("Error verifying token:", error);
            return res.status(500).json({ error: "Failed to verify token" });
        }
    }
}

module.exports = {
    verify
};