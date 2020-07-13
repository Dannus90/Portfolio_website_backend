const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwtDecode = require("jwt-decode");
const {
    registerValidation,
    loginValidation,
} = require("../validation/extraValidation");
require("dotenv").config();
const { createToken } = require("../utils/utils");
const { v4: uuidv4 } = require("uuid");
const {
    getResetRequest,
    createResetRequest,
    sendResetLink,
} = require("../utils/utils");
const { response } = require("express");

//REGISTRATION!

const register = async (req, res) => {
    //Validate before user creation
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Destructuring
    const { fullName, email, password } = req.body;

    //Checking if user exist
    const emailExist = await User.findOne({ email: email });
    if (emailExist) return res.status(400).send("Email already exists!");

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        fullName: fullName,
        email: email.toLowerCase(),
        password: hashedPassword,
    });

    try {
        const savedUser = await user.save();

        if (savedUser) {
            const token = createToken(savedUser);
            const decodedToken = jwtDecode(token);
            const expiresAt = decodedToken.exp;

            const { _id, fullName, email, isAdmin } = savedUser;
            const userInfo = Object.assign(
                {},
                { isAdmin, _id, fullName, email }
            );
            console.log(userInfo);

            res.status(200).json({
                userInfo,
                message: "You have successfully registered.",
                token,
                expiresAt,
            });
        } else {
            return res.status(400).send("An error occured");
        }
    } catch (err) {
        res.status(400).json({
            error: err,
            message: "An error occured",
        });
    }
};

const login = async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Checking if user is already in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(403).send("Email or password is wrong!");

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(403).send("Email or password is wrong!");

    //Create and assign a token

    try {
        const { isAdmin, _id, fullName, email } = user;
        const userInfo = Object.assign({}, { isAdmin, _id, fullName, email });
        console.log(userInfo);
        const token = createToken(userInfo);
        const decodedToken = jwtDecode(token);
        const expiresAt = decodedToken.exp;

        res.json({
            message: "Login Successful!",
            token,
            userInfo,
            expiresAt,
        });
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong!" });
    }
};

const forgot = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({
            message: `There is no user with the email adress ${email}`,
        });
    } else {
        const id = uuidv4();
        const request = {
            id,
            email: user.email,
        };
        createResetRequest(request);
        sendResetLink(user.email, id);
    }
    res.status(200).json({
        message: `An email has been set to you with a reset link.`,
    });
};

// THIS IS NOT FINISHED YET!

const reset = async (req, res) => {
    const request = getResetRequest(req.body.id);

    if (request) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await User.findOneAndUpdate(
            { email: request.email },
            { password: hashedPassword },
            { new: true },
            (err, doc) => {
                if (err) {
                    return res.status(400).json({
                        message: "Something went wrong when updating data",
                    });
                }
            }
        );

        return res
            .status(204)
            .json({ message: "Password was updated successfully" });
    } else {
        return res.status(404).json({
            message: "Password was not updated successfully",
        });
    }
};

module.exports = {
    register,
    login,
    forgot,
    reset,
};
