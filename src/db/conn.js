const mongoose = require("mongoose");

mongoose.connect(process.env.URL_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connection successful...");
}).catch((e) => {
    console.log("no connection" + e);
})