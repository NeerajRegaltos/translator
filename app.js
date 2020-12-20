const express = require("express");
const translate = require('translate-google');
const ejs = require("ejs");
const path = require("path");
const { code } = require("./public/language");

const app = express();


app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
// app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.locals.options = Object.keys(code);
const keyArray = Object.keys(code);

app.get("/", (req, res) => {
    res.render("home");
});


app.post("/result", async (req, res) => {
    const { text, lang } = req.body;
    for (var i = 0; i < keyArray.length; i++) {
        if (keyArray[i] === lang) {
            var x = code[lang];
        }
    }
    app.locals.translation = await translate(text, { to: x })


    res.render("ans");
});

app.post("/info", (req, res) => {
    res.render("info")
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server has started on port ${PORT} `);
})

