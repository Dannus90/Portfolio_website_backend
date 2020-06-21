const mongoose = require("mongoose");
const colors = require("colors");
require("dotenv").config();

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});

mongoose.connection.once("open", () => {
    console.log(`${"Connected to MongoDB".green.bold}`);
});

mongoose.connection.on("error", (error) => {
    console.error(error);
});
