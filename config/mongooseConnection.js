const mongoose = require("mongoose")

mongoose
.connect("mongodb://localhost:27017/Scatch")   // baad mein dynamically link put karege
.then((result) => {
    console.log("connected to database")
}).catch((err) => {
    // console.log("Error occured")
});

module.exports = mongoose.connection;