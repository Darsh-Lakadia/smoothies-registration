require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const authRoutes = require("../routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

require("./db/conn");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//middleware
app.use(express.static(static_path));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

//view engine
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//routes
app.get('*', checkUser);
app.get("/", (req, res) => {
    res.render("home")
});

app.get("/smoothies", requireAuth, (req, res) => {
    res.render("smoothies");
})
app.use(authRoutes);

//cookie
// app.get("/set-cookies", (req, res) => {

//     // res.setHeader('set-cookie', 'newUser=user');
//     res.cookie('newUser', false);
//     res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//     res.send("you got the cookies!!");
// })

// app.get("/read-cookies", (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies);

//     res.json(cookies);
// })


app.listen(port, () => {
    console.log(`Server is running at port no : ${port}`);
});