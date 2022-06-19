const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error?.details[0]?.context?.label === "mailError") {
            res.status(400).json({
                message: "Verification has already been passed",
            });
            return;
        }
        if (error) {
            res.status(400).json(error);
            return;
        }
        next();
    };
};

module.exports = validation;
