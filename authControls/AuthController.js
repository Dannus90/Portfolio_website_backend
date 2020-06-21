const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
    registerValidation,
    loginValidation,
} = require("../validation/extraValidation");
require("dotenv").config();

//REGISTRATION!

const register = async (req, res) => {
    //Validate before user creation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user exist
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists!");

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();
        const { fullName, email } = savedUser;
        res.status(200).json({
            fullName: fullName,
            email: email,
            message: "User have successfully been saved to the database",
        });
    } catch (err) {
        res.status(400).json({
            error: err,
            message: "An error occured",
        });
    }
};

//MAKE SURE THIS MATCH UP WITH WHAT YOU SEND FROM THE LOGIN PAGE!
const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user is already in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Email or password is wrong!");

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Email or password is wrong!");

    //Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "1h",
    });

    res.header("auth-token", token).send(token);
};

module.exports = {
    register,
    login,
};
