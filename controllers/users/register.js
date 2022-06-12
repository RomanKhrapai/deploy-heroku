const { User } = require("../../models");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const avatarURL = gravatar.url(email);
        const result = await User.create({
            email,
            password: await bcrypt.hash(password, 10),
            avatarURL,
        });
        res.status(201).json({
            user: {
                email: result.email,
                subscription: result.subscription,
                avatarURL,
            },
        });
    } catch (e) {
        if (e.code === 11000) {
            e.status = 409;
            e.message = "Email in use";
        }
        next(e);
    }
};

module.exports = register;
