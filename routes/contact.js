const router = require("express").Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.post("/", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${firstname} ${lastname}</li>
        <li>Email: ${email}</li>
        <li>Phone: ${phone}</li>
    </ul>
    <h3>Message from contact</h3>
    <p>${message}</p>`;

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    let mailOptions = {
        from: '"Nodemailer Contact" <dannus1990@gmail.com>',
        to: "persson.daniel.1990@gmail.com",
        subject: "Contact Request from Your Website",
        text: "Hello World",
        html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }

        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        res.status(200).send({ msg: "Email has been sent" });
    });
});

module.exports = router;
