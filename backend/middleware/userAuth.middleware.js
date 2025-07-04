const jwt = require("jsonwebtoken");


async function userAuth(req, res, next) {
    const { token } = req.cookies;

    try {
        if (!token) {
            return res.status(401).json({
                message: "Invalid token. Please login again.",
            });
        }

        const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (verifyToken) {
            req.userId = verifyToken.id;
            return next();
        }


        return res.status(401).json({
            message: "Token verification failed",
        });

    } catch (err) {
        return res.status(400).json({
            message: "Internal server error.",
            error: err.message,
        });
    }
}

module.exports = {
    userAuth,
};
