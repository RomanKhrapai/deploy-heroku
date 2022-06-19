const express = require("express");

const {
    checkAuth,
    validation,
    ctrlWrapper,
    upload,
} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const {
    joiSchemaSubscription,
    joiSchema,
    joiSchemaEmail,
} = require("../../models/user");

const router = express.Router();

router.post("/register", validation(joiSchema), ctrl.register);
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/logout", checkAuth, ctrlWrapper(ctrl.logout));
router.get("/current", checkAuth, ctrlWrapper(ctrl.getCurrentUser));
router.patch(
    "/",
    checkAuth,
    validation(joiSchemaSubscription),
    ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
    "/avatars",
    checkAuth,
    upload.single("avatar"),
    ctrlWrapper(ctrl.updateAvatar)
);
router.get(
    "/verify/:verificationToken",
    ctrlWrapper(ctrl.verificationUserMail)
);
router.post(
    "/verify",
    validation(joiSchemaEmail),
    ctrlWrapper(ctrl.reSendVerificationToken)
);

module.exports = router;
