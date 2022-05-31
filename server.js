const mongoose = require("mongoose");
const app = require("./app");

const connection = mongoose.connect(
    "mongodb+srv://roman:1q2w3e4r@cluster0.f9coy.mongodb.net/?retryWrites=true",
    {
        dbName: "contacts",
    }
);
connection
    .then(() => {
        app.listen(3000, function () {
            console.log(`Server running. Use our API on port: ${3000}`);
            console.log("Database connection successful");
        });
    })
    .catch((err) => {
        console.log(`Server not running. Error message: ${err.message}`);
        process.exit(1);
    });
