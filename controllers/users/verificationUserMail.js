const { NotFound } = require("http-errors");
const { User } = require("../../models");

const verificationUserMail = async (req, res, next) => {
    const result = await User.findOneAndUpdate(
        { verificationToken: req.params.verificationToken },
        { verificationToken: null, verify: true },
        { new: true }
    );
    if (!result) {
        throw new NotFound("User not found");
    }

    res.status(200).json({
        data: { ...result._doc },
        message: "Verification successful",
    });
};

module.exports = verificationUserMail;
