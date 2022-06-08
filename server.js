const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require("./app");

dotenv.config();

const connection = mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}${process.env.DB_HOST}`,
    {
        dbName: process.env.DB_NAME,
    }
);
connection
    .then(() => {
        app.listen(parseInt(process.env.PORT), function () {
            console.log(
                `Server running. Use our API on port: ${process.env.PORT}`
            );
            console.log("Database connection successful");
        });
    })
    .catch((err) => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
    });
