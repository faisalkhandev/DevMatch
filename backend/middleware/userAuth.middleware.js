const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");


async function userAuth(req, res, next) {

    const { token } = req.cookies;

    try {
        if (!token) {
            res.status(400).json({
                message: "invalid token in the cookies."
            })
        }

        const verifyToken = await jwt.verify(token, JWT_SECRET)

        if (verifyToken) {
            req.userId = verifyToken.id;
            next();
        }
    }
    catch (err) {
        res.status(400).json({
            message: "internal server error.",
            error: err.message
        })
    }

}


module.exports = {
    userAuth
}