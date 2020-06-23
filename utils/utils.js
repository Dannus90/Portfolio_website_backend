const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.TOKEN_SECRET,
        {
            algorithm: "HS256",
            expiresIn: "1h",
        }
    );
};

module.exports = {
    createToken,
};
