const mongoose = require("mongoose")
const config = require("config")
require('dotenv').config();

const dbgr = require("debug")("development:mongoose")


mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)   // baad mein dynamically link put karege
.then((result) => {
    console.log("Connected to the database");
    // dbgr("Connected to the database");
}).catch((err) => {
    console.log("Error occurred:", err);
    // dbgr("Error occurred: ", err);
});

module.exports = mongoose.connection;