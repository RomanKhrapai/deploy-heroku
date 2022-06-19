const NotFound = require("http-errors");
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");
const { User } = require("../../models");

dotenv.config();

const reSendVerificationToken = async (req, res, next) => {
    const { email } = req.body;
    const verificationToken = uuidv4();
    const msg = {
        to: email,
        from: "hrapayr@gmail.com",
        subject: "Register user contacts API",
        text: `confirm your registration by following the link http://localhost:3001/api/users/verify/${verificationToken}`,
        html: `<strong>confirm your registration by following the link http://localhost:3001/api/users/verify/${verificationToken}</strong>`,
    };

    const result = await User.findOne({ email, verify: false, new: false });
    if (!result) {
        throw new NotFound.NotFound("Verification has already been passed");
    }

    await sgMail.send(msg);
    res.status(200).json({ message: "Verification email sent" });
};

module.exports = reSendVerificationToken;
