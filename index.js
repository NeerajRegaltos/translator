const express = require("express");
const bodyParser = require("body-parser");
const translate = require('translate-google');
const ejs = require("ejs");
const path = require("path");
const { code } = require("./language");

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))

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
    var result = await translate(text, { to: x })
    app.locals.result = result;
    res.render("ans");
});

app.post("/info", (req, res) => {
    res.render("info")
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}
app.listen(port, function () {
    console.log("server has started on port ");
})

