const register = require("./register");
const getCurrentUser = require("./getCurrentUser");
const login = require("./login");
const logout = require("./logout");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verificationUserMail = require("./verificationUserMail");
const reSendVerificationToken = require("./reSendVerificationToken")

module.exports = {
    register,
    updateSubscription,
    logout,
    login,
    getCurrentUser,
    updateAvatar,
    verificationUserMail,
    reSendVerificationToken
};
