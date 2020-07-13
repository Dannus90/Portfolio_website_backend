const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

//Create Token

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

//Requests
const requests = [];

const createResetRequest = (resetRequest) => {
    requests.push(resetRequest);
};

const getResetRequest = (id) => {
    const thisRequest = requests.find((req) => req.id === id);
    return thisRequest;
};

const sendResetLink = (email, id) => {
    const output = `
    <h3>You have requested a password change on Daniels portfolio website</h3>
    <p>To reset your password, please click the following link: ${process.env.FRONTEND_CONNECT}reset/${id}</p>`;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: '"Nodemailer Contact" <dannus1990@gmail.com>',
        to: `${email}`,
        subject: "Password reset instructions",
        text: "Reset your password",
        html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(400).send({ msg: "Error! Email was not sent!" });
        }

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).send({ msg: "Email has been sent" });
    });
};

module.exports = {
    createToken,
    createResetRequest,
    getResetRequest,
    sendResetLink,
};
